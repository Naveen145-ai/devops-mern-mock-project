const request = require('supertest');
// Ensure test environment
process.env.NODE_ENV = 'test';

// Mock the Task model to avoid hitting a real database
jest.mock('../models/Task', () => ({
    find: jest.fn().mockResolvedValue([]),
}));

const { app } = require('../index');

describe('GET api/tasks',()=>{
    it('it should return 200 ok',async()=>{
        const res = await request(app).get('/api/tasks');
        // Route returns an array of tasks
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.statusCode).toBe(200);
        console.log(res.body, 'DATA SEEDED');

    })
})

// No teardown necessary since we do not start a server or DB in tests
