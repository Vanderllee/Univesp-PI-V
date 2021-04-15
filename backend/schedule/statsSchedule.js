const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        const {Stat} = app.api.stat

        const lastStats = await Stat.findOne({}, {}, {sort: {'createdAt':-1}})

        const stat = new Stat({
            users: usersCount.count,
            categories:categoriesCount.count,
            articles:articlesCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStats || stat.users !== lastStats.users
        const changeCategories = !lastStats || stat.categories !== lastStats.categories
        const changeArticles = !lastStats || stat.articles !== lastStats.articles

        if(changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log('[Stats] Estatísticas Atualizada!'))
        }
    })
}