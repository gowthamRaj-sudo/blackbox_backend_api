const mysql2 = require("mysql2/promise");

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "Password@123#@!",
  database: "black_box",
  waitForConnections: true,
  connectionLimit: Infinity,
  queueLimit: 0,
});
// self-invoking fn
(async () => {
  const connection = await pool.getConnection(); 
  try {
    let loginUser = `CREATE TABLE IF NOT EXISTS loginUser(id INT NOT NULL AUTO_INCREMENT,userName varchar(256)NOT NULL,passwordData varchar(256)NOT NULL,PRIMARY KEY(id))`
    
    let customersTable = `CREATE TABLE IF NOT EXISTS customers(id int NOT NULL AUTO_INCREMENT,
    name varchar(256) NOT NULL ,email varchar(256) NOT NULL,mobile varchar(256) NOT NULL,
    gender varchar(256)NOT NULL,dateOfBirth varchar(256) NOT NULL,address varchar(256) NOT NULL,User_Id  varchar(256) NOT NULL,AMT varchar(256) NOT NULL,
   PRIMARY KEY(id)
      )`;

    let ledgerData = `CREATE TABLE IF NOT EXISTS ledgerDataTable(id int NOT NULL AUTO_INCREMENT,
      Portfolio_Name varchar(256) NOT NULL ,Leg_ID varchar(256) NOT NULL,Exchange varchar(256)NOT NULL ,Exchange_Symbol varchar(256)NOT NULL,Product varchar(256) NOT NULL,
     Order_Type varchar(256) NOT NULL,Order_ID varchar(256) NOT NULL,Time varchar(256) NOT NULL,
     Txn varchar(256) NOT NULL,Qty varchar(256) NOT NULL,Filled_Qty varchar(256) NOT NULL,
     Exchg_Time varchar(256) NOT NULL, Avg_Price varchar(256) NOT NULL,
     Status varchar(256) NOT NULL,Limit_Price varchar(256) NOT NULL,
     Order_Failed varchar(256) NOT NULL, User_ID varchar(256) NOT NULL,User_Alias varchar(256) NOT NULL,
     Remarks varchar(256) NOT NULL,Tag varchar(256) NOT NULL,PRIMARY KEY(id))`;
    // image testing
    let TestingImageUploads = `CREATE TABLE IF NOT EXISTS images(id INT NOT NULL AUTO_INCREMENT ,ImagesData VARCHAR(512)NOT NULL,PRIMARY KEY(id))`;
    await connection.query(TestingImageUploads);
    await connection.query(customersTable);
    await connection.query(ledgerData);
    await connection.query(loginUser);
    const [row] = await connection.query("SELECT * FROM loginUser");
    if (row.length === 0) {
      await connection.query(`INSERT INTO loginUser (userName,passwordData)VALUES('gowtham@gmail.com','123456')`);
      console.log("loginUser table  data is inserted !")
    }
    console.log("Table created successfully !");
  } catch (e) {
    console.log("table error", e);
  }
})();

module.exports = {pool,};
