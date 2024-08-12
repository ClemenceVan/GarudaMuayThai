/* Modules */
import mongoose, { Schema, Document } from 'mongoose';
import { nanoid } from 'nanoid';

/* Constants */

/* Model */
export interface IItem extends Document {
    name: string,
    description: string,
    price: number,
    image: string
}

const ItemSchema: Schema = new Schema({
    _id: { type: String, required: true, default: () => nanoid() },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }
});

export default mongoose.model<IItem>('Item', ItemSchema);