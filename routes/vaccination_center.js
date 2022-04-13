const router = require('express').Router()
const VaccinationCenterController = require('../controllers/vaccination_center')

router.get('/', VaccinationCenterController.getVaccinationCentersPage)

router.get('/new', VaccinationCenterController.createVaccinationCenterPage)

router.post('/new', VaccinationCenterController.createVaccinationCenter)

router.get('/remove/:vaccination_center_id', VaccinationCenterController.removeVaccinationCenter)

module.exports = router