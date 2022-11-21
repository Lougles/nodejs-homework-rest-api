const mongoose = require('mongoose')
const request = require('supertest')
require('dotenv').config()
const app = require('../../app')
const testCollection = '/test'
const URL = process.env.URL + testCollection
let server, token = '', id;
beforeAll(() => server = app.listen(process.env.AUTH_PORT_TEST))
afterAll(() => server.close())

describe('Registration and login test', () => {
  beforeAll((done) => {
    mongoose.connect(URL).then(() => done())
  })
  test('should return registered user', async() => {
    const registrationUser = {
      email: "Vova@gmail.com",
      password: "password"
    }
    const res = await request(app).post('/api/users/registration').send(registrationUser)
    console.log('REGISTER', res.status === 201 ? res.status : res.error)
    expect(res.statusCode).toEqual(201)
    expect(res.body.email).toEqual(registrationUser.email)
    expect(res.body.subscription).toEqual('starter')
  })
  test('should return token', async () => {
    const loginUser = {
      email: "Vova@gmail.com",
      password: "password"
    }
    const res = await request(app).post('/api/users/login').send(loginUser)
    console.log('LOGIN', res.status === 200 ? res.status : res.error)
    token = res.body.token
    expect(res.statusCode).toEqual(200)
    expect(res.body.token).toBeTruthy()
  })
})

describe('CRUD contacts tests', () => {
  beforeAll((done) => {
    mongoose.connect(URL).then(() => done())
  })
  afterAll( async() => {
    await mongoose.connection.db.collection('users').deleteMany({})
    await mongoose.connection.db.collection('contacts').deleteMany({})
  })
  test('should return added contact', async() => {
    const newContact = {
      email: "test@gmail.com",
      name: "test",
      phone: "0123456789"
    }
    const res = await request(app).post('/api/contacts/').send(newContact).set('Authorization', `Bearer ${token}`)
    console.log('POST CONTACT', res.status === 201 ? res.status : res.error)
    expect(res.statusCode).toEqual(201)
  })
  test('should return all contacts', async() => {
    const res = await request(app).get('/api/contacts/').set('Authorization', `Bearer ${token}`)
    id = res.body[0]._id
    console.log('GET ALL CONTACTS', res.status === 200 ? res.status : res.error)
    expect(res.statusCode).toEqual(200)
  })
  test('should return contact by ID', async() => {
    const res = await request(app).get(`/api/contacts/${id}`).set('Authorization', `Bearer ${token}`)
    console.log('GET CONTACT BY ID', res.status === 200 ? res.status : res.error)
    expect(res.statusCode).toEqual(200)
  })
  test('should return an updated contact favorite field', async() => {
    const newFavorite = {
      favorite: true
    }
    const res = await request(app).patch(`/api/contacts/favorite/${id}`).send(newFavorite).set('Authorization', `Bearer ${token}`)
    console.log('PATCH FAVORITE FIELD', res.status === 200 ? res.status : res.error)
    expect(res.statusCode).toEqual(200)
  })
  test('should return an updated contact', async() => {
    const updateContact = {
      email: "updated@gmail.com",
      name: "updated",
      phone: "9876543210"
    }
    const res = await request(app).put(`/api/contacts/${id}`).send(updateContact).set('Authorization', `Bearer ${token}`)
    console.log('PUT CONTACT', res.status === 200 ? res.status : res.error)
    expect(res.statusCode).toEqual(200)
  })
  test('should return an deleted contact', async() => {
    const res = await request(app).delete(`/api/contacts/${id}`).set('Authorization', `Bearer ${token}`)
    console.log('DELETE CONTACT', res.status === 200 ? res.status : res.error)
    expect(res.statusCode).toEqual(200)
  })
})