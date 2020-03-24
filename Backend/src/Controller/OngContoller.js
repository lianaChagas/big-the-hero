const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (requisicao, resposta){
        const ongs = await connection('ongs').select('*');
      
          return resposta.json(ongs);
      },

    async create(requisicao, reposta) {
        const {name, email, whatsapp, city, uf} = requisicao.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id, 
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return resposta.json({ id });
        }   
};
