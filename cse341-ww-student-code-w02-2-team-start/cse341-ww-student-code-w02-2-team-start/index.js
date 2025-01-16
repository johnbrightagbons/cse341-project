const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const routes = require('./routes')

app.use(express.json());
app.use('./,routes');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(cors())

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
