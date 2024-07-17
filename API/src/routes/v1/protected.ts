/* Modules */
import express, {Express} from 'express';

// Export
export const protect: Express = express();

// Controllers
import {UserController} from '../../controllers/user';

/* Constants */
import { getProfile, patchPassword, postAvatar, editProfile } from '../../constants/endpoints';

// Routes
//  User

protect.get(getProfile, UserController.profile); // OK

protect.patch(editProfile, UserController.editProfile); // OK

protect.post(postAvatar, UserController.postAvatar); // OK

protect.patch(patchPassword, UserController.changePassword); // OK