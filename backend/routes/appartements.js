const express= require('express')
const {create,getAppartements,updateAppartement,deleteAppartement,getAppartementsNumber,getOwnerByAppartementNumber,getAppartementById}= require('../controllers/appartementController')
// const {userSignupValidator }= require('../middleWares/userValidator')
// const { requireSignIn,isAuth }= require('../middleWares/auth')
// const { userById,getUser } = require('../middleWares/user')


const router = express.Router()

router.post("/create",create);
router.get("/",getAppartements);
router.get("/:id",getAppartementById);
router.get("/roomNumber/:name",getAppartementsNumber);
router.get("/owner/:nb",getOwnerByAppartementNumber);


 router.put("/edit/:id",updateAppartement);
 router.delete("/delete/:id",deleteAppartement);










module.exports = router;
