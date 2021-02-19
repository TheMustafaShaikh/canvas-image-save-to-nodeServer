var upload = require('express-fileupload')
var express = require('express');
var app = express();
var fs = require('fs');
var app = express();
var base64 = require('base-64')

app.use(express.json());
app.use(express.urlencoded());
app.use(upload())


app.get("/", function(req, res) {
    res.send("Hello from server!");
});



app.get("/test", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})


function writeFileToSystem(buf) {
    fs.writeFile("upload/image.png", buf, function(err) {
        console.log("The file was saved!");
    });
}

app.post("/test", function(req, res) {
    var post = "";

    post = JSON.parse(req.body.canvas);
    var data = post.replace(/^data:image\/\w+;base64,/, "");
    var buf = Buffer.from(data, 'base64');
    writeFileToSystem(buf);

})



app.listen(3000);