
const { json } = require("body-parser");
const { pool } = require("../Configiration/Config");
const CustomerModal = async (customersData) => {
    const sql = `INSERT INTO customers(name,email,mobile,gender,dateOfBirth,address,User_Id,AMT)VALUES(?)`;
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query(sql, [customersData]);
        connection.release();
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
    
};
const getCustomersModal = async () => {
    const sql = `SELECT * from customers;`
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query(sql)
        return result
    } catch (e) {
         console.log(err);
         throw err;
    }
}
    const updateCustomerDetailsModal = async (cusID, updateData) => {
      console.log(updateData, cusID);
        const sql = `UPDATE customers set name='${updateData[0]}',email='${updateData[1]}',mobile='${updateData[2]}',gender='${updateData[3]}',dateOfBirth='${updateData[4]}',address='${updateData[5]}',User_Id='${updateData[6]}',AMT='${7} WHERE id=${cusID} `;
        try {
            const connection = await pool.getConnection();
            await connection.query(sql);
            return {update:"Update Successfully!"}
            
        } catch (e) {
console.error(e);
            throw e
        }
    };
    module.exports = {
    CustomerModal,
    getCustomersModal,
    updateCustomerDetailsModal,
    };