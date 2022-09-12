const express = require('express')
const Client = require('../models/Client')

//router
const router = express.Router()
//controllers
const clientCtrl = require('../controllers/client')


router.post('/addClient', clientCtrl.addClient)
router.get('/clientsList', clientCtrl.clientsList)

module.exports = router