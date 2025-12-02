// Game State
let currentCaseIndex = 0;
let currentCase = null;
let currentNodeId = "start";
let health = 100;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const scenarioText = document.getElementById('scenario-text');
const choicesContainer = document.getElementById('choices-container');
const healthBar = document.getElementById('health-bar');
const caseTitle = document.getElementById('case-title');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');

// Event Listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetGame);

// Functions
function startGame() {
    currentCaseIndex = 0; // Start with the first case
    loadCase(currentCaseIndex);
    switchScreen(startScreen, gameScreen);
}

function loadCase(index) {
    currentCase = cases[index];
    health = 100;
    updateHealthUI();

    if (caseTitle) {
        caseTitle.textContent = currentCase.title;
    }

    loadNode(currentCase.initialNode);
}

function loadNode(nodeId) {
    currentNodeId = nodeId;
    const node = currentCase.nodes[nodeId];

    // Typewriter effect
    scenarioText.textContent = "";
    scenarioText.style.opacity = 1;

    let i = 0;
    const speed = 20; // ms per char

    function typeWriter() {
        if (i < node.text.length) {
            scenarioText.textContent += node.text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();

    // Render Choices
    choicesContainer.innerHTML = '';

    if (node.isEnding) {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = "결과 확인";
        btn.onclick = () => showResult(node.isWin, node.text);
        choicesContainer.appendChild(btn);
    } else {
        node.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.onclick = () => handleChoice(choice);
            choicesContainer.appendChild(btn);
        });
    }
}

function handleChoice(choice) {
    // Apply health change
    if (choice.healthChange !== 0) {
        health += choice.healthChange;
        if (health > 100) health = 100;
        if (health < 0) health = 0;
        updateHealthUI();

        // Visual feedback for damage
        if (choice.healthChange < 0) {
            gameScreen.classList.add('shake');
            setTimeout(() => gameScreen.classList.remove('shake'), 400);
        }
    }

    // Check for game over by health
    if (health <= 0) {
        showResult(false, "신뢰도가 바닥났습니다. 의뢰인이 당신을 해임했습니다.");
        return;
    }

    // Move to next node
    loadNode(choice.nextNode);
}

function updateHealthUI() {
    healthBar.style.width = `${health}%`;
    if (health > 60) {
        healthBar.style.backgroundColor = '#22c55e'; // Green
    } else if (health > 30) {
        healthBar.style.backgroundColor = '#fbbf24'; // Yellow
    } else {
        healthBar.style.backgroundColor = '#ef4444'; // Red
    }
}

function showResult(isWin, message) {
    resultTitle.textContent = isWin ? "승소" : "패소";
    resultTitle.style.color = isWin ? "#22c55e" : "#ef4444";
    resultMessage.textContent = message;

    // Update button based on result
    if (isWin && currentCaseIndex < cases.length - 1) {
        restartBtn.textContent = "다음 사건으로";
        restartBtn.onclick = nextCase;
    } else {
        restartBtn.textContent = "메인으로";
        restartBtn.onclick = resetGame;
    }

    switchScreen(gameScreen, resultScreen);
}

function nextCase() {
    currentCaseIndex++;
    loadCase(currentCaseIndex);
    switchScreen(resultScreen, gameScreen);
}

function resetGame() {
    switchScreen(resultScreen, startScreen);
}

function switchScreen(from, to) {
    from.classList.remove('active');
    from.classList.add('hidden');

    setTimeout(() => {
        to.classList.remove('hidden');
        void to.offsetWidth;
        to.classList.add('active');
    }, 50);
}
