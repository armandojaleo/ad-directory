const companyRoutes = require('express').Router();
const Company = require('../models/Company');
const verifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

companyRoutes.route('/').get(async (req, res) => {
  await Company.find().sort({ lasttimestamp: -1 }).exec((err, companies) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(companies);
    }
  });
});

companyRoutes.route('/:id').get(async (req, res) => {
  //if (req.userid) {
    const {id} = req.params;
    await Company.findById(id).then(company => {
      res.status(200).json(company);
    });
  //}
});

companyRoutes.route('/search/:q').get(async (req, res) => {
  let regex = new RegExp(decodeURIComponent(req.params.q), 'i');
  await Company.find({
    $or: [
      { 'name': regex },
      { 'identification': regex },
      { 'description': regex },
      { 'phone': regex },
      { 'link': regex },
      { 'keywords': regex },
    ]
  }).sort({ lasttimestamp: -1 }).exec((err, companies) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(companies);
    }
  });
});

companyRoutes.route('/user').get( async (req, res, next) => {
  //if (req.userid) {
    const companies = await Company.find({ userid: req.userid });
    if (!companies) {
      return res.status(404).send("No companies found.");
    }
    res.status(200).json(companies);
  /*} else {
    return res.status(401).send({ auth: false, message: 'No token provided' });
  }*/
});

companyRoutes.route('/new').post(verifyToken, async (req, res) => {
  if (req.userid) {
    var company = new Company(req.body);
    company.userid = req.userid;
    company.lasttimestamp = new Date().toJSON().slice(0, 19).replace('T', ' ');
    await company.save()
      .then(company => {
        res.status(200).json({ 'Company': 'Company added successfully' });
      })
      .catch(err => {
        res.status(400).send("Unable to save to database");
      });
  }
});

companyRoutes.route('/edit/:id').get(verifyToken, async (req, res) => {
  if (req.userid) {
    var id = req.params.id;
    await Company.findById(id, function (err, company) {
      company.userid = req.userid;
      res.json(company);
    });
  }
});

companyRoutes.route('/update/:id').post(verifyToken, function (req, res) {
  if (req.userid) {
    Company.findById(req.params.id, function (err, Company) {
      if (!Company)
        return next(new Error('Could not load Document'));
      else {
        Company.name = req.body.name;
        Company.identification = req.body.identification;
        Company.description = req.body.description;
        Company.phone = req.body.phone;
        Company.link = req.body.link;
        Company.keywords = req.body.keywords;
        Company.userid = req.userid;
        Company.lasttimestamp = new Date().toJSON().slice(0, 19).replace('T', ' ');
        Company.save().then(Company => {
          res.json('Update complete');
        })
          .catch(err => {
            res.status(400).send("Unable to update the database");
          });
      }
    });
  }
});

companyRoutes.route('/delete/:id').get(verifyToken, function (req, res) {
  if (req.userid) {
    Company.findByIdAndRemove({ _id: req.params.id }, function (err, Company) {
      if (err) res.json(err);
      else res.json('Successfully removed');
    });
  }
});

module.exports = companyRoutes;