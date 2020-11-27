const mongoose = require('mongoose')

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
    },
    imgURL: {
        type: String,
        default: 'https://cdn2.iconfinder.com/data/icons/outline-fruits/284/Fruit_Outline_Icon_01-512.png'
    },
})

module.exports = mongoose.model('fruit', fruitSchema)
