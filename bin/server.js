const app = require('../app/index.js');
require('dotenv').config();

const port = 3000;

app.listen(port, () => console.log(`listening on port ${port}`));