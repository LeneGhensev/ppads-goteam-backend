const database = require("../models");
const s3Client = require("../service/s3Client");
const formidable = require("formidable");

class GameController {
  static async findAllGames(req, res) {
    try {
      let games = await database.game.findAll({
        include: [
          { model: database.categoria, as: "categoria" },
          { model: database.tag, as: "tags" },
        ],
        order: [["nome", "ASC"]],
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
      let game = await database.game.findOne({
        where: { id: Number(id) },
        include: [
          { model: database.tag, as: "tags" },
          { model: database.categoria, as: "categoria" },
          { model: database.avaliacao, as: "avaliacao", attributes: [] },
        ],
        attributes: {
          exclude: ["id_categoria"],
          include: [
            [database.sequelize.fn("AVG", database.sequelize.col("avaliacao.estrela")), "estrelas"],
          ],
        },
      });

      return res.status(200).json(game);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async createGame(req, res) {
    const form = new formidable.IncomingForm();
    var url;
    var gameCreated;
    var game = req.body;

    if (req.is("multipart/form-data")) {
      try {
        form.parse(req, async (err, fields, files) => {
          game = fields;

          var tags = game.tags;

          if (files.imagem_ilustrativa) {
            url = await s3Client.uploadFile(
              files.imagem_ilustrativa.newFilename,
              files.imagem_ilustrativa.filepath,
              files.imagem_ilustrativa.mimetype
            );
            game.imagem_ilustrativa = url;
          }

          if (tags) {
            tags = JSON.parse(tags);
            tags = tags.map(async (tag) => {
              tag = await database.tag.findOrCreate({
                where: { nome: tag },
                raw: true,
              });
              return tag[0];
            });

            Promise.all(tags).then(async (tags) => {
              gameCreated = await database.game.create(game, { raw: true });

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
          } else {
            gameCreated = await database.game.create(game, { raw: true });
            return res.status(201).json(gameCreated);
          }
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
      }
    } else {
      var tags = game.tags;

      if (tags) {
        //tags = JSON.parse(tags);
        tags = tags.map(async (tag) => {
          tag = await database.tag.findOrCreate({
            where: { nome: tag },
            raw: true,
          });
          return tag[0];
        });

        Promise.all(tags).then(async (tags) => {
          gameCreated = await database.game.create(game, { raw: true });

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
      } else {
        gameCreated = await database.game.create(game, { raw: true });
        return res.status(201).json(gameCreated);
      }
    }
  }

  static async updateGame(req, res) {
    const { id } = req.params;
    let game = req.body;
    let tags = game.tags;
    delete game.id;
    delete game.tags;
    const form = new formidable.IncomingForm();
    var url;

    if (req.is("multipart/form-data")) {
      try {
        form.parse(req, async (err, fields, files) => {
          game = fields;
          tags = game.tags;

          delete game.id;
          delete game.tags;

          if (files.imagem_ilustrativa) {
            url = await s3Client.uploadFile(
              files.imagem_ilustrativa.newFilename,
              files.imagem_ilustrativa.filepath,
              files.imagem_ilustrativa.mimetype
            );

            game.imagem_ilustrativa = url;
          }

          await database.GameTags.destroy({ where: { id_game: Number(id) } });

          if (tags) {
            tags = JSON.parse(tags);
            tags = tags.map(async (tag) => {
              tag = await database.tag.findOrCreate({
                where: { nome: tag },
                raw: true,
              });
              return tag[0];
            });

            Promise.all(tags).then(async (tags) => {
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
                include: [
                  { model: database.categoria, as: "categoria" },
                  { model: database.tag, as: "tags" },
                ],
              });
              return res.status(202).json(gameUpdated);
            });
          } else {
            await database.game.update(game, { where: { id: Number(id) } });
            const gameUpdated = await database.game.findOne({
              where: { id: Number(id) },
              include: [
                { model: database.categoria, as: "categoria" },
                { model: database.tag, as: "tags" },
              ],
            });
            return res.status(202).json(gameUpdated);
          }
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
      }
    } else {
      await database.GameTags.destroy({ where: { id_game: Number(id) } });

      if (tags) {
        //tags = JSON.parse(tags);
        tags = tags.map(async (tag) => {
          tag = await database.tag.findOrCreate({
            where: { nome: tag },
            raw: true,
          });
          return tag[0];
        });

        Promise.all(tags).then(async (tags) => {
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
            include: [
              { model: database.categoria, as: "categoria" },
              { model: database.tag, as: "tags" },
            ],
          });
          return res.status(202).json(gameUpdated);
        });
      } else {
        await database.game.update(game, { where: { id: Number(id) } });
        const gameUpdated = await database.game.findOne({
          where: { id: Number(id) },
          include: [
            { model: database.categoria, as: "categoria" },
            { model: database.tag, as: "tags" },
          ],
        });
        return res.status(202).json(gameUpdated);
      }
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

  static async recomendaGame(req, res) {
    const { id } = req.params;
    try {
      const gameAnalisado = await database.game.findOne({
        where: { id: Number(id) },
        include: [
          { model: database.categoria, as: "categoria" },
          { model: database.tag, as: "tags" },
        ],
      });

      const listaGames = await database.game.findAll({
        include: [
          { model: database.categoria, as: "categoria" },
          { model: database.tag, as: "tags" },
        ],
      });

      let listaRecomendada = listaGames.sort((a, b) => {
        /*
        se retorna negativo A primeiro
        se retorna zero inalterado
        se retorna positivo B primeiro
        */
        let resultado = 0;

        if (a.categoria.id == gameAnalisado.categoria.id) resultado--;
        if (b.categoria.id == gameAnalisado.categoria.id) resultado++;

        gameAnalisado.tags.forEach((tagAnalisada) => {
          a.tags.forEach((tag) => {
            if (tagAnalisada.id == tag.id) resultado--;
          });
        });

        gameAnalisado.tags.forEach((tagAnalisada) => {
          b.tags.forEach((tag) => {
            if (tagAnalisada.id == tag.id) resultado++;
          });
        });

        return resultado;
      });

      listaRecomendada = listaRecomendada.slice(0,5)

      return res.status(200).json(listaRecomendada);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }
}

module.exports = GameController;
