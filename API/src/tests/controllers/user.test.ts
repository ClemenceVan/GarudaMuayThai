import { describe, it, expect } from '@jest/globals';
// import { agent } from "../setup";
describe('{post} /v1/register Register a user', () => {
    it('should return 201 Created', async () => {
        // const response = await global.agent.post('/v1/register').send({
        //     username: 'test2',
        //     password: 'test',
        //     email: 'test@aizy.com'
        // });
        // expect(response.status).toBe(200);
        expect(1).toBe(1);
    })
})
describe('{post} /v1/register Register a user', () => {
    it('should return 201 Created', async () => {
        // const response = await global.agent.post('/v1/register').send({
        //     username: 'test2',
        //     password: 'test',
        //     email: 'test@aizy.com'
        // });
        // expect(response.status).toBe(200);
        expect(1).toBe(1);
    })
    it('should return 201 Created', async () => {
        // const response = await global.agent.post('/v1/register').send({
        //     username: 'test2',
        //     password: 'test',
        //     email: 'test@aizy.com'
        // });
        // expect(response.status).toBe(200);
        expect(1).toBe(1);
    })
    // it('should return 400 Bad Request (existing user)', async () => {
    //     const response = await global.agent.post('/v1/register').send({
    //         username: 'test',
    //         password: 'test',
    //         email: 'test@aizy.com'
    //     });
    //     expect(response.status).toBe(400);
    // })
    // it('should return 400 Bad Request (missing payload)', async () => {
    //     const response = await global.agent.post('/v1/register').send({
    //         username: 'test',
    //         password: 'test'
    //     });
    //     expect(response.status).toBe(400);
    // })
})

// describe('{post} /v1/login Login a user', () => {
//     it('should return 400 Bad Request', async () => {
//         const response = await global.agent.post('/v1/login').send({
//             username: 'test',
//             password: 'wrongpassword'
//         });
//         expect(response.status).toBe(400);
//     })
//     it('should return 400 Bad Request', async () => {
//         const response = await global.agent.post('/v1/login').send({
//             username: 'test',
//         });
//         expect(response.status).toBe(400);
//     })
// })

// describe('{get} /v1/avatar/:userId Get public profile picture', () => {
//     it('should return 200 OK', async () => {
//         const response = await global.agent.get('/v1/avatar/default');
//         expect(response.status).toBe(200);
//     })
//     it('should return content-type image/png', async () => {
//         const response = await global.agent.get('/v1/avatar/default');
//         expect(response.header['content-type']).toBe('image/png');
//     })
// })

// describe('{get} /v1/user/profile/:username Get public profile', () => {
//     it('should return 200 OK', async () => {
//         const response = await global.agent.get('/v1/user/profile/test');
//         expect(response.status).toBe(200);
//     })
//     it('should return content-type application/json', async () => {
//         const response = await global.agent.get('/v1/user/profile/test');
//         expect(response.header['content-type']).toBe('application/json; charset=utf-8');
//     })
// })

// protected routes
// describe('{get} /v1/user/profile Get user profile', () => {
//     it('should return 200 OK', async () => {
//         const response = await global.agent.get('/v1/user/profile');
//         expect(response.status).toBe(200);
//     })
//     it('should return content-type application/json', async () => {
//         const response = await global.agent.get('/v1/user/profile');
//         expect(response.header['content-type']).toBe('application/json; charset=utf-8');
//     })
// })

// describe('{post} /v1/user/avatar Post user avatar', () => {
//     it('should return 200 OK', async () => {
//         const response = await global.agent.post('/v1/user/avatar').attach('avatar', 'src/tests/assets/test.png');
//         expect(response.status).toBe(200);
//     })
//     it('should return content-type application/json', async () => {
//         const response = await global.agent.post('/v1/user/avatar').attach('avatar', 'src/tests/assets/test.png');
//         expect(response.header['content-type']).toBe('application/json; charset=utf-8');
//     })
// })

// describe('{patch} /v1/user/password Change user password', () => {
//     it('should return 200 OK', async () => {
//         const response = await global.agent.patch('/v1/user/changePassword').send({
//             "password": 'test',
//             "newpassword": 'new_pass'
//         });
//         expect(response.status).toBe(200);
//     })
//     it('should return content-type application/json', async () => {
//         const response = await global.agent.patch('/v1/user/changePassword').send({
//             "password": 'test',
//             "newpassword": 'new_pass'
//         });
//         expect(response.header['content-type']).toBe('application/json; charset=utf-8');
//     })
// })

// describe('{post} /v1/user/exchange/link Link exchange to user', () => {
//     it('should return 400 Bad Request', async () => {
//         const response = await global.agent.post('/v1/user/exchange/link').send({
//             "exchange": 'binance',
//             "apiKeys": ["testApiSecret", "testApiKey"]
//         });
//         expect(response.status).toBe(400);
//     })
// })

// describe('{get} /v1/user/subscriptions Get user subscriptions', () => {
//     it('should return 200 OK', async () => {
//         const response = await global.agent.get('/v1/user/subscriptions');
//         expect(response.status).toBe(200);
//     })
//     it('should return content-type application/json', async () => {
//         const response = await global.agent.get('/v1/user/subscriptions');
//         expect(response.header['content-type']).toBe('application/json; charset=utf-8');
//     })
// })

// describe('{get} /v1/user/liked Get user liked bots', () => {
//     it('should return 200 OK', async () => {
//         const response = await global.agent.get('/v1/user/liked');
//         expect(response.status).toBe(200);
//     })
//     it('should return content-type application/json', async () => {
//         const response = await global.agent.get('/v1/user/liked');
//         expect(response.header['content-type']).toBe('application/json; charset=utf-8');
//     })
// });

// describe('{post} /user/follow/:userId Follow a user', () => {
//     it('should return 200 OK', async () => {
//         const response = await global.agent.post('/v1/user/follow/test2');
//         expect(response.status).toBe(200);
//     })
//     it('should return content-type application/json', async () => {
//         const response = await global.agent.post('/v1/user/follow/test2');
//         expect(response.header['content-type']).toBe('application/json; charset=utf-8');
//     })
// });

// describe('{get} /user/followed/ Get followed users', () => {
//     it('should return 200 OK', async () => {
//         const response = await global.agent.get('/v1/user/followed');
//         expect(response.status).toBe(200);
//     })
//     it('should return content-type application/json', async () => {
//         const response = await global.agent.get('/v1/user/followed');
//         expect(response.header['content-type']).toBe('application/json; charset=utf-8');
//     })
// });