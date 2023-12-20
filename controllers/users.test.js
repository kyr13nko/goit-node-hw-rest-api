const mongoose = require("mongoose");
require("dotenv").config();

const { loginUser } = require("./users");

const { DB_HOST } = process.env;

const req = { body: { email: "hrhrkrnk@gmail.com", password: "123456" } };
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("check loginUser function", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });

  test("check status 200", async () => {
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("check token", async () => {
    await loginUser(req, res);
    expect(typeof res.json.mock.calls[0][0].token).toBeTruthy();
  });

  test("check user", async () => {
    await loginUser(req, res);
    expect(typeof res.json.mock.calls[0][0].user.email).toBe("string");
    expect(typeof res.json.mock.calls[0][0].user.subscription).toBe("string");
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
