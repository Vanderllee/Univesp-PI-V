module.exports = middware => {
    return (req, res, next) => {
        if(req.user.admin) {
            return middware(req, res, next)
        } else{
            res.status(401).send('Usuário não é administrador')
        }
    }
}