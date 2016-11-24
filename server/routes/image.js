"use strict";

var express = require("express");
var router = express.Router();
var fs = require("fs");

router.post("/upload", function (req, res) {
    console.log(req.body);

    fs.readFile(req.files.displayImage.path, function (err, data) {
        // ...
        var newPath = __dirname + "/public/uploads/";
        //console.log(newPath);
        //console.log(req.files);
        //   fs.writeFile(newPath, data, function (err) {
        //     res.redirect("back");
        //   });
        res.json({ state: "success" });
    });
});

module.exports = router;
