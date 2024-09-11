const startButton = document.getElementById('start-btn');
const gameBoard = document.getElementById('game-board');
const timerValue = document.getElementById('timer-value');
const congratulations = document.getElementById('congratulations');
const timeTaken = document.getElementById('time-taken');
const playAgainButton = document.getElementById('play-again');
const difficultyContainer = document.getElementById('difficulty-container');
const gameContainer = document.getElementById('game-container');

let timer;
let gameStarted = false;
let flippedCards = [];
let matchesFound = 0;
let numCards = 10; // Number of cards for the game
let cardImages = []; // Will be populated based on difficulty

// Function to get selected difficulty level and set card images
function getDifficulty() {
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    if (selectedDifficulty === 'Easy') {
        numCards = 10; // 5 pairs
    } else if (selectedDifficulty === 'Difficult') {
        numCards = 16; // 8 pairs
    }
    // List of images (assuming you want to use 5 or 8 pairs)
    cardImages = [
        'ace',
        'doffy',
        'law',
        'nami',
        'nico',
        'YouLost',
        'youwon',
        'zoro'
    ];
    // Ensure there are enough images for the selected difficulty
    cardImages = cardImages.slice(0, numCards / 2); // Adjust the number of images based on difficulty
}

function startGame() {
    getDifficulty();
    gameStarted = true;
    difficultyContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchesFound = 0;
    clearInterval(timer);
    startTimer();
    generateCards();
}

function startTimer() {
    let time = 0;
    timer = setInterval(() => {
        time++;
        timerValue.textContent = time;
    }, 1000);
}

function generateCards() {
    // Prepare deck
    let deck = [];
    const numPairs = numCards / 2;
    for (let i = 0; i < numPairs; i++) {
        deck.push(cardImages[i], cardImages[i]);
    }
    deck = deck.sort(() => Math.random() - 0.5); // Shuffle

    // Create card elements
    deck.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const img = document.createElement('img');
        // You might need to check different formats here
        img.src = `images/${image}.png`; // Try .png first
        img.alt = `Card Image ${image}`;
        
        // Error handling in case the image isn't found
        img.onerror = () => {
            img.src = `images/${image}.jpg`; // Fallback to .jpg
            img.onerror = () => {
                img.src = `images/${image}.jpeg`; // Fallback to .jpeg
            };
        };
        
        card.appendChild(img);
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });

    // Adjust grid based on number of cards
    const numColumns = Math.ceil(Math.sqrt(numCards)); // Calculate the number of columns
    gameBoard.style.gridTemplateColumns = `repeat(${numColumns}, 100px)`; // 100px is the card width
}

function flipCard(card) {
    if (!gameStarted || card.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        matchesFound++;
        if (matchesFound === numCards / 2) {
            endGame();
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function endGame() {
    clearInterval(timer);
    timeTaken.textContent = timerValue.textContent;
    congratulations.classList.remove('hidden');
}

function playAgain() {
    congratulations.classList.add('hidden');
    gameContainer.classList.add('hidden');
    difficultyContainer.classList.remove('hidden');
}

startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', playAgain);
