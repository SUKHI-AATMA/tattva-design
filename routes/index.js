var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home');
});

router.get('/work', function(req, res, next) {
  res.render('work', {page:'Work', menuId:'work',data: {"results":[{"rowIndex":1,"id":"TD001","homeimg":"images/home-slider/kalon-thumb.jpg","img":"images/work/thumbnail/kalon-thumb.jpg","title":"Kalon","desc":"Positioning, Messaging, Brand Identity, Design (UI/UX), Brand Communication, Product and packaging design.","category":"branding illustration web","styles":"background:#fbc309","status":"show"},{"rowIndex":2,"id":"TD002","homeimg":"images/home-slider/TCC-thumb.jpg","img":"images/work/thumbnail/the-chalk-co-thumb.jpg","title":"The Chalk Company","desc":"Positioning and Branding","category":"branding web","styles":"background:#df5842","status":"show"},{"rowIndex":3,"id":"TD003","homeimg":"images/home-slider/natures-thumb.jpg","img":"images/work/thumbnail/natures-pride-thumb.jpg","title":"Nature's Pride","desc":"Positioning, Messaging, Brand Identity, Design (UI/UX), Brand Communication, Product and packaging design.","category":"illustration web","styles":"background:#b2cf33","status":"show"},{"rowIndex":4,"id":"TD004","homeimg":"images/home-slider/ChitraKatha-thumb.jpg","img":"images/work/thumbnail/ChitraKatha-thumb.jpg","title":"ChitraKatha","desc":"Positioning, Brand Identity, Brand Architecture, Space Design, Illustration, Creative Direction.","category":"branding illustration space design","styles":"background:#73bb95","status":"show"}]}});
});
module.exports = router;
