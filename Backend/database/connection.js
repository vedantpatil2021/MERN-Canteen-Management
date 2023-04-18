const mg = require('mongoose');

mg.connect(process.env.DB)
  .then(() => console.log("connection successful "))
  .catch((error) => console.log(error));