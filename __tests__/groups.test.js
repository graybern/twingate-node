import users from "../src/resources/queries/users.js";

describe("Users Resource", () => {
  let mockClient;
  let usersResource;

  beforeEach(() => {
    // Mock client with a request method
    mockClient = {
      request: jest.fn(),
      logger: console,
    };

    // Initialize the users resource with the mock client
    usersResource = users(mockClient);
  });

  test("getAll should fetch all users", async () => {
    const mockUsers = [
      { id: "1", name: "User One" },
      { id: "2", name: "User Two" },
    ];
    mockClient.request.mockResolvedValue({ users: mockUsers });

    const result = await usersResource.getAll();
    expect(mockClient.request).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

  test("getOne should fetch a single user by ID", async () => {
    const userId = "123";
    const mockUser = { id: "123", name: "Test User" };
    mockClient.request.mockResolvedValue({ user: mockUser });

    const result = await usersResource.getOne(userId);
    expect(mockClient.request).toHaveBeenCalledWith(expect.anything(), {
      id: userId,
    });
    expect(result).toEqual(mockUser);
  });

  test("create should create a new user", async () => {
    const newUser = { name: "New User" };
    const mockResponse = { userCreate: { id: "123", ...newUser } };
    mockClient.request.mockResolvedValue(mockResponse);

    const result = await usersResource.create(newUser);
    expect(mockClient.request).toHaveBeenCalledWith(expect.anything(), newUser);
    expect(result).toEqual(mockResponse.userCreate);
  });

  test("delete should remove a user by ID", async () => {
    const userId = "123";
    const mockResponse = { userDelete: { success: true } };
    mockClient.request.mockResolvedValue(mockResponse);

    const result = await usersResource.delete(userId);
    expect(mockClient.request).toHaveBeenCalledWith(expect.anything(), {
      id: userId,
    });
    expect(result).toEqual(mockResponse.userDelete);
  });

  test("resetMfa should reset MFA for a user by ID", async () => {
    const userId = "123";
    const mockResponse = { userResetMfa: { success: true } };
    mockClient.request.mockResolvedValue(mockResponse);

    const result = await usersResource.resetMfa(userId);
    expect(mockClient.request).toHaveBeenCalledWith(expect.anything(), {
      id: userId,
    });
    expect(result).toEqual(mockResponse.userResetMfa);
  });

  test("getAvailableMethods should return a list of methods", () => {
    const availableMethods = usersResource.getAvailableMethods();
    expect(availableMethods).toEqual(
      expect.arrayContaining([
        "get",
        "getOne",
        "getAll",
        "create",
        "delete",
        "detailsUpdate",
        "roleUpdate",
        "resetMfa",
      ])
    );
  });
});
