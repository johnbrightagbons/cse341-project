const router = require('express').Router();

router.get('/', (req, res) => {
    res.json([
        { id: 1, name: 'Student One' },
        { id: 2, name: 'Student Two' }
    ]);
});

router.get('/:id', (req, res) => {
    res.json({ id: req.params.id, name: `Student ${req.params.id}` });
});

router.post('/', (req, res) => {
    res.status(201).json({ message: 'Student created' });
});

router.put('/:id', (req, res) => {
    res.json({ message: `Student ${req.params.id} updated` });
});

router.delete('/:id', (req, res) => {
    res.json({ message: `Student ${req.params.id} deleted` });
});

module.exports = router;