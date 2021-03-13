var http = require("http")
var fs = require("fs")
function serveStaticResource(messageType, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data){
        if(err) {
            messageType.writeHead(500, {"Content-Type" : "text/plain"})
            messageType.end("500 - Internal error")
        }
        else {
            messageType.writeHead(responseCode, {"Content-Type": contentType})
            messageType.end(data)
        }
    })
}
http.createServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch(path) {
        case "":
            serveStaticResource(res, "/index.html", "text/html")
            break;
        case "/style.css":
            serveStaticResource(res, "/style.css", "text/css")
            break;
        case "/script.js":
            serveStaticResource(res, "/script.js", "text/javascript")
            break;
        case "/img/welcome.jpg":
            serveStaticResource(res, "/img/welcome.jpg", "image/jpeg")
            break;
        case "/about":
            serveStaticResource(res, "/about.html", "text/html")
            break;
        case "/img/about.jpg":
            serveStaticResource(res, "/img/about.jpg", "image/jpeg")
            break;
        case "/img/gallery/graduation":
            serveStaticResource(res, "/img/gallery/graduation.jpg", "image/jpeg")
            break;
        case "/img/gallery/study":
            serveStaticResource(res, "/img/gallery/study.jpg", "image/jpeg")
            break;
        case "/video/students/memes":
            serveStaticResource(res, "/video/students/memes.mp4", "video/mp4")
            break;
        default:
            serveStaticResource(res, "/error.html", "text/html", 404)
            break;
        case "/img/cry.jpg":
            serveStaticResource(res, "/img/cry.jpg", "image/jpeg")
            break;
    }
}).listen(3000)
console.log(`server is working`);
