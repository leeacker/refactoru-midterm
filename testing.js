/////////////
// TESTING //
/////////////
///create the main library
var mainLibrary = new Library();
mainLibrary.addUser('Lee', 'Acker', 'jda318', './images/leeacker.jpeg');
// mainLibrary.addUser('Roy', 'McFarland', 'itsRoyDawg');
// create some sample books
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
var aliens = new Book('Touched by an Alien', 'Gini Koch', 16, "http://1.bp.blogspot.com/-TGeHLze5ePU/TZTw6HXUX8I/AAAAAAAAAUA/tuVjhP2hBa8/s1600/TouchedByAlien.jpg");
var bible = new Book('The Bible', 'A Whole Buncha People');
aliens.profile();
bible.profile();

// Adding sample genres
var scifi = new Genre('Sci-Fi', 'the Space Cadet');
var histFiction = new Genre('Historical Fiction', 'of the Court');
var fantasy = new Genre('Fantasy', 'the Bewitched');


// assigning books to genres
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

// assigning sample users
var lee = mainLibrary.users[0];
var batman = new User('Batman', 'Superhero', 'batdude', 'http://3.bp.blogspot.com/-0onXBUDbyRw/Uha54E5GLfI/AAAAAAAAlfM/X68u6TNTBaI/s1600/batman.jpg');
var pikachu = new User('Pikachu', 'Pokemon', 'yellowRabbit', 'http://img3.wikia.nocookie.net/__cb20140410195944/pokemon/images/f/fc/025Pikachu_OS_anime_5.png');
var roy = new User('Roy', 'McFarland', 'itsRoyDawg', 'http://33.media.tumblr.com/45c81fa7304978bf5ed93a3077ea3c78/tumblr_mlvdy2YWvg1qbyxr0o1_400.gif');

batman.password = "bats!";
pikachu.password = "rabbit";
roy.password = 'hoodrat';


mainLibrary.users.push(roy);
mainLibrary.users.push(batman);
mainLibrary.users.push(pikachu);



roy.addFavBook(aliens);
roy.addFavBook(bible);
roy.addFavBook(mainLibrary.books[5]);
roy.addFavBook(mainLibrary.books[6]);
roy.addFavBook(mainLibrary.books[11]);
roy.addFavGenre(scifi);
roy.addFavGenre(fantasy);
roy.addFavGenre(histFiction);
roy.addFriend(mainLibrary.users[0]);
lee.addFavBook(mainLibrary.books[0]);
lee.addFavBook(mainLibrary.books[1]);
lee.addFavBook(mainLibrary.books[3]);
lee.addFavBook(mainLibrary.books[4]);
lee.addFavBook(mainLibrary.books[5]);
batman.addFavBook(mainLibrary.books[5]);
batman.addFavBook(mainLibrary.books[8]);
batman.addFavBook(mainLibrary.books[9]);
batman.addFavBook(mainLibrary.books[11]);
batman.addFavBook(mainLibrary.books[4]);
batman.addFavBook(aliens);
pikachu.addFavBook(mainLibrary.books[4]);
pikachu.addFavBook(mainLibrary.books[3]);
pikachu.addFavBook(mainLibrary.books[0]);
pikachu.addFavBook(mainLibrary.books[14]);
pikachu.addFavBook(mainLibrary.books[12]);

lee.addFriend(roy);
lee.addFriend(pikachu);
roy.addFriend(batman);
roy.addFriend(pikachu);









$(document).on('ready', function(){

 TweenMax.from($('.foal'), 4, {top:'-300', ease:Power2.easeInOut});
 TweenMax.from($('#header'), 4, {top:'-300', ease:Power2.easeInOut});

TweenMax.from(book1, 1, {top:'-50'});
TweenMax.from(book2, 2, {top:'-80'});
TweenMax.from(book3, 3, {top:'-50'});
TweenMax.from(book4, 4, {top:'-40'});
TweenMax.from(book5, 5, {top:'0'});





});