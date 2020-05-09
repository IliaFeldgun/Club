
const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const cardScale = 7
const cardSizeA = width / cardScale
const cardSizeB = cardSizeA * 1.5
const fontSize = width / (cardScale * 4)
const ctx = canvas.getContext('2d');
function setGame () {

    


    ctx.fillStyle = 'rgb(7,150,34)';
    ctx.fillRect(0,0,width/1.3,height);



    let cs = [{suit: "Heart", rank: "7"},
                {suit: "Diamond", rank:'K'},
                {suit: 'Diamond', rank:'Q'},
                {suit: 'Spade', rank: 'Q'},
                {suit: 'Club', rank: '2'},
                {suit: 'Diamond', rank: 'A'},
                {suit: 'Club', rank: '2'},
                ]
    drawCardFan(400, 200, cs)

}
function drawCard(xStart, yStart, suit, rank) {
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.fillRect(xStart,yStart, cardSizeA, cardSizeB)
    

    ctx.fillStyle = 'black'
    ctx.font = fontSize + 'px georgia'
    ctx.fillText(suit + rank, xStart, yStart + fontSize)
}

function drawRotatedCard(xStart, yStart, suit, rank, degrees) {
    ctx.save()
    ctx.translate(xStart, yStart + cardSizeB)
    ctx.rotate(degrees * Math.PI/180)
    drawCard(0, -cardSizeB, suit, rank)
    ctx.restore()
}

function drawCardFan(xStart, yStart, cards) {
    const startAngle = -90 + 10*cards.length /2
    
    for (let i = 0; i < cards.length; i++){
    drawRotatedCard(xStart, yStart, cards[i].suit, cards[i].rank, startAngle + (i+1)*10)
    
    }
}
setGame()