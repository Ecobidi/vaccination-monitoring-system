const mongoose = require('mongoose')
const DBCounterModel = require('./db_counter')

let PatientSchema = new mongoose.Schema({
  patient_id: {
    type: Number,
    unique: true,
  },
  surname: {
    type: String,
    required: true,
  },
  other_names: {
    type: String,
    required: true,
  },
  gender: String,
  fullname: String,
  phone: {
    type: String,
  },
  address: {
    type: String,
  },

})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

PatientSchema.pre("save", async function(next){
  if (this.patient_id == undefined) {
    this.patient_id = await getNextSequenceValue("patients_id")
  }
  next()
})

module.exports = mongoose.model('patient', PatientSchema)
