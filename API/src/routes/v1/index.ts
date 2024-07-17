/* Modules */
import express, { Express } from 'express';

// Export
export const index: Express = express();

// Controllers
import { authentication, UserController } from '../../controllers/user';


/* Constants */
import { login, register, getAvatar,  getPublicProfile, } from '../../constants/endpoints';

// Routes
//  User

index.post(login, authentication.login);

index.post(register, authentication.register);

index.get(getAvatar, UserController.getAvatar);

/* to be moved */
import Employees from '../../controllers/employees';

index.get('/doc', Employees.doc);