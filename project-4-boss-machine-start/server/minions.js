const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
 } = require('./db.js');


minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res) => {
    const minion = req.body;
    const newMinion = addToDatabase('minions', minion);
    if(newMinion) {
        res.status(201).send(newMinion);
    } else{
        res.status(400).send('Invalid minion data');
    }
});

minionsRouter.get('/:minionId', (req, res) => {
    const minionId = req.params.minionId;
    const minion = getFromDatabaseById('minions', minionId);
    if(minion) {
        res.send(minion);
    } else {
        res.status(404).send('Minion not found');
    }
});

minionsRouter.put('/:minionId', (req, res) => {
    const minionId = req.params.minionId;
    const minion = req.body;
    minion.id = minionId;
    const updatedMinion = updateInstanceInDatabase('minions', minion);
    if(updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(400).send('Invalid minion data');
    }
});

minionsRouter.delete('/:minionId', (req, res) => {
    const minionId = req.params.minionId;
    const minionDelete = deleteFromDatabasebyId('minions', minionId);
    if(minionDelete) {
        res.status(204).send();
    } else {
        res.status(404).send('Minion not found');
    }
});