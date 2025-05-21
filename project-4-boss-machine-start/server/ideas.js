const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db.js');

const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

ideasRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('ideas'));
});


ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
    const idea = req.body;

        const newIdea = addToDatabase('ideas', idea);
        if (newIdea) {
            res.status(201).send(newIdea);
        } else {
            res.status(400).send('Invalid idea data');
        }        
});
    
ideasRouter.get('/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    const idea = getFromDatabaseById('ideas', ideaId);
    if (idea) {
        res.send(idea);
    } else {
        res.status(404).send('Idea not found');
    }
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
    const idea = req.body;
    const ideaId = req.params.ideaId;
    idea.id = ideaId;
    const updatedIdea = updateInstanceInDatabase('ideas', idea);
    if (updatedIdea) {
        res.send(updatedIdea);
    } else {
        res.status(400).send('Invalid idea data');
    }
});

ideasRouter.delete('/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    const ideaDelete = deleteFromDatabasebyId('ideas', ideaId);
    if (ideaDelete) {
        res.status(204).send();
    } else {
        res.status(404).send('Idea not found');
    }
});