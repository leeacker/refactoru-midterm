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
		book.genres.push(this);
			book.addGenre(this);

		if(this.element){
			var button = tagTemplate.clone();

			button.attr('id', '')
				.text(book.name);
			this.element.find('#popular-books')
				.append(button);
		}
	};