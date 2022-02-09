const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/model/task');
const { userId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create a task for user', async () => {
  const response = await request(app).post('/task')
                    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                    .send({
                      description: 'Test Task'
                    })
                    .expect(201);
  
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.description).toBe('Test Task');
});

test('Should fetch user tasks', async () => {
  const response = await request(app).get('/tasks')
                          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                          .send()
                          .expect(201)

  expect(response.body.length).toBe(2);
});
