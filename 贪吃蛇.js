var snakeHead = document.getElementsByClassName('snake')[0],
    snakes = document.getElementsByClassName('snakes')[0],
    snakeTail,
    snakeEnd,
    mantle = document.getElementsByClassName('mantle')[0],
    food = document.getElementsByClassName('food')[0],
    score = document.getElementsByClassName('score')[0],
    timer1,
    timer2,
    timer3,
    timer4,
    keyX = true,
    keyY = true;

// 清除定时器
function clearTimer() {
    clearInterval(timer1);
    clearInterval(timer2);
    clearInterval(timer3);
    clearInterval(timer4);
}

// 游戏结束
function gameOver() {
    mantle.className = 'mantle';
    document.removeEventListener('keydown', movingPosition, false);
    clearTimer();
}

// 移动
function move(direction, interval, distance) {
    for (var i = snakes.children.length - 1; i > 0; i--) {
        snakes.children[i].style.top = getStyle(retSibling(snakes.children[i], -1), 'top');
        snakes.children[i].style.left = getStyle(retSibling(snakes.children[i], -1), 'left');
    }
    snakeHead.style[direction] = parseInt(getStyle(snakeHead, direction)) + interval + 'px';
    if (parseInt(getStyle(snakeHead, direction)) == distance) {
        gameOver();
        snakes.appendChild(snakeEnd);
        snakes.children[1].className += ' end';
    }
    if (getStyle(snakeHead, 'top') == getStyle(food, 'top') && getStyle(snakeHead, 'left') == getStyle(food, 'left')) {
        addSnake();
        randomFood();
        score.innerText ++;
    }
    for (var i = 1; i < snakes.children.length; i++) {
        if (getStyle(snakeHead, 'top') == getStyle(snakes.children[i], 'top') && getStyle(snakeHead, 'left') == getStyle(snakes.children[i], 'left')) {
            gameOver();
        }
    }
    if (getStyle(snakeHead, 'top') == '0px' || getStyle(snakeHead, 'top') == '780px' || getStyle(snakeHead, 'left') == '0px' || getStyle(snakeHead, 'left') == '780px') {
        snakeEnd = document.createElement('div');
        snakeEnd.className = 'snake';
        snakeEnd.style.top = getStyle(snakes.children[snakes.children.length - 1], 'top');
        snakeEnd.style.left = getStyle(snakes.children[snakes.children.length - 1], 'left');
    }
}

// 加蛇
function addSnake() {
    snakeTail = document.createElement('div');
    snakeTail.className = 'snake';
    snakeTail.style.top = getStyle(snakes.children[snakes.children.length - 1], 'top');
    snakeTail.style.left = getStyle(snakes.children[snakes.children.length - 1], 'left');
    snakes.appendChild(snakeTail);
}

// 随机食物
function randomFood() {
    food.style.top = parseInt(Math.random() * 40) * 20 + 'px';
    food.style.left = parseInt(Math.random() * 40) * 20 + 'px';
    for (var i = 0; i < snakes.children.length; i++) {
        if (food.style.top == getStyle(snakes.children[i], 'top') && food.style.left == getStyle(snakes.children[i], 'left')) {
            randomFood();
            break;
        }
    }
}

addEvent(document, 'keydown', movingPosition);
function movingPosition(e) {
    var event = e || window.event;
    switch (event.which) {
        case 37:
            if (keyX) {
                clearTimer();
                timer1 = setInterval(function () {
                    move('left', -20, -20);
                }, 150);
                move('left', -20, -20);
                keyX = false;
                keyY = true;
            }
            break;
        case 38:
            if (keyY) {
                clearTimer();
                timer2 = setInterval(function () {
                    move('top', -20, -20);
                }, 150);
                move('top', -20, -20);
                keyX = true;
                keyY = false;
            }
            break;
        case 39:
            if (keyX) {
                clearTimer();
                timer3 = setInterval(function () {
                    move('left', 20, 800);
                }, 150);
                move('left', 20, 800);
                keyX = false;
                keyY = true;
            }
            break;
        case 40:
            if (keyY) {
                clearTimer();
                timer4 = setInterval(function () {
                    move('top', 20, 800);
                }, 150);
                move('top', 20, 800);
                keyX = true;
                keyY = false;
            }
            break;
    }
}

randomFood();

if (keyX) {
    clearTimer();
    move('left', 20, 800);
    timer3 = setInterval(function () {
        move('left', 20, 800);
    }, 150);
    keyX = false;
    keyY = true;
}
