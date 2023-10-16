const express = require('express');
const { sequelize, Users, Zaposleni } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/users', (req, res) => {
    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/zaposleni', (req, res) => {
    Zaposleni.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});


route.get('/zaposleni/:id', (req, res) => {
    const id = req.params.id;
    Zaposleni.findOne({where: {id: id}})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/zaposleni', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
                Zaposleni.create({jmbg:req.body.jmbg, ime:req.body.ime, prezime:req.body.prezime, email:req.body.email, adresa:req.body.adresa, pozicija:req.body.pozicija, 
                datum_zaposlenja:req.body.datum_zaposlenja, nadredjeni:req.body.nadredjeni, status:req.body.status})
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
    })
});

route.delete('/zaposleni/:id',(req, res) =>{
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            const id = req.params.id;
            Zaposleni.destroy({where: {id: id}})
                .then(removed => {
                    if(removed){
                        res.status(204).end();
                    }
                }).catch(err =>{
                    res.status(500).json({err})
                });
    })
});

route.put('/zaposleni/:id', (req, res) =>{
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            const id = req.params.id;
            Zaposleni.update({jmbg:req.body.jmbg, ime:req.body.ime, prezime:req.body.prezime, email:req.body.email, adresa:req.body.adresa, pozicija:req.body.pozicija,
                 nadredjeni:req.body.nadredjeni, status:req.body.status}, {where: {id: id}}, req.body, function (err, zaposleni) {
            res.send(zaposleni);
            });
    })
});

module.exports = route;