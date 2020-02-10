const Pokemon = require('../database/models').Pokemon
const PokemonType = require('../database/models').PokemonType
const Type = require('../database/models').Type
const { Op } = require("sequelize");
const request = require('request');

module.exports = {

  index(req, res){
    return Pokemon.findAll({
      include: [
        { model: Type, required: true, as: 'types'}
      ]
    }).then((pokemon) => {
      console.log(pokemon[pokemon.length-1].types[0].id)
      
      res.render('index', {layout: 'layout.ejs'})
    })
  },

  create(req, res){
    Pokemon.create({
      name: req.body.name,
      nationalId: req.body.national_id,
    }).then((pokemon) => { 
      // console.log(pokemon)
      Type.findAll({
          where: {
            [Op.or]: [
              { name: req.body.type1 },
              { name: req.body.type2 }
            ]
          }
        }).then((types)=>{    
          // console.log(types)
          types.forEach((type)=> {
            pokemon.addType(type)          
          })
          // console.log(types.map((type)=> { type }))
          res.status(201).send(pokemon)
        })
    })      
  },

  seed(req, res){
    const pokeCount = 151;
    const typeCount = 18;
    var promises = [];
    var typePromises = [];
    var allPokemon = [];

    for (var i = 0; i < typeCount; i++){
      const typePromise = new Promise((resolve, reject) => {
        request(`https://pokeapi.co/api/v2/type/${String(i+1)}`, {json: true}, (err, res, body) => {
          // console.log(body)
          resolve(body)
        })
      })
      typePromises.push(typePromise)
    }    

    for (var i = 0; i < pokeCount; i++){
      const promise = new Promise(function(resolve, reject) {
        request(`https://pokeapi.co/api/v2/pokemon/${String(i+1)}`, {json: true}, (err, res, body) => {
          // console.log(body)
          resolve(body)
        })
      });
      promises.push(promise)
    }

    Promise.all(typePromises).then((types) => {
      types.forEach((type) => {
        Type.create({
          name: type.name
        })
      })
    })    


    Promise.all(promises).then(function(values) {
      values.forEach((pokemon) => {
        let types = pokemon.types.map((typeCollection) => {
          return { name: typeCollection.type.name }
        })

        Pokemon.create({
          name: pokemon.name,
          nationalId: pokemon.id,
          image_url: "https://pokeres.bastionbot.org/images/pokemon/"+String(pokemon.id)+".png"
        }).then((pokemon) => {
          // console.log(pokemon)
          allPokemon.push(pokemon)

          Type.findAll({
              where: {
                [Op.or]: types
              }
            }).then((addedTypes)=>{    
              addedTypes.forEach((type)=> {
                pokemon.addType(type)          
              })
            })
        })        
      })
      
    })


    
  }
}


