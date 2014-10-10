
//////////////////////
// LIBRARY METHODS //
//////////////////////

Library.prototype.addUser = function(firstName, lastName, userName, image, password){
	var newUser = new User(firstName, lastName, userName, image, password);
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

};

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
