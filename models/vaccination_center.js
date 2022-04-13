const mongoose = require('mongoose')
const DBCounterModel = require('./db_counter')

let VaccinationCenter = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  vaccines_available: [
    {
      vaccine_name: String,
      quantity: Number,
    }
  ]
})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

VaccinationCenter.pre("save", async function(next){
  // console.log("serial_number ", this.serial_number)
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue('vaccination_centers_id')
  }
  next()
})

module.exports = mongoose.model('vaccination_center', VaccinationCenter)