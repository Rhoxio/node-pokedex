const pokemonController = require('../controllers/').pokemon;

module.exports = (app) => {
  app.get("/", (req, res) => res.status(200).send({
    message: "Root hit"
  }))

  app.post("/pokemon", pokemonController.create)
  app.get("/pokemon", pokemonController.index)
  app.get("/admin/seed", pokemonController.seed)
}