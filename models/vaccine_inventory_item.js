const mongoose = require('mongoose')
const DBCounterModel = require('./db_counter')

let VaccineInventoryItem = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  vaccine: {
    type: mongoose.Schema.Types.ObjectId
  },
  vaccine_id: Number,
  vaccine_name: {
    type: String,
  }, 
  quantity: {
    type: Number,
    required: true,
  },
  date_added: {
    type: String,
    default: Date.now,
  },
  remark: {
    type: String,
  }
})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

VaccineInventoryItem.pre("save", async function(next){
  // console.log("serial_number ", this.serial_number)
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue('vaccine_inventory_items_id')
  }
  next()
})

module.exports = mongoose.model('vaccine_inventory_item', VaccineInventoryItem)