const cards = [];
const cardList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", 
"fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", 
"fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", 
"fa fa-bicycle", "fa fa-bomb"];
match=0;
for (let i = 0; i <= cardList.length-1; i++) {
    $('.deck').append('<li><i>');
}

function emptyArray() {
            cards.length=0;
        };

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

const starRating = function (){
    if (moves <= 8) {
        $('.three').removeClass('fa-star').addClass('fa-star-o');
    }
    if (moves <= 4) {
        $('.two').removeClass('fa-star').addClass('fa-star-o');
    }
    if (moves === 0) {
        $('.one').removeClass('fa-star').addClass('fa-star-o');
        $('section').text('GAME OVER!').css({
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold'
        });
    }
}

const addCardListener = function(){
    $('.deck').find('.card').bind('click', function() {
        let card = $(this).attr('class');
        $(this).addClass('open show');
        cards.push(card);
        if (cards.length > 1) {
            if (card === cards[0]) {
                $('.deck').find('.open').addClass('match');
                setTimeout(function (){
                    $('.deck').find('.match').removeClass('open show');
                }, 600);
                match++;
                emptyArray();
            } else {
                $('.deck').find('.open').addClass('notmatch');
                setTimeout(function (){
                    $('.deck').find('.notmatch').removeClass('open show notmatch');
                }, 600)
                moves--;
                $('.moves').text(moves);
                emptyArray();
            } if (match === 8) {
                $('.deck').find('.match').removeClass('open show match card').addClass('winner').off();
            };
            starRating();
    }});
};

const endGame = function(){
    if (match==8) {
        $('.deck').find('.match').removeClass('open show match').addClass('winner');
    }};

$('.restart').bind('click', function() {
    startGame();
});

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

/*
 *    + increment the move counter and display it on the page (put this 
        functionality in another function that you call from this one)

 *    + if all cards have matched, display a message with the final score 
        (put this functionality in another function that you call from this one)
 */
