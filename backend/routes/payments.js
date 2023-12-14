const express= require('express')
const {create, getPayments,updatePayment}= require('../controllers/paymentController')
// const {userSignupValidator }= require('../middleWares/userValidator')
// const { requireSignIn,isAuth }= require('../middleWares/auth')
// const { userById,getUser } = require('../middleWares/user')


const router = express.Router()

router.post("/create",create);
 router.get("/",getPayments);
router.put("/edit/:id",updatePayment);
// router.delete("/delete/:id",deleteOwner);










module.exports = router;
