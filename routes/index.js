var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { 
    title: 'Weight Tracker' });
});

/* GET about me page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'about my tracker' });
});

/* GET projects page. */
router.get('/tracker', function(req, res, next) {
  res.render('tracker', { title: 'Weight Tracker' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});
module.exports = router;