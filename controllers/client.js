const Client = require('../models/Client')

// add a new client
exports.addClient = (req, res, next) => {
    const client = new Client({
        ...req.body
    })
    client.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }))
}

//list all clients 
exports.clientsList = (req, res, next) => {
    Client.find()
      .then(clients => res.status(200).json(clients))
      .catch(error => res.status(400).json({ error }));
}