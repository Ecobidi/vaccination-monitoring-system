const PatientModel = require('../models/patient')

class PatientService {

  static QUERY_LIMIT_SIZE = 10;

  static async findByPatientId(unique_patient_id) {
    return PatientModel.findOne({unique_patient_id})
  }

  static async findById(id) {
    return PatientModel.findById(id)
  }

  static async searchBy(search, { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    return PatientModel.find({ $or: [{fullname: pattern}] })
      .skip(offset).limit(limit)
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    limit = Number.parseInt(limit)
    offset = Number.parseInt(offset)
    return PatientModel.find().skip(offset).limit(limit)
  } 

  static async countMatchingDocuments(search) {
    let docs
    if (search) {
      let pattern = new RegExp(search, 'ig')
      docs = await PatientModel.count({ $or: [ {fullname: pattern}] })
    } else {
      docs = await PatientModel.count()
    }
    return docs
  }

  static async create(dao) {
    return PatientModel.create(dao)
  }

  static async updateOne(update) {
    return PatientModel.findByIdAndUpdate(update._id, {$set: update})
  }

  static async removeOne(id) {
    return PatientModel.findByIdAndRemove(id)
  }

}

module.exports = PatientService