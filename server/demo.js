// const axios = require('axios');
import axios from "axios";

require('dotenv').config()
const mongoose = require('mongoose')
require('./customFunctions/demoModel')
const User = mongoose.model('chats')
const shortid = require('shortid')
import Toastify from 'toastify-js'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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


  try {

    await axios.request(options).then(function (response) {
      console.log(response.data);
      data = response.data;
      Toastify({
        text: "Data saved successfully. Redirecting to calender page..",
        duration: 3000
      }).showToast();
      // window.location.href = "/calender";

    }).catch(function (error) {
      console.error(error);
    });

    // await timeout(10000);
    
    return {
      statusCode: 301,
      headers: {
        Location: '/calendar.html'
      }
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: err,
    }
  }

  return {
    statusCode: 400,
    body: '',
  }

}
