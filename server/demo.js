import axios from "axios";
//const axios = require('axios');
require('dotenv').config()
const mongoose = require('mongoose')
require('./customFunctions/demoModel')
const User = mongoose.model('chats')
const shortid = require('shortid')

exports.handler = async (event, context) => {
  console.log(event);
  const array = event.body.split('&')
  // const firstName = array[0].split('fname=')
  // const lastName = array[1].split('lname=')
  
  const name = array[0].split('name=')
  const email = array[1].split('email=')
  const phone = array[2].split('pnumber=')
  const companyName = array[3].split('cname=')
  // const companySize = array[3].split('field=')

  // const a = decodeURIComponent(firstName[1])
  // const b = decodeURIComponent(lastName[1])
  const a = decodeURIComponent(name[1])
  const b = decodeURIComponent(email[1])
  const c = decodeURIComponent(phone[1])
  const d = decodeURIComponent(companyName[1])
  // const d = decodeURIComponent(companySize[1])

  // send to gohighlevel 

  const options = {
    method: 'POST',
    url: 'https://stoplight.io/mocks/highlevel/integrations/39582863/contacts/',
    headers: { 'Content-Type': 'application/json', Authorization: process.env.GOHIGHLEVEL_ACCESS_KEY, Version: '2021-04-15' },
    data: {
      name: name[1],
      locationId: '',
      phone: phone[1],
      email: email[1],
      customFields: [{ id: 'companySize', field_value: '' }],
      companyName: companyName[1]
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);  
  }).catch(function (error) {
    console.error(error);
  });

  // send to gohighlevel
  

  try {
    mongoose.connect(process.env.MONGODB_URI_DEPLOYC, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    const shortIdVariable = shortid.generate()

    const user = await new User({
      referralId: shortIdVariable,
      // first_name: a,
      // last_name: b,
      name: a,
      email: b,
      phone_number: c,
      company_name: d,
      // company_size: d,
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
