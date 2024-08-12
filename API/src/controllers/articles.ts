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
import Article from '../models/article';

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
    static createArticle = TryCatch(async (req: Request, res: Response) => {
        const article = new Article();
        await article.save();
        return res.ret(200, { id: article.id });
    });
    static updateArticle = TryCatch(async (req: Request, res: Response) => {
        const parser = Parser.body({
            title: {
                type: "string",
                required: true
            },
            content: {
                type: "string",
                required: true
            }
        }, req);
        const { title, content } = parser.parsed().body;
        await Article.findByIdAndUpdate(req.params.id, { title, content });
        return res.ret(200, success[200].updated, { field: "article" });
    });
    static postImage = TryCatch(async (req: Request, res: Response) => {
        const article = await Article.findById(req.params.id);
        if (!article) return res.ret(404, error[404].fieldNotFound, { field: "article" });
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'images'
        });
        if (article.image) {
            await bucket.delete(new ObjectId(article.image)).catch((e) => {
                console.error(e);
                return res.ret(400, error[400].failed, { field: "image", reason: "delete failed" });
            });
            await Article.findByIdAndUpdate(req.params.id, { image: undefined });
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

            let uploadStream = bucket.openUploadStream(article.id);
            let id = uploadStream.id;
            readablePhotoStream.pipe(uploadStream);

            uploadStream.on('error', (e) => {
                console.log('uploadStream error', e);
                return res.ret(400, error[400].failed, { field: "image", reason: "upload failed 2" });
            });

            uploadStream.on('finish', async () => {
                await Article.findByIdAndUpdate(req.params.id, { image: id });
                return res.ret(200, success[200].success, { field: "image" });
            });
        });
    });
    static publishArticle = TryCatch(async (req: Request, res: Response) => {
        await Article.findByIdAndUpdate(req.params.id, { status: 'published' });
        return res.ret(200, success[200].updated, { field: "article" });
    });
    static deleteArticle = TryCatch(async (req: Request, res: Response) => {
        const article = await Article.findById(req.params.id);
        if (!article) return res.ret(404, error[404].fieldNotFound, { field: "article" });
        await Article.deleteOne({ _id: article._id });
        return res.ret(200, success[200].deleted, { field: "article" });
    });
    static getArticles = TryCatch(async (req: Request, res: Response) => {
        const articles = await Article.find();
        return res.ret(200,
            articles.map((article) => {
                return {
                    id: article.id,
                    title: article.title,
                    content: article.content,
                    image: article.image ? '/v1/article/image/' + article.image : ''
                }
            })
        );
    });
}

export class articles {
    static getArticles = TryCatch(async (req: Request, res: Response) => {
        const articles = await Article.find({ status: 'published' });
        return res.ret(200,
            articles.map((article) => {
                return {
                    id: article.id,
                    title: article.title,
                    content: article.content,
                    image: article.image ? '/v1/article/image/' + article.image : ''
                }
            })
        );
    });
    static getArticle = TryCatch(async (req: Request, res: Response) => {
        const article = await Article.findById(req.params.id);
        if (!article) return res.ret(404, error[404].fieldNotFound, { field: "article" });
        return res.ret(200, article);
    });
    static getImage = TryCatch(async (req: Request, res: Response) => {
        console.log('getImage', req.params.id);
        const article = await Article.findById(req.params.id);
        if (!article) return res.ret(404, error[404].fieldNotFound, { field: "article" });
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'images'
        });
        const downloadStream = bucket.openDownloadStream(new ObjectId(article.image));
        downloadStream.pipe(res);
        downloadStream.on('error', (e) => {
            console.log('downloadStream error', e);
            return res.ret(400, error[400].failed, { field: "image", reason: "download failed" });
        });
    });
}