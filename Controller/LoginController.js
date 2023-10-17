// const { loginUserDataModal } = require("../Modal/loginModal");

// const loginUserDataController = async (req, res,next) => {
//     const { userName, password } = req.query;
//     const userData = [userName, password];
//     if (!userName || !password) {
//       return res.status(401).json({ error: "check all the field !" });
//     } else {
//         try {
//             await loginUserDataModal(userData, next((name,pwd) => {
//                 if (name === userName && pwd === password) {
//                     return res.status(200).json({message:"login successfully !"})
//                 } else {
//                     return res.status(400).json({Error:"Invalid User & Password"})
//                 }
//             }))
            
            
//         } catch (e) {
//          return res.status(500).json({error:e})
//         }
//     }

    
    


// }
// module.exports = {
//   loginUserDataController,
// };
const { loginUserDataModal } = require("../Modal/loginModal");

const loginUserDataController = async (req, res, next) => {
  const { userName, password } = req.query;
  const userData = [userName, password];
  if (!userName || !password) {
    return res.status(401).json({ error: "Check all the fields!" });
  } else {
    try {
      const result = await loginUserDataModal(userData);
      if (result) {
        return res.status(200).json({ message: "Login successful!" });
      } else {
        return res.status(400).json({ error: "Invalid User & Password" });
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
};

module.exports = {
  loginUserDataController,
};
