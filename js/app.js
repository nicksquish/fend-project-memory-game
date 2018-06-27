const cards = [];
let firstClick = false;
const cardIcons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const cardList = cardIcons.concat(cardIcons);
const stars = ['1','2','3'];
match=0;
currentTimer=0;
second=0;
timing=0;
moves=0;

//initialize game board
for (let i = 0; i <= cardList.length-1; i++) {
    $('.deck').append('<li><i>');
};

function emptyArray() {
            cards.length=0;
        };

//add card class to game board elements
const startGame = function() {
        let cardNumber = 0;
        moves = 12;
        $('.deck').each(function() {
        $(this).find('li').find('i').each(function() {
            $(this).removeAttr('class')
            $(this).addClass(cardList[cardNumber]).addClass('card');
            cardNumber++;
            $('.moves').text(moves+0);
        });
    });
};

function startTimer() {
    timing = setInterval(function() {
        second++;
        $('.timer').text(second);
    }, 1000);
};

function endTimer() {
        clearInterval(timing);
        second=0;
        $('.timer').text(second);
};

//check number of moves remaining and gives star rating
const starRating = function (){
    if (moves === 8) {
        $('.three').removeClass('fa-star').addClass('fa-star-o');
        stars.pop();
    };
    if (moves === 4) {
        $('.two').removeClass('fa-star').addClass('fa-star-o');
        stars.pop();
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
        $(this).addClass('open show clicked');
        cards.push(card);
        if (!firstClick) {
            second = 0;
            startTimer();
            firstClick = true;
    };
        if (cards.length > 1) {
            if (card === cards[0]) {
                $('.deck').find('.open').addClass('animated bounce match');
                setTimeout(function (){
                    $('.deck').find('.match').removeClass('animated bounce open show clicked');
                }, 1000);
                match++;
                emptyArray();
            } else {
                $('.deck').find('.show').removeClass('open clicked').addClass('animated tada notmatch');
                setTimeout(function (){
                    $('.deck').find('.notmatch').removeClass('clicked animated tada open show notmatch');
                }, 1000)
                moves--;
                $('.moves').text(moves);
                emptyArray();
            } if (match === 8) {
                endGame();
                $('.deck').find('.match').addClass('animated bounce infinite').off();
            };
            starRating();
        }});
};

//reinitialize game board with restart button
$('.restart').bind('click', function() {
    $('body').addClass('animated fadeInDown');
    endTimer();
    $('.one').removeClass('fa-star-o').addClass('fa-star');
    $('.two').removeClass('fa-star-o').addClass('fa-star');
    $('.three').removeClass('fa-star-o').addClass('fa-star');
    startGame();
    firstClick = ['1'];
    moves = 12;
    $('.moves').text(moves);
    setTimeout(function (){
    $('body').removeClass('animated fadeInDown');
    }, 1000)
});

function restart () {$('body').addClass('animated fadeInDown');
    endTimer();
    $('.one').removeClass('fa-star-o').addClass('fa-star');
    $('.two').removeClass('fa-star-o').addClass('fa-star');
    $('.three').removeClass('fa-star-o').addClass('fa-star');
    startGame();
    shuffle(cardList);
    moves = 12;
    firstClick = false;
    $('.moves').text(moves);
    setTimeout(function (){
    $('body').removeClass('animated fadeInDown');
    }, 1000)
};

function endGame() {
    setTimeout(function(){
        swal({
            title: 'Congratulations!',
            text: 'You finished in ' + second + ' seconds with ' + moves + ' moves remaining, netting you a ' + stars.length + ' star score!',
            icon: 'success',
            allowOutsideClick: false,
            buttons: {
            cancel: {
                text: 'Back to game board',
                value: null,
                visible: true,
                closeModal: true
            },
            confirm: {
                text: 'Play again?',
                value: true,
                visible: true,
                closeModal: true
            }
        }
            
            }).then(function() {
                    restart();
                });
        endTimer();
                }, 500);
}


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
restart();