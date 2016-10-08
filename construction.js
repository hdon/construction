var fs = require('fs');
var http = require('http');
var allowedFiles = {
  '/': {
    filename: 'construction.html'
  , status: 503
  , type: 'text/html'
  }
, '/favicon.ico': {
    filename: 'favicon.ico'
  , status: 200
  , type: 'text/html'
  }
, '/poster.jpeg': {
    filename: 'poster.jpeg'
  , status: 200
  , type: 'image/jpeg'
  }
, '/video.mp4': {
    filename: 'video.mp4'
  , status: 200
  , type: 'video/mp4'
  }
};
var server = http.createServer((req, res) => {
  var rs;
  var params;

  console.log(req.url);

  params = req.url in allowedFiles
  ? allowedFiles[req.url]
  : allowedFiles['/'];

  res.writeHead(params.status, {
    'Content-Type':   params.type
  , 'Cache-Control':  'no-cache, no-store, must-revalidate'
  , 'Pragma':         'no-cache'
  , 'Expires':        '0'
  });

  rs = fs.createReadStream(params.filename);
  rs.pipe(res);
  rs.on('end', () => {
    res.end();
  });
});
server.listen(8888);
