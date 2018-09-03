var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');
var folder = 'F:/Videos/';
var mimeTypes = {
  "ico": "image/x-icon",
  "ini": "text/ini",
  "srt": "text/plain",
  "txt":"text/plain",
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "js": "application/javascript",
  "css": "text/css",
  "mp4": "video/mp4",
  "avi": "video/avi",
  "mkv": "video/mkv",
  "mp3": "audio/*"
};


/* GET home page. */
router.use(express.static(path.join(__dirname, folder)));
router.get('/', function(req, res, next) {
  fs.readdir(folder, (err, files) => {
    res.render('index', {
      title: 'Express',
      layout: 'default',
      result: {
        pos: null,
        files: files
      }
    });
  })
});
router.post('/demo',(req,res,next)=>{
  var name=req.body;
  console.log(name);
  res.send(name);
  console.log("demo");
});
router.all('*', (req, res, next) => {
  fpath = folder + req.params[0];
  console.log(fs.lstatSync(fpath).isDirectory());
  if (fs.lstatSync(fpath).isDirectory()) {
    fs.readdir(folder + req.params[0], (err, files) => {
      res.render('index', {
        title: 'Express',
        layout: 'default',
        result: {
          files: files,
          pos: req.params[0]
        }
      });
    });
  } else {
    // res.write('<video id="videoPlayer" controls><source src="http:localhost:3000/"' + fpath + ' type="video/mp4"></video>');
    res.writeHead(200, {
      "Content-Type": mimeTypes[(fpath.split(".")[(fpath.split(".").length) - 1])]
    });
    //,"Content-Disposition": "attachment; filename=" + fpath//it download allt he file from the server   so it use on the server which i need to server
  //so it leads to download a file from the server

   // res.write('<video id="videoPlayer" controls><source src="http:localhost:3000/"' + fpath + ' type="video/mp4"></video>');
    var rs = fs.createReadStream(fpath,{name:fpath});
    rs.pipe(res);
    // res.render('index', {
    //   title: 'Express',
    //   layout: 'default',
    //   message:"it is  not a folder"
    // });
    // res.render('video',{layout:'default',name:req.params[0],contentType: mimeTypes[(fpath.split(".")[(fpath.split(".").length) - 1])]});
  }
});

function filemanger(req, res, next) {
  var pos = req.params[0];


}

module.exports = router;
