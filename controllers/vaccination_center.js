const VaccinationCenterService = require('../services/vaccination_center')
const states = require('../config/states')

class VaccinationCenterController {

  static async getVaccinationCentersPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || VaccinationCenterService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let vaccination_centers, totalDocuments
    if (search) {
      vaccination_centers = await VaccinationCenterService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await VaccinationCenterService.countMatchingDocuments(search)
    } else {
      vaccination_centers = await VaccinationCenterService.findAll({limit: limit_size, offset})
      totalDocuments = await VaccinationCenterService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('vaccine-centers', {vaccination_centers, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset })

  }

  static async createVaccinationCenterPage(req, res) {
    res.render('vaccine-centers-new', { states })
  }

  static async createVaccinationCenter(req, res) {
    let dao = req.body
    try {
      await VaccinationCenterService.create(dao)
      res.redirect('/vaccine-centers')
    } catch (err) {
      console.log(err)
      res.redirect('/vaccine-centers')
    }
  }

  static async removeVaccinationCenter(req, res) {
    try {
      await VaccinationCenterService.removeOne(req.params.vaccination_center_id)
      res.redirect('/vaccine-centers')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/vaccine-centers')
    }
  }

}

module.exports = VaccinationCenterController