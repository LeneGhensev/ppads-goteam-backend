const database = require('../models');

class AvaliacaoController {
    static async findAllAvaliacoes(req, res){
        try{
            const avaliacao = await database.avaliacao.findAll();
            return res.status(200).json(avaliacao);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async findAllAvaliacoesByGameId(req, res){
        const { id } = req.params;
        try{
            const avaliacao = await database.avaliacao.findAll({where:{ id_game: Number(id) }});
            return res.status(200).json(avaliacao);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async findOneAvaliacao(req, res){
        const { id } = req.params;
        try{
            const avaliacao = await database.avaliacao.findOne({where:{ id: Number(id) }});
            return res.status(200).json(avaliacao);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async createAvaliacao(req, res){
        const avaliacao = req.body;
        try{
            const avaliacaoCreated = await database.avaliacao.create(avaliacao);
            return res.status(201).json(avaliacaoCreated);
            
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async updateAvaliacao(req, res) {
        const { id } = req.params;
        let avaliacao = req.body;
        delete avaliacao.id;
        try{
            await database.avaliacao.update(avaliacao, {where:{ id: Number(id) }});
            const avaliacaoUpdated = await database.avaliacao.findOne({where:{ id: Number(id) }});
            return res.status(202).json(avaliacaoUpdated);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async destroyAvaliacao(req, res){
        const { id } = req.params;
        try {
            await database.avaliacao.destroy({where:{ id: Number(id) }});
            return res.status(202).json({message: `Avaliacao apagada`});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    }
}

module.exports = AvaliacaoController;
