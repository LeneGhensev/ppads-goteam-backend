const database = require("../models");

class TagController {
    static async findAllTag(req, res){
        try{
            const tags = await database.tag.findAll();
            return res.status(200).json(tags);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async createTag(req, res){
        const tag = req.body;
        try{
            const tagCreated = await database.tag.create(tag);
            return res.status(201).json(tagCreated);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async destroyTag(req, res){
        const { nome } = req.params;
        try {
            await database.Usuario.destroy({where:{ nome: nome }});
            return res.status(202).json({message: `Usuario apagado`});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TagController;
