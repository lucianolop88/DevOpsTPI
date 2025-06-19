const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");

describe("Auth API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    const lastUser = await User.findOne().sort({ createdAt: -1 });
    await User.findByIdAndDelete(lastUser._id);
    await mongoose.connection.close();
  });
  test("registra un nuevo usuario", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@user.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("loguea al usuario registrado", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@user.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
