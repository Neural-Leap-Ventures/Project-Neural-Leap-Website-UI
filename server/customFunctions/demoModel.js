const mongoose = require('mongoose')
const { Schema } = mongoose

const demoSchema = new Schema({
  first_name: String,
  last_name: String,
  company_name: String,
  company_size: String,
  phone_number: String,
})

mongoose.model('chats', demoSchema)
