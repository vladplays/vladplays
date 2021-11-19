let app=require('express')();

app.get('/', function(req, res){
	res.sendfile('index.html')
})

app.get('/:path', function(req, res){
	res.sendfile(__dirname+'/'+req.params.path);
})
app.get('/:path/:file', function(req, res){
	res.sendfile(__dirname+'/'+req.params.path+'/'+req.params.file);
}) 

app.listen(8080)