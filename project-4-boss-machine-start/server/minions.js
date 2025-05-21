const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
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

minionsRouter.get('/:minionId/work', (req, res) => {
    const minionId = req.params.minionId;
    const minionWork = getAllFromDatabase('work');
    const minionWorkById = minionWork.filter(work => work.minionId === minionId);
    if(minionWorkById) {
        res.send(minionWorkById);
    } else {
        res.status(404).send('Minion work not found');
    }
});

minionsRouter.post('/:minionId/work', (req, res) => {
    const work = req.body;
    const newWork = addToDatabase('work', work);
    if(newWork) {
        res.status(201).send(newWork);
    } else {
        res.status(400).send('Invalid work data');
    }
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    const updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
  }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res) => {
    const workId = req.params.workId;
    const workDelete = deleteFromDatabasebyId('work', workId);
    if(workDelete) {
        res.status(204).send();
    } else {
        res.status(404).send('Work not found');
    }
});