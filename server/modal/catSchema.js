const mongoose = require('mongoose')


const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})

const Cat = mongoose.model('CAT', catSchema);

module.exports = Cat;