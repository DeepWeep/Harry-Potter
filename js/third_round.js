'use strict';
let thirdAudio = document.getElementById('third_audio');
thirdAudio.volume = 0.2;

let myMusic = function () {
    thirdAudio.play();
    myMusic = null;
};
document.addEventListener('keydown', myMusic);
document.addEventListener('click', myMusic);
document.addEventListener('contextmenu', myMusic);

let voiceHarry = document.getElementById('voice_harry_to_voland');
voiceHarry.volume = 0.3;
let voiceVoland = document.getElementById('voice_voland_to_harry');
voiceVoland.volume = 0.3;
let handHarry = document.getElementById('hand');
let torsoHarry = document.getElementById('hero');
let voland = document.getElementById('voland');
let volandSecond = document.getElementById('voland_2');
let speak = document.getElementsByClassName('speak');
let beamHarryToRight = document.getElementById('beamwand_harry_to_right');
let beamHarryToLeft = document.getElementById('beamwand_harry_to_left');
let beamLeftToHero = document.getElementById('beamwand_left_to_hero');
let beamRightToHero = document.getElementById('beamwand_right_to_hero');
let shot_Harry = document.getElementById('shotharry');
shot_Harry.volume = 0.3;
let deadHarry = document.getElementById('deadharry');
deadHarry.volume = 0.3;
let woundHarry = document.getElementById('woundharry');
woundHarry.volume = 0.2;
let shotVoland = document.getElementById('shotvoland');
shotVoland.volume = 0.2;
let deadVoland = document.getElementById('deadvoland');
deadVoland.volume = 0.2;
let woundVoland = document.getElementById('woundvoland');
woundVoland.volume = 0.2;
let transition = document.getElementById('transition');
let transitionAudio = document.getElementById('transition_audio');
transitionAudio.volume = 0.2;

let harry = {
    energy: 1,
    doubleBeam: 1,
    subscribers: [],
    defenseIn: function (event) {
        if (event.code === 'Space') {
            torsoHarry.style.display = 'block';
        };
    },
    defenseOut: function (event) {
        if (event.code === 'Space') {
            torsoHarry.style.display = 'none';
        };
    },
    fireIn: function (event) {
        witchcraftHarry(event);
    },
    fireOut: function (event) {
        if (event.button === 0) {
            beamHarryToLeft.style.display = 'none';
        };
        if (event.button === 2) {
            beamHarryToRight.style.display = 'none';
        };
        if (event.button === 1) {
            beamHarryToRight.style.display = 'none';
            beamHarryToLeft.style.display = 'none';
        };
    },
    subscribe: function (newSubscribe) {
        harry.subscribers.push(newSubscribe);
    },
    broadcast: function () {
        voiceHarry.play();
        speak[0].style.display = 'block';
        setTimeout(() => { speak[0].style.display = 'none'; }, 800);
        harry.subscribers.forEach((sub) => { sub() });
    }
};

let volandObject = {
    energy: 1,
    fireToHarry: function () {
        moveAndShotOfMainEnemy();
    },
    myVoice: function () {
        setTimeout(() => {
            voiceVoland.play()
            if (voland.style.display === 'block') {
                speak[1].style.display = 'block';
                setTimeout(() => { speak[1].style.display = 'none'; }, 1500);
            };
            if (voland_2.style.display === 'block') {
                speak[2].style.display = 'block';
                setTimeout(() => { speak[2].style.display = 'none'; }, 1500);
            };
        }, 1000)
    }
};

//Паттерн "фабрика" Гарри следует ниже

let witchcraftHarry = function (event) {
    if (torsoHarry.style.display !== 'block') {
        shot_Harry.play();
        if (event.button === 0) {
            beamHarryToLeft.style.display = 'block';
            if (voland.style.display === 'block') {
                volandObject.energy -= 0.0625;
                woundVoland.play();
            };
            voland.style.opacity = volandObject.energy;
            volandSecond.style.opacity = volandObject.energy;
            if (volandObject.energy === 0) {
                localStorage.deadEnemies = Number(localStorage.deadEnemies) + 1;
                deadVoland.play();
                clearInterval(volandDynamic);
                harry.energy = 1;
                setTimeout(() => { location.href = './last_page.html' }, 3000);
            };
        };
        if (event.button === 2) {
            beamHarryToRight.style.display = 'block';
            if (volandSecond.style.display === 'block') {
                volandObject.energy -= 0.0625;
                woundVoland.play();
            };
            voland.style.opacity = volandObject.energy;
            volandSecond.style.opacity = volandObject.energy;
            if (volandObject.energy === 0) {
                localStorage.deadEnemies = Number(localStorage.deadEnemies) + 1;
                deadVoland.play();
                clearInterval(volandDynamic);
                harry.energy = 1;
                setTimeout(() => { location.href = './last_page.html' }, 3000);
            };
        };
        if (event.button === 1 && harry.doubleBeam === 1) {
            harry.doubleBeam = 0;
            if (voland.style.display === 'block' || volandSecond.style.display === 'block') {
                beamHarryToLeft.style.display = 'block';
                beamHarryToRight.style.display = 'block';
                volandObject.energy -= 0.0625;
                woundVoland.play();
                voland.style.opacity = volandObject.energy;
                voland_2.style.opacity = volandObject.energy;
                if (volandObject.energy === 0) {
                    localStorage.deadEnemies = Number(localStorage.deadEnemies) + 1;
                    deadVoland.play();
                    clearInterval(volandDynamic);
                    harry.energy = 1;
                    setTimeout(() => { location.href = './last_page.html' }, 3000);
                };
            };
        };
    };
};

