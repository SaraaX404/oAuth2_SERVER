const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
let UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, unique: true },
    password: { type: String },
    email: { type: String, unique: true },
    verificationCode: { type: String },
    verifiedAt: { type: Date },
}, {
    timestamps: true,
});
UserSchema.methods.validatePassword = function (password) {
    const isValidate = bcrypt.compare(password, this.password)
    return isValidate
};
UserSchema.methods.setPassword = async function (password) {

   this.password = await bcrypt.hash(password, 10)
};


mongoose.model('User', UserSchema, 'users');
