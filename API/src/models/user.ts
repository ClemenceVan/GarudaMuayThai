/* Modules */
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

/* Constants */
import {jwtSecret, oneDay, user, password} from '../constants/routes';
import {save} from '../constants/server';

// Model
export interface IUser extends Document {
    username: string,
    password: string,
    email: string,
    avatar: string,
    JwtValidity: string,
    signJWT: () => string,
    isValidPassword: (password: string) => Promise<boolean>,
    deleteProfile: () => Promise<void>,
}

const UserSchema: Schema = new Schema({
    _id: { type: String, required: true, default: () => nanoid() },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email:{ type: String, required: true },
    avatar: { type: String },
    JwtValidity: { type: String }
});

UserSchema.pre<IUser>(save, function (next) {
    if (this.isModified(password)) {
        this.password = bcrypt.hashSync(this.password, 10);
        this.JwtValidity = bcrypt.genSaltSync(5);
    }
    next();
});

UserSchema.methods = {
    signJWT: function () {
        return jwt.sign({
            id: this._id,
            JwtValidity: this.JwtValidity
        }, jwtSecret, {expiresIn: oneDay})
    },
    isValidPassword: async function (password: string) {
        return await bcrypt.compare(password, this.password);
    },
    deleteProfile: async function () {
        await this.deleteOne();
    }
};

// Export the model and return your IUser interface
export default mongoose.model<IUser>(user, UserSchema);