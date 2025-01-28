// 0: espaço vazio; 1: sapo; 2: carro; 3: caminhão/ônibus (ocupam dois espaços); 4: espaço ocupado
let matrix = [
    [4,4,4,0,0,0,1,0,0,0,4,4,4], // linha de início
    [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 1
    [4,4,4,0,4,0,0,0,4,0,4,4,4], // calçada
    [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 2
    [4,4,4,0,0,0,0,0,0,4,4,4,4], // calçada
    [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 3
    [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 4
    [4,4,4,0,4,4,4,4,0,4,4,4,4], // linha de chegada
    [4,0,0,0,0,0,0,0,4] // linha final
];
let frogPos = [0, 6];
let gameStarted = 0;
let resistance = 0.005; // dificuldade (quanto mais alto, mais difícil)
const board = document.getElementById("board");
const frog = document.getElementById("frog");
const vehicleSpeeds = {"truck": 1.2, "car": 2, "police": 2.3, "race": 2.8, "fighters": 18} // velocidades dos veículos
let vehicleArr = []; // armazena os veículos ativos
const fs = frog.style;
let starDestroyer = 0;



function startGame() {

    if (gameStarted) {return;}

    gameStarted = 1;
    flag = 1;
    horizontalFlag = 0;
    verticalFlag = 0;
    frogPos = [0, 6];
    vehicleArr = []

    matrix = [
        [4,4,4,0,0,0,1,0,0,0,4,4,4], // linha de início
        [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 1
        [4,4,4,0,4,0,0,0,4,0,4,4,4], // calçada
        [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 2
        [4,4,4,0,0,0,0,0,0,4,4,4,4], // calçada
        [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 3
        [0,0,0,0,0,0,0,0,0,0,0,0,0], // pista 4
        [4,4,4,0,4,4,4,4,0,4,4,4,4], // linha de chegada
        [4,0,0,0,0,0,0,0,4] // linha final
    ];

    frog.style.top = '-240px';
    frog.style.left = '-750px';
    fs.transition = 'transition: all 0.3s ease-in';

    board.style.top = "calc(50vh - 260px)";

    function gameLoop() {
        setTimeout(function() {

            if (gameStarted) {

                if (Math.random() < resistance) { // geração aleatória de veículos
                    let n = Math.random();
                    let n2 = Math.random();
                    let pista = 0;
                    let vehicle = '';
                    let vehicleObj = document.createElement("img");
                    vehicleObj.classList.add("car");

                    switch (n) { // determina a pista / evento especial
                        case n < 0.23: // pista 1
                            pista = 1;
                            break;
                        case n < 0.46: // pista 2
                            pista = 2;
                            break;
                        case n < 0.69: // pista 3
                            pista = 3;
                            break;
                        case n < 0.94: // pista 4
                            pista = 4;
                            break;
                        case n <= 1: // Bombardeio de Star Destroyer (6% de chance)
                            starDestroyer = 1;
                    }

                    if (!starDestroyer) {
                        switch (n2) { // determina o tipo de veículo
                            case n2 < 0.45: // carro (45%)
                                vehicle = "car";
                                if (pista % 2 == 0) {
                                    vehicleObj.src = './img/car-left-1.png';
                                    vehicleObj.classList.add("car", pista == 2 ? 'second' : 'fourth');
                                } else {
                                    vehicleObj.src = './img/car-right-' + (Math.floor(Math.random() * 4) + 1) +  '.png';
                                    vehicleObj.classList.add("car", pista == 1 ? 'first' : 'third');
                                }
                                break;
                            case n2 < 0.7: // caminhão/Ônibus (25%)
                                vehicle = "truck";
                                if (Math.random() < 0.5) {
                                    pista = 1;
                                    vehicleObj.classList.add("truck", "first");
                                    vehicleObj.src = './img/truck1.png';
                                } else {
                                    pista = 3;
                                    vehicleObj.classList.add("truck", 'third');
                                    vehicleObj.src = './img/truck2.png';
                                }
                                break;
                            case n2 < 0.8: // carro de polícia (10%)
                                vehicle = "police";
                                if (Math.random() < 0.5) {
                                    pista = 2;
                                    vehicleObj.classList.add("car", "second");
                                } else {
                                    pista = 4;
                                    vehicleObj.classList.add("car", "fourth");
                                }
                                vehicleObj.src = './img/car-left-2-police.png';
                                break;
                            case n2 < 0.95: // carro esportivo (15%)
                                vehicle = "race";
                                if (Math.random() < 0.5) {
                                    pista = 2
                                    vehicleObj.classList.add("car", "second");
                                } else {
                                    pista = 4
                                    vehicleObj.classList.add("car", "fourth");
                                }
                                vehicleObj.src = './img/car-left-3-race.png';
                                break;
                            case n2 < 1: // TIE Fighter e X-Wing (5%)
                                vehicle = "fighters";
                                if (Math.random() < 0.5) {
                                    pista = 1
                                    vehicleObj.classList.add("fighter", "first");
                                } else {
                                    pista = 3
                                    vehicleObj.classList.add("fighter", "third");
                                }
                                vehicleObj.src = './img/fighters.png';
                        }
                        vehicleArr.push([vehicle, vehicleSpeeds[vehicle], pista % 2 == 0 ? 0 : 1]);
                        document.getElementById("board").appendChild(vehicleObj);
                    } else if (starDestroyer != 1) {
                        orbitalBombardment();
                    }
                }

                for (let i = 0; i < vehicleArr.length; i++) {
                    
                }

                gameLoop();
            }
        }, 20);
    }

    gameLoop();

}

function orbitalBombardment() {
    starDestroyer = 0;
}

function moveVehicle(type) {
    let speed = vehicleSpeeds[type];

}

function deathSequence() {

}

let flag = 0;
let horizontalFlag = 0;
let verticalFlag = 0;
document.addEventListener("keypress", function onEvent(event) {
    if (!gameStarted || !flag) {return;}

    let goAhead = 0;

    switch(event.key) {
        case "ArrowLeft":
        case "a":
        case "A":
            frog.src = "./img/frog-topleft.png";
            frog.style.top = (parseInt(frog.style.top) - 27).toString() + "px";
            frog.style.left = (parseInt(frog.style.left) - 57).toString() + "px";
            horizontalFlag = 1;
            break;
        case "ArrowUp":
        case "w":
        case "W":
            frog.src = "./img/frog-topright.png";
            frog.style.top = (parseInt(frog.style.top) - 27).toString() + "px";
            frog.style.left = (parseInt(frog.style.left) + 57).toString() + "px";
            verticalFlag = -1;
            break;
        case "ArrowDown":
        case "s":
        case "S":
            frog.src = "./img/frog-bottomleft.png";
            frog.style.top = (parseInt(frog.style.top) + 27).toString() + "px";
            frog.style.left = (parseInt(frog.style.left) - 57).toString() + "px";
            verticalFlag = 1;
            break;
        case "ArrowRight":
        case "d":
        case "D":
            frog.src = "./img/frog-bottomright.png";
            frog.style.top = (parseInt(frog.style.top) + 27).toString() + "px";
            frog.style.left = (parseInt(frog.style.left) + 57).toString() + "px";
            horizontalFlag = -1;
    }
    try {
        let a = matrix[frogPos[0]+verticalFlag][frogPos[1]+horizontalFlag];
        if (a != 4) {
            goAhead = 1;
        } else if (a == 2) {
            goAhead = -1
        } else {
            throw new Error();
        }
    } catch (err) {
        let nope = document.createElement("img").classList.add("nope");
        nope.src = './img/x.png';
        document.getElementById("board").appendChild(nope);
    }
    flag = 0;
    setTimeout(function() {
        flag = 1;
        if (goAhead == 1) {
            matrix[frogPos[0]+verticalFlag][frogPos[1]+horizontalFlag] = 1;
            matrix[frogPos[0]][frogPos[1]] = 0;
            horizontalFlag = 0;
            verticalFlag = 0;
        } else if (goAhead == -1) {
            gameStarted = 0;
            deathSequence();
            flag = 0;
        }
    }, 1100);
});