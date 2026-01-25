const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const userSchema = new Schema(
    {
        username: { 
            type: String, 
            required: true, 
            trim: true 
        },
        email: { 
            type: String, 
            required: true,
            unique: true,
            lowercase: true,
            trim: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        role: { type: String, 
            enum: ['user', 'seller', 'admin'], 
            default: 'user' 
        },
        avatarUrl: { 
            type: String 
        },
        loggedInBefore:{
            type:Boolean,
            default:false
        },
    },
    { timestamps: true }
)

// Hash password before saving if modified
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (err) {
        return next(err)
    }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidate) {
    return bcrypt.compare(candidate, this.password)
}

module.exports = mongoose.model('User', userSchema)