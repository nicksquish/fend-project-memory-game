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

$(function() {
        let cardNumber = 0;
    $('.deck').each(function() {
        $(this).find('li').find('i').each(function() {
            $(this).removeAttr('class')
            $(this).addClass(cardList[cardNumber]).addClass('card');
            cardNumber++;
        });
    });
});

$(function(){
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
                }, 600);
                emptyArray();
        }};
    });
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
createCards();
clicking();

/*
 * set up the event listener for a card. If a card is clicked:

 *  - display the card's symbol (put this functionality in another 
        function that you call from this one)
 *  
    - add the card to a *list* of "open" cards (put this
         functionality in another function that you call from this one)
 *  -   if the list already has another card, check to see if the two cards match

 *    + if the cards do match, lock the cards in the open position (put this
         functionality in another function that you call from this one)

 *    + if the cards do not match, remove the cards from the list and hide the 
        card's symbol (put this functionality in another function that you call 
        from this one)

 *    + increment the move counter and display it on the page (put this 
        functionality in another function that you call from this one)

 *    + if all cards have matched, display a message with the final score 
        (put this functionality in another function that you call from this one)
 */
