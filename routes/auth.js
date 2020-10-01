const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth
router.post('/register',
    [
        check('email', 'Email is invalid').isEmail(),
        check('password', 'Minimal pass length is 6 symbols')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid email or password'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({ email})

        if(candidate) {
            return res.status(400).json({message: 'This user has been created'})
        }
        const hashedPassword = await bcrypt.hash(password, 69)
        const user = new User({ email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'User created !'})

    } catch (e) {
        res.status(500),json({ message: 'Something went wrong, try again'})
    }

})

// /api/auth
router.post('/login',
    [
        check('email', 'Email is invalid').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()
            .isLength({ min: 6 })
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid email or password'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({ email})

        if(!user) {
            return res.status(400).json({message: 'User in not find'})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({message:'Invalid password'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id })
        

    } catch (e) {
        res.status(500),json({ message: 'Something went wrong, try again'})
    }

})

module.exports = router