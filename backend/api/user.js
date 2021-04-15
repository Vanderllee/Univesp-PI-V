const bcrypt = require('bcrypt');

module.exports = app => {

    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validations;

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        
        try {

            existsOrError(user.name, 'Nome do usuário não informado');
            existsOrError(user.email, 'Email do usuário não informado');
            existsOrError(user.password, 'Senha do usuário não informada!');
            existsOrError(user.confirmPassword, 'Senhas não confirmadas!');

            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem!')

            const userFromDb = await app.db('users').where({email: user.email}).first()

            if(!user.id) {
                notExistsOrError(userFromDb, 'Usuário existente na base de dados!');
            }


        } catch (msg) {
            return res.status(400).send(msg);
        }

        user.password = encryptPassword(user.password.toString());
        delete user.confirmPassword

        if(user.id) {
            app.db('users')
            .update(user)
            .where({id: user.id})
            .whereNull('deletedAt')
            .then(_=> res.status(204).send())
            .catch(error => res.status(500).send(error))
        } else {
            app.db('users')
            .insert(user)
            .then(_=> res.status(200).send())
            .catch(error => res.status(500).send(error))
        } 
    }

    const get = (req, res) => {
        app.db('users')
        .select('id', 'name', 'email', 'admin')
        .whereNull('deletedAt')
        .then(users => res.json(users))
        .catch(error => res.status(500).send(error))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email')
            .where({id: req.params.id})
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(error => res.status(400).send(error))
    }

    const remove = async(req, res) => {
        try {
            const existingArticle = await app.db('articles')
                .where({userId: req.params.id})
                notExistsOrError(existingArticle, 'Usuário possui artigos.')

            const rowsUpdate = await app.db('users')
                .update({deletedAt: new Date()})
                .where({id: req.params.id})
                existsOrError(rowsUpdate, 'Usuário não encontrado!')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }



    return {save, get, getById, remove}
    
}