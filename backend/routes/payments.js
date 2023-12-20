const express= require('express')
const {create, getPayments,updatePayment,getPaymentById,deletePayment}= require('../controllers/paymentController')
// const {userSignupValidator }= require('../middleWares/userValidator')
// const { requireSignIn,isAuth }= require('../middleWares/auth')
// const { userById,getUser } = require('../middleWares/user')


const router = express.Router()

router.post("/create",create);
 router.get("/",getPayments);
 router.get("/:id",getPaymentById);

router.put("/edit/:id",updatePayment);
router.delete("/delete/:id",deletePayment);










module.exports = router;
