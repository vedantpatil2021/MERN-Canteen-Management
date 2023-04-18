const mg = require("mongoose");

const categ = new mg.Schema({
    category : {
        type : String
    }
})

const Category = mg.model("category",categ);

module.exports = Category;