// const {MongoClient} = require('mongodb');
// const mongoose = require('mongoose');
// const {addContactService} = require('../services/contactService')
// require('dotenv').config()

// describe('insert user', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(process.env.URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = await connection.db('db-contacts');
//   })

//   beforeEach(async () => {
//     await db.collection('contacts').deleteMany({});
//   })

//   it('should insert a doc into collection', async () => {
//     const users = db.collection('contacts');

//     const mockUser = {_id: 'first', name: 'John'};
//     await users.insertOne(mockUser);

//     const insertedUser = await users.findOne({_id: 'first'});
//     expect(insertedUser).toEqual(mockUser);
//   })
//   afterAll(async () => {
//     await connection.close();
//   })
// })