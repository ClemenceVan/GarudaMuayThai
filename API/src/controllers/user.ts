/* Modules */
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import mongoose from 'mongoose';
import Doc from '../utils/documentation';

/* Utils */
import Parser from '../utils/parser';
import TryCatch from '../utils/tryCatch';

/* Models */
import User from '../models/user';

/* Constants */
import { login, register, password_change, user, uploadAvatar } from '../constants/routes';
import { success, error } from '../constants/I18n';
import { ObjectId } from "mongodb";

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
        files: 1, // 1 file
        // parts: 2, // 2 parts (non-file fields + file)
    },
});

import { Readable } from 'stream';

// Define the router decorator factory
function router(method: string, path: string) {
    // Return the actual decorator
    return function(target: any, propertyKey: string) {
        if (process.env.NODE_ENV === 'test') {
            Doc.addRoute(`${target.name}.${propertyKey}`, method, path);
        }
        // console.log(`Route registered: ${method} ${path} for ${target.name}.${propertyKey}`);
    };
}

function description(title: string, description: string) {
    // console.log(`Description registered: ${title} - ${description}`);
    return function(target: any, propertyKey: string) {
        if (process.env.NODE_ENV === 'test') {
            Doc.addDescription(`${target.name}.${propertyKey}`, title, description);
        }
    };
}

// Exports
// public routes
export class authentication {
    @description("Login", "Login a user")
    @router("POST", "/login")
    static login = TryCatch(async (req: Request, res: Response) => {
        const parser = Parser.body({
            email: {
                required: true,
                type: 'string'
            },
            password: {
                required: true,
                type: 'string'
            },
        }, req);
        const { email, password } = parser.parsed().body;
        const user = await User.findOne({ email });
        if (!user) return res.ret(400, error[400].failed, { field: login, reason: "Aucun utilisateur trouvé avec cet email" });
        if (!await user.isValidPassword(password)) return res.ret(400, error[400].failed, { field: login });

        return res.ret(200, {
            id: user.id,
            'token': user.signJWT()
        });
    })
    @description("Register", "Register a user")
    @router("POST", "/register")
    static register = TryCatch(async (req: Request, res: Response) => {
        const parser = Parser.body({
            name: {
                required: true,
                type: 'string'
            },
            surname: {
                required: true,
                type: 'string'
            },
            email: {
                required: true,
                type: 'string'
            },
            password: {
                required: true,
                type: 'string'
            },
        }, req);
        const { name, surname, email, password } = parser.parsed().body;

        if (await User.findOne({ email }))
            return res.ret(400, error[400].failed, { field: register, reason: "L'adresse email est déjà utilisée, connectez-vous ou contactez le support" });
        if (await User.findOne({ name, surname }))
            return res.ret(400, error[400].failed, { field: register, reason: "Un compte avec ce nom et prénom a déjà été créé, connectez-vous ou contactez le support" });

        const user = await new User({
            name,
            surname,
            password,
            email
        }).save();

        res.status(200).send({
            message: req.t(success[200].success, { field: register }),
            id: user.id,
            token: user.signJWT()
        });
    })
}

// protected routes
export class UserController {
    @description("Get Profile", "Get the profile of a user")
    @router("GET", "/profile")
    static profile = TryCatch(async (req: Request, res: Response) => {
        const usr = await User.findById(req.session.id);
        if (!usr) return res.ret(404, error[404].fieldNotFound, { field: user });
        return res.ret(200, {
            id: usr.id,
            name: usr.name,
            surname: usr.surname,
            email: usr.email,
            avatar: usr.avatar ? '/v1/avatar/' + usr.id : '/v1/avatar/default'
        });
    })
    static editProfile = TryCatch(async (req: Request, res: Response) => {
        const parser = Parser.body({
            name: {
                type: 'string',
                required: false
            },
            surname: {
                type: 'string',
                required: false
            },
            email: {
                type: 'string',
                required: false
            }
        }, req);
        const { name, surname, email } = parser.parsed().body;
        let usr = await User.findById(req.session.id);
        if (!usr) return res.ret(404, error[404].fieldNotFound, { field: user });
        usr.name = name || usr.name;
        usr.surname = surname || usr.surname;
        usr.email = email || usr.email;
        await usr.save();
        res.ret(200, success[200].updated, { field: user });
    })
    static changePassword = TryCatch(async (req: Request, res: Response) => {
        const parser = Parser.body({
            password: {
                type: 'string',
                required: true
            },
            newpassword: {
                type: 'string',
                required: true
            },
        }, req);
        const { password, newpassword } = parser.parsed().body;
        const usr = await User.findById(req.session.id);
        if (!usr) return res.ret(404, error[404].fieldNotFound, { field: user });
        if (!await bcrypt.compare(password, usr.password)) return res.ret(400, error[400].failed, { field: password_change });
        usr.password = newpassword;
        await usr.save();
        res.ret(200, success[200].success, { field: password_change });
    })
    static postAvatar = TryCatch(async (req: Request, res: Response) => {
        const usr = await User.findById(req.session.id);
        if (!usr) return res.ret(404, error[404].fieldNotFound, { field: user });
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'avatars'
        });
        if (usr.avatar) {
            await bucket.delete(new ObjectId(usr.avatar)).catch((e) => {
                console.error(e);
                return res.ret(400, error[400].failed, { field: uploadAvatar });
            });
            await User.findByIdAndUpdate(req.session.id, { avatar: undefined });
        }
        upload.single('avatar')(req, res, async (err: any) => {
            if (err) {
                console.log('upload error', err);
                return res.ret(400, error[400].failed, { field: uploadAvatar });
            } else if (!req.file) {
                console.log('file error', req);
                return res.ret(400, error[400].failed, { field: uploadAvatar });
            }
            const readablePhotoStream = new Readable();
            readablePhotoStream.push(req.file.buffer);
            readablePhotoStream.push(null);

            let uploadStream = bucket.openUploadStream(usr.id);
            let id = uploadStream.id;
            readablePhotoStream.pipe(uploadStream);

            uploadStream.on('error', (e) => {
                console.log('uploadStream error', e);
                return res.ret(400, error[400].failed, { field: uploadAvatar });
            });

            uploadStream.on('finish', async () => {
                await User.findByIdAndUpdate(req.session.id, { avatar: id });
                return res.ret(200, success[200].success, { field: uploadAvatar });
            });
        });
    })
    static getAvatar = TryCatch(async (req: Request, res: Response) => {
        const parser = Parser.params({
            uuid: {
                type: 'string',
                required: true
            }
        }, req);
        const { uuid } = parser.parsed().params;
        if (uuid === 'default') return res.sendFile(process.cwd() + '/src/assets/default.png');
        const usr = await User.findById(uuid) || await User.findOne({ username: uuid });
        if (!usr) return res.ret(404, error[404].fieldNotFound, { field: user });
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'avatars'
        });
        if (!usr.avatar) return res.sendFile(process.cwd() + '/src/assets/default.png');
        const downloadStream = bucket.openDownloadStream(new ObjectId(usr.avatar));
        downloadStream.once('data', () => {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        });
        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });
        downloadStream.on('end', () => {
            res.end();
        });
    })
}