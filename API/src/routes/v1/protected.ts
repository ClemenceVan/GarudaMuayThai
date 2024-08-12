/* Modules */
import express, {Express} from 'express';

// Export
export const protect: Express = express();

// Controllers
import {UserController} from '../../controllers/user';
import { manage } from '../../controllers/shop';
import { manage as manageArticles } from '../../controllers/articles';

/* Constants */
import { getProfile, patchPassword, postAvatar, editProfile } from '../../constants/endpoints';

// Routes
//  User

protect.get(getProfile, UserController.profile);

protect.patch(editProfile, UserController.editProfile);

protect.post(postAvatar, UserController.postAvatar);

protect.patch(patchPassword, UserController.changePassword);

//  Shop

protect.post('/shop/add', manage.addItem); // not protected yet

protect.put('/shop/image/:id', manage.postImage); // not protected yet

//  Articles
protect.get('/allarticles', manageArticles.getArticles); // not protected yet

protect.post('/article', manageArticles.createArticle); // not protected yet

protect.put('/article/:id', manageArticles.updateArticle); // not protected yet

protect.put('/article/image/:id', manageArticles.postImage); // not protected yet

protect.patch('/article/publish/:id', manageArticles.publishArticle); // not protected yet

protect.delete('/article/:id', manageArticles.deleteArticle); // not protected yet