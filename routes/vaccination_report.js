const router = require('express').Router()
const VaccinationReportController = require('../controllers/vaccination_report')

router.get('/', VaccinationReportController.getVaccinationReportsPage)

router.get('/new', VaccinationReportController.createVaccinationReportPage)

router.post('/new', VaccinationReportController.createVaccinationReport)

router.get('/remove/:vaccination_report_id', VaccinationReportController.removeVaccinationReport)

module.exports = router