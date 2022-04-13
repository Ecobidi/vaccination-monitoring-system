const router = require('express').Router()
const PatientController = require('../controllers/patient')

router.get('/', PatientController.getPatientsPage)

router.get('/new', PatientController.createPatientPage)

router.post('/new', PatientController.createPatient)

router.get('/remove/:patient_id', PatientController.removePatient)

module.exports = router