const VaccineModel = require('../models/vaccine')
const VaccineInventoryItemService = require('../services/vaccination_inventory_item')
const VaccineService = require('../services/vaccine')

class VaccineInventoryItemController {

  static async getVaccineInventoryItemPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || VaccineInventoryItemService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let vaccine_inventory_items, totalDocuments
    if (search) {
      vaccine_inventory_items = await VaccineInventoryItemService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await VaccineInventoryItemService.countMatchingDocuments(search)
    } else {
      vaccine_inventory_items = await VaccineInventoryItemService.findAll({limit: limit_size, offset})
      totalDocuments = await VaccineInventoryItemService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('vaccine-inventory-items', {vaccine_inventory_items, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset })
  }

  static async createVaccineInventoryItemPage(req, res) {
    let vaccines = await VaccineModel.find()
    res.render('vaccine-inventory-item-new', { vaccines })
  }

  static async createVaccineInventoryItem(req, res) {
    let dao = req.body
    let vaccine = await VaccineService.findById(dao.vaccine)
    try {
      if (vaccine) {
        dao.vaccine_name = vaccine.name
        dao.vaccine_id = vaccine.vaccine_id
        await VaccineInventoryItemService.create(dao)
        vaccine.quantity = vaccine.quantity + dao.quantity
        await vaccine.save()
        res.redirect('/vaccine-inventory-items')  
      } else {
        throw new Error('Error adding vaccine inventory item')
      }
    } catch (err) {
      console.log(err)
      res.redirect('/vaccine-inventory-items')
    }
  }

  // static async getModifyVaccineInventoryItemPage(req, res) {
  //   let vaccineId = req.params.vaccine_id
  //   try {
  //     let vaccine = await VaccineInventoryItemService.findById(vaccineId)
  //     if (!vaccine) { // invalid vaccine id
  //       throw new Error("")
  //     } else {
  //       res.render('vaccine-inventory-item-edit', { vaccine })
  //     }
  //   } catch (err) {
  //       req.flash("error_msg", "Invalid vaccine selection")
  //       res.redirect('/vaccines')
  //   }
  // }

  static async removeVaccineInventoryItem(req, res) {
    try {
      await VaccineInventoryItemService.removeOne(req.params.vaccine_inventory_item_id)
      res.redirect('/vaccine-inventory-items')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/vaccine-inventory-items')
    }
  }

}

module.exports = VaccineInventoryItemController