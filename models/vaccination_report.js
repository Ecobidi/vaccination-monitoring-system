const mongoose = require('mongoose')
const DBCounterModel = require('./db_counter')

let VaccinationReportSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  vaccine_name: {
    type: String,
    required: true,
  },
  patient_id: {
    type: Number,
  },
  vaccination_center: {
    type: String
  },
  batch: {
    type: String,
  },
  dosage: {
    type: String,
  },
  date_administered: {
    type: String,
  },
})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

VaccinationReportSchema.pre("save", async function(next){
  // console.log("serial_number ", this.serial_number)
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue('vaccination_reports_id')
  }
  next()
})

module.exports = mongoose.model('vaccination_report', VaccinationReportSchema)
