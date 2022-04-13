const database = require("../models");

class TesteController {
 
  static async create(req, res) {
    console.log(req.body)
    return res.status(200).json(req.body)
  }
   
}
module.exports = TesteController;
