//////////////////////////////////////////
////////////////////                    //
// MISC FUNCTIONS AND EVENT HANDLERS // //
////////////////////                    //
//////////////////////////////////////////

// clicking the login button reveals login popup
$('#login-nav').on('click', function(e){
	e.preventDefault();
	$('#login').toggle();
});
// clicking the x-icon closes the login popup
$('#close-login').on('click', function(e){
	e.preventDefault();
	$('#login').toggle();
});
// clicking signup button shows the signup popup
$('#sign-up-nav').on('click', function(e){
	e.preventDefault();
	$('#signup').toggle();
});
// clicking the x-icon closes the signup popup
$('#close-signup').on('click', function(e){
	e.preventDefault();
	$('#signup').toggle();
});
// logout current user
$('#logout-nav').on('click', function(e){
	e.preventDefault();
	mainLibrary.currentUser = 0;
	$('.profile').detach();
	$('#slide2').slideUp();
	$('.jumbotron').slideDown();
	$('.jumbotron').append('<h1 id=\'k-bye\'>k, bye!</h1>');

	setTimeout(function(){
		$('#k-bye').slideUp();
	}, 7000);

	$('.foal').show();
	$('#header').show();
	TweenMax.to($('#header'), 10, {top:'300', ease:Power2.easeInOut});
	TweenMax.to($('.foal'), 10, {top:'300', ease:Power2.easeInOut});


});
// clicking the books link shows all of the current users favorite books
$('#books-link').on('click', function(e){
	e.preventDefault();
	var user = mainLibrary.currentUser;
	console.log(mainLibrary.currentUser);
	$('.profile').detach();
	if(user.favoriteBooks.length === 0){
		$('.user-info').html('<h1>You haven\'t added any books to your collection yet!</h1><a id=\'add-books\'>You should do that!</a>');
	}
	for(var i=0; i< user.favoriteBooks.length; i++){
		$('.user-info').append(user.favoriteBooks[i].element);
	}
});
// clicking the profile link shows the current users profile
$('#profile-link').on('click', function(e){
	e.preventDefault();
	var user = mainLibrary.currentUser;
	$('.profile').detach();
	$('.user-info').append(user.element);
});
// event handler for submitting new user via the signup form
$('#signup-form').on('submit', function(e){
	e.preventDefault();
	var firstname = $('#inputfirstName').val();
	var lastname = $('#inputlastName').val();
	var username = $('#inputuserName2').val();
	var password1 = $('#newPassword1').val();
	var password2 = $('#newPassword2').val();

	if(firstname === '' || lastname === '' || username === '' || password1 === '' || password2 === ''){
		$('#signup').prepend(dangerAlert);
		dangerAlert.html('<strong>Hey, Listen!</strong>  All fields are required. <em>Do or do not, there is no try.</em> ');
		dangerAlert.prepend(alertClose);
		return e.stopImmediatePropagation();
	} else if(password1 !== password2){
		$('#signup').prepend(dangerAlert);
		dangerAlert.html('<strong>Hey, Listen!</strong>  Those passwords don\'t match! <em>Do or do not, there is no try.</em> ');
		dangerAlert.prepend(alertClose);
		return e.stopImmediatePropagation();
	} else {
		mainLibrary.addUser(firstname, lastname, username, '', password1);
		$('#inputfirstName').val('');
		$('#inputlastName').val('');
		$('#inputuserName2').val('');
		$('#newPassword1').val('');
		$('#newPassword2').val('');
		$('#signup').toggle();
		$('#login').prepend(successAlert);
		successAlert.html('<strong>GREAT JOB!</strong>  You\'re the proud owner of a brand new bex account! Go ahead and login to find your next adventure.');
		successAlert.prepend(alertClose);
		$('#login').show();
	}

});
// clicking the about link reaveals the about page
$('#about-link').on('click', function(e){
	e.preventDefault();
	$('.jumbotron').slideUp();
	$('#slide1').slideDown();
	$('#about-link').closest('li').toggleClass('hidden');
	$('#home-link').closest('li').toggleClass('hidden');
});
$('.fa-toggle-down').on('click', function(){
	$('#about-link').trigger('click');
});
// clicking the home link shows the home screen
$('#home-link').on('click', function(e){
	e.preventDefault();
	$('.jumbotron').slideDown();
	$('#home-link').closest('li').toggleClass('hidden');
	$('#about-link').closest('li').toggleClass('hidden');
	$('#slide1').slideUp();
});
// clicking readers desolation link shows new text box and hides current text box
$('.readers-des').on('click', function(e){
	e.preventDefault();
	$('.what-is-bex').slideUp();
	$('.what-is-r-d').slideDown();
});
// shows alternate text box and changes the content
$('.what-is-bex-link').on('click', function(e){
	e.preventDefault();
	$('.what-is-r-d').slideUp();
	$('.about-initial').hide();
	$('.about-after').show();
	$('.what-is-bex').slideDown();
});
// submit handler for login - accepts credentials and takes user to profile page
$('#login-submit').on('click', function(e){
	e.preventDefault();
	var alert = $('#login-danger');
	var username = $('#inputuserName1').val();
	var password = $('#inputPassword1').val();
	var existingUsers = _.pluck(mainLibrary.users, 'userName');
	console.log(existingUsers);

	if (username === '' && password === ''){
		$('#login').prepend(dangerAlert);
		dangerAlert.html('<strong>Hey, Listen!</strong>  Please enter your username and password. <em>Do or do not, there is no try.</em> ');
		dangerAlert.prepend(alertClose);
		return e.stopImmediatePropagation();
	} else if(username === ''){
		$('#login').prepend(dangerAlert);
		dangerAlert.html('<strong>Hey, Listen!</strong>  Please enter a username. <em>Do or do not, there is no try.</em> ');
		dangerAlert.prepend(alertClose);
		return e.stopImmediatePropagation();
	} else if(password === ''){
		$('#login').prepend(dangerAlert);
		dangerAlert.html('<strong>Hey, Listen!</strong>  Please enter a password. <em>Do or do not, there is no try.</em> ');
		dangerAlert.prepend(alertClose);
		return e.stopImmediatePropagation();
	} else {
		alert.hide();
		$('#inputuserName1').val('');
		$('#inputPassword1').val('');
	}


	if(!(_.contains(existingUsers, username))) {
		$('#login').prepend(dangerAlert);
		dangerAlert.html('<strong>Hey, Listen!</strong>  That username doesn\'t exist. Do or do not, there is no try. ');
		dangerAlert.prepend(alertClose);
		return e.stopImmediatePropagation();
	} else {
		mainLibrary.currentUser = (_.findWhere(mainLibrary.users, {userName: username}));
	}

	var currentUser = mainLibrary.currentUser;
	var userProfile = currentUser.element;
	userProfile.addClass('active-user');

	if(currentUser.password !== password){
		$('#login').prepend(dangerAlert);
		dangerAlert.html('<strong>Hey, Listen!</strong>  That password doesn\'t match. Do or do not, there is no try. ');
		dangerAlert.prepend(alertClose);
		return e.stopImmediatePropagation();
	} else {

		$('#login').toggle();

		TweenMax.to($('.foal'), 2, {top:'-300', ease:Power2.easeInOut});
	 	TweenMax.to($('#header'), 2, {top:'-300', ease:Power2.easeInOut});
	 	TweenMax.to($('.fa-toggle-down'), 2, {top:'-300', ease:Power2.easeInOut});


		TweenMax.to($('.foal'), 2, {display:'none', ease:Power2.easeInOut});
		TweenMax.to($('.fa-toggle-down'), 2, {display:'none', ease:Power2.easeInOut});

	 	$('.jumbotron').slideUp();
	 	$('#slide2').slideDown();
	 		$('.user-info').append(userProfile);
	 		userProfile.slideDown();
	 	
	 	$('.navigation').find('li').toggleClass('hidden');
	 	$('#home-link').closest('li').toggleClass('hidden');
	 	userProfile.find('.fa-plus-circle').toggleClass('hidden');
	}
});
$('button').on('click', '.close', function(e){
	e.preventDefault();
	$(this).closest('div').toggleClass('hidden');
});

$('#login-form').on('submit', function(e){
	console.log('formsubmit!');
	e.preventDefault();
	$('#login-submit').trigger('click');

});

$("form").on('keypress', function(e) {
    if (e.which == 13) {
    	e.preventDefault();
        $(this).submit();
    }
});

$('#book-add').on('submit', function(e){
	e.preventDefault();
	var bookname = $('#bookName1').val();
	var book = mainLibrary.suggestExistingName(bookname);

	roy.addFavBook(book);
	$('#book-add').toggleClass('hidden');

});

