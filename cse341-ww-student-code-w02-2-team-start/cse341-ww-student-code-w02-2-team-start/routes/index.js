const routes = require('express').Router();
const temple = require('./temple');

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


/**
 * @swagger
 * /temples/{id}:
 *   get:
 *     summary: Get a single temple by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the temple
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the temple
 *       404:
 *         description: Temple not found
 */
router.get('/temples/:id', (req, res) => {
  res.send('Get temple by ID');
});

/**
* @swagger
* /temples/{id}:
*   put:
*     summary: Update a temple's information
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: The ID of the temple to update
*         schema:
*           type: string
*     requestBody:
*       description: The updated temple data
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               location:
*                 type: string
*               description:
*                 type: string
*     responses:
*       200:
*         description: Temple successfully updated
*       400:
*         description: Invalid input
*/
router.put('/temples/:id', (req, res) => {
  res.send('Update temple by ID');
});

/**
* @swagger
* /temples/{id}:
*   delete:
*     summary: Delete a temple
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: The ID of the temple to delete
*         schema:
*           type: string
*     responses:
*       200:
*         description: Temple successfully deleted
*       404:
*         description: Temple not found
*/
router.delete('/temples/:id', (req, res) => {
  res.send('Delete temple by ID');
});

module.exports = routes;
