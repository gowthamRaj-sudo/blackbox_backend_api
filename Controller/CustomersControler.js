const { CustomerModal, getCustomersModal, updateCustomerDetailsModal, getPortfolioNameByTag } = require("../Modal/CustomerModal");
const CustomersControler =

async (req, res, next) => {
    const { name, email, mobile, gender, dob, address,user_id,amt } = req.body;
    const customersData = [name, email, mobile, gender, dob, address,user_id,amt];
    try {
        const result = await CustomerModal(customersData);
        res.json(result)
    } catch (e) {
        next(e)
    }
}
const getCustomersController = async (req, res) => {
    try {
        const response = await getCustomersModal();
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({ error: "Internal server error" });
   }
}
const updateCustomerDetails = async (req, res,next) => {
  const cusID = req.params.id;
  // console.log("sdsdsdds", cusID);
  const { name, email, mobile, gender, dob, address, user_id, amt } = req.body;
  const updateData = [name, email, mobile, gender, dob, address, user_id, amt];

  try {
    const result = await updateCustomerDetailsModal(cusID, updateData);
    res.json(result);
  } catch (e) {
    console.log(e);
    next();
  }
}

const getPortfolioName = async (req, res) => {
  const tag=req.params.tag
  try {
      const response = await getPortfolioNameByTag(tag);
      return res.status(200).json(response)
  } catch (e) {
      return res.status(500).json({ error: "Internal server error!" });
 }
}
module.exports = {
  CustomersControler,
  getCustomersController,
  updateCustomerDetails,
  getPortfolioName
};
