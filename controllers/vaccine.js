const VaccineService = require('../services/vaccine')

class VaccineController {

  static async getVaccinesPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || VaccineService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let vaccines, totalDocuments
    if (search) {
      vaccines = await VaccineService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await VaccineService.countMatchingDocuments(search)
    } else {
      vaccines = await VaccineService.findAll({limit: limit_size, offset})
      totalDocuments = await VaccineService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('vaccines', {vaccines, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset })
  }

  static async createVaccinePage(req, res) {
    res.render('vaccines-new', { error_msg: req.flash('error_msg') })
  }

  static async createVaccine(req, res) {
    let dao = req.body
    try {
      await VaccineService.create(dao)
      res.redirect('/vaccines')
    } catch (err) {
      console.log(err)
      res.redirect('/vaccines')
    }
  }

  static async getModifyVaccinePage(req, res) {
    let vaccineId = req.params.vaccine_id
    try {
      let vaccine = await VaccineService.findById(vaccineId)
      if (!vaccine) { // invalid vaccine id
        throw new Error("")
      } else {
        res.render('vaccines-edit', { vaccine })
      }
    } catch (err) {
        req.flash("error_msg", "Invalid vaccine selection")
        res.redirect('/vaccines')
    }
  }

  static async removeVaccine(req, res) {
    try {
      await VaccineService.removeOne(req.params.vaccine_id)
      res.redirect('/vaccines')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/vaccines')
    }
  }

}

module.exports = VaccineController