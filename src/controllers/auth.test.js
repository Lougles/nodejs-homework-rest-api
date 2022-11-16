const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const {User} = require("../models/userModel");
const contactsDB = '/db-contacts'
const {URL, PORT} = process.env;
const dbURL = URL + contactsDB

describe("test auth routes", ()=> {
  let server;
  beforeAll(()=> server = app.listen(PORT));
  afterAll(()=> server.close());
  beforeEach((done)=> {
    mongoose.connect(dbURL).then(()=> done())
  })
  beforeEach(async () => {
    await mongoose.connection.db.collection('users').deleteMany({});
  })
  // afterEach((done)=> {
  //   mongoose.connection.db.dropCollection(()=> {
  //     mongoose.connection.close(()=> done())
  //   })
  // })
  test("test login route", async()=> {
    const newUser = {
      email: "Vova@gmail.com",
      password: "password"
    }
    const user = await request(app).post("/api/users/registration").send(newUser)
    // const user = await User.create(newUser);
    expect(user.statusCode).toBe(201)

    // const loginUser = {
    //   email: "Vova@gmail.com",
    //   password: "password"
    // }
    // const response = await request(app).post("/api/users/login").send(loginUser)
    // expect(response.statusCode).toBe(200)
    // const {body} = response
    // expect(body.token).toBeTruthy()
    // const {token} = await User.findById(user._id)
    // expect(body.token).toBe(token)
    
  })
})