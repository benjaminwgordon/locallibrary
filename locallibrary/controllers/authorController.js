var Author = require('../models/author');
var Book = require('../models/book');
var async = require('async');

//Display list of all Authors.
exports.author_list = function(req, res, next) {
    Author.find()
      .populate('author')
      .distinct('name')
      .sort([['family_name', 'ascending']])
      .exec(function (err, list_authors) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('author_list', { title: 'Author List', author_list: list_authors });
      });
  };

//Display detail page for a specific author.
exports.author_detail = function(req, res, next){
    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
              .exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id },'title summary')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
    });
};

//Display Author create form on GET
exports.author_create_get = function(req, res) {
    res.send('TODO: Author create get');
};

//Handle Author create on POST.
exports.author_create_post = function (req, res){
    res.send('TODO: author create post');
};

//Display Author delete form on GET.
exports.author_delete_get = function(req, res){
    res.send('TODO: Author delete get');
};

//Handle Author delete on POST
exports.author_delete_post = function(req, res){
    res.send('TODO: author delete post');
};

//Display Author update form on GET
exports.author_update_get = function(req, res){
    res.send('TODO: author update get');
};

//Handle Author update form on POST
exports.author_update_post = function(req, res){
    res.send('TODO: author update post');
};
