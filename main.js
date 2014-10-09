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

////////////////////////////
// CONSTRUCTOR CREATION:  //
////////////////////////////


var Library = function(){
	this.books = [];
	this.users = [];
	this.genres = [];
	this.authors = [];
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
};
var Author = function(name){
	this.name = name;
	this.books = [];
};



//////////////////////
// LIBRARY METHODS //
//////////////////////

Library.prototype.addUser = function(firstName, lastName, userName, image){
	var newUser = new User(firstName, lastName, userName, image);
	console.log('user: ' + firstName + ' '+ lastName +" has been created!");
	this.users.push(newUser);
	newUser.profile();
};

Library.prototype.addBook = function(name, author, img){

	var id = +(mainLibrary.books.length)+1;
	var newBook = new Book(name, author, id, img);
	console.log('book: ' + name + ' by: '+ author +" has been created! Index Number: " + id);
	this.books.push(newBook);
	newBook.profile();
};

Library.prototype.addGenre = function(name, title){

	var newGenre = new Genre(name, title);
	this.genres.push(newGenre);
	newGenre.profile();

}

Library.prototype.suggestExistingName = function(string){
	var matchArray = string.toLowerCase().split('');
	
	var toMatch = $.grep(matchArray, function(object, i){
		return alphabet.indexOf(matchArray[i]) !== -1;
	});
	toMatch = toMatch.join('');
	
	var bookArray = this.books;

	var suggestion = $.grep(bookArray, function(object, i){
			// retrieve name of book from current object
			var existMatch = bookArray[i].name;

			// take new array of name letters and return alpha characters only
			existMatch = $.grep(existMatch, function(object, i){
				return alphabet.indexOf(existMatch[i].toLowerCase()) !== -1;
				});
			
			existMatch = existMatch.join('').toLowerCase();

			return existMatch === toMatch;
	});

	return suggestion[0];
};


//////////////////
// USER METHODS //
//////////////////


	// update profile image
	User.prototype.renderImage = function(){
		$(this.element)
			.find('.user-image')
			.attr('src', this.img)
			.attr('alt', this.firstName + ' ' + this.lastName);
	};

	// update name and title
	User.prototype.renderNameTitle = function(){
		this.element
		.find('.prof-name')
		.text(this.firstName + ' ' + this.lastName)
		.append($('<span>'))
		.find('span')
		.addClass('title')
		.text(" " + this.title);
	};


// Method for creating a new user:

