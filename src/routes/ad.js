const adRoutes = require('express').Router();
const Ad = require('../models/Ad');
const verifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

adRoutes.route('/').get(async (req, res) => {
  await Ad.find().sort({ lasttimestamp: -1 }).exec((err, ads) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(ads);
    }
  });
});

adRoutes.route('/search/:q').get(async (req, res) => {
  let regex = new RegExp(decodeURIComponent(req.params.q), 'i');
  await Ad.find({
    $or: [
      { 'name': regex },
      { 'company': regex },
      { 'description': regex },
      { 'category': regex },
      { 'keywords': regex }
    ]
  }).sort({ lasttimestamp: -1 }).exec((err, ads) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(ads);
    }
  });
});

adRoutes.route('/user').get(verifyToken, async (req, res, next) => {
  if (req.userid) {
    const ads = await Ad.find({ userid: req.userid });
    if (!ads) {
      return res.status(404).send("No ads found.");
    }
    res.status(200).json(ads);
  } else {
    return res.status(401).send({ auth: false, message: 'No token provided' });
  }
});

adRoutes.route('/new').post(verifyToken, async (req, res) => {
  if (req.userid) {
    var ad = new Ad(req.body);
    ad.userid = req.userid;
    ad.lasttimestamp = new Date().toJSON().slice(0, 19).replace('T', ' ');
    await ad.save()
      .then(ad => {
        res.status(200).json({ 'ad': 'Ad added successfully' });
      })
      .catch(err => {
        res.status(400).send("Unable to save to database");
      });
  }
});

adRoutes.route('/edit/:id').get(verifyToken, async (req, res) => {
  if (req.userid) {
    var id = req.params.id;
    await Ad.findById(id, function (err, ad) {
      ad.userid = req.userid;
      res.json(ad);
    });
  }
});

adRoutes.route('/update/:id').post(verifyToken, function (req, res) {
  if (req.userid) {
    Ad.findById(req.params.id, function (err, ad) {
      if (!ad)
        return next(new Error('Could not load Document'));
      else {
        ad.name = req.body.name;
        ad.company = req.body.company;
        ad.description = req.body.description;
        ad.link = req.body.link;
        ad.category = req.body.category;
        ad.userid = req.userid;
        ad.lasttimestamp = new Date().toJSON().slice(0, 19).replace('T', ' ');
        ad.save().then(ad => {
          res.json('Update complete');
        })
          .catch(err => {
            res.status(400).send("Unable to update the database");
          });
      }
    });
  }
});

adRoutes.route('/delete/:id').get(verifyToken, function (req, res) {
  if (req.userid) {
    Ad.findByIdAndRemove({ _id: req.params.id }, function (err, ad) {
      if (err) res.json(err);
      else res.json('Successfully removed');
    });
  }
});

module.exports = adRoutes;