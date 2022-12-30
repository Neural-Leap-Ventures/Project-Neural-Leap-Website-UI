require('dotenv').config()
const mongoose = require('mongoose')
require('./customFunctions/demoModel')
const User = mongoose.model('chats')
const shortid = require('shortid')

exports.handler = async (event, context) => {
  const array = event.body.split('&')
  const firstName = array[0].split('fname=')
  const lastName = array[1].split('lname=')
  const companyName = array[2].split('cname=')
  const companySize = array[3].split('field=')
  const phone = array[4].split('pnumber=')

  const a = decodeURIComponent(firstName[1])
  const b = decodeURIComponent(lastName[1])
  const c = decodeURIComponent(companyName[1])
  const d = decodeURIComponent(companySize[1])
  const e = decodeURIComponent(phone[1])
  //console.log('array', a, b, c, d, e)
  try {
    mongoose.connect(process.env.MONGODB_URI_DEPLOYC, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    const shortIdVariable = shortid.generate()

    const user = await new User({
      referralId: shortIdVariable,
      first_name: a,
      last_name: b,
      company_name: c,
      company_size: d,
      phone_number: e,
    })

    await user.save()
    mongoose.disconnect()
    return {
      statusCode: 200,
      body: 'Success',
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: err,
    }
  }
}
