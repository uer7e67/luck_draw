const express = require("express");
const router = express.Router();
const utils = require("../utils/utils"); 
const config = [
    [1, 1], [2, 10], [3, 50], [4, 100], [5, 100], [6, 200], [7, 300]
]; 

router.get("/get_config", (req, res) => {
    res.send(JSON.stringify(config)); 
})

router.get("/ran_game", (req, res) => {
    var pIndex = utils.randomByWeight(config);
    res.send(JSON.stringify({ pIndex: pIndex }))
})

module.exports = router;