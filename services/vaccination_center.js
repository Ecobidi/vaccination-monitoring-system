const VaccinationCenterModel = require('../models/vaccination_center')

class VaccinationCenterService {

  static QUERY_LIMIT_SIZE = 10;

  static async findById(id) {
    return VaccinationCenterModel.findById(id)
  }

  static async searchBy(search, { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    return VaccinationCenterModel.find({ $or: [{name: pattern}] })
      .skip(offset).limit(limit)
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    limit = Number.parseInt(limit)
    offset = Number.parseInt(offset)
    return VaccinationCenterModel.find().skip(offset).limit(limit)
  }

  static async countMatchingDocuments(search) {
    let docs
    if (search) {
      let pattern = new RegExp(search, 'ig')
      docs = await VaccinationCenterModel.count({ $or: [ {name: pattern}] })
    } else {
      docs = await VaccinationCenterModel.count()
    }
    return docs
  }

  static async create(dao) {
    return VaccinationCenterModel.create(dao)
  }

  static async updateOne(update) {
    return VaccinationCenterModel.findByIdAndUpdate(update._id, {$set: update})
  }

  static async removeOne(id) {
    return VaccinationCenterModel.findByIdAndRemove(id)
  }

}

module.exports = VaccinationCenterService