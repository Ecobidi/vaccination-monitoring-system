const mongoose = require('mongoose')
const DBCounterModel = require('./db_counter')

let UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  other_names: {
    type: String,
  },
  surname: {
    type: String
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'staff']
  },
  photo: {
    type: String,
  }
})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

UserSchema.pre("save", async function(next){
  if (this.user_id == undefined) {
    this.user_id = await getNextSequenceValue("user_id")
  }
  next()
})

module.exports = mongoose.model('user', UserSchema)