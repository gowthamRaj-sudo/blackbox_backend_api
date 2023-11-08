const { TestingImageUploadsModal, updateImageModule } = require("../Modal/TesingImageUploadModal");

const TestingImageUploadsController = async (req,res) => {
    const  image  = req.file
    // console.log(image,"hi")
    try {
      // console.log(image)
      if (image) {
        await TestingImageUploadsModal(image.filename);
        return res.status(200).json({ message: "upload image successfully !" });
      } else {
        return res.status(400).json({ message: "imagefile is missing !" });
      }
    } catch (e) {
        console.log(e)
        return res.status(500).json({Error:e})
    }

}
// const UpdateImageUploadControler = async (req, res) => {
//     const file = req.file;
//     if (!file) {
//     throw new Error({message:"image is missing !"})
//     } else {
//         try {
//            await updateImageModule(file.filename) 
//         } catch (e) {
//             console.log(e)
//         }
// }
// }
module.exports = {
  TestingImageUploadsController,
//   UpdateImageUploadControler,
};