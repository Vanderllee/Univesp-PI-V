const {authSecret} = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

module.exports = app => {
    const signin = async(req, res) => {
        if(!req.body.email || !req.body.password) {
            res.status(400).send('Informe usuário ou senha')
        }

        const user = await app.db('users')
            .where({email: req.body.email})
            .first()
        
        if(!user) return res.status(400).send().send('Usuário não encontrado')

        const isMach = bcrypt.compareSync(req.body.password.toString(), user.password)
        if(!isMach) return res.status(400).send('Email/Senha inválidos')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin:user.admin,
            iat: now,
     
            exp: now + (60*60*24*1)
        }

        res.json({
            ...payload,
            token:jwt.encode(payload, authSecret)
        })

    }

    const validateToken = (req, res) => {
        const userData = req.body || null

        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)

                if(new Date(token.exp*1000) > new Date()) {
                    return res.send(true)
                }

            }
        } catch (error) {
            // problem with the token
        }

        res.send(false)
    }

    return {signin, validateToken}
}