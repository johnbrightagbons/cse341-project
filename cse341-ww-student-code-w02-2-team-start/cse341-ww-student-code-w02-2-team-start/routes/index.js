const routes = require('express').Router();
const temple = require('./temple');
const { ObjectId } = require('mongodb');
const db = require('../db'); // Assuming `db` is your database connection module


routes.use('/temples', temple);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
    };
    res.send(docData);
  })
);



// GET all temples
router.get('/temples', async (req, res) => {
  try {
    const temples = await db.collection('temples').find().toArray();
    res.status(200).json(temples);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving temples', error: err });
  }
});

// GET a temple by ID
router.get('/temples/:id', async (req, res) => {
  try {
    const temple = await db.collection('temples').findOne({ _id: new ObjectId(req.params.id) });
    if (temple) {
      res.status(200).json(temple);
    } else {
      res.status(404).json({ message: 'Temple not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving temple', error: err });
  }
});

// POST a new temple
router.post('/temples', async (req, res) => {
  try {
    const result = await db.collection('temples').insertOne(req.body);
    res.status(201).json({ message: 'Temple created', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating temple', error: err });
  }
});

// PUT to update a temple by ID
router.put('/temples/:id', async (req, res) => {
  try {
    const result = await db.collection('temples').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Temple updated' });
    } else {
      res.status(404).json({ message: 'Temple not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating temple', error: err });
  }
});

// DELETE a temple by ID
router.delete('/temples/:id', async (req, res) => {
  try {
    const result = await db.collection('temples').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Temple deleted' });
    } else {
      res.status(404).json({ message: 'Temple not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting temple', error: err });
  }
});

module.exports = router;
