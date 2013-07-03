"use strict";

var os = require("os");
var express = require("express"),
    app = express();

var LOAD_THRESHOLD = process.env.LOAD_THRESHOLD || os.cpus().length;

app.get("/healthcheck", function(req, res) {
  var loadavg = os.loadavg();

  if (loadavg[0] > LOAD_THRESHOLD) {
    return res.send(500, loadavg);
  }

  return res.send(loadavg);
});

app.listen(process.env.PORT || 8080, function() {
  console.log("Listening at http://%s:%d/", this.address().address, this.address().port);
});
