const database = require('../models');

class CategoriaController{
   
    static async findAllCategorias(req, res){
        try{
            const categoria = await database.categoria.findAll();
            return res.status(200).json(categoria);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async findOneCategoria(req, res){
        const { id } = req.params;
        try{
            const categoria = await database.categoria.findOne({where:{ id: Number(id) }});
            return res.status(200).json(categoria);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async createCategoria(req, res){
        const categoria = req.body;
        try{
            const categoriaCreated = await database.categoria.create(categoria);
            return res.status(201).json(categoriaCreated);
            
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async updateCategoria(req, res) {
        const { id } = req.params;
        let categoria = req.body;
        delete categoria.id;
        try{
            await database.categoria.update(categoria, {where:{ id: Number(id) }});
            const categoriaUpdated = await database.categoria.findOne({where:{ id: Number(id) }});
            return res.status(202).json(categoriaUpdated);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async destroyCategoria(req, res){
        const { id } = req.params;
        try {
            await database.categoria.destroy({where:{ id: Number(id) }});
            return res.status(202).json({message: `Categoria apagada`});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    }
}

module.exports = CategoriaController;
