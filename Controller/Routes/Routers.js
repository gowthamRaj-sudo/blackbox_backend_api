const express = require("express");
const multer = require("multer");
const CustomersControler = require("../CustomersControler");
const  uploadLegderFileController  = require("../LedgerController");
const { loginUserDataController } = require("../LoginController");
const { TestingImageUploadsController, UpdateImageUpload } = require("../TestingImageUploadContoller");

const uploadImages = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null,"uploads")
  },
  filename: (req, file, callBack) => {
    callBack(null,file.originalname)
  }
})
const upload=multer({storage:uploadImages})

const router = express.Router();
router.post(`/images`, upload.single("file"), TestingImageUploadsController);
// router.post(`/updateImages`,upload.single('image'),UpdateImageUpload)
// login user
router.get(`/login`,loginUserDataController)
// -------
router.post(`/createCustomer`,CustomersControler.CustomersControler)
router.get("/getCustomersDetails", CustomersControler.getCustomersController);
 router.put(
   "/updateCustomersDetails/:id",
   CustomersControler.updateCustomerDetails
 );
 router.post("/uploadFilesLedger", uploadLegderFileController.uploadLegderController);
router.get("/getUploadFilesLedger", uploadLegderFileController.getUploadFilesLedgerController);

module.exports = router;