const axios = require('axios')
const { response } = require('express')

exports.homeRoutes = (req,res) => {
    //make a get request 
    axios.get('http://localhost:8000/api/users')
        .then(resposne => {
            console.log(resposne.data);
            res.render('index.ejs',{users : response.data})
        })
        .catch(err => {
            res.send(err);
        })
}

exports.addUser = (req,res) => {
    res.render('add-user.ejs')
}

exports.updateUser = (req,res) => {
    res.render('update-user.ejs')
}