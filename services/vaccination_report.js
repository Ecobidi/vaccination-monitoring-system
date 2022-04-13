const VaccinationReportModel = require('../models/vaccination_report')

class VaccinationReportService {

  static QUERY_LIMIT_SIZE = 10;

  static async findById(id) {
    return VaccinationReportModel.findById(id)
  }

  static async searchBy(search, { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    return VaccinationReportModel.find({ $or: [{vaccine_name: pattern, patient_name: pattern}] }).skip(offset).limit(limit)
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    limit = Number.parseInt(limit)
    offset = Number.parseInt(offset)
    return VaccinationReportModel.find().skip(offset).limit(limit)
  }

  static async countMatchingDocuments(search) {
    let docs
    if (search) {
      let pattern = new RegExp(search, 'ig')
      docs = await VaccinationReportModel.count({ $or: [ {vaccine_name: pattern, patient_name: pattern} ] })
    } else {
      docs = await VaccinationReportModel.count()
    }
    return docs
  }

  static async create(dao) {
    return VaccinationReportModel.create(dao)
  }

  static async updateOne(update) {
    return VaccinationReportModel.findByIdAndUpdate(update._id, {$set: update})
  }

  static async removeOne(id) {
    return VaccinationReportModel.findByIdAndRemove(id)
  }

}

module.exports = VaccinationReportService