const router = require('express').Router()
const VaccineInventoryItemController = require('../controllers/vaccine_inventory_item')

router.get('/', VaccineInventoryItemController.getVaccineInventoryItemPage)

router.get('/new', VaccineInventoryItemController.createVaccineInventoryItemPage)

router.post('/new', VaccineInventoryItemController.createVaccineInventoryItem)

router.get('/remove/:vaccine_inventory_item_id', VaccineInventoryItemController.removeVaccineInventoryItem)

module.exports = router