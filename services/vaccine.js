const VaccineModel = require('../models/vaccine')

class VaccineService {

  static QUERY_LIMIT_SIZE = 10;

  static async findActive() {
    return VaccineModel.find({status: 'active'})
  }

  static async findById(id) {
    return VaccineModel.findById(id)
  }

  // static async findByDate(dateStr) {
  //   return VaccineModel.find({election_date: dateStr})
  // }

  static async searchBy(search, { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    return VaccineModel.find({ $or: [{name: pattern}] })
      .skip(offset).limit(limit)
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    limit = Number.parseInt(limit)
    offset = Number.parseInt(offset)
    return VaccineModel.find().skip(offset).limit(limit)
  }

  static async countMatchingDocuments(search) {
    let docs
    if (search) {
      let pattern = new RegExp(search, 'ig')
      docs = await VaccineModel.count({ $or: [ {name: pattern}] })
    } else {
      docs = await VaccineModel.count()
    }
    return docs
  }

  static async create(dao) {
    return VaccineModel.create(dao)
  }

  static async removeOne(id) {
    return VaccineModel.findByIdAndRemove(id)
  }

}

module.exports = VaccineService