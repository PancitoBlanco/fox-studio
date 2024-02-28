// Definición de variables y constantes
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');
const { width: canvasWidth, height: canvasHeight } = canvas;
const paddleWidth = 10;
const paddleHeight = 60;
const ballSize = 10;

let paddle1Y = canvasHeight / 2 - paddleHeight / 2;
let paddle2Y = canvasHeight / 2 - paddleHeight / 2;
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Función para dibujar elementos
function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = '30px Arial';
    context.fillText(text, x, y);
}

// Función principal de dibujo
function draw() {
    // Limpiar el canvas
    drawRect(0, 0, canvasWidth, canvasHeight, '#330000'); // rojo oscuro más oscuro

    // Dibujar paletas
    drawRect(0, paddle1Y, paddleWidth, paddleHeight, '#FFFFFF'); // blanco
    drawRect(canvasWidth - paddleWidth, paddle2Y, paddleWidth, paddleHeight, '#FFFFFF'); // blanco

    // Dibujar pelota
    drawCircle(ballX, ballY, ballSize, '#FFFFFF'); // blanco
}

// Función de actualización
function update() {
    // Movimiento de la pelota
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisión con el borde superior e inferior
    if (ballY + ballSize > canvasHeight || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisión con las paletas
    if (ballX - ballSize < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight ||
        ballX + ballSize > canvasWidth - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Si la pelota sale por la izquierda o la derecha, se reinicia
    if (ballX - ballSize < 0 || ballX + ballSize > canvasWidth) {
        resetBall();
    }
}

// Función de reinicio de la pelota
function resetBall() {
    ballX = canvasWidth / 2;
    ballY = canvasHeight / 2;
    ballSpeedX = -ballSpeedX; // Cambia la dirección de la pelota
}

// Función de loop de juego
function gameLoop() {
    update();
    draw();
}

// Llamar a gameLoop cada 60ms
setInterval(gameLoop, 1000 / 60);

// Funciones para manejar el movimiento de las paletas
canvas.addEventListener('mousemove', function(event) {
    let mousePos = calculateMousePos(event);
    paddle1Y = mousePos.y - paddleHeight / 2;
});

function calculateMousePos(event) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = event.clientX - rect.left - root.scrollLeft;
    let mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}
