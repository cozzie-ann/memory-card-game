
# Memory Card Game

A simple memory card game where players flip cards to find matching pairs. The game includes multiple difficulty levels and a timer to track the duration of gameplay.

## Features

- **Difficulty Levels**: Choose between Easy and Difficult modes.
- **Timer**: Track the time taken to complete the game.
- **Matching Game**: Flip cards to find and match pairs.
- **Responsive Design**: Game board adjusts to different screen sizes.

## Project Structure

- **`index.html`**: The main HTML file that structures the game layout.
- **`styles.css`**: Contains all the CSS styles for the game.
- **`script.js`**: Contains the JavaScript logic for game functionality.

## Setup

To set up and run the memory card game locally, follow these steps:

1. **Clone the Repository**:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Ensure Proper Directory Structure**:

   The directory structure should look like this:
   
   ```
   /dino-game
   ├── images/
   │   ├── ace.jpg
   │   ├── doffy.jpg
   │   ├── law.jpg
   │   ├── nami.jpg
   │   ├── nico.jpg
   │   ├── YouLost.png
   │   ├── youwon.png
   │   ├── zoro.png
   ├── index.html
   ├── styles.css
   └── script.js
   ```

   Make sure all images are placed in the `images` folder.

3. **Open the Game in a Browser**:

   Open the `index.html` file in a web browser to start playing the game.

## How to Play

1. **Select Difficulty**:
   - Choose between `Easy` (10 cards) or `Difficult` (16 cards) using the radio buttons.

2. **Start the Game**:
   - Click the "Start Game" button to begin.

3. **Flip Cards**:
   - Click on the cards to flip them. Try to find matching pairs.

4. **Game Completion**:
   - The game ends when all pairs are matched. Your total time will be displayed.

5. **Play Again**:
   - Click the "Play Again" button to restart the game with the same difficulty level.

## Customizing the Game

- **Images**: Add or replace images in the `images` folder. Ensure that image names and extensions match those used in the `script.js` file.
- **Difficulty Levels**: Adjust the `numCards` variable and `cardImages` array in `script.js` to change difficulty levels and image pairs.

## CSS Styling

- **Background Color**: The background color of the page and game elements is set to `lavenderblush`. Customize in `styles.css`.

## Troubleshooting

- **Images Not Displaying**: Ensure the image paths and filenames are correct. Check if the correct file extensions (`.jpg`, `.jpeg`, `.png`) are used.
- **Game Not Starting**: Verify that all elements are properly connected and IDs match those referenced in `script.js`.

## License

This project is licensed under the MIT License - see the [LICENSE] file for details