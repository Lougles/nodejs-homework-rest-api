const mongoose = require('mongoose')
const request = require('supertest')
require('dotenv').config()
const app = require('../../app')
const testCollection = '/test'
const URL = process.env.URL + testCollection
let server, token = '', id;

beforeAll((done) => {
  server = app.listen(process.env.AUTH_PORT_TEST)
  mongoose.connect(URL).then(() => done())
})
afterAll(() => server.close())

describe('Registration and login test Errors', () => {
  test('should return registered error ("email" is required)', async() => {
    const registrationUser = {
      password: "password"
    }
    const res = await request(app).post('/api/users/registration').send(registrationUser)
    expect(res.statusCode).toEqual(400)
    expect(res.ok).toEqual(false)
    expect(res.body.message).toEqual('"email" is required')
  })
  test('should return registered error ("password" is required)', async() => {
    const registrationUser = {
      email: "Vova@gmail.com"
    }
    const res = await request(app).post('/api/users/registration').send(registrationUser)
    expect(res.statusCode).toEqual(400)
    expect(res.ok).toEqual(false)
    expect(res.body.message).toEqual('"password" is required')
  })
})

describe('Registration and login test', () => {
  test('should return registered user', async() => {
    const registrationUser = {
      email: "Vova@gmail.com",
      password: "password"
    }
    const res = await request(app).post('/api/users/registration').send(registrationUser)
    expect(res.error).toEqual(false)
    expect(res.ok).toEqual(true)
    expect(res.statusCode).toEqual(201)
    expect(res.body.email).toEqual(registrationUser.email)
    expect(res.body.avatarURL).toBeDefined()
    expect(res.body.password).toBeDefined()
    expect(res.body.subscription).toEqual('starter')
  })
  test('should return wrong password error', async() => {
    const loginUser = {
      email: "Vova@gmail.com",
      password: "wrongPassword"
    }
    const res = await request(app).post('/api/users/login').send(loginUser)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual('Wrong password')
    expect(res.ok).toEqual(false)
  })
  test('should return wrong password length error', async() => {
    const loginUser = {
      email: "Vova@gmail.com",
      password: "len"
    }
    const res = await request(app).post('/api/users/login').send(loginUser)
    expect(res.statusCode).toEqual(400)
    expect(res.ok).toEqual(false)
    expect(res.body.message).toEqual('"password" length must be at least 6 characters long')
  })
  test('should return "User is not found" error', async () => {
    const loginUser = {
      email: "WrongUser@gmail.com",
      password: "password"
    }
    const res = await request(app).post('/api/users/login').send(loginUser)
    expect(res.statusCode).toEqual(404)
    expect(res.ok).toEqual(false)
    expect(res.body).toEqual('User is not found')
  })
  test('should return token', async () => {
    const loginUser = {
      email: "Vova@gmail.com",
      password: "password"
    }
    const res = await request(app).post('/api/users/login').send(loginUser)
    token = res.body.token
    expect(res.error).toBe(false)
    expect(res.statusCode).toEqual(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.token).toBeTruthy()
  })
})

describe('CRUD contacts test errors', () => {
  test('should return error', async() => {
    const newContact = {
      name: "test",
      phone: "0123456789"
    }
    const res = await request(app).post('/api/contacts/').send(newContact).set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(400)
    expect(res.ok).toEqual(false)
    expect(res.body.message).toEqual('"email" is required')
  })
})

describe('CRUD contacts test', () => {
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
    expect(res.error).toBe(false)
    expect(res.statusCode).toEqual(201)
    expect(res.body.data.favorite).toBe(false)
    expect(res.body.data.name).toEqual(newContact.name)
    expect(res.body.data.email).toEqual(newContact.email)
    expect(res.body.data.phone).toEqual(newContact.phone)
  })
  test('should return all contacts', async() => {
    const res = await request(app).get('/api/contacts/').set('Authorization', `Bearer ${token}`)
    id = res.body[0]._id
    expect(res.error).toBe(false)
    expect(res.statusCode).toEqual(200)
  })
  test('should return contact by ID', async() => {
    const res = await request(app).get(`/api/contacts/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body._id).toEqual(id)
    expect(res.body.name).toEqual('test')
    expect(res.body.email).toEqual('test@gmail.com')
    expect(res.body.phone).toEqual('0123456789')
    expect(res.body.favorite).toEqual(false)
    expect(res.body.owner).toBeTruthy()
  })
  test('should return an updated contact favorite field', async() => {
    const newFavorite = {
      favorite: true
    }
    const res = await request(app).patch(`/api/contacts/favorite/${id}`).send(newFavorite).set('Authorization', `Bearer ${token}`)
    expect(res.error).toBe(false)
    expect(res.statusCode).toEqual(200)
    expect(res.body.data.favorite).toEqual(true)
  })
  test('should return an updated contact', async() => {
    const updateContact = {
      email: "updated@gmail.com",
      name: "updated",
      phone: "9876543210"
    }
    const res = await request(app).put(`/api/contacts/${id}`).send(updateContact).set('Authorization', `Bearer ${token}`)
    expect(res.error).toBe(false)
    expect(res.statusCode).toEqual(200)
    expect(res.body.data.name).toEqual(updateContact.name)
    expect(res.body.data.email).toEqual(updateContact.email)
    expect(res.body.data.phone).toEqual(updateContact.phone)
  })
  test('should return an deleted contact', async() => {
    const res = await request(app).delete(`/api/contacts/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.error).toBe(false)
    expect(res.statusCode).toEqual(200)
  })
})