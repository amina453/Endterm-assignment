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
            serveStaticResource(res, "/style.css", "text/css")
            serveStaticResource(res, "/script.css", "text/javascript")
            serveStaticResource(res, "/img/welcome.jpg", "image/jpeg")
            break;
        case "/about":
            serveStaticResource(res, "/about.html", "text/html")
            serveStaticResource(res, "/style.css", "text/css")
            serveStaticResource(res, "/script.css", "text/javascript")
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
            serveStaticResource(res, "/style.css", "text/css")
            serveStaticResource(res, "/script.css", "text/javascript")
            serveStaticResource(res, "/img/cry.jpg", "image/jpeg")
            break;
    }
}).listen(3000)
