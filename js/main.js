const gridContainer = document.querySelector("#grid-container");
const sizeBtn = document.querySelector("#size-btn");
const clearBtn = document.querySelector("#clear-btn");
const blackBtn = document.querySelector("#color-black-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");

let currentMode = "black";
let currentSize = 16;

// Generates a grid of (size x size)
function createGrid(size) {
    // Clears the content from before
    gridContainer.innerHTML = "";

    const totalSquares = size * size;
    const squareDimension = 100 / size; // Height/width exact percentage

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        // Relative sizing to fit exactly 100% of the space
        square.style.flex = `0 0 ${squareDimension}%`;
        square.style.height = `${squareDimension}%`;

        // Hover effect
        square.addEventListener("mouseover", paintSquare);

        gridContainer.appendChild(square);
    }
}

// Paints grid cells considering the active mode
function paintSquare(e) {
    if (currentMode === "rainbow") {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else {
        e.target.style.backgroundColor = "#111827";
    }
}

// Asks for a new size and validates new data
function promptNewSize() {
    let newSize = prompt("Enter the number of cells by side (1 to 100): ", currentSize);

    if (newSize === null) return; // Canceled by the user

    newSize = parseInt(newSize, 10);

    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert("Please enter a valid numer between 1 and 100.");
        return;
    }

    currentSize = newSize;
    createGrid(currentSize);
}

// Clears the grid mantaing the actual size
function clearGrid() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((sq) => (sq.style.backgroundColor = "#ffffff"));
}

// Event Listeners
sizeBtn.addEventListener("click", promptNewSize);
clearBtn.addEventListener("click", clearGrid);
blackBtn.addEventListener("click", () => (currentMode = "black"));
rainbowBtn.addEventListener("click", () => (currentMode = "rainbow"));

// Initialization: creates the base grid of 16x16
createGrid(currentSize);