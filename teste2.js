var data = require("./fakeData");
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
//caminho do arquivo fakeData
const filePath = './fakeData.js';

module.exports = async (req, res) => {
    //dados obrigatorios a serem cadastrados: name e job
    if(Object.keys(req.body).length != 2) return res.status(400).send(`Esta rota precisa de campos name e job no corpo da requisição`);      
    
    //retorna erro caso não tenha dados de name e job do usuario
    for (const key in req.body) {
        if (key != 'name' && key != 'job') return res.status(400).send(`querys permitidas: "name", "job"`)
    }
    //verificar se os campos setados estão vazios
    if (req.body.name == "" || req.body.job == "") return res.status(400).send(`é necessário cadastrar nome e trabalho do usuario`);

    //se o usuario for admin, entra na função, se não retorna erro de acesso negado
    switch (req.user) {
        case 'user':
            return res.status(401).send({ error: "Acess Denied" });
        case 'admin':
            var id = 0;
            //verifica qual o ultimo id da lista de usuários para incrementar ao adicionar depois na lista
            for (const key in data) {
                const element = data[key];
                if (Number(key) + 1 === data.length) {
                    id = element.id + 1;
                }
            }
            var newUser = {
                id: id,
                name: req.body.name,
                job: req.body.job,
            }
            //adciona novo objeto ao array data
            data.push(newUser)
            //monta o array com os dados atualizado em formato json
            const jsonData = JSON.stringify(data, null, 2);
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