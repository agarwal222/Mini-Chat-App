const express = require('express');
const http = require('http');
const app  = express();

app.get('/:user_name&:email', check, (req,res ) => {
    res.send(req.params)
    console.log(req.params);
})

function check(req, res, next){
    console.log("it ran now");
    next();
}

app.listen(3000 , () => (
    console.log("Server running")
))