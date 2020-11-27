const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.renderCategoryList)
router.get('/password/create', categoryController.categoryPassword)
router.get('/create', categoryController.renderCategoryCreate)
router.get('/:id', categoryController.renderCategorySpec)
router.get('/password/:id', categoryController.categoryPasswordDelete)

router.post('/create', categoryController.categoryCreate)

router.get('/delete/:id', categoryController.deleteCategory)

module.exports = router