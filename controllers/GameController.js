const database = require("../models");

class GameController {
  static async findAllGames(req, res) {
    try {
      let games = await database.game.findAll({
        include: [
          { model: database.categoria, as: "categoria" },
          { model: database.tag, as: "tags" },
        ],
        //attributes: { exclude: ["id_categoria"] },
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
        include: [
          { model: database.categoria, as: "categoria" },
          { model: database.tag, as: "tags" },
        ],
        //attributes: { exclude: ["id_categoria"] },
      });
      delete game.id_categoria;
      return res.status(200).json(game);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async createGame(req, res) {
    let game = req.body;

    let tags = game.tags;

    try {
      tags = tags.map(async (tag) => {
        tag = await database.tag.findOrCreate({
          where: { nome: tag },
          raw: true,
        });
        return tag[0];
      });

      Promise.all(tags).then(async (tags) => {
        console.log(tags);

        let gameCreated = await database.game.create(game, { raw: true });

        tags.forEach(async (tag) => {
          try {
            await database.GameTags.create({
              id_game: gameCreated.id,
              id_tag: tag.id,
            });
          } catch (error) {
            console.log(error);
          }
        });

        gameCreated.tags = tags;
        return res.status(201).json(gameCreated);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async updateGame(req, res) {
    const { id } = req.params;
    let game = req.body;
    let tags = game.tags
    delete game.id;
    delete game.tags;

    try {
      await database.GameTags.destroy({where:{ id_game: Number(id) }})

      tags.forEach(async (tag) => {
        try {
          await database.GameTags.create({
            id_game: id,
            id_tag: tag.id,
          });
        } catch (error) {
          console.log(error);
        }
      });

      await database.game.update(game, { where: { id: Number(id) } });
      const gameUpdated = await database.game.findOne({
        where: { id: Number(id) },
      });
      return res.status(202).json(gameUpdated);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async destroyGame(req, res) {
    const { id } = req.params;
    try {
      await database.game.destroy({ where: { id: Number(id) } });
      return res.status(202).json({ message: `Game apagado` });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }
}

module.exports = GameController;
