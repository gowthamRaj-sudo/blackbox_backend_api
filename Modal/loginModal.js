// const { pool } = require("../Configiration/Config");

// const loginUserDataModal = async (userData,value) => {
//   const sql = `select userName,passwordData from loginUser where userName='${userData[0]}' and passwordData='${userData[1]}'`;

//   try {
//     const connection = await pool.getConnection();
//       const result = await connection.query(sql, userData);
//       value(userData[0],userData[1])
//     console.log(result);
//     return result;
//   } catch (e) {
//     console.log(e);
//   }
// };
// module.exports = {
//   loginUserDataModal,
// };
const { pool } = require("../Configiration/Config");

const loginUserDataModal = async (userData) => {
  const sql = `SELECT userName, passwordData FROM loginUser WHERE userName='${userData[0]}'`;

  try {
    const connection = await pool.getConnection();
      const result = await connection.query(sql);
      console.log("data",result[0][0].userName);
    // connection.release();

    if (result[0][0]) {
      const storedPassword = result[0][0].passwordData;

      if (storedPassword === userData[1]) {
        return true; 
      }
    }

    return false; 
  } catch (e) {
    console.log(e);
    throw e; 
  }
};

module.exports = {
  loginUserDataModal,
};

