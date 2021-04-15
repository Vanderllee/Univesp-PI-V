const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validations;

    const save = (req, res) => {
        const article = { ...req.body }

        if (req.params.id) article.id = req.params.id;

        try {
            existsOrError(article.name, 'Nome do artigo não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.content, 'Conteúdo não informado')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.categoryId, 'Categoria não informada')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(error => res.status(500).send(error))
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(error => res.status(500).send(error))
        }
    }


    const limit = 3
    const get = async (req, res) => {
        const page = req.query.page || 1;

        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit)
            .offset(limit * page - limit)
            .then(articles => res.json(
                { data: articles, count, limit }
            ))
            .catch(error => res.status(500).send(error))

    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()

                return res.json(article)

            })
            .catch(error => res.status(500).send(error))
    }

    const getArticlesByCategories = async (req, res) => {
        const page = req.query.page || 1

        const categoryId = req.params.id;

        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({ a: 'articles', u: 'users' })
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(error => res.status(500).send(error))
    }

    const remove = async (req, res) => {

        try {
            const deletedRows = await app.db('articles').del()
                .where({ id: req.params.id })

            try {
                existsOrError(deletedRows, 'Artigo não encontrado')
            } catch (msg) {
                return res.status(500).send(msg)
            }

            res.status(204).send()

        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, getArticlesByCategories, remove }
}