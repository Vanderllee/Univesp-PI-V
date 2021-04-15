const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/conhecimento_stats', { useUnifiedTopology: true, useNewUrlParser: true  } )
    .catch(error => {
        const msg = 'ERRO! Não foi possível conectar com o mongoDB'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })

