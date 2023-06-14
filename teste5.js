const data = require("./fakeData");

module.exports = (req, res) => {
    //filtra o usuario de acordo com as queries e soma as vezes que o usuário apareceu
    let { id, name, job } = req.query;
    const userCount = data.reduce((count, obj) => {
        if (obj.id == id || obj.name == name || obj.job == job ) {
            name ? '' : name = obj.name;
            return count + 1;
        }
        return count;
    }, 0);
    //se achar algum usuario com os filtros retorna texto com a quantidade de vezes que foi lido, se não retorna um erro 400
    userCount == 0 ? res.status(400).send(`usuário não encontrado`) : res.status(200).send(`usuário "${name}" foi lido ${userCount} vezes.`);
};