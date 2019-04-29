var express = require('express');
var router = express.Router();
let multer = require('multer');
var upload= require('../services/uploadMongo.service');
var uploadFile = require('../models/upload');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var path = require('path');
const fs = require('fs');
var Archiver = require('archiver');
var metaDataModel = require('../models/modelsMetadata');

var Busboy = require('busboy');


router.post('/models', (req,res) => {
  console.log(req.body);

  try {
    metaDataParser(req.body.metaInfo);
  } catch (error) {
    console.log(error);
  }

  uploadFile.create(req.body, function (err, post) {
    console.log(req.body);
    if (err) return console.log("Error in creating model : "+err);
    res.json(post);
  });
});

router.get('/models', function (req, res, next) {
  console.log('inside models')
  var name = req.query.name;
  var userID = req.query.userID;

  console.log(name)
  console.log(userID)

  if ((name != undefined && name != "" && name != null) && (userID != undefined && userID != "" && userID != null)){
    console.log('both name and userID are given')
    uploadFile.find({"name": name, "userId": userID}, function (err,post){
      if (err) return next(err);
      console.log(post)
      res.json(post);
    });
  } else if ((userID != undefined && userID != "" && userID != null)){
    console.log('userId is given')
    uploadFile.find({"userId": userID}, function (err,post){
      if (err) return next(err);
      console.log(post)
      res.json(post);
    });
  } else if((name == undefined ) && (userID == undefined)) {
    console.log('name and userId are not given')
    uploadFile.find(function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  }
});

router.get('/models/:name', function(req, res, next){
  console.log("inside routes for uploadMongo")
  uploadFile.find({"name": req.params.name}, function (err,post){
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/files', (req, res) => {

  try{
  // var wholeData = '';
  // //busboy is used to interpret streaming request
  // var busboy = new Busboy({ headers: req.headers });
  // let formData = new Map();
  // //busboy to extract form data
  // busboy.on('field', function(fieldname, val) {
  //  // console.log("Entered bus boy")
  //   formData.set(fieldname, val);
  // });
  // //busboy to extract file information
  // busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

  //   console.log(filename);
  //   if(/_metadata.txt/.test(filename)){

  //     console.log('File [' + fieldname + ']: filename: ' + filename);

  //     file.on('data', function(data) {
  //       wholeData+=data;
  //     });
  //     file.on('end', function() {
  //       console.log(wholeData.toString());
  //       let obj = {};
  //       let splitted = wholeData.toString().split("\n");
  //       for (let i = 0; i<splitted.length-1; i++) {
  //         let splitLine = splitted[i].split(":");
  //         obj[splitLine[0]] = splitLine[1].replace(/(\r\n|\n|\r)/gm,"");
  //       }
  //       // loop form data as key value pairs and pushed to existing "obj"
  //       for (var entry of formData.entries()) {
  //         obj[entry[0]]  = entry[1];
  //       }
  //       metaDataModel.create(obj, function (err, data) {
  //       })
  //       //console.log(obj);
  //     });
  //   }

  // });
  // // Listen for event when Busboy is finished parsing the form.
  // busboy.on("finish", function() {
  //   //console.log(formData) // Map { 'name' => 'hi', 'number' => '4' }

  // });


  upload(req,res, (err) => {
    if(err){
      console.log("Error in uploading file : "+err);
      return res.status(501).json({error : err});
    }
    res.json({error_code:0, error_desc: null, file_uploaded: true, file_id: req.file.id});
  });
  //req.pipe(busboy);
}
catch(err)
{
  res.json(err);
}


});

router.get('/files/:fileReferenceID', function(req, res, next){
  console.log("inside routes for fileReferenceID")
  let filesData = [];
  let count = 0;

  var conn = mongoose.connection;
  var gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploadFiles'); // set the collection to look up into

  gfs.files.find({}).toArray((err, files) => {
    // Error checking
    if(!files || files.length === 0){
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    res.json(files.filter((file) => file._id == req.params.fileReferenceID ));
  });
});

router.get('/chunks/:fileID', function(req, res, next){
  console.log("inside routes for fileID")
  let filesData = [];
  let count = 0;

  var conn = mongoose.connection;
  var gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploadFiles'); // set the collection to look up into
  console.log(req.params.fileID);
  gfs.files.findOne({ filename: "LSTM_011019-173749_architecture.jpg" }, (err, file) => {
    // Check if the input is a valid image or not
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // If the file exists then check whether it is an image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});


router.get('/zipfiles', (req, response) => {

  response.writeHead(200, {
    'Content-Type': 'application/zip',
    'Content-disposition': 'attachment; filename=myFile.zip'
  });
  var zip = Archiver('zip');

  // Send the file to the page output.
  zip.pipe(response);

  // Create zip with some files. Two dynamic, one static. Put #2 in a sub folder.
  // zip.append('Some text to go in file 1.', { name: '1.txt' })
  //   .append('Some text to go in file 2. I go in a folder!', { name: 'somefolder/2.txt' })
  //   .file('./routes/input.txt', { name: '3.txt' })
  //   .finalize();
  zip.directory('../uploads/', false)
    .finalize();

  //res.download("./routes/input.txt");


});

// Route for getting all the files
router.get('/files', (req, res, next) => {
  console.log("inside files donwload endpoint-----")
  let filesData = [];
  let count = 0;

  var conn = mongoose.connection;
  var gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploadFiles'); // set the collection to look up into

  gfs.files.find({}).toArray((err, files) => {
    // Error checking
    if(!files || files.length === 0){
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }

    // Loop through all the files and fetch the necessary information
    files.forEach((file) => {
      filesData[count++] = {
        id: file._id,
        filename: file.filename,
        contentType: file.contentType
      }
    });
    console.log(filesData)
    res.json(filesData);
  });
});


function metaDataParser(metaInfo) {
  var conn = mongoose.connection;
  var gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploadFiles'); // set the collection to look up into
  var readStream = gfs.createReadStream({
    _id: metaInfo.file_id
  });
  const chunks = [];
  var str = '';
  readStream.on("data", function (chunk) {
    chunks.push(chunk);
  });
  // Send the buffer or you can put it into a var
  readStream.on("end", function () {
    str = Buffer.concat(chunks).toString();
    let obj = {};
    let splitted = str.split("\n");
    for (let i = 0; i < splitted.length - 1; i++) {
      let splitLine = splitted[i].split(":");
      obj[splitLine[0]] = splitLine[1].replace(/(\r\n|\n|\r)/gm, "");
    }
    // loop form data as key value pairs and pushed to existing "obj"
    // for (var entry of formData.entries()) {
    //   obj[entry[0]]  = entry[1];
    // }

    obj.Author= metaInfo.Author;
    obj.categoryID= metaInfo.categoryID;
    obj.model_name= metaInfo.model_name;
    obj.experiment= metaInfo.experiment;
    metaDataModel.create(obj, function (err, data) {
      if(err)
      console.log(err);
    });
  });
}


module.exports = router;


