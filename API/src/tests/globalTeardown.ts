import User from '../models/user';
import Bot from '../models/bot';
// import { agent } from './setup';

module.exports = async () => {
    // check server still running
    global.agent.get('/v1/this/route/does/not/exist').expect(404)

    // Build documentation
    global.agent.get('/v1/doc').expect(200)
}