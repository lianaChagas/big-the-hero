const connection = require('../database/connection');

module.exports = {
    async index (requisicao, resposta){
        const { page = 1} = requisicao.query

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') 
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                    'incidents.*',
                    'ongs.name', 
                    'ongs.email', 
                    'ongs.whatsapp', 
                    'ongs.city',
                    'ongs.uf'
                ]);

        resposta.header('X-Total-Count', count['count(*)']);  
      
        return resposta.json(incidents);
      },

    async create (requisicao, resposta){
        const{title, description, value} = requisicao.body;
        const ong_id = requisicao.headers.authorization;

        const [id] = await connection ('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return resposta.json({ id });
    },

    async delete(requisicao, resposta){
        const { id } = requisicao.params;
        const ong_id = requisicao.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id != ong_id){
            return resposta.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id ).delete();

        return resposta.status(204).send();
    }
};