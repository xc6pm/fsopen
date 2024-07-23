const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("Error connecting to mongodb: ", error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^(?=.{8}$)^[\d]{2,3}-[\d]*$/.test(v)
      },
      message: "Number must be in format xx-xxxxx or xxx-xxxx!",
    },
  },
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Person", personSchema)
