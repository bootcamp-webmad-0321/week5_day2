const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require('./../models/user.model')

const { checkMongoooseError } = require('./../utils')


// Signup form (get)
router.get('/registro', (req, res) => res.render('pages/auth/signup-form'))

// Signup (post)
router.post('/registro', (req, res, next) => {

    const { username, pwd } = req.body

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(pwd, salt)

    User
        .create({ username, password: hashPass })
        .then(() => res.redirect('/'))
        .catch(err => res.render('pages/auth/signup-form', { errorMessage: checkMongoooseError(err) }))
})



// Login (get)
router.get('/inicio-sesion', (req, res) => res.render('pages/auth/login-form'))

// Login (post)
router.post('/inicio-sesion', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('pages/auth/login-form', { errorMessage: 'Usuario no reconocido' })
                return
            }

            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('pages/auth/login-form', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log('error', err))
})


router.get('/cerrar-sesion', (req, res) => {
    req.session.destroy((err) => res.redirect("/inicio-sesion"));
})





module.exports = router