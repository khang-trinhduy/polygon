var multer = require("multer");
var cryptoRandomString = require("crypto-random-string");

var randomString = () => {
  return cryptoRandomString({ length: 5 });
};

var dayToString = () => {
  let date = new Date();
  let day = date.getDay();
  let month = date.getMonth();
  let year = date.getUTCFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let result = `${year}-${month}-${day}_${hour}-${minutes}-${seconds}`;
  console.log(result);
  return result;
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${randomString()}-${dayToString()}${file.originalname}`);
  }
});

var allowedFileType = str => {
  str = str.toLowerCase();
  return str.endsWith("jpg") || str.endsWith("jpeg") || str.endsWith("png");
};

var onFileUploadStart = file => {
  console.log(file.originalname + " is starting ...");
};

var onFileUploadCOmplete = file => {
  console.log(file.fieldname + "uploaded to " + file.path);
};

var maxFileSize = 10485760;

var filter = (req, file, cb) => {
  if (!allowedFileType(file.mimetype)) {
    cb(`file's type is not allowed: ${file.mimetype}`, false);
  } else {
    cb(null, true);
  }
};

var limits = {
  files: 2,
  fileSize: maxFileSize
};

exports.upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: filter
}).single("image");

exports.error = multer.MulterError;
