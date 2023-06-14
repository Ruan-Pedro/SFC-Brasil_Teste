var data =  require("./fakeData");

const getUser = ( req, res, next ) => {
    var query =  req.query;
    //Verificar se há querys diferentes de id, name e job
    for (const key in query) {
        if (key != 'name' && key != 'id' && key != 'job') return res.status(400).send(`querys permitidas: "id", "name", "job"`)
    }
    //verificar se há querys sendo utilizadas
    if(Object.keys(query).length === 0) return res.status(400).send(`Esta rota precisa de querys, exemplo: http://localhost:3000/user?id=1&name=John&job=Developer`);    

    //filtra o usuário através das queries
    const objFiltered = data.filter(obj => {
        return Object.entries(query).every(([filter, value]) => {
            //retorna os objetos igualando também se está em minúsculo e maiúsculo e retorna apenas o dado filtrado
            return obj.hasOwnProperty(filter) && String(obj[filter]).toLowerCase() === String(value).toLowerCase();
        });
    });
    return res.status(200).json(objFiltered[0]);
};

const getUsers = (req, res, next) => {
    const query = req.query;
    const filteredArrayData = data.filter(obj => {
    //usa "some" invés de "every" para retornar todos os dados que batem com o filtro query
      return Object.entries(query).some(([filter, value]) => {
        return obj.hasOwnProperty(filter) && String(obj[filter]).toLowerCase() === value.toLowerCase();
      });
    });
    //se não houver query alguma retorna todos os dados, se não retorna os dados filtrados
    filteredArrayData.length == 0 ? res.status(200).json(data) : res.status(200).json(filteredArrayData);
  };  

module.exports = {
    getUser,
    getUsers,
};