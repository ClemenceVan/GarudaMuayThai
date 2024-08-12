/* Modules */
import mongoose, { Schema, Document } from 'mongoose';
import { nanoid } from 'nanoid';

/* Constants */

/* Model */
export interface IArticle extends Document {
    _id: string,
    title: string,
    content: string,
    image: string,
    status: 'draft' | 'published'
}

const ArticleSchema: Schema = new Schema({
    _id: { type: String, required: true, default: () => nanoid() },
    title: { type: String },
    content: { type: String },
    image: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' }
});

export default mongoose.model<IArticle>('Article', ArticleSchema);