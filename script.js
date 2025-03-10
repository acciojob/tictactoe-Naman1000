//your JS code here. If required.

document.getElementById("submit").addEventListener("click", startGame);

let player1 = "";
let player2 = "";
let currentPlayer = "";
let gameActive = true;

function startGame() {
    player1 = document.getElementById("player-1").value.trim() || "Player 1";
    player2 = document.getElementById("player-2").value.trim() || "Player 2";

    currentPlayer = player1; // Player 1 starts first

    document.getElementById("player-form").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.querySelector(".message").innerText = `${currentPlayer}, you're up!`;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.addEventListener("click", handleMove);
    });

    gameActive = true;
}

function handleMove(event) {
    if (!gameActive) return;

    let cell = event.target;

    if (cell.innerText !== "") return; // Prevent overriding

    cell.innerText = (currentPlayer === player1) ? "X" : "O";

    if (checkWinner()) {
        document.querySelector(".message").innerText = `${currentPlayer}, congratulations you won! 🎉`;
        gameActive = false;
        setTimeout(startGame, 2000); // Restart game after 2 seconds
    } else {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        document.querySelector(".message").innerText = `${currentPlayer}, you're up!`;
    }
}

function checkWinner() {
    const winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let cellA = document.getElementById(a).innerText;
        let cellB = document.getElementById(b).innerText;
        let cellC = document.getElementById(c).innerText;

        if (cellA && cellA === cellB && cellA === cellC) {
            return true; // We have a winner!
        }
    }
    return false;
}
