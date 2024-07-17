// globalSetup.ts
import User from '../models/user';
import Bot from '../models/bot';
import request from 'supertest';
import app from '../server';


(global as any).console = {
    ...console,
    // debug: () => {},
    info: () => {},
    warn: () => {},
    // error: () => {},
};

console.debug('[Jest]: Setting up test environment');

// beforeEach(() => {
//     console.log('beforeEach');
// });


export default async () => {

    const defaults = require('superagent-defaults');
    global.app = request(app);
    const agent = defaults(global.app);
    agent.set('authorization', process.env.API_KEY);

    // global.agent = agent;
    await User.deleteMany();
    await Bot.deleteMany();

    // Setup initial data or environment
    await agent.post('/v1/register').send({
        username: 'test',
        password: 'test',
        email: 'test@aizy.com',
    });
    const response = await agent.post('/v1/login').send({
        username: 'test',
        password: 'test',
    });
    agent.set('access-token', response.body.data.token);
    console.debug('[Jest]: Test environment setup complete');
};
