/* Modules */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ObjectId } from "mongodb";
import multer from 'multer';
import { Readable } from 'stream';

/* Utils */
import Parser from '../utils/parser';
import TryCatch from '../utils/tryCatch';

/* Models */
import Item from '../models/item';
import User from '../models/user';

/* Constants */
import { success, error } from '../constants/I18n';

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
        files: 1, // 1 file
        // parts: 2, // 2 parts (non-file fields + file)
    },
});

/* Routes */
export class manage {
    static getItems = TryCatch(async (req: Request, res: Response) => {
        const items = await Item.find();
        res.ret(200, items);
    });
    static addItem = TryCatch(async (req: Request, res: Response) => {
        const parser = Parser.body({
            name: {
                type: "string",
                required: true
            },
            description: {
                type: "string",
                required: true
            },
            price: {
                type: "number",
                required: true
            }
        } ,req);
        const { name, description, price } = parser.parsed().body;
        const item = new Item({ name, description, price });
        await item.save();
        return res.ret(200, success[200].created, { field: "item" });
    });
    static postImage = TryCatch(async (req: Request, res: Response) => {
        const item = await Item.findById(req.params.id);
        if (!item) return res.ret(404, error[404].fieldNotFound, { field: "item" });
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'images'
        });
        if (item.image) {
            await bucket.delete(new ObjectId(item.image)).catch((e) => {
                console.error(e);
                return res.ret(400, error[400].failed, { field: "image", reason: "delete failed" });
            });
            await Item.findByIdAndUpdate(req.params.id, { image: undefined });
        }
        upload.single('image')(req, res, async (err: any) => {
            if (err) {
                console.log('upload error', err);
                return res.ret(400, error[400].failed, { field: "image", reason: err });
            } else if (!req.file) {
                console.log('file error', req);
                return res.ret(400, error[400].failed, { field: "image", reason: "file not found" });
            }
            const readablePhotoStream = new Readable();
            readablePhotoStream.push(req.file.buffer);
            readablePhotoStream.push(null);

            let uploadStream = bucket.openUploadStream(item.id);
            let id = uploadStream.id;
            readablePhotoStream.pipe(uploadStream);

            uploadStream.on('error', (e) => {
                console.log('uploadStream error', e);
                return res.ret(400, error[400].failed, { field: "image", reason: "upload failed 2" });
            });

            uploadStream.on('finish', async () => {
                await Item.findByIdAndUpdate(req.params.id, { image: id });
                return res.ret(200, success[200].success, { field: "image" });
            });
        });
    })
}

export class shop {
    static getItems = TryCatch(async (req: Request, res: Response) => {
        const items = await Item.find();
        res.ret(200, {
            items: items.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image: item.image ? '/v1/image/' + item.id : '/v1/image/default'
                }
            })
        });
    });
    static getImage = TryCatch(async (req: Request, res: Response) => {
        const parser = Parser.params({
            uuid: {
                type: 'string',
                required: true
            }
        }, req);
        const { uuid } = parser.parsed().params;
        if (uuid === 'default') return res.sendFile(process.cwd() + '/src/assets/default.png');
        const item = await Item.findById(uuid);
        if (!item) return res.ret(404, error[404].fieldNotFound, { field: "item" });
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'images'
        });
        if (!item.image) return res.sendFile(process.cwd() + '/src/assets/default.png');
        const downloadStream = bucket.openDownloadStream(new ObjectId(item.image));
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
