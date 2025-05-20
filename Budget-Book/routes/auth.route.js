/**
 * for register
* POST localhost:8080/chatapp/api/v1/auth/register
* 
* This need to intercept the request
*/
const express = require('express')
const authController = require('../controllers/auth.controller')
const router = express.Router();

// module.exports = (app)=>{
//     app.post('/expensetracker/api/v1/auth/register', authController.register)
//     app.post('/expensetracker/api/v1/auth/login', authController.login)
//     // app.post('/chatapp/api/v1/auth/forgotpassword', authController.forgot_password)
// }

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router;