var mongoose = require("mongoose");
var Images = mongoose.model("Image");

var sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

exports.polygonsList = (req, res, next) => {
  if (!req.params.imgid) {
    sendJsonResponse(res, 404, "imageid required");
  }
  Images.findById(req.params.imgid)
    .select("name path polygons")
    .exec((err, image) => {
      if (err) {
        sendJsonResponse(res, 400, err);
      } else if (!image || !image.polygons) {
        sendJsonResponse(res, 404, `image id ${req.params.imageid} not found`);
      } else {
        if (image.polygons.length <= 0) {
          sendJsonResponse(
            res,
            404,
            `image id ${req.params.imageid} has no polygon`
          );
        } else {
          sendJsonResponse(res, 200, image.polygons);
        }
      }
    });
};

exports.polygonsReadOne = (req, res, next) => {
  Images.find({}, (err, result) => {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      if (result) {
        sendJsonResponse(res, 200, result);
      } else {
        sendJsonResponse(res, 404, `polygons not found`);
      }
    }
  });
};
exports.polygonsUpdateOne = (req, res, next) => {
  Images.find({}, (err, result) => {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      if (result) {
        sendJsonResponse(res, 200, result);
      } else {
        sendJsonResponse(res, 404, `polygons not found`);
      }
    }
  });
};
exports.polygonsCreate = (req, res, next) => {
  if (!req.params.imageid) {
    sendJsonResponse(res, 404, { message: "image id required" });
  } else {
    Images.findById({ _id: req.params.imageid }, (err, image) => {
      if (err) {
        sendJsonResponse(res, 404, { error: err });
      } else {
        if (!image) {
          sendJsonResponse(res, 404, `images ${req.params.imageid} not found`);
        } else {
          let polygons = req.body.polygons;
          if (!polygons || polygons.length <= 0) {
            sendJsonResponse(res, 400, { error: "invalid polygons" });
          } else {
            if (!image.statistic) {
              image.statistic = {
                total_polygons: 0
              };
            }
            polygons.forEach(p => {
              image.polygons.push(p);
              image.statistic.total_polygons++;
            });
            image.save(error => {
              if (error) {
                sendJsonResponse(res, 404, { error: error });
              } else {
                sendJsonResponse(res, 200, {
                  message: `image updated`,
                  content: image
                });
              }
            });
          }
        }
      }
    });
  }
};
exports.polygonsDeleteOne = (req, res, next) => {
  if (!req.params.imageid) {
    sendJsonResponse(res, 404, { message: "image id required" });
  } else {
    Images.findById({ _id: req.params.imageid })
      .select("name path polygons statistic")
      .exec((err, image) => {
        if (err) {
          sendJsonResponse(res, 404, { error: err });
        } else {
          if (!image) {
            sendJsonResponse(
              res,
              404,
              `images ${req.params.imageid} not found`
            );
          } else {
            let polygons = image.polygons;
            if (!polygons || polygons.length <= 0) {
              sendJsonResponse(res, 400, {
                error: "image doesn't has any polygons"
              });
            } else {
              if (!image.statistic) {
                sendJsonResponse(res, 400, {
                  error: "image doesn't allow to create polygon"
                });
              } else {
                if (!req.params.polygonid) {
                  sendJsonResponse(res, 404, { error: "polygon id required" });
                } else {
                  if (!req.params.polygonid) {
                    sendJsonResponse(res, 404, {
                      error: "polygon id required"
                    });
                  } else {
                    var polygon = polygons.id(req.params.polygonid);
                    if (!polygon) {
                      sendJsonResponse(res, 404, {
                        error: `image ${req.params.imageid} doesn't has polygon with id ${req.params.polygonid}`
                      });
                    } else {
                      image.polygons.id(req.params.polygonid).remove();
                      image.statistic.total_polygons--;
                      image.save(error => {
                        if (error) {
                          sendJsonResponse(res, 404, { error: error });
                        } else {
                          sendJsonResponse(res, 204, {
                            message: `polygon removed`,
                            content: {
                              polygons: image.polygon,
                              statistic: image.statistic
                            }
                          });
                        }
                      });
                    }
                  }
                }
              }
            }
          }
        }
      });
  }
};
