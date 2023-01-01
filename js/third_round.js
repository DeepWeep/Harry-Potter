'use strict';

let thirdAudio = document.getElementById ('third_audio');
let voiceHarry = document.getElementById ('voice_harry_to_voland');
let voiceVoland = document.getElementById ('voice_voland_to_harry');
let handHarry = document.getElementById ('hand');
let torsoHarry = document.getElementById ('hero');
let voland = document.getElementById ('voland');
let speak = document.getElementsByClassName ('speak');
let beamHarryToRight = document.getElementById ('beamwand_harry_to_right');
let beamHarryToLeft = document.getElementById ('beamwand_harry_to_left');
let beamLeftToHero = document.getElementById ('beamwand_left_to_hero');
let beamRightToHero = document.getElementById ('beamwand_right_to_hero');
let shot_Harry = document.getElementById ('shotharry');
let deadHarry = document.getElementById ('deadharry');
let woundHarry = document.getElementById ('woundharry');
let shotVoland = document.getElementById ('shotvoland');
let deadVoland = document.getElementById ('deadvoland');
let woundVoland = document.getElementById ('woundvoland');

if (localStorage.deadHero === undefined) {
    localStorage.setItem ('deadHero',0);
};

if (localStorage.deadEnemies === undefined) {
    localStorage.setItem ('deadEnemies',0);
};

let volandObject = {
    energy: 1,
    fireToHarry: function () {
        if (tomObject.energy <= 0 || harry.energy <= 0) {
            clearInterval (tomFireToHarry);
            return;
        };
        beamTomToHero.style.display = 'block';
        shotTom.play();
        setTimeout (() => {beamTomToHero.style.display = 'none';},300);
        if (torsoHarry.style.display !== 'block') {
            woundHarry.play ();
            harry.energy -= 0.1;
            handHarry.style.opacity = harry.energy;
            if (harry.energy <= 0) {
                localStorage.deadHero = Number (localStorage.deadHero)+ 1;
                deadHarry.play ();
                clearInterval (tomFireToHarry);
                clearInterval (secondFireToHarry);
                transition.style.display = 'block';
                restartRound.style.display = 'block';
                loseButton.style.display = 'block';
                firstAudio.pause ();
                transitionAudio.play ();
                transitionAudio.loop ();
            }
        };
    },
    myVoice: function () {
        setTimeout (() => {
            voiceTom.play()
            speak[1].style.display = 'block';
            setTimeout (() => {speak[1].style.display = 'none';},1200);
        },2500)

    }
};

//Паттерн "фабрика" следует ниже

let witchcraftHarry = function (event) {
    if (torsoHarry.style.display !== 'block') {
    shot_Harry.play ();
    if (event.button === 0) {
        beamHarryToTom.style.display = 'block';
        tomObject.energy -= 0.25;
        if (tomObject.energy > 0) {
            document.getElementById ('woundtom').play ();
        };
        enemyTom.style.opacity = tomObject.energy;
        if (tomObject.energy === 0) {
            document.getElementById ('deadtom').play ();
            elixirTom.style.display = 'block';
        };
    };
    if (event.button === 2) {
        beamHarryToSecond.style.display = 'block';
        secondEnemyObject.energy -= 0.25;
        if (secondEnemyObject.energy > 0) {
            document.getElementById ('wounddrago').play ();
        };
        enemiesSecond.style.opacity = secondEnemyObject.energy;
        if (secondEnemyObject.energy === 0) {
            document.getElementById ('deaddrago').play ();
            elixirSecond.style.display = 'block';
        };
    };
    if (event.button === 1 && harry.doubleBeam === 1) {
        harry.doubleBeam = 0;
        beamHarryToTom.style.display = 'block';
        tomObject.energy -= 0.25;
        beamHarryToSecond.style.display = 'block';
        secondEnemyObject.energy -= 0.25;
        if (secondEnemyObject.energy > 0) {
            document.getElementById ('wounddrago').play ();
        };
        enemiesSecond.style.opacity = secondEnemyObject.energy;
        if (secondEnemyObject.energy === 0) {
            localStorage.deadEnemies = Number (localStorage.deadEnemies)+ 1;
            document.getElementById ('deaddrago').play ();
            elixirSecond.style.display = 'block';
        };
        if (tomObject.energy > 0) {
            document.getElementById ('woundtom').play ();
        };
        enemyTom.style.opacity = tomObject.energy;
        if (tomObject.energy === 0) {
            localStorage.deadEnemies = Number (localStorage.deadEnemies)+ 1;
            document.getElementById ('deadtom').play ();
            elixirTom.style.display = 'block';
        };
    };
    if (tomObject.energy <= 0 && secondEnemyObject.energy <= 0) {
            clearInterval (tomFireToHarry);
            clearInterval (secondFireToHarry);
            transition.style.display = 'block';
            toNextRound.style.display = 'block';
            winButton.style.display = 'block';
            firstAudio.pause ();
            transitionAudio.play ();
            transitionAudio.loop;
    }; 
};
};

let harry = {
    energy: 1,
    doubleBeam: 1,
    subscribers: [],
    defenseIn: function (event) {
        if (event.code === 'Space') {
        torsoHarry.style.display = 'block';
        };
        if (event.code === 'ArrowRight') {
            if (elixirSecond.style.display === 'block') {
                harry.energy = 1;
                elixirSecond.style.display = 'none'
                handHarry.style.opacity = harry.energy;
            };
        };
        if (event.code === 'ArrowLeft') {
            if (elixirTom.style.display === 'block') {
                harry.energy = 1;
                elixirTom.style.display = 'none'
                handHarry.style.opacity = harry.energy;
            };
        };
    },
    defenseOut: function (event) {
        if (event.code === 'Space') {
            torsoHarry.style.display = 'none';
        };
    },
    fireIn: function (event) {
        witchcraftHarry (event);
    },
    fireOut: function (event) {
        if (event.button === 0) {
            beamHarryToTom.style.display = 'none';
        };
        if (event.button === 2) {
            beamHarryToSecond.style.display = 'none';
        };
        if (event.button === 1) {
            beamHarryToSecond.style.display = 'none';
            beamHarryToTom.style.display = 'none';
        };
    },
    subscribe: function (newSubscribe) {
        harry.subscribers.push (newSubscribe);
    },
    broadcast: function () {
        voiceHarry.play ();
        speak[0].style.display = 'block';
        setTimeout (() => {speak[0].style.display = 'none';},1200);
        harry.subscribers.forEach ((sub) => {sub ()});
    }
};

//Ниже записываем заклинание для паттерна Observer

harry.subscribe (secondEnemyObject.myVoice); 
harry.subscribe (tomObject.myVoice);

let tomFireToHarry = setInterval (tomObject.fireToHarry,3500);
let secondFireToHarry = setInterval (secondEnemyObject.fireToHarry,4500);

document.addEventListener ('keydown',harry.defenseIn);
document.addEventListener ('keyup',harry.defenseOut);
document.addEventListener ('mousedown',harry.fireIn);
document.addEventListener ('mouseup',harry.fireOut);
document.addEventListener ('contextmenu', (event) => {event.preventDefault ()});
document.addEventListener ('keydown', (event) =>  {
    if (event.code === 'KeyV') {
        harry.broadcast ();
    }
});


