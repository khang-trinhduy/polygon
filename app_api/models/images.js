var mongoose = require("mongoose");
const { fileSchema } = require("./file");

var polygonSchema = new mongoose.Schema({
  points: { type: String, required: true },
  color: { type: String, required: false, default: "#19c9d2bd" },
  tooltips: [
    {
      color: { type: String, default: "rgba(255, 255, 255, 0.88)" },
      fixed: { type: Boolean, default: true },
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      width: { type: Number },
      height: { type: Number },
      header: {
        color: { type: String, default: "#4c4c4c" },
        font: { type: String, default: "26pt auto" },
        name: { type: String, required: true },
        x: { type: Number },
        y: { type: Number }
      },
      content: {
        color: { type: String, default: "#333" },
        font: { type: String, default: "14pt auto" },
        name: { type: String, required: true },
        x: { type: Number },
        y: { type: Number }
      }
    }
  ],
  target: { type: String, default: "https://google.com" },
  room: { type: String, default: "a" },
  type: { type: String, default: "lr1" },
  pdf: { fileSchema }
});

var imageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  name: { type: String },
  polygons: [polygonSchema],
  statistic: {
    total_polygons: { type: Number, min: 0 }
  },
  createdOn: { type: Date, default: Date.now }
});

mongoose.model("Image", imageSchema);
