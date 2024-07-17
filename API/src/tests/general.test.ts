// import {agent} from "./setup";
import { describe, it, expect } from '@jest/globals';
let agent: any;

beforeAll(async () => {
    const defaults = require('superagent-defaults');
    agent = defaults(global.app);
    agent.set('authorization', process.env.API_KEY);
});

describe(' TESTS API AIZY', () => {
    describe('/v1/* 404 Not Found', () => {
        it('should return 404 Not Found', async () => {
            console.log('TESTS API AIZY');
            const response = await agent.get('/v1/this/route/does/not/exist');
            console.log('response', response);
            expect(response.status).toBe(404);
        })
    })
})

// afterAll(async () => {
//     console.log('Closing server');
//     await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
// });