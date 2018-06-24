const cards = [];
const cardList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", 
"fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", 
"fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", 
"fa fa-bicycle", "fa fa-bomb"];
match=0;

//initialize game board
for (let i = 0; i <= cardList.length-1; i++) {
    $('.deck').append('<li><i>');
}

function emptyArray() {
            cards.length=0;
        };

//add card class to game board elements
const startGame = function() {
        let cardNumber = 0;
        $('.deck').each(function() {
        $(this).find('li').find('i').each(function() {
            $(this).removeAttr('class')
            $(this).addClass(cardList[cardNumber]).addClass('card');
            cardNumber++;
            moves=12;
            $('.moves').text(moves+0);

        });
    });
};

//check number of moves remaining and gives star rating
const starRating = function (){
    if (moves <= 8) {
        $('.three').removeClass('fa-star').addClass('fa-star-o');
    };
    if (moves <= 4) {
        $('.two').removeClass('fa-star').addClass('fa-star-o');
    };
    if (moves === 0) {
        $('.one').removeClass('fa-star').addClass('fa-star-o');
        $('section').text('GAME OVER!').addClass('animated fadeInUp').css({
            textAlign: 'center',
            fontSize: '20px',
        });
        $('h1').text('YOU LOSE').addClass('animated fadeInDown');
        $('.deck').addClass('animated bounceOut').css({
            background: 'linear-gradient(160deg, #ff7270 0%, #ea4527 80%)',
            property2: 'value2'
        });
    };
};

//add event listeners to cards to be flipped
//check for match or mismatch and adds/removes appropriate classes
const addCardListener = function(){
    $('.deck').find('.card').bind('click', function() {
        let card = $(this).attr('class');
        $(this).addClass('open show');
        cards.push(card);
        if (cards.length > 1) {
            if (card === cards[0]) {
                $('.deck').find('.open').addClass('animated bounce match');
                setTimeout(function (){
                    $('.deck').find('.match').removeClass('animated bounce open show');
                }, 1000);
                match++;
                emptyArray();
            } else {
                $('.deck').find('.show').removeClass('open').addClass('animated tada notmatch');
                setTimeout(function (){
                    $('.deck').find('.notmatch').removeClass('animated tada open show notmatch');
                }, 1000)
                moves--;
                $('.moves').text(moves);
                emptyArray();
            } if (match === 8) {
                $('.deck').find('.match').removeClass('open show match card').addClass('winner').off();
            };
            starRating();
    }});
};

//check number of matches to determine victory condition
const endGame = function(){
    if (match==8) {
        $('.deck').find('.match').removeClass('open show match').addClass('winner');
    }};

//reinitialize game board with restart button
$('.restart').bind('click', function() {
    startGame();
});

//shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

shuffle(cardList);
startGame();
addCardListener();
starRating();