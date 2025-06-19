const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

describe("Todo API", () => {
  let token;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = new User({ email: "todo@test.com", password: "123456" });
    await user.save();
    userId = user._id;

    token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "miclavesecretaultrasegura123",
      {
        expiresIn: "1h",
      }
    );
  });

  afterAll(async () => {
    const lastUser = await User.findOne().sort({ createdAt: -1 });
    await Todo.deleteMany({ user: lastUser._id });
    await User.findByIdAndDelete(lastUser._id);
    await mongoose.connection.close();
  });
  test("crea una nueva tarea", async () => {
    const res = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Test tarea" });

    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBe("Test tarea");
  });

  test("obtiene las tareas del usuario", async () => {
    await Todo.create({ text: "Otra tarea", user: userId });

    const res = await request(app)
      .get("/api/todos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test("elimina una tarea", async () => {
    const tarea = await Todo.create({ text: "A borrar", user: userId });

    const res = await request(app)
      .delete(`/api/todos/${tarea._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminada/i);
  });
  test("rechaza crear tarea sin token", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ text: "Test tarea" });

    expect(res.statusCode).toBe(401);
  });
});
