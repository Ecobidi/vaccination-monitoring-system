const mongoose = require('mongoose')
const DBCounterModel = require('./db_counter')

let VaccineSchema = new mongoose.Schema({
  vaccine_id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  expiry_date: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'active',
  }
})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

VaccineSchema.pre("save", async function(next){
  if (this.vaccine_id == undefined) {
    this.vaccine_id = await getNextSequenceValue("vaccines_id")
  }
  next()
})

module.exports = mongoose.model('vaccine', VaccineSchema)