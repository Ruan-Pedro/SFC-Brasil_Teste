exports.required = (req, res, next) => {
    //middleware de autenticação obrigatória necessário passar "admin" ou "user" no header de autenticacao como Bearer Token
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ error: "Access Denied" });
    let token = authHeader.substring(7, authHeader.length);

    if (token != 'admin' && token != 'user') return res.status(401).send({ error: "Acess Denied" });
    try {
        req.user = token;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({ error: "Acess Denied" });
    }
}
//middleware de autenticação opcional, usado para endpoints "livres"
exports.optional = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        let token = authHeader.substring(7, authHeader.length);
        req.user = token;
    }
    next();
}
