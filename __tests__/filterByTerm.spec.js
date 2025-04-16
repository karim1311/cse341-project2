const Tvshow = require("../models/TvshowModel");
const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose')

// Mock user data
const mockUser = { 
  _id: new mongoose.Types.ObjectId('67ec22b57c22f1891efa281a'),
  email: 'ramon.altair9@gmail.com' };

describe("get Tvshow by its ID", () => {
  beforeAll(async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    
    console.log(`MongoDB connected : ${conn.connection.host}`)

    app.use((req, res, next) => {
      req.isAuthenticated = () => true; // Always authenticated
      req.user = mockUser;             // Add mock user to the request
      next();
    });

  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should respond with a 200 status code", async () => {
    const response = await request(app)
    .get("/")

    expect(response.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array); // Assuming the response body is an array of tvshows
  });
});
