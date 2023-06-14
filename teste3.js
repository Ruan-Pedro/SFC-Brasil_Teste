var data = require("./fakeData");
const filePath = './fakeData.js';
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = async (req, res) => {
    //se o usuario for admin, entra na função, se não retorna erro de acesso negado
    switch (req.user) {
        case 'user':
            return res.status(401).send({ error: "Acess Denied" });
        case 'admin':
            var query = req.query;
            //retorna erro caso haja querys não permitidas
            for (const key in req.query) {
                if (key != 'name' && key != 'id' && key != 'job') return res.status(400).send(`querys permitidas: "id", "name", "job"`);
            }
            //verificar se há querys sendo utilizadas
            if (Object.keys(query).length === 0) return res.status(400).send(`Esta rota precisa de querys, exemplo: http://localhost:3000/user?id=1&name=John&job=Developer`);

            var deletedUser = data.filter(obj => {
                return Object.entries(query).every(([filter, value]) => {
                    //retorna os objetos igualando também se está em minúsculo e maiúsculo e retorna apenas o dado filtrado
                    return obj.hasOwnProperty(filter) && String(obj[filter]).toLowerCase() === String(value).toLowerCase();
                });
            });
            //Retorna erro caso não encontre um usuário
            if (deletedUser.length == 0) {
                return res.status(404).status("Usuário não encontrado");
            }
            //remove o usuário do array
            data = data.filter(obj => !deletedUser.includes(obj));

            //monta o array com os dados atualizado em formato json
            var jsonData = JSON.stringify(data, null, 2);

            try {
                //grava o array de dados atualizado (como se estivesse salvando num banco de dados)
                await writeFileAsync(filePath, `const fakeData  = ${jsonData};
        module.exports = fakeData;`);
                return res.status(200).send(data);
            } catch (error) {
                console.error('Erro ao gravar arquivo:', error);
                return res.status(500).send('Erro ao gravar o arquivo.');
            }
    }
};