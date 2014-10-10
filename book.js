//////////////////
///BOOK METHODS //
//////////////////

// create book profile
Book.prototype.profile = function(){

	var title = this.name;
	var author = this.author;
	var img = this.img;
	var currentBook = this;

	if(this.element) return this.element;

	this.element = bookProfileTemplate.clone();

	this.element.attr('id', '');

	this.renderImage();

	this.renderNameAuthor();

	currentBook.popup(title, author, img);
	
	$.each(this.genres, function(i, genre){
		var button = tagTemplate.clone();

		button.attr('id', '')
			.text(genre.name);
		currentBook.element.find('#related-genres')
			.append(button);
	});
	
	// fill in user thumbnails on profile with 8 random users
	$.each(this.randomUsers(), function(i, user){
		var thumbnail = $('#user'+ i);

		thumbnail.attr('src', user.img)
			.attr('alt', user.firstName + " " + user.lastName);
	});	
	
	// render popup for book
	
	
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

		// create a new variable to add the array items to for averaging
		this.editRating();
	};
// rating update function for book
	Book.prototype.editRating = function(){
		var newRating = 0;
		for (var i=0; i<this.rating.length; i++){
			newRating = newRating+(+this.rating[i]);
		};


		this.averageRate = newRating/this.rating.length;

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
	
	this.popupBox = bookPopupTemplate.clone();

	this.popupBox
		.attr('id', '')
		.find('img')
		.attr('src', img);
	
	this.popupBox
		.find('.col-md-8')
		.append($('<h3>'+ title +'</h3>'))
		.append($('<h5>'+ author +'</h5>'));

		
	return this.popupBox;
};
// add genre to book details
Book.prototype.addGenre = function(genre){
	this.genres.push(genre);
	if(!this.element) this.profile();

	var button = tagTemplate.clone();

		button.attr('id', '')
			.text(genre.name);
		this.element.find('#related-genres')
			.append(button);

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
// adds user to "liker" list
Book.prototype.addLiker = function(user){
	this.likers.push(user);

	$.each(this.randomUsers(), function(i, user){
		var thumbnail = $('#user'+ i);

		thumbnail.attr('src', user.img)
			.attr('alt', user.firstName + " " + user.lastName)
			.toggleClass('hidden');
	});	

};
// generates an array of 8 random users
Book.prototype.randomUsers = function(){
	return _.shuffle(this.likers).slice(0,7);
};




