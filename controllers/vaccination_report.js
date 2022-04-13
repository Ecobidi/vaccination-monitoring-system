const VaccineModel = require('../models/vaccine')
const VaccinationCenterModel = require('../models/vaccination_center')
const VaccinationReportService = require('../services/vaccination_report')

class VaccinationReportController {

  static async getVaccinationReportsPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || VaccinationReportService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let vaccination_reports, totalDocuments
    if (search) {
      vaccination_reports = await VaccinationReportService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await VaccinationReportService.countMatchingDocuments(search)
    } else {
      vaccination_reports = await VaccinationReportService.findAll({limit: limit_size, offset})
      totalDocuments = await VaccinationReportService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('vaccine-reports', {vaccination_reports, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset })

  }

  static async createVaccinationReportPage(req, res) {
    let vaccines = await VaccineModel.find()
    let vaccine_centers = await VaccinationCenterModel.find()
    res.render('vaccine-reports-new', { vaccines, vaccine_centers })
  }

  static async createVaccinationReport(req, res) {
    let dao = req.body
    try {
      await VaccinationReportService.create(dao)
      res.redirect('/vaccine-reports')
    } catch (err) {
      console.log(err)
      res.redirect('/vaccine-reports')
    }
  }

  static async removeVaccinationReport(req, res) {
    try {
      await VaccinationReportService.removeOne(req.params.vaccination_report_id)
      res.redirect('/vaccine-reports')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/vaccine-reports')
    }
  }

}

module.exports = VaccinationReportController