const mongoose = require('mongoose')



const clientSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    companyName: {type: String, required: true},
    adress: {type : String, required: true}, 
    phoneNumber : {type: String, required: true},
    nbOfHectares : {type: Number, required: true}
})

module.exports = mongoose.model('Client', clientSchema)