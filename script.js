let matrix;
let frogPos = [0, 6];
let gameStarted = 0;
let resistance = 0.05; // dificuldade (quanto mais alto, mais difícil)
const board = document.getElementById("board");
const frog = document.getElementById("frog");
const vehicleSpeeds = {"truck": 1.2, "car": 2, "police": 2.7, "race": 4, "fighter": 12} // velocidades dos veículos
const fs = frog.style;
let ms = 50;
const matrixTrack = {1: 1, 2: 3, 3: 5, 4: 6}
let idCounter = 0;
let isDead = 0;
var loopId;
let isVictory = 0;

function startGame() {
    if (gameStarted) {return;}

    let classArray = [".fourth", ".third", ".second", ".first"];

    classArray.forEach(className => {
        board.querySelectorAll(className).forEach(vehicle => vehicle.remove());
    });

    gameStarted = 1;
    flag = 1;
    horizontalFlag = 0;
    verticalFlag = 0;
    frogPos = [0, 6];
    isDead = 0;
    isVictory = 0;

    matrix = [
        [4,4,4,0,0,0,1,0,0,0,4,4,4], // linha de início
        [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 1
        [4,4,4,0,4,0,0,0,4,0,4,4,4], // calçada
        [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 2
        [4,4,4,4,0,0,0,0,0,0,4,4,4], // calçada
        [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 3
        [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 4
        [4,4,0,4,5,4,4,4,4,5,4,4,4], // linha de chegada
        [4,4,4,0,0,0,0,0,0,0,4,4,4] // linha final
    ];

    fs.top = '-169px';
    fs.left = '-778px';
    fs.transition = 'transition: all 0.3s ease-in';

    board.style.top = "calc(50vh - 260px)";

        loopId = setInterval(function() {

            if (gameStarted) {
                if (Math.random() < resistance) { // geração aleatória de veículos
                    let n = Math.random();
                    let n2 = Math.random();
                    let pista = 0;
                    let vehicle = '';
                    let vehicleObj = document.createElement("img");
                    vehicleObj.classList.add("car");

                    if (n < 0.25) {
                        pista = 1;
                    } else if (n < 0.5) {
                        pista = 2;
                    } else if (n < 0.75) {
                        pista = 3;
                    } else if (n <= 1) {
                        pista = 4;
                    }

                    if (n2 < 0.45) { // Car (45%)
                        vehicle = "car";
                        if (pista % 2 == 0) {
                            vehicleObj.src = './img/car-left-1.png';
                            vehicleObj.classList.add("car", pista == 2 ? 'second' : 'fourth');
                        } else {
                            vehicleObj.src = './img/car-right-' + (Math.floor(Math.random() * 4) + 1) +  '.png';
                            vehicleObj.classList.add("car", pista == 1 ? 'first' : 'third');
                        }
                        playSound("car-engine");
                    } else if (n2 < 0.7) { // Truck/Bus (25%)
                        vehicle = "truck";
                        if (Math.random() < 0.5) {
                            pista = 1;
                            vehicleObj.classList.add("truck", "first");
                            vehicleObj.src = './img/truck1.png';
                            playSound("truck-engine");
                        } else {
                            pista = 3;
                            vehicleObj.classList.add("truck", 'third');
                            vehicleObj.src = './img/truck2.png';
                            playSound("bus");
                        }
                    } else if (n2 < 0.8) { // Police Car (10%)
                        vehicle = "police";
                        if (Math.random() < 0.5) {
                            pista = 2;
                            vehicleObj.classList.add("police", "second");
                        } else {
                            pista = 4;
                            vehicleObj.classList.add("police", "fourth");
                        }
                        vehicleObj.src = './img/car-left-2-police.png';
                        playSound("siren1");
                    } else if (n2 < 0.95) { // Race Car (15%)
                        vehicle = "race";
                        if (Math.random() < 0.5) {
                            pista = 2;
                            vehicleObj.classList.add("race", "second");
                        } else {
                            pista = 4;
                            vehicleObj.classList.add("race", "fourth");
                        }
                        vehicleObj.src = './img/car-left-3-race.png';
                        playSound("race-engine");
                    } else { // TIE Fighter and X-Wing (5%)
                        vehicle = "fighter";
                        vehicleObj.src = './img/empty.png';
                        let warning;
                        if (Math.random() < 0.5) {
                            pista = 1;
                            vehicleObj.classList.add("fighter", "first");
                            matrix[1][12] = 2; 
                            vehicleObj.style.top = "230px";
                            vehicleObj.style.left = "-6px";
                            board.appendChild(vehicleObj);
                            setTimeout(function () {
                                vehicleObj.src = './img/fighters.png';
                                vehicleObj.style.top = "552px";
                                vehicleObj.style.left = "690px";
                            }, 2700);
                            warning = document.createElement("img");
                            warning.classList.add("warning",  "first");
                            warning.src = './img/warning.png';
                            board.appendChild(warning);
                            setTimeout(function() {warning.style.top = "190px"; warning.style.opacity = "0";}, 20);
                        } else {
                            pista = 3;
                            vehicleObj.classList.add("fighter", "third");
                            matrix[5][12] = 2;
                            vehicleObj.style.top = "105px";
                            vehicleObj.style.left = "222px";
                            board.appendChild(vehicleObj);
                            setTimeout(function () {
                                vehicleObj.src = './img/fighters.png';
                                vehicleObj.style.top = "440px";
                                vehicleObj.style.left = "918px";
                            }, 2700);
                            warning = document.createElement("img");
                            warning.classList.add("warning", "third");
                            warning.src = './img/warning.png';
                            board.appendChild(warning);
                            setTimeout(function() {warning.style.top = "75px"; warning.style.opacity = "0";}, 20);
                        }
                    }
                    let x = 0;
                    if (vehicle != "fighter") {
                        switch (pista) {
                            case 1:
                                matrix[1][12] = 2; 
                                vehicleObj.style.top = "230px";
                                vehicleObj.style.left = "-6px";
                                if (vehicle != "truck") {
                                    x = 15;
                                }
                                board.appendChild(vehicleObj);
                                setTimeout(function () {
                                    vehicleObj.style.top = (572+x).toString() + "px";
                                    vehicleObj.style.left = "690px";
                                }, 15);
                                break;
                            case 2:
                                matrix[3][0] = 2;
                                vehicleObj.style.top = "537px";
                                vehicleObj.style.left = "818px";
                                board.appendChild(vehicleObj);
                                setTimeout(function () {
                                    vehicleObj.style.top = "162px";
                                    vehicleObj.style.left = "64px";
                                }, 15);
                                break;
                            case 3:
                                matrix[5][12] = 2;
                                vehicleObj.style.top = "105px";
                                vehicleObj.style.left = "222px";
                                if (vehicle != "truck") {
                                    vehicleObj.style.top = "115px";
                                    x = 21
                                }
                                board.appendChild(vehicleObj);
                                setTimeout(function () {
                                    vehicleObj.style.top = (450+x).toString() + "px";
                                    vehicleObj.style.left = "918px";
                                }, 15);
                                break;
                            case 4:
                                matrix[6][0] = 2;
                                vehicleObj.style.top = "444px";
                                vehicleObj.style.left = "994px";
                                if (vehicle != "car") {
                                    vehicleObj.style.top = "456px";
                                }
                                board.appendChild(vehicleObj);
                                setTimeout(function () {
                                    vehicleObj.style.top = (80+x).toString() + "px";
                                    vehicleObj.style.left = "240px";
                                }, 15);
                        }
                    }
                    let c;
                    if (pista % 2 == 0) {
                        c = 1;
                    } else {
                        c = 11;
                    }
                    matrix[matrixTrack[pista]][c] = 2;
                    if (vehicle != "fighter") {
                        let intervalId = setInterval(function() {
                            if (gameStarted == 0) {clearInterval(intervalId);}
                            if (matrix[matrixTrack[pista]][c + (pista % 2 == 0 ? 2 : -2)] == 1) {
                                switch (vehicle) {
                                    case "race":
                                    case "car":
                                        playSound("horn" + (Math.floor(Math.random() * 2) + 1));
                                        break;
                                    case "truck":
                                        if (pista == 1) {
                                            playSound("horn-truck");
                                        } else {
                                            playSound("horn-bus");
                                        }
                                        break;
                                    case "police":
                                        playSound("police-horn");
                                }
                            }
                            matrix[matrixTrack[pista]][c] = 0;
                            if (pista % 2 == 0) {
                                c++;
                                if (c == 12) {
                                    vehicleObj.remove();
                                    clearInterval(intervalId);
                                }
                                
                            } else {
                                c--;
                                if (c == 0) {
                                    vehicleObj.remove();
                                    clearInterval(intervalId);
                                }
                            }
                            if (matrix[matrixTrack[pista]][c] == 1) {
                                deathSequence();
                                gameStarted = 0;
                                clearInterval(intervalId);
                            }
                            matrix[matrixTrack[pista]][c] = 2;
                        }, (1/vehicleSpeeds[vehicle]) * 1000)
                    } else {
                        playSound("fighter-incoming");
                        setTimeout(function () {
                            playSound("fighter-pass");
                            let intervalId = setInterval(function() {
                                if (gameStarted == 0) {clearInterval(intervalId);}
                                matrix[matrixTrack[pista]][c] = 0;
                                if (pista % 2 == 0) {
                                    c++;
                                    if (c == 12) {
                                        vehicleObj.remove();
                                        clearInterval(intervalId);
                                    }
                                    
                                } else {
                                    c--;
                                    if (c == 0) {
                                        vehicleObj.remove();
                                        clearInterval(intervalId);
                                    }
                                }
                                if (matrix[matrixTrack[pista]][c] == 1) {
                                    deathSequence();
                                    gameStarted = 0;
                                    clearInterval(intervalId);
                                }
                                matrix[matrixTrack[pista]][c] = 2;
                            }, (1/vehicleSpeeds[vehicle]) * 1000);
                        }, 2500);
                    }
                }
            }
        }, ms);
    }

function deathSequence() {
    if (isDead || isVictory) {return;}
    stopAllSounds();
    clearInterval(loopId);
    playSound("death" + (Math.floor(Math.random() * 3) + 1));
    isDead = 1;
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.color = "white";
    overlay.style.fontSize = "2rem";
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "0";
    overlay.style.transition = "all 1.5s ease";

    const message = document.createElement("div");
    message.innerText = "Game Over";
    message.style.marginBottom = "20px";

    const button = document.createElement("button");
    button.innerText = "Ribbit ribbit :(";
    button.style.padding = "10px 20px";
    button.style.fontSize = "1.5rem";
    button.style.cursor = "pointer";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.backgroundColor = "red";
    button.style.color = "white";
    button.style.opacity = "0";
    button.style.transition = "all 1s ease";
    
    button.onclick = function () {
        document.body.removeChild(overlay);
        startGame();
    };

    overlay.appendChild(message);
    document.body.appendChild(overlay);
    setTimeout(function() {
        overlay.style.opacity = "1";
    }, 10)
    setTimeout(function() {
        overlay.appendChild(button);
        button.style.opacity = "1";
    }, 1500)
}

function victorySequence() {
    stopAllSounds();
    isVictory = 1;
    gameStarted = 0;
    clearInterval(loopId);
    playSound("victory1");
    isDead = 1;
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.color = "white";
    overlay.style.fontSize = "2rem";
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "0";
    overlay.style.transition = "all 1.5s ease";

    const message = document.createElement("div");
    message.innerText = "Vitória!";
    message.style.marginBottom = "20px";

    const button = document.createElement("button");
    button.innerText = "Ribbit ribbit :)";
    button.style.padding = "10px 20px";
    button.style.fontSize = "1.5rem";
    button.style.cursor = "pointer";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.backgroundColor = "green";
    button.style.color = "white";
    button.style.opacity = "0";
    button.style.transition = "all 1s ease";
    
    button.onclick = function () {
        document.body.removeChild(overlay);
        playSound("revive");
        startGame();
    };

    overlay.appendChild(message);
    document.body.appendChild(overlay);
    setTimeout(function() {
        overlay.style.opacity = "1";
    }, 10)
    setTimeout(function() {
        overlay.appendChild(button);
        button.style.opacity = "1";
    }, 1500)
}

function playSound(src) {
    const sound = new Audio("./sfx/" + src + ".ogg");
    sound.play();
}

function stopAllSounds() {
    document.querySelectorAll("audio").forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

let flag = 0;
let horizontalFlag = 0;
let verticalFlag = 0;
let isVertical = 0;
document.addEventListener("keypress", function onEvent(event) {
    if (!gameStarted || !flag) {return;}

    let goAhead = 0;

    switch(event.key) {
        case "ArrowLeft":
        case "a":
        case "A":
            frog.src = "./img/frog-topleft.png";
            // 57: left movement negative, matrix: left movement positive
            // 27: up movement is negative, matrix: up movement positive
            horizontalFlag = 1;
            verticalFlag = 1;
            isVertical = 0;
            break;
        case "ArrowUp":
        case "w":
        case "W":
            frog.src = "./img/frog-topright.png";
            verticalFlag = 1;
            horizontalFlag = -1;
            isVertical = 1;
            break;
        case "ArrowDown":
        case "s":
        case "S":
            frog.src = "./img/frog-bottomleft.png";
            verticalFlag = -1;
            horizontalFlag = 1;
            isVertical = 1;
            break;
        case "ArrowRight":
        case "d":
        case "D":
            frog.src = "./img/frog-bottomright.png";
            horizontalFlag = -1;
            verticalFlag = -1;
            isVertical = 0;
    }
    let nope;
    try {
        let a = matrix[frogPos[0] + (isVertical ? verticalFlag : 0)][frogPos[1] + (isVertical ? 0 : horizontalFlag)];
        if (a != 4 && a != 2 && a != undefined && a != 5) {
            fs.top = (parseInt(fs.top) + (verticalFlag < 0 ? 28 : -28)).toString() + "px";
            fs.left = (parseInt(fs.left) + (horizontalFlag < 0 ? 58 : -58)).toString() + "px";
            goAhead = 1;
            playSound("jump");
        } else if (a == 2) {
            fs.top = (parseInt(fs.top) + (verticalFlag < 0 ? 28 : -28)).toString() + "px";
            fs.left = (parseInt(fs.left) + (horizontalFlag < 0 ? 58 : -58)).toString() + "px";
            playSound("jump");
            goAhead = -1
        } else if (a == 4) {
            goAhead = 0;
            throw new Error();
        } else if (a == 5) {
            fs.top = (parseInt(fs.top) + (verticalFlag < 0 ? 28 : -28)).toString() + "px";
            fs.left = (parseInt(fs.left) + (horizontalFlag < 0 ? 58 : -58)).toString() + "px";
            playSound("jump");
            goAhead = 2;
        } else {
            throw new Error();
        }
    } catch (err) {
        nope = document.createElement("img");
        nope.classList.add("nope");
        nope.src = './img/x.png';
        board.appendChild(nope);
        setTimeout(function() {nope.style.top = "250px"; nope.style.opacity = "0";}, 20)
    }
    flag = 0;
    setTimeout(function() {
        if (goAhead == 1) {
            matrix[frogPos[0]][frogPos[1]] = 0;
            frogPos[0] += (isVertical ? verticalFlag : 0);
            frogPos[1] += (isVertical ? 0 : horizontalFlag);
            matrix[frogPos[0]][frogPos[1]] = 1;
            isVertical = 0;
        } else if (goAhead == -1 && (matrix[frogPos[0] + (isVertical ? verticalFlag : 0)][frogPos[1] + (isVertical ? 0 : horizontalFlag)] == 2)) {
            deathSequence();
        } else if (goAhead == -1) {
            goAhead = 1;
            matrix[frogPos[0]][frogPos[1]] = 0;
            frogPos[0] += (isVertical ? verticalFlag : 0);
            frogPos[1] += (isVertical ? 0 : horizontalFlag);
            matrix[frogPos[0]][frogPos[1]] = 1;
            isVertical = 0;
        } else if (goAhead == 2) {
            victorySequence();
        }
        horizontalFlag = 0;
        verticalFlag = 0;
    }, 550);
    setTimeout(function() {
        if (goAhead == 1) {
            flag = 1;
        } else if (goAhead == -1) {
            gameStarted = 0;
            flag = 0;
        } else {
            nope.remove();
            flag = 1;
        }
        horizontalFlag = 0;
        verticalFlag = 0;
    }, 1100);
});

const slider = document.getElementById("slider");
slider.oninput = () => {
    resistance = parseFloat(slider.value);
    value.textContent = resistance;
};