User.prototype.profile = function(){

	// return profile element if it already exists
	if(this.element) return this.element;

	var name = this.firstName + ' ' + this.lastName;
	// clone template item if it does not exist
	this.element = profileTemplate.clone();
	this.element.attr('id', '');

	console.log(this);
	
	// remove template id, insert user image and set alt tag
	this.renderImage();

	// set profile name to user and add "title" tag
	this.renderNameTitle();

	this.popup(name, this.title, this.img);

	var user = this;
	// fill in favorite books section of profile
	$.each(this.favoriteBooks, function(i, book){
		var button = tagTemplate.clone();

		button.attr('id', '')
			.text(book.name);
		user.element.find('#fav-books')
			.append(button);

		button.on('mouseover', function(){
			button.after(book.popupBox);
		});
		button.on('mouseout', function(){
			button.siblings('.bk-popup').detach();
		});
	});

	// fill in favorite genres section on the profile
	$.each(this.favoriteGenres, function(i, genre){
		var button = tagTemplate.clone();

		button.attr('id', '')
			.text(genre.name);
		this.element.find('#fav-genres')
			.append(button);
	});

	// fill in favorite authors section on profile
	$.each(this.favoriteAuthors, function(i, author){
		var button = tagTemplate.clone();

		button.attr('id', '')
			.text(author.name);
		this.element.find('#fav-authors')
			.append(button);
	});

	// fill in friend thumbnails on profile with 8 random friends
	console.log('random friends: ', this.friends[0]);
	if(this.friends.length === 1){
		var friend = this.friends[0];
		var thumbnail = this.element.find('#friend1');

		thumbnail.attr('src', this.friends[0].img)
			.removeClass('hidden');
		thumbnail.on('mouseover', function(){
			thumbnail.after(friend.popupBox);
		});
		thumbnail.on('mouseout', function(){ 
			thumbnail.siblings('.bk-popup').detach();
		});

	} else {
	$.each(this.randomFriends(), function(i, friend){
		var thumbnail = this.element.find('#friend'+ i);

		thumbnail.attr('src', friend.img)
			.attr('alt', friend.firstName + " " + friend.lastName)
			.removeClass('hidden');
	});
	}

	return this.element;
};

	// create popup for user profile
	User.prototype.popup = function(name, title, img){
	if(this.popupBox) return this.popupBox;
	console.log('popup call', this);

	
	this.popupBox = bookPopupTemplate.clone();

	this.popupBox
		.attr('id', '')
		.find('img')
		.attr('src', img);
	this.popupBox
		.find('.rating')
		.remove();
	console.log('this.popupBox', name + title);
	this.popupBox
		.find('.col-md-8')
		.append($('<h3>'+ name +'</h3>'))
		.append($('<h5>'+ title +'</h5>'));

		
	return this.popupBox;
};


	// show profile on page
	
	User.prototype.showProfile = function(){
		$('.profile-show').append(this.element);
	};

	// hide profile on page
	User.prototype.hideProfile = function(){
		$.remove(this.element);
	};


	// generates an array of 8 random friends
	User.prototype.randomFriends = function(){
		return _.shuffle(this.friends).slice(0,7);
	};

	// add friend or follower
	User.prototype.addFriend = function(user){
		this.friends.push(user);
	};

	// remove friend or follower
	User.prototype.removeFriend = function(user){
		this.friend = _.without(this.friends, user);
	};

	// add book to favorites list
	User.prototype.addFavBook = function(book){
		this.favoriteBooks.push(book);

		if(this.element){
			var button = tagTemplate.clone();

			button.attr('id', '')
				.text(book.name);
			this.element.find('#fav-books')
				.append(button);
		}
	};

	// add author to favorites list
	User.prototype.addFavAuthor = function(author){
		this.favoriteAuthors.push(author);

		if(this.element){
			var button = tagTemplate.clone();

			button.attr('id', '')
				.text(author.name);
			this.element.find('#fav-authors')
				.append(button);
		}
	};

	// add genre to favorites list
	User.prototype.addFavGenre = function(genre){
		this.favoriteGenres.push(genre);

		if(this.element){
			var button = tagTemplate.clone();

			button.attr('id', '')
				.text(genre.name);
			this.element.find('#fav-genres')
				.append(button);
		}
	};



//////////////////
///BOOK METHODS //
//////////////////

// create book profile
Book.prototype.profile = function(){

	var title = this.name;
	var author = this.author;
	var img = this.img;

	if(this.element) return this.element;

	this.element = bookProfileTemplate.clone();

	this.element.attr('id', '');

	this.renderImage();

	this.renderNameAuthor();

	$.each(this.genres, function(i, genre){
		var button = tagTemplate.clone();

		button.attr('id', '')
			.text(genre.name);
		this.element.find('#related-genres')
			.append(button);
	});
	
	// fill in user thumbnails on profile with 8 random users
	$.each(this.randomUsers(), function(i, user){
		var thumbnail = $('#user'+ i);

		thumbnail.attr('src', user.img)
			.attr('alt', user.firstName + " " + user.lastName);
	});	
	console.log('this before popup', this);
	// render popup for book
	
	this.popup(title, author, img);
	var book = this;
	// create mouseover and click events for star icons
	this.element.on('click', '.rating>i', function(){
		var clickRating = $(this).attr('id').charAt(5);
		book.pushRating(clickRating);
		});

		this.element.on('mouseover', '.rating>i', function(){
			var whichStar = $(this).attr('id').charAt(5);
			for (var i=1; i<=whichStar; i++){
				$(this).closest('div').find('#star-'+i).attr('class', fullStar);
			}
			});
		this.element.on('mouseout', '.rating>i', function(){
			if (book.rating.length === 0){
				for (var i=1; i<6; i++){
				$(this).closest('div').find('#star-'+i).attr('class', emptyStar);
			}
			} else {
			book.editRating();
			}
		});


	return this.element;
};
// push rating to book
Book.prototype.pushRating = function(num){
		// push the new rating to the rating array
		this.rating.push(num);
		console.log('this rating: ', this.rating);
		// create a new variable to add the array items to for averaging
		this.editRating();
	};
// rating update function for book
	Book.prototype.editRating = function(){
		var newRating = 0;
		for (var i=0; i<this.rating.length; i++){
			newRating = newRating+(+this.rating[i]);
			console.log('avg rate after for loop: ', newRating)
		};

		console.log('avg after for loop: ', newRating);
		this.averageRate = newRating/this.rating.length;

		console.log('avg after division: ', this.averageRate);
		var remainder = 0;
		for (var i=1; i<=this.averageRate; i++){
			this.element.find('#star-'+i).attr('class', fullStar)
			remainder = this.averageRate-i;
			if(remainder >= 0.25 && remainder < 0.75){
					this.element.find('#star-'+(i+1)).attr('class', altHalfStar);
					this.element.find('#star-'+(i+2)).attr('class', emptyStar);
			}
			if(remainder >= 0.75){
				this.element.find('#star-'+(i+1)).attr('class', fullStar);
			}
			if(remainder < 0.25){
					this.element.find('#star-'+(i+1)).attr('class', emptyStar);
					this.element.find('#star-'+(i+2)).attr('class', emptyStar);
			}
		}
		var newStar = this.element.find('.rating').clone();
		newStar.attr('id', 'popup-rating');
		this.popupBox.find('.rating').replaceWith(newStar);
	};

// create book popup
Book.prototype.popup = function(title, author, img){
	if(this.popupBox) return this.popupBox;
	console.log('popup call', this);

	
	this.popupBox = bookPopupTemplate.clone();

	this.popupBox
		.attr('id', '')
		.find('img')
		.attr('src', img);
	console.log('this.popupBox', title + author);
	this.popupBox
		.find('.col-md-8')
		.append($('<h3>'+ title +'</h3>'))
		.append($('<h5>'+ author +'</h5>'));

		
	return this.popupBox;
};


// render book image
Book.prototype.renderImage = function(){
		this.element
			.find('.book-image')
			.attr('src', this.img)
			.attr('alt', this.name);
	};
// render book title and author
Book.prototype.renderNameAuthor = function(){
		this.element
			.find('.book-name')
			.text(this.name)
			.append($('<span>'))
			.find('span')
			.addClass('author')
			.text(" " + this.author);
	};
// generates an array of 8 random users
Book.prototype.randomUsers = function(){
	return _.shuffle(this.likers).slice(0,7);
};

// show book profile
Book.prototype.showProfile = function(){
	if(!this.element) this.profile();


	$('.profile-show').append(this.element);

};





//////////////////
//GENRE METHODS //
//////////////////
Genre.prototype.profile = function(){
	if(this.element) return this.element;

	this.element = genreProfileTemplate.clone();

	this.element
		.attr('id', '')
		.find('.genre-name')
		.text(this.name);

	$.each(this.books, function(i, book){
		var button = tagTemplate.clone();

		button.attr('id', '')
			.text(book.name);

			console.log('button appending!', button);

		this.element.find('#popular-books')
			.append(button);

		button.on('mouseover', function(){
			button.after(book.popupBox);
		});
		button.on('mouseout', function(){
			button.siblings('.bk-popup').detach();
		});
	});
	return this.element;
};

// add popular book to genre book array
Genre.prototype.addPopBook = function(book){
		this.books.push(book);

		if(this.element){
			var button = tagTemplate.clone();

			button.attr('id', '')
				.text(book.name);
			this.element.find('#popular-books')
				.append(button);
		}
	};



////////////////////
// AUTHOR METHODS //
////////////////////



////////////////////
// MISC FUNCTIONS //
////////////////////
$('#close-login').on('click', function(){
	$('#login').toggle();
});