//Паттерн "фабрика" Воланд следует ниже

let moveAndShotOfMainEnemy = function () {
    voland.style.display = 'block';
    setTimeout(() => {
        if (voland.energy <= 0 || harry.energy <= 0) {
            clearInterval(volandDynamic);
            return;
        };
        beamLeftToHero.style.display = 'block';
        setTimeout(() => { beamLeftToHero.style.display = 'none' }, 300);
        shotVoland.play();
        if (torsoHarry.style.display !== 'block') {
            woundHarry.play();
            harry.energy -= 0.2;
            handHarry.style.opacity = harry.energy;
            if (harry.energy <= 0) {
                volandObject.energy = 1;
                localStorage.deadHero = Number(localStorage.deadHero) + 1;
                deadHarry.play();
                clearInterval(volandDynamic);
                transition.style.display = 'block';
                thirdAudio.pause();
                transitionAudio.play();
            }
        };
    }, (Math.random() * 2200 + 400));
    if (volandObject.energy < 0.54) {
        setTimeout(() => {
            if (voland.energy <= 0 || harry.energy <= 0) {
                clearInterval(volandDynamic);
                return;
            };
            beamLeftToHero.style.display = 'block';
            setTimeout(() => { beamLeftToHero.style.display = 'none' }, 300);
            shotVoland.play();
            if (torsoHarry.style.display !== 'block') {
                woundHarry.play();
                harry.energy -= 0.2;
                handHarry.style.opacity = harry.energy;
                if (harry.energy <= 0) {
                    volandObject.energy = 1;
                    localStorage.deadHero = Number(localStorage.deadHero) + 1;
                    deadHarry.play();
                    clearInterval(volandDynamic);
                    transition.style.display = 'block';
                    thirdAudio.pause();
                    transitionAudio.play();
                }
            };
        }, (Math.random() * 2200 + 400));
    };
    setTimeout(() => {
        voland.style.display = 'none';
        volandSecond.style.display = 'block';
    }, 3000);
    setTimeout(() => {
        if (voland.energy <= 0 || harry.energy <= 0) {
            clearInterval(volandDynamic);
            return;
        };
        beamRightToHero.style.display = 'block';
        setTimeout(() => { beamRightToHero.style.display = 'none' }, 300);
        shotVoland.play();
        if (torsoHarry.style.display !== 'block') {
            woundHarry.play();
            harry.energy -= 0.2;
            handHarry.style.opacity = harry.energy;
            if (harry.energy <= 0) {
                volandObject.energy = 1;
                localStorage.deadHero = Number(localStorage.deadHero) + 1;
                deadHarry.play();
                clearInterval(volandDynamic);
                transition.style.display = 'block';
                thirdAudio.pause();
                transitionAudio.play();
            }
        };
    }, (Math.random() * 2200 + 3400));
    if (volandObject.energy < 0.54) {
        setTimeout(() => {
            if (voland.energy <= 0 || harry.energy <= 0) {
                clearInterval(volandDynamic);
                return;
            };
            beamRightToHero.style.display = 'block';
            setTimeout(() => { beamRightToHero.style.display = 'none' }, 300);
            shotVoland.play();
            if (torsoHarry.style.display !== 'block') {
                woundHarry.play();
                harry.energy -= 0.2;
                handHarry.style.opacity = harry.energy;
                if (harry.energy <= 0) {
                    volandObject.energy = 1;
                    localStorage.deadHero = Number(localStorage.deadHero) + 1;
                    deadHarry.play();
                    clearInterval(volandDynamic);
                    transition.style.display = 'block';
                    thirdAudio.pause();
                    transitionAudio.play();
                }
            };
        }, (Math.random() * 2200 + 3400));
    }
    setTimeout(() => {
        volandSecond.style.display = 'none';
    }, 6000);
};

//Ниже записываем заклинание для паттерна Observer

harry.subscribe(volandObject.myVoice);

let volandDynamic = setInterval(volandObject.fireToHarry, 6000);

document.addEventListener('keydown', harry.defenseIn);
document.addEventListener('keyup', harry.defenseOut);
document.addEventListener('mousedown', harry.fireIn);
document.addEventListener('mouseup', harry.fireOut);
document.addEventListener('contextmenu', (event) => { event.preventDefault() });
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyV') {
        harry.broadcast();
    }
});


