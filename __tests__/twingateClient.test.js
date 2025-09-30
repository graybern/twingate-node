import TwingateClient from "../src/TwingateClient.js";

describe("TwingateClient", () => {
  it("should throw an error if tenantName or apiKey is missing", () => {
    expect(() => new TwingateClient()).toThrow();
    expect(() => new TwingateClient("tenant")).toThrow();
  });

  it("should initialize with default options", () => {
    const client = new TwingateClient("myTenant", "myApiKey");

    expect(client.options.maxPageSize).toBe(50);
    expect(client.options.retries).toBe(3);
  });

  it("should override options if provided", () => {
    const client = new TwingateClient("myTenant", "myApiKey", {
      maxPageSize: 100,
    });

    expect(client.options.maxPageSize).toBe(100);
  });
});
