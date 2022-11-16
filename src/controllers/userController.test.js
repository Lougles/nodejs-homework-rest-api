const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const {addContactService} = require('../services/contactService')
require('dotenv').config()

describe('insert user', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('db-contacts');
  })

  beforeEach(async () => {
    await db.collection('contacts').deleteMany({});
  })

  it('should insert a doc into collection', async () => {
    const users = db.collection('contacts');

    const mockUser = {_id: 'first', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'first'});
    expect(insertedUser).toEqual(mockUser);
  })

  // it('should insert a doc into a collection by addContactService', async () => {
  //   const users = db.collection('contacts');
  //   const mockUser = {_id: '313263686172313263686172', name: 'Vova', email: 'Vova@gmail.com', phone: '1234567890', };
  //   const userId = mongoose.SchemaTypes.ObjectId('6363d67e157fb1a9f5ca50fc')
  //   await addContactService(mockUser, userId)
  //   const result = await users.findOne({_id: '313263686172313263686172'})
  //   console.log(result)
  //   expect(result).toEqual(mockUser)
  // }, 30000)
  afterAll(async () => {
    await connection.close();
  })
})