const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventoryContoller')

router.get('/', inventoryController.renderInventoryList)
router.get('/edit/:id', inventoryController.renderInventoryEdit)
router.get('/password/edit/:id', inventoryController.inventoryPassword)
router.get('/password/delete/:id', inventoryController.inventoryPasswordDelete)
router.get('/password/create', inventoryController.inventoryPassword)
router.get('/create', inventoryController.renderInventoryCreate)
router.get('/:id', inventoryController.renderInventorySpecific)

router.post('/create', inventoryController.inventoryCreate)

router.put('/edit/:id', inventoryController.editInventory)

router.get('/delete/:id', inventoryController.deleteInventoryItem)

module.exports = router