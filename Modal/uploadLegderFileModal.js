const { json } = require("body-parser");
const { pool } = require("../Configiration/Config");
const { format } = require("mysql2");

 const uploadLegderFileModal = async (ledgerData) => {
   const sql = `INSERT INTO ledgerDataTable(Portfolio_Name,Leg_ID,Exchange,Exchange_Symbol,Product,Order_Type,Order_ID,Time,Txn,Qty,Filled_Qty,Exchg_Time,Avg_Price,Status,Limit_Price,Order_Failed,User_ID,User_Alias,Remarks,Tag,Bsmtm,Netpl)
     VALUES ?`;

   function parseCustomDate(dateStr) {
     const dateComponents = dateStr.match(
       /(\d+)-([A-Za-z]+)-(\d+) (\d+)\.(\d+)\.(\d+)/
     );

     if (!dateComponents) {
       return null;
     }

     const monthAbbreviations = {
       Jan: 0,
       Feb: 1,
       Mar: 2,
       Apr: 3,
       May: 4,
       Jun: 5,
       Jul: 6,
       Aug: 7,
       Sep: 8,
       Oct: 9,
       Nov: 10,
       Dec: 11,
     };

     const year = parseInt(dateComponents[3], 10);
     const month = monthAbbreviations[dateComponents[2]];
     const day = parseInt(dateComponents[1], 10);
     const hours = parseInt(dateComponents[4], 10);
     const minutes = parseInt(dateComponents[5], 10);
     const seconds = parseInt(dateComponents[6], 10);

     const formattedDate = new Date(year, month, day, hours, minutes, seconds);

     const yyyy = formattedDate.getFullYear();
     const mm = String(formattedDate.getMonth() + 1).padStart(2, "0");
     const dd = String(formattedDate.getDate()).padStart(2, "0");

     return `${yyyy}-${mm}-${dd}`;
   }

   function formatString(input) {
     if (input === undefined) {
       return "";
     }
     return input.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
   }
   console.log(formatString("B/S MTM"));
   const values = ledgerData.map((e) => [
     e["Portfolio Name"],
     e["Leg ID"],
     e["Exchange"],
     e["Exchange Symbol"],
     e["Product"],
     e["Order Type"],
     e["Order ID"],
     parseCustomDate(format(e["Time"], "yyyy-MM-dd")),
     e["Txn"],
     e["Qty"],
     e["Filled Qty"],
     e["Exchg Time"],
     e["Avg Price"],
     e["Status"],
     e["Limit Price"],
     e["Order Failed"],
     e["User ID"],
     e["User Alias"],
     e["Remarks"],
     //  e["Tag"],
     e["TAG"],

     formatString(e["B/S MTM"].toString()),
     formatString(e["NETP&L"].toString()),

     // e["SNo"],
   ]);

   try {
     const connection = await pool.getConnection();
     const [result] = await connection.query(sql, [values]);
     connection.release();

     return result, { message: "success" };
   } catch (e) {
     console.log(e);
   }
 };

const getUploadFilesLedgerModal = async (fromDate,toDate) => {   
     let sql = `SELECT * FROM ledgerDataTable `; 
    
  if (fromDate === ""&& toDate==="") {
  return sql 
}
    if (fromDate&&toDate) {
      sql += ` WHERE Time >='${fromDate}' AND Time<='${toDate}' `;
    } 
 console.log(fromDate)
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql);
    //   console.log(result)
      return result
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = {
  uploadLegderFileModal,
  getUploadFilesLedgerModal,
};