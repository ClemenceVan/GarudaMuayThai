/* Modules */
import express, { Express } from 'express';

// Export
export const index: Express = express();

// Controllers
import { authentication, UserController } from '../../controllers/user';
import { shop } from '../../controllers/shop';
import { articles } from '../../controllers/articles';

/* Constants */
import { login, register, getAvatar } from '../../constants/endpoints';

// Routes
//  User

index.post(login, authentication.login);

index.post(register, authentication.register);

index.get(getAvatar, UserController.getAvatar);

//  Shop
index.get('/shop/items', shop.getItems);

index.get('/shop/image/:uuid', shop.getImage);

//  Articles
index.get('/articles', articles.getArticles);

index.get('/article/:uuid', articles.getArticle);

index.get('/article/image/:id', articles.getImage);

/* to be moved */
import Employees from '../../controllers/employees';

index.get('/doc', Employees.doc);