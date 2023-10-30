const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

console.log(`connecting to ${url}`)

mongoose.connect(url)
    .then(() => console.log('connected to MongoDB'))
    .catch(error => console.log(`erroc connecting to MongoDB: ${error.message}`))

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must be at atleat three characteres long'],
        required: [true, 'A name is required']
    },
    number: {
        type: String,
        validate: {
            validator: v => {
                return /[\d{2,3}-\d+]{8,}/.test(v)
            },
            message: props => `${props.value} is not a valid number`
        },
        required: [true, 'A number is required']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
