const mongoose = require('mongoose');
const { Schema } = mongoose;

const Items = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        data: {
            type: Buffer
        },
        contentType: {
            type: String
        }
    }
}, { timestamps: true });

const Item = mongoose.model("item", Items);
module.exports = Item;