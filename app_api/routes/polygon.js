var express = require("express");
var router = express.Router();
var imageCtrl = require("../controllers/image.js");
var polygonCtrl = require("../controllers/polygon");

/* GET images listing. */
router.get("/images", imageCtrl.imagesList);
router.get("/images/:id", imageCtrl.imageReadOne);
router.get("/images/:id/polygons", imageCtrl.polygonListByImage);
router.put("/images/:id", imageCtrl.imageUpdateOne);
router.post("/images", imageCtrl.imageCreate);
router.post("/images/upload", imageCtrl.imageUpload);
router.delete("/images/:id", imageCtrl.imageDeleteOne);
/* polygon */
router.get("/polygons", polygonCtrl.polygonsList);
router.get("/polygons/:id", polygonCtrl.polygonsReadOne);
router.put("/polygons/:id", polygonCtrl.polygonsUpdateOne);
// router.post("/polygons", polygonCtrl.polygonsCreate);
router.delete(
  "/images/:imageid/polygons/:polygonid",
  polygonCtrl.polygonsDeleteOne
);
router.post("/images/:imageid/polygons", polygonCtrl.polygonsCreate);

module.exports = router;
