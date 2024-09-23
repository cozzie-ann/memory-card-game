const startButton = document.getElementById('start-btn'); // Get the start button from the HTML
const gameBoard = document.getElementById('game-board'); // Get the area where cards will be shown
const timerValue = document.getElementById('timer-value'); // Get the timer display
const congratulations = document.getElementById('congratulations'); // Get the congratulations message
const timeTaken = document.getElementById('time-taken'); // Get the element to show time taken
const playAgainButton = document.getElementById('play-again'); // Get the play again button
const difficultyContainer = document.getElementById('difficulty-container'); // Get the difficulty selection area
const gameContainer = document.getElementById('game-container'); // Get the game area

let timer; // Variable to hold the timer
let gameStarted = false; // Flag to check if the game has started
let flippedCards = []; // Array to hold cards that are currently flipped
let matchesFound = 0; // Counter for matched pairs
let numCards = 10; // Set the default number of cards for the game
let cardImages = []; // Array to hold card images

// Function to get the selected difficulty and set card images
function getDifficulty() {
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value; // Get the selected difficulty
    if (selectedDifficulty === 'Easy') {
        numCards = 10; // For easy, use 5 pairs (10 cards)
    } else if (selectedDifficulty === 'Difficult') {
        numCards = 16; // For difficult, use 8 pairs (16 cards)
    }
    // List of images (5 or 8 pairs depending on difficulty)
    cardImages = ['ace', 'doffy', 'law', 'nami', 'nico', 'YouLost', 'youwon', 'zoro'];
    // Ensure we have enough images for the selected difficulty
    cardImages = cardImages.slice(0, numCards / 2); // Get only the needed images
}

function startGame() {
    getDifficulty(); // Get the difficulty level
    gameStarted = true; // Set the game as started
    difficultyContainer.classList.add('hidden'); // Hide the difficulty selection
    gameContainer.classList.remove('hidden'); // Show the game area
    gameBoard.innerHTML = ''; // Clear the game board
    flippedCards = []; // Reset flipped cards
    matchesFound = 0; // Reset matched pairs
    clearInterval(timer); // Stop any existing timer
    startTimer(); // Start the timer
    generateCards(); // Generate the game cards
}

function startTimer() {
    let time = 0; // Start time at 0
    timer = setInterval(() => { // Update the timer every second
        time++; // Increase time by 1
        timerValue.textContent = time; // Display the current time
    }, 1000);
}

function generateCards() {
    let deck = []; // Prepare a new deck of cards
    const numPairs = numCards / 2; // Calculate number of pairs
    for (let i = 0; i < numPairs; i++) {
        deck.push(cardImages[i], cardImages[i]); // Add pairs of images to the deck
    }
    deck = deck.sort(() => Math.random() - 0.5); // Shuffle the deck randomly

    // Create card elements
    deck.forEach(image => {
        const card = document.createElement('div'); // Create a new card element
        card.classList.add('card'); // Add a class for styling
        card.dataset.image = image; // Store the image name in the card

        const img = document.createElement('img'); // Create an image element
        img.src = `images/${image}.png`; // Set the image source to .png
        img.alt = `Card Image ${image}`; // Set alt text for accessibility

        // Error handling if the image isn't found
        img.onerror = () => { // If .png fails, try .jpg
            img.src = `images/${image}.jpg`; // Fallback to .jpg
            img.onerror = () => { // If .jpg fails, try .jpeg
                img.src = `images/${image}.jpeg`; // Fallback to .jpeg
            };
        };
        
        card.appendChild(img); // Add the image to the card
        card.addEventListener('click', () => flipCard(card)); // Add click event to flip the card
        gameBoard.appendChild(card); // Add the card to the game board
    });

    // Adjust the grid layout based on the number of cards
    const numColumns = Math.ceil(Math.sqrt(numCards)); // Calculate number of columns needed
    gameBoard.style.gridTemplateColumns = `repeat(${numColumns}, 100px)`; // Set the grid style
}

function flipCard(card) {
    // Only flip the card if the game has started and it's not already flipped
    if (!gameStarted || card.classList.contains('flipped') || flippedCards.length === 2) {
        return; // Exit if conditions are not met
    }

    card.classList.add('flipped'); // Mark the card as flipped
    flippedCards.push(card); // Add the card to flipped cards

    if (flippedCards.length === 2) { // Check for a match if two cards are flipped
        checkForMatch(); // Call the function to check for a match
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards; // Get the two flipped cards
    if (card1.dataset.image === card2.dataset.image) { // If they match
        matchesFound++; // Increase the match count
        if (matchesFound === numCards / 2) { // If all pairs are found
            endGame(); // End the game
        }
        flippedCards = []; // Clear flipped cards
    } else { // If they don't match
        setTimeout(() => { // Wait a second before flipping them back
            card1.classList.remove('flipped'); // Unflip the first card
            card2.classList.remove('flipped'); // Unflip the second card
            flippedCards = []; // Clear flipped cards
        }, 1000); // Wait for 1 second
    }
}

function endGame() {
    clearInterval(timer); // Stop the timer
    timeTaken.textContent = timerValue.textContent; // Show the time taken to complete the game
    congratulations.classList.remove('hidden'); // Show the congratulations message
}

function playAgain() {
    congratulations.classList.add('hidden'); // Hide the congratulations message
    gameContainer.classList.add('hidden'); // Hide the game area
    difficultyContainer.classList.remove('hidden'); // Show the difficulty selection again
}


startButton.addEventListener('click', startGame); // Start the game when the button is clicked
playAgainButton.addEventListener('click', playAgain); // Restart the game when the play again button is clicked
