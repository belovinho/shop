const {Schema, model} = require('mongoose')
// const userModel = require('./userModel')

const goodSchema = new Schema ({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  count: {
    type: Number,
  },
  price: {
    type: Number,
  },
  seller: ({
    ref: 'User',
    type: Schema.Types.ObjectId
  })
})

const goodModel = model('Good', goodSchema)
module.exports = goodModel
