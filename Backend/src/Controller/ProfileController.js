const connection = require('../database/connection');

module.exports= {
    async index (requisicao, resposta){
        const ong_id = requisicao.headers.authorization;

        const incidents = await connection ('incidents')
            .where('ong_id', ong_id)
            .select('*');

            return resposta.json(incidents);

    }
}