const mongoose = require('mongoose')
const request = require('supertest')
require('dotenv').config()
const app = require('../../app')
const testCollection = '/test'
const URL = process.env.URL + testCollection


describe('Registration and login test', () => {
  beforeAll(() => server = app.listen(process.env.PORT))
  afterAll(() => server.close())
  beforeEach((done) => {
    mongoose.connect(URL).then(() => done())
  })
  afterAll(async () => {
    await mongoose.connection.db.collection('users').deleteMany({})
  })
  test('should return registered user', async() => {
    const registrationUser = {
      email: "Vova@gmail.com",
      password: "password"
    }
    const res = await request(app).post('/api/users/registration').send(registrationUser)
    expect(res.statusCode).toEqual(201)
    expect(res.body.email).toEqual(registrationUser.email)
    expect(res.body.subscription).toEqual('starter')
  })
  test('should return  user', async () => {
    const loginUser = {
      email: "Vova@gmail.com",
      password: "password"
    }
    const res = await request(app).post('/api/users/login').send(loginUser)
    expect(res.statusCode).toEqual(200)
    expect(res.body.token).toBeTruthy()
  })




})
