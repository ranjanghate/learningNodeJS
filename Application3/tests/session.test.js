const request = require('supertest');
const app = require('../src/app');
const User = require('../src/model/user');
const { userId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase)

test('Should Login a User', async () => {
  const response = await request(app).post('/user/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200);

  // token should be matched

  const user = await User.findById(userOne._id);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not Login a non existing user', async () => {
  await request(app).post('/user/login').send({
    email: 'fake@email.com',
    password: userOne.password
  }).expect(400)
});

test('Should get user profile', async () => {
  await request(app).get('/user/me')
                    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                    .send()
                    .expect(200)
});

test('Should not get user profile with wrong authentication', async () => {
  await request(app).get('/user/me')
                    .set('Authorization', `Bearer ABCD`)
                    .send()
                    .expect(401)
});

test('Should delete user profile', async () => {
  await request(app).delete('/user/me')
                    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                    .send()
                    .expect(200)
});

test('Should not delete user profile with wrong authentication', async () => {
  await request(app).delete('/user/me')
                    .set('Authorization', `Bearer ABCD`)
                    .send()
                    .expect(401);

  const user = await User.findById(userId);
  expect(user).toBeNull
});

// test('Should upload a profile pic', async () => {
//   await request(app).post('/user/me/avatar')
//                     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//                     .attach('avatar', 'Application3/tests/fixtures/temp.jpg')
//                     .expect(200)

//   const user = await User.findById(userId);

//   // expect({}).toBe({}) we can compare two object using toBe as both object are not store at same address thats
//   // why they are considered different toBe (===) instead we can use toEqual(==)

//   expect(user.avatar).toExpect(expect.any(Buffer));
// });


test('Should update valid fields', async () => {
  await request(app).patch('/user/me')
                    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                    .send({
                      name: 'update_name'
                    })
                    .expect(200);
  const user = await User.findById(userId);
  expect(user.name).toBe('update_name');
});

test('Should update valid fields', async () => {
  await request(app).patch('/user/me')
                    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                    .send({
                      location: 'update_name'
                    })
                    .expect(400);
});
