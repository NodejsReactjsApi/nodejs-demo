import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const UserSchema = new Schema({
  username: String,
  password: String
});

export default model('User', UserSchema);