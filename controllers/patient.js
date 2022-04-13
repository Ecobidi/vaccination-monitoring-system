// const path = require('path')
const PatientService = require('../services/patient')

class PatientController {

  static async getPatientsPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || PatientService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let patients, totalDocuments
    if (search) {
      patients = await PatientService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await PatientService.countMatchingDocuments(search)
    } else {
      patients = await PatientService.findAll({limit: limit_size, offset})
      totalDocuments = await PatientService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('patients', {patients, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset })
  }

  static async createPatientPage(req, res) {
    res.render('patients-new', { error_msg: req.flash('error_msg') })
  }

  static async createPatient(req, res) {
    let dao = req.body
    if (dao.password != dao.retype_password) {
      req.flash('error_msg', 'Passwords do not match')
      return res.redirect('/patients/new')
    }
    try {
      // if (req.files) {
      //   let file = req.files.photo
      //   let extname = path.extname(file.name)
      //   let filename = 'patient_' + new Date().getMilliseconds() + extname
      //   await file.mv(process.cwd() + '/uploads/images/' + filename)
      //   dao.photo = filename
      //   await PatientService.create(dao)
      // } else {
      //   await PatientService.create(dao)
      // }
      await PatientService.create(dao)
      res.redirect('/patients')
    } catch (err) {
      console.log(err)
      res.redirect('/patients')
    }
  }

  static async removePatient(req, res) {
    try {
      await PatientService.removeOne(req.params.patient_id)
      res.redirect('/patients')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/patients')
    }
  }

}

module.exports = PatientController