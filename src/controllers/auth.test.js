const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const contactsDB = '/db-contacts'
const {URL, PORT} = process.env;
const dbURL = URL + contactsDB

let server;
beforeAll(()=> server = app.listen(PORT));
afterAll(()=> server.close());

beforeEach((done)=> {
  mongoose.connect(dbURL).then(()=> done())
})

describe("test auth routes", ()=> {
  afterAll(async () => {
    await mongoose.connection.db.collection('users').deleteMany({});
  })
  test("test registration route", async()=> {
    const newUser = {
      email: "Vova@gmail.com",
      password: "password"
    }
    const user = await request(app).post("/api/users/registration").send(newUser)
    expect(user.statusCode).toBe(201)
    expect(user.body.email).toBe(newUser.email)
  })
  test('should be return user from db', async () => {
    const loginUser = {
      email: "Vova@gmail.com",
      password: "password"
    }
    const response = await request(app).post("/api/users/login").send(loginUser)
    expect(response.statusCode).toBe(200)
    const {body} = response
    expect(body.token).toBeTruthy()
    expect(response.token)
  })
})