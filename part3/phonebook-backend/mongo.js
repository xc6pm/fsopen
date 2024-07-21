const mongoose = require("mongoose")

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String
})
const Person = mongoose.model("Person", personSchema)

const genUrl = password => `mongodb://root:${password}@apo.liara.cloud:32084/my-app?authSource=admin`


const readAll = password => {
    mongoose.connect(genUrl(password)).then(() => {
        Person.find({}).then(result => {
            result.forEach(person => console.log(person))
            mongoose.connection.close()
        })
    })
}

const create = (password, name, number) => {
    mongoose.connect(genUrl(password)).then(() => {
        const person = new Person({
            name,
            number
        })

        person.save().then(result => {
            console.log("Person saved; fetching people:")
            mongoose.connection.close().then(() => {
                readAll(password)
            })
        })
    })
}

if (process.argv.length === 3) {
    const password = process.argv[2]

    readAll(password)
} else if (process.argv.length === 5) {
    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]

    create(password, name, number)
} else {
    console.log("The parameters are invalid")
}
