const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importa bcrypt para cifrar contraseñas
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] },
  phone: { type: String, required: true },
  password: { type: String, required: true }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);
