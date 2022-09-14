const express = require('express')
const Client = require('../models/Client')

const auth = require('../middleware/auth');
//router
const router = express.Router()
//controllers
const clientCtrl = require('../controllers/client')


router.post('/addClient', auth,  clientCtrl.addClient)
router.get('/clientsList', auth,  clientCtrl.clientsList)

module.exports = router