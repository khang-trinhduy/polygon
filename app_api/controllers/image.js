var mongoose = require("mongoose");
var Images = mongoose.model("Image");
var multer = require("./multer");

var sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

exports.imagesList = (req, res, next) => {
  Images.find({}, (err, images) => {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, images);
    }
  });
};
exports.imageReadOne = (req, res, next) => {
  if (!req.params.id) {
    sendJsonResponse(res, 404, { message: "image id required" });
  }
  Images.findOne({ _id: req.params.id }, (err, image) => {
    if (err) {
      sendJsonResponse(res, 404, {
        error: `image id ${req.params.id} not found`
      });
    } else {
      sendJsonResponse(res, 200, { image: image });
    }
  });
};

exports.polygonListByImage = (req, res, next) => {
  Images.find({}, (err, images) => {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, images);
    }
  });
};

exports.imageUpdateOne = (req, res, next) => {
  Images.find({}, (err, images) => {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, images);
    }
  });
};

exports.imageUpload = (req, res, next) => {
  multer.upload(req, res, err => {
    if (err instanceof multer.error) {
      sendJsonResponse(res, 400, { message: "multer error", error: err });
    } else if (err) {
      sendJsonResponse(res, 400, { message: "server error", error: err });
    } else {
      sendJsonResponse(res, 201, { file: req.file, message: "file uploaded" });
    }
  });
};

exports.imageCreate = (req, res, next) => {
  if (!req.body.path) {
    sendJsonResponse(res, 400, { message: "image path required" });
  } else {
    let length = 0;
    if (req.body.polygons) {
      length = req.body.polygons.length;
    }
    Images.create(
      {
        name: req.body.name,
        path: req.body.path,
        polygons: req.body.polygons,
        statistic: { total_polygons: length }
      },
      (err, images) => {
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          sendJsonResponse(res, 201, images);
        }
      }
    );
  }
};

exports.imageDeleteOne = (req, res, next) => {
  Images.find({}, (err, images) => {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, images);
    }
  });
};
