const VaccinationInventoryModel = require('../models/vaccine_inventory_item')

class VaccinationInventoryItemService {

  static QUERY_LIMIT_SIZE = 10;

  static async findById(id) {
    return VaccinationInventoryModel.findById(id)
  }

  static async searchBy(search, { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    return VaccinationInventoryModel.find({ $or: [{vaccine_name: pattern}] }).skip(offset).limit(limit)
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    limit = Number.parseInt(limit)
    offset = Number.parseInt(offset)
    return VaccinationInventoryModel.find().skip(offset).limit(limit)
  }

  static async countMatchingDocuments(search) {
    let docs
    if (search) {
      let pattern = new RegExp(search, 'ig')
      docs = await VaccinationInventoryModel.count({ $or: [ {vaccine_name: pattern}] })
    } else {
      docs = await VaccinationInventoryModel.count()
    }
    return docs
  }

  static async create(dao) {
    return VaccinationInventoryModel.create(dao)
  }

  static async updateOne(update) {
    return VaccinationInventoryModel.findByIdAndUpdate(update._id, {$set: update})
  }

  static async removeOne(id) {
    return VaccinationInventoryModel.findByIdAndRemove(id)
  }

}

module.exports = VaccinationInventoryItemService