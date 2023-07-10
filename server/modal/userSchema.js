const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

//hashing password

userSchema.pre('save', async function (next) {
    console.log("call 1")
    if (this.isModified('password')) {
        console.log("call 2")
        this.password = bcrypt.hash(this.password, 12);
    }
    next();
});

// jwt token 

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, "HELLOMYNAMEISREACTMERNSTACKAPPANDTHISISKEY")
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (err) {
        console.log(err)
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;