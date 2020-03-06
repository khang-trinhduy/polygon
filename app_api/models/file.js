var mongoose = require("mongoose")

var fileSchema = new mongoose.Schema({
    path: {type: String, required: true}
})

module.exports.fileSchema = fileSchema;