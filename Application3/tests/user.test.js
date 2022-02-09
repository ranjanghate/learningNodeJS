const request = require('supertest');
const app = require('../src/app');
const User = require('../src/model/user');

beforeEach(async ()=>{
  await User.deleteMany(); // Delete all user records from test db before each test case
})

test('Should Signup a User', async () => {
  const response = await request(app).post('/user').send({
    name: 'new_user',
    email: 'newuser@yopmail.com',
    password: 'User@123',
    age: '23'
  }).expect(201);

  // Assert that the db was changed correctly
  const user = User.findById(response.body._id);
  expect(user).not.toBeNull();

  // Asset that password is encrypted

  expect(user.password).not.toBe('User@123');
});
