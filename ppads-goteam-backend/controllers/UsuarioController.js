const database = require('../models');
const Authentication = require("../security/authentication")

class UsuarioController {

    static async findAllUsuarios(req, res){
        try{
            const usuarios = await database.Usuario.findAll();
            return res.status(200).json(usuarios);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async findOneUsuario(req, res){
        const { id } = req.params;
        try{
            const usuario = await database.Usuario.findOne({where:{ id: Number(id) }});
            return res.status(200).json(usuario);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async createUsuario(req, res){
        const usuario = req.body;
        try{
            let senha = usuario.senhaHash;
            if(Authentication.validaSenhaNova(senha)){
                usuario.senhaHash = await Authentication.gerarSenhaHash(usuario.senhaHash);
                const usuarioCreated = await database.Usuario.create(usuario);
                return res.status(201).json(usuarioCreated);
            }
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async updateUsuario(req, res) {
        const { id } = req.params;
        let usuario = req.body;
        delete usuario.id;
        let senha = usuario.senhaHash;
        delete usuario.senhaHash;
        try{
            if(senha){
                if(Authentication.validaSenhaNova(senha)){
                    usuario.senhaHash = await Authentication.gerarSenhaHash(senha);
                    await database.Usuario.update(usuario, {where:{ id: Number(id) }});
                    const usuarioUpdated = await database.Usuario.findOne({where:{ id: Number(id) }});
                    return res.status(202).json(usuarioUpdated);
                }
            }
            await database.Usuario.update(usuario, {where:{ id: Number(id) }});
            const usuarioUpdated = await database.Usuario.findOne({where:{ id: Number(id) }});
            return res.status(202).json(usuarioUpdated);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async destroyUsuario(req, res){
        const { id } = req.params;
        try {
            await database.Usuario.destroy({where:{ id: Number(id) }});
            return res.status(202).json({message: `Usuario apagado`});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    }
}

module.exports = UsuarioController;
