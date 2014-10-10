var book1 = $('#book1');
var book2 = $('#book2');
var book3 = $('#book3');
var book4 = $('#book4');
var book5 = $('#book5');
var fullStar = 'fa fa-star';
var halfStar = "fa fa-star-half";
var emptyStar = "fa fa-star-o";
var altHalfStar = "fa fa-star-half-o";
var close = "fa fa-times";
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var profileTemplate = $('#profile-template');
var bookProfileTemplate = $('#book-template');
var genreProfileTemplate = $('#genre-template');
var bookPopupTemplate = $('#book-popup-template');
var tagTemplate = $('#tag-template');
var friendTemplate = $('#friend-thumbnail-template');
var dangerAlert = $('<div class="alert alert-danger alert-dismissible" role="alert" id=\'login-danger\'><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true"> &times;</span><span class="sr-only">Close</span></button></div>');
var successAlert = $('<div class="alert alert-success alert-dismissible" role="alert" id=\'login-danger\'><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true"> &times;</span><span class="sr-only">Close</span></button></div>');
var alertClose = $('<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true"> &times;</span><span class="sr-only">Close</span></button>');
var userInfoDiv = $('<div class="row"><div class="user-info col-md-9 col-md-offset-1"></div></div>');

////////////////////////////
// CONSTRUCTOR CREATION:  //
////////////////////////////


var Library = function(){
	this.books = [];
	this.users = [];
	this.genres = [];
	this.authors = [];
	this.currentUser = 0;
};

var User = function(firstName, lastName, userName, img, password, featured){
	this.userName = userName;
	this.firstName = firstName;
	this.lastName = lastName;
	this.password = password;
	this.title = 'the green';
	this.titles = [];
	this.img = img || "http://placekitten.com/g/310/300";
	this.favoriteBooks = [];
	this.favoriteGenres = [];
	this.favoriteAuthors = [];
	this.booksRead = [];
	this.booksRated = [];
	this.friends = [];
	this.featured = featured;
	
};
var Book = function(name, author, id, img){
	this.name = name;
	this.author = author;
	this.img = img || 'http://placekitten.com/g/220/300';
	this.description;
	this.genres = [];
	this.tags = [];
	this.likers = [];
	this.rating = [];
	this.avgRating = 0;
	this.idNumber = id;
};
var Genre = function(name, title){
	this.name = name;
	this.books = [];
	this.title= title;
	this.likers = [];	
};
var Author = function(name){
	this.name = name;
	this.books = [];
	this.likers = [];
};


