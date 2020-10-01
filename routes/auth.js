const {Router} = require('express')
const User = require('../models/User')
const router = Router()


// /api/auth
router.post('/register', async (req, res) => {
    try{
        const {email, password} = req.body



    } catch (e) {
        res.status(500),json({ message: 'Something went wrong, try again'})
    }

})

// /api/auth
router.post('/login', async (req, res) => {

})

module.exports = router