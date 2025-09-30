import fs from "fs";
import path from "path";
import { Writable } from "stream";

const DEFAULT_MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB default
const DEFAULT_MAX_FILES = 5; // Keep 5 rotated files by default

/**
 * Creates a writable stream to a file, ensuring the directory exists.
 * @param {string} filePath - The path to the file.
 * @param {object} logger - A logger instance.
 * @returns {fs.WriteStream} A writable file stream.
 */
export function createWriteStream(filePath, logger) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      logger.info(`Created directory: ${dir}`);
    }
    return fs.createWriteStream(filePath);
  } catch (error) {
    logger.error(`Failed to create write stream at ${filePath}:`, error);
    throw error;
  }
}

/**
 * Rotates files when they exceed the maximum size.
 * @param {string} basePath - The base file path (without extension).
 * @param {string} extension - The file extension.
 * @param {number} maxFiles - Maximum number of rotated files to keep.
 */
function rotateFiles(basePath, extension, maxFiles) {
  // Shift existing files (file.2.json -> file.3.json, etc.)
  for (let i = maxFiles - 1; i >= 1; i--) {
    const oldFile = `${basePath}.${i}${extension}`;
    const newFile = `${basePath}.${i + 1}${extension}`;

    if (fs.existsSync(oldFile)) {
      if (i === maxFiles - 1) {
        // Delete the oldest file
        fs.unlinkSync(oldFile);
      } else {
        fs.renameSync(oldFile, newFile);
      }
    }
  }

  // Move current file to .1
  const currentFile = `${basePath}${extension}`;
  const rotatedFile = `${basePath}.1${extension}`;
  if (fs.existsSync(currentFile)) {
    fs.renameSync(currentFile, rotatedFile);
  }
}

/**
 * A class that extends Writable stream to process and write JSON data with rotation.
 */
export class JsonStream extends Writable {
  constructor(basePath, logger, options = {}) {
    super({ objectMode: true });

    this.basePath = basePath;
    this.logger = logger;
    this.maxFileSize = options.maxFileSize || DEFAULT_MAX_FILE_SIZE;
    this.maxFiles = options.maxFiles || DEFAULT_MAX_FILES;
    this.currentSize = 0;
    this.fileCounter = 0;
    this.isFirstItem = true;

    // Parse the base path to separate directory, name, and extension
    const parsed = path.parse(basePath);
    this.directory = parsed.dir;
    this.baseName = parsed.name;
    this.extension = parsed.ext || ".json";

    // Start the first file
    this._createNewFile();
  }

  _createNewFile() {
    // Close existing stream if it exists
    if (this.currentStream) {
      this.currentStream.write("]"); // Close JSON array
      this.currentStream.end();
    }

    // Generate new filename
    const filename =
      this.fileCounter === 0
        ? `${this.baseName}${this.extension}`
        : `${this.baseName}-part${this.fileCounter + 1}${this.extension}`;

    this.currentFilePath = path.join(this.directory, filename);
    this.currentStream = createWriteStream(this.currentFilePath, this.logger);
    this.currentSize = 0;
    this.isFirstItem = true;

    // Start JSON array
    this.currentStream.write("[");
    this.currentSize += 1;

    this.logger.info(`Created new data file: ${this.currentFilePath}`);
  }

  _write(chunk, encoding, callback) {
    try {
      const jsonString = JSON.stringify(chunk, null, 2);
      const separator = this.isFirstItem ? "" : ",";
      const dataToWrite = separator + jsonString;

      // Check if this write would exceed the file size limit
      if (
        this.currentSize + dataToWrite.length > this.maxFileSize &&
        !this.isFirstItem
      ) {
        // Close current file and create a new one
        this.currentStream.write("]");
        this.currentStream.end();

        this.fileCounter++;
        this._createNewFile();

        // Write to the new file
        this.currentStream.write(jsonString);
        this.currentSize += jsonString.length;
      } else {
        // Write to current file
        this.currentStream.write(dataToWrite);
        this.currentSize += dataToWrite.length;
      }

      this.isFirstItem = false;
      callback();
    } catch (error) {
      this.logger.error("Error writing to stream:", error);
      callback(error);
    }
  }

  _final(callback) {
    if (this.currentStream) {
      this.currentStream.write("]"); // End JSON array
      this.currentStream.end(callback);
    } else {
      callback();
    }
  }

  // Get all created file paths
  getFilePaths() {
    const paths = [];
    for (let i = 0; i <= this.fileCounter; i++) {
      const filename =
        i === 0
          ? `${this.baseName}${this.extension}`
          : `${this.baseName}-part${i + 1}${this.extension}`;
      paths.push(path.join(this.directory, filename));
    }
    return paths;
  }
}
