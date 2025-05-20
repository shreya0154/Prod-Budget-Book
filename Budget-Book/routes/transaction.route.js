/**
 * for register
* POST localhost:8080/chatapp/api/v1/auth/register
* 
* This need to intercept the request
*/
const express = require('express')
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction } = require('../controllers/transaction.controller');
const router = express.Router();


router.post('/add-transaction', addTransaction)
router.post('/get-transaction', getAllTransactions)
router.post('/edit-transaction', editTransaction)
router.post('/delete-transaction', deleteTransaction)

module.exports = router;