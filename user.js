
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

// render friend thumbnails
User.prototype.renderFriends = function(){
	if(!this.element) this.profile();
	console.log('rendering friends...');
	console.log(this.friends);
	var thisUser = this;

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
	thumbnail.on('click', function(){
				$('.profile').detach();
				$('.user-info').append(friend.element);
			});
	} else {
	$.each(this.randomFriends(), function(i, friend){
		console.log(friend, thisUser);
		var thumbnail = thisUser.element.find('#friend'+ i);

		thumbnail.attr('src', friend.img)
			.attr('alt', friend.firstName + " " + friend.lastName)
			.removeClass('hidden');

		thumbnail.on('mouseover', function(){
			thumbnail.after(friend.popupBox);
		});
		thumbnail.on('mouseout', function(){ 
			thumbnail.siblings('.bk-popup').detach();
		});
	thumbnail.on('click', function(){
				$('.profile').detach();
				$('.user-info').append(friend.element);
			});
	});
}
};

// Method for creating a new user:

User.prototype.profile = function(){

	// return profile element if it already exists
	if(this.element) return this.element;

	var name = this.firstName + ' ' + this.lastName;
	// clone template item if it does not exist
	this.element = profileTemplate.clone();
	this.element.attr('id', '');
	
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
		button.on('click', function(){
				$('.profile').detach();
				$('.user-info').append(book.element);
			});
	});

	// fill in favorite genres section on the profile
	$.each(this.favoriteGenres, function(i, genre){
		var button = tagTemplate.clone();

		button.attr('id', '')
			.text(genre.name);
		user.element.find('#fav-genres')
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
	
	this.renderFriends();

	return this.element;
};

	// create popup for user profile
	User.prototype.popup = function(name, title, img){
	if(this.popupBox) return this.popupBox;

	
	this.popupBox = bookPopupTemplate.clone();

	this.popupBox
		.attr('id', '')
		.find('img')
		.attr('src', img);
	this.popupBox
		.find('.rating')
		.remove();
	
	this.popupBox
		.find('.col-md-8')
		.append($('<h3>'+ name +'</h3>'))
		.append($('<h5>'+ title +'</h5>'));

		
	return this.popupBox;
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
		user.friends.push(this);

		this.renderFriends();
		user.renderFriends();
	};

	// remove friend or follower
	User.prototype.removeFriend = function(user){
		this.friend = _.without(this.friends, user);
	};

	// add book to favorites list
	User.prototype.addFavBook = function(book){
		if(!this.element) this.profile();
		console.log(book);
		this.favoriteBooks.push(book);
		if (!book.element) book.profile();
		book.addLiker(this);

		if(this.element){
			var button = tagTemplate.clone();

			button.attr('id', '')
				.text(book.name);
			this.element.find('#fav-books')
				.append(button);

			button.on('mouseover', function(){
				button.after(book.popupBox);
			});
			button.on('mouseout', function(){
				button.siblings('.bk-popup').detach();
			});
			button.on('click', function(){
				$('.profile').detach();
				$('.user-info').append(book.element);

			});
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

			button.on('mouseover', function(){
			button.after(author.popupBox);
			});
			button.on('mouseout', function(){
			button.siblings('.bk-popup').detach();
			});
		}
	};

	// add genre to favorites list
	User.prototype.addFavGenre = function(genre){
		this.favoriteGenres.push(genre);
		var newTitle = genre.title;

		if(this.element){
			var button = tagTemplate.clone();

			button.attr('id', '')
				.text(genre.name);
			this.element.find('#fav-genres')
				.append(button);

			button.on('mouseover', function(){
			button.after(genre.popupBox);
			});
			button.on('mouseout', function(){
			button.siblings('.bk-popup').detach();
			});

			this.element.find('.title')
				.text(newTitle);

		}
	};