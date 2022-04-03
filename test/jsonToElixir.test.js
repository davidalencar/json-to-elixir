const json = require('./seed/seed.json')
const jsonToElixir = require('../assets/js/jsonex')



console.log(jsonToElixir(json, 'customer'))