/////////////
// TESTING //
/////////////
var mainLibrary = new Library();
mainLibrary.addUser('Lee', 'Acker', 'jda318', './images/leeacker.jpeg');
// mainLibrary.addUser('Roy', 'McFarland', 'itsRoyDawg');
mainLibrary.addBook('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 'http://upload.wikimedia.org/wikipedia/en/b/bf/Harry_Potter_and_the_Sorcerer\'s_Stone.jpg');
mainLibrary.addBook('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 'http://upload.wikimedia.org/wikipedia/en/a/a7/Harry_Potter_and_the_Chamber_of_Secrets_(US_cover).jpg');
mainLibrary.addBook('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', 'http://upload.wikimedia.org/wikipedia/en/b/b4/Harry_Potter_and_the_Prisoner_of_Azkaban_(US_cover).jpg');
mainLibrary.addBook('Harry Potter and the Goblet of Fire', 'J.K. Rowling', 'http://upload.wikimedia.org/wikipedia/en/6/62/Harry_Potter_and_the_Goblet_of_Fire_(US_cover).jpg');
mainLibrary.addBook('Harry Potter and the Order of the Phoenix', 'J.K. Rowling', 'http://img1.wikia.nocookie.net/__cb20070811170324/harrypotter/images/7/74/Oothp.jpg');
mainLibrary.addBook('Harry Potter and the Half-Blood Prince', 'J.K. Rowling', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHlAlstzWiTX6GgouFvTaQL6CUetVwPTzZ6TLc_i_znUiUoWkp-w');
mainLibrary.addBook('Harry Potter and the Deathly Hallows', 'J.K. Rowling', 'http://upload.wikimedia.org/wikipedia/en/0/02/Harry_Potter_and_the_Deathly_Hallows_(US_cover).jpg');
mainLibrary.addBook('Pride and Prejudice', 'Jane Austen', 'http://www.teenkidsnews.com/images/books/pride-prejudice-book.jpg');
mainLibrary.addBook('Sense and Sensibility', 'Jane Austen', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQjz-TwA3_UYfnLzZyYGC94PIzrphFJFoe9iXi5EUQO4HLQIP8qnw');
mainLibrary.addBook('Northanger Abbey', 'Jane Austen', 'http://welloflostplots.files.wordpress.com/2010/11/northanger-abbey.jpg');
mainLibrary.addBook('World Without End', 'Ken Follet', 'http://d.gr-assets.com/books/1388183355l/5064.jpg');
mainLibrary.addBook('Pillars of the Earth', 'Ken Follet', 'http://t3.gstatic.com/images?q=tbn:ANd9GcQu30Sogf2zA7zScQoxArrIrafeWZ8OPvbC0R4QcrFMdIAw2VN9JA');
mainLibrary.addBook('Winter of the World', 'Ken Follet', 'http://4.bp.blogspot.com/-5hRAwY_s4q0/UJkt4JyEXBI/AAAAAAAAV1Q/fYFku6RquFI/s1600/winter+of+the+world.jpg');
mainLibrary.addBook('Fall of Giants', 'Ken Follet', 'http://www.agendamag.com/content/wp-content/uploads/2011/05/fall_of_giants_us_hardback_2010.jpg');
mainLibrary.addBook('The Edge of Eternity', 'Ken Follet', 'http://ecx.images-amazon.com/images/I/91D72zSoN0L._SL1500_.jpg');
var scifi = new Genre('Sci-Fi', 'the Space Cadet');
var histFiction = new Genre('Historical Fiction', 'of the Court');
var fantasy = new Genre('Fantasy', 'the Bewitched');
var aliens = new Book('Touched by an Alien', 'Gini Koch', 13, "http://1.bp.blogspot.com/-TGeHLze5ePU/TZTw6HXUX8I/AAAAAAAAAUA/tuVjhP2hBa8/s1600/TouchedByAlien.jpg");
scifi.addPopBook(aliens);
histFiction.addPopBook(mainLibrary.books[14]);
histFiction.addPopBook(mainLibrary.books[13]);
histFiction.addPopBook(mainLibrary.books[12]);
histFiction.addPopBook(mainLibrary.books[11]);
histFiction.addPopBook(mainLibrary.books[10]);
histFiction.addPopBook(mainLibrary.books[9]);
histFiction.addPopBook(mainLibrary.books[8]);
histFiction.addPopBook(mainLibrary.books[7]);
fantasy.addPopBook(mainLibrary.books[6]);
fantasy.addPopBook(mainLibrary.books[5]);
fantasy.addPopBook(mainLibrary.books[4]);
fantasy.addPopBook(mainLibrary.books[3]);
fantasy.addPopBook(mainLibrary.books[2]);
fantasy.addPopBook(mainLibrary.books[1]);

var roy = new User('Roy', 'McFarland', 'itsRoyDawg', 'http://33.media.tumblr.com/45c81fa7304978bf5ed93a3077ea3c78/tumblr_mlvdy2YWvg1qbyxr0o1_400.gif');
var bible = new Book('The Bible', 'A Whole Buncha People');
aliens.profile();
bible.profile();
roy.favoriteBooks.push(aliens);
roy.favoriteBooks.push(bible);
roy.favoriteBooks.push(mainLibrary.books[5]);
roy.favoriteBooks.push(mainLibrary.books[6]);
roy.favoriteBooks.push(mainLibrary.books[11]);
roy.friends.push(mainLibrary.users[0]);

$('.profile-show').append(roy.profile());



$(document).on('ready', function(){

 TweenMax.from($('.foal'), 4, {top:'-300', ease:Power2.easeInOut});
 TweenMax.from($('#header'), 4, {top:'-300', ease:Power2.easeInOut});

TweenMax.from(book1, 1, {top:'-50'});
TweenMax.from(book2, 2, {top:'-80'});
TweenMax.from(book3, 3, {top:'-50'});
TweenMax.from(book4, 4, {top:'-40'});
TweenMax.from(book5, 5, {top:'0'});





});