const express= require('express')
const {create, getOwners, updateOwner, deleteOwner,getOwnerById}= require('../controllers/ownerController')
// const {userSignupValidator }= require('../middleWares/userValidator')
// const { requireSignIn,isAuth }= require('../middleWares/auth')
// const { userById,getUser } = require('../middleWares/user')


const router = express.Router()

router.post("/create",create);
router.get("/",getOwners);
router.get("/:id",getOwnerById);

router.put("/edit/:id",updateOwner);
router.delete("/delete/:id",deleteOwner);










module.exports = router;
