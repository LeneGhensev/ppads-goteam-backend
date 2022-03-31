const database = require("../models");

class GameController {
  static async findAllGames(req, res) {
    try {
      let games = await database.game.findAll({
        include: [{model: database.categoria, as: 'categoria'}],
        attributes: { exclude: ['id_categoria'] } 
      });
      
      return res.status(200).json(games);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async findOneGame(req, res) {
    const { id } = req.params;
    try {
      const game = await database.game.findOne({
        where: { id: Number(id) },
        include: [{model: database.categoria, as: 'categoria'}],
        attributes: { exclude: ['id_categoria'] } 
      });
      delete game.id_categoria
      return res.status(200).json(game);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async createGame(req, res) {
    const game = req.body;
    try{
        const gameCreated = await database.game.create(game);
        return res.status(201).json(gameCreated);
        
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
  }

  static async updateGame(req, res) {
    const { id } = req.params;
    let game = req.body;
    delete game.id;
    try{
        await database.game.update(game, {where:{ id: Number(id) }});
        const gameUpdated = await database.game.findOne({where:{ id: Number(id) }});
        return res.status(202).json(gameUpdated);
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
  }

  static async destroyGame(req, res) {
    const { id } = req.params;
    try {
        await database.game.destroy({where:{ id: Number(id) }});
        return res.status(202).json({message: `Game apagado`});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
  }
}

module.exports = GameController;
