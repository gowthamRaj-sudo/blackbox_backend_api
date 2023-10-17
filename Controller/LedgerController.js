const { json } = require("body-parser");
const { uploadLegderFileModal, getUploadFilesLedgerModal } = require("../Modal/uploadLegderFileModal");


const uploadLegderController = async (req, res, next) => {
   
  

    try {
        const result = await uploadLegderFileModal(req.body.data);
        res.json(result)
        return {message:"success"}
    } catch (e) {
        console.log(e)
        next(e)
    }
}
const getUploadFilesLedgerController = async (req, res) => {
    const { fromDate,toDate} = req.query;

    try {
        let response;
        console.log(fromDate)
        if (fromDate===""&& toDate==="" ) {
            response = await getUploadFilesLedgerModal(fromDate,toDate);
        //    console.log(response)
          
            
        } if (fromDate&&toDate) {
          response = await getUploadFilesLedgerModal(fromDate,toDate);
        } else {
          response = await getUploadFilesLedgerModal();
          //    console.log(response);
        }
        console.log(response)
         return res.json(response);
    } catch (e) {
        console.log(e)
        throw e
    }
}
module.exports = {
  uploadLegderController,
  getUploadFilesLedgerController,
};