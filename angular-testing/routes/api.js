var express = require('express');
var router = express.Router();

router.route('/posts')

.get(function(req, res){

	res.send({message: 'TODO return all posts'});

})

.post(function(req, res){
	res.send({message: 'TODO create a new post'});
});

router.route('/posts/:id')
.get(function(req, res){
	res.send({message: 'TODO return post with id ' + req.params.id});
})
.put(function(req,res){
	res.send({message: 'TODO modify post with id ' + req.params.id})
})
.delete(function(req,res){
	res.send({message: 'TODO delete post with id ' + req.params.id})
})
module.exports = router;
