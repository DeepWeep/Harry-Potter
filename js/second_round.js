'use strict';

let firstAudio = document.getElementById('second_audio');
firstAudio.volume = 0.2;

let myMusic = function () {
    firstAudio.play();
    myMusic = null;
};
document.addEventListener('keydown', myMusic);
document.addEventListener('click', myMusic);
document.addEventListener('contextmenu', myMusic);

let voiceHarry = document.getElementById('voice_harry');
voiceHarry.volume = 0.2;
let voicebeatricc = document.getElementById('voice_beatricc');
voicebeatricc.volume = 0.2;
let voiceTail = document.getElementById('voice_drago');
voiceTail.volume = 0.2;
let transitionAudio = document.getElementById('transition_audio');
transitionAudio.volume = 0.2;
let handHarry = document.getElementById('hand');
let torsoHarry = document.getElementById('hero');
let enemybeatricc = document.getElementById('beatricc');
let enemiesSecond = document.getElementById('tail');
let speak = document.getElementsByClassName('speak');
let elixirbeatricc = document.getElementById('potion_beatricc');
let elixirSecond = document.getElementById('potion_tail');
let beamHarryToSecond = document.getElementById('beamwand_harry_to_tail');
let beamHarryTobeatricc = document.getElementById('beamwand_harry_to_beatricc');
let beambeatriccToHero = document.getElementById('beamwand_beatricc_to_hero');
let beamSecondToHero = document.getElementById('beamwand_tail_to_hero');
let shotbeatricc = document.getElementById('shotbeatricc');
shotbeatricc.volume = 0.2;
let shotSecond = document.getElementById('shottail');
shotSecond.volume = 0.2;
let deadHarry = document.getElementById('deadharry');
deadHarry.volume = 0.2;
let woundHarry = document.getElementById('woundharry');
woundHarry.volume = 0.3;
let transition = document.getElementById('transition');
let loseButton = document.getElementById('lose');
let winButton = document.getElementById('win');
let toNextRound = document.getElementById('to_next_round');
let restartRound = document.getElementById('restart_round');
let owl = document.getElementById('owl');
let woundBeatricc = document.getElementById('woundbeatricc');
woundBeatricc.volume = 0.4;
let woundTail = document.getElementById('woundtail');
woundTail.volume = 0.4;
let deadBeatricc = document.getElementById('deadbeatricc');
deadBeatricc.volume = 0.3;
let deadTail = document.getElementById('deadtail');
deadTail.volume = 0.3;
let shotHarry = document.getElementById('shotharry')

let beatriccObject = {
    energy: 1,
    fireToHarry: function () {
        if (beatriccObject.energy <= 0 || harry.energy <= 0) {
            clearInterval(beatriccFireToHarry);
            return;
        };
        beambeatriccToHero.style.display = 'block';
        shotbeatricc.play();
        setTimeout(() => { beambeatriccToHero.style.display = 'none'; }, 300);
        if (torsoHarry.style.display !== 'block') {
            woundHarry.play();
            harry.energy -= 0.1;
            handHarry.style.opacity = harry.energy;
            if (harry.energy <= 0) {
                localStorage.deadHero = Number(localStorage.deadHero) + 1;
                deadHarry.play();
                clearInterval(beatriccFireToHarry);
                clearInterval(secondFireToHarry);
                transition.style.display = 'block';
                restartRound.style.display = 'block';
                loseButton.style.display = 'block';
                firstAudio.pause();
                transitionAudio.play();
            }
        };
    },
    myVoice: function () {
        setTimeout(() => {
            voicebeatricc.play();
            speak[1].style.display = 'block';
            setTimeout(() => { speak[1].style.display = 'none'; }, 1200);
        }, 2500)
    }
};

let secondEnemyObject = {
    energy: 1,
    fireToHarry: function () {
        if (secondEnemyObject.energy <= 0 || harry.energy <= 0) {
            clearInterval(secondFireToHarry);
            return;
        };
        beamSecondToHero.style.display = 'block';
        shotSecond.play();
        setTimeout(() => { beamSecondToHero.style.display = 'none'; }, 300);
        if (torsoHarry.style.display !== 'block') {
            woundHarry.play();
            harry.energy -= 0.1;
            handHarry.style.opacity = harry.energy;
            if (harry.energy <= 0) {
                localStorage.deadHero = Number(localStorage.deadHero) + 1;
                deadHarry.play();
                clearInterval(beatriccFireToHarry);
                clearInterval(secondFireToHarry);
                transition.style.display = 'block';
                restartRound.style.display = 'block';
                loseButton.style.display = 'block';
                firstAudio.pause();
                transitionAudio.play();
            }
        };
    },
    myVoice: function () {
        setTimeout(() => {
            voiceTail.play();
            speak[2].style.display = 'block';
            setTimeout(() => { speak[2].style.display = 'none'; }, 1200);
        }, 1250)
    }
};

//?????????????? "??????????????" ?????????????? ????????

let witchcraftHarry = function (event) {
    if (torsoHarry.style.display !== 'block') {
        shotHarry.play();
        if (event.button === 0) {
            beamHarryTobeatricc.style.display = 'block';
            beatriccObject.energy -= 0.125;
            if (beatriccObject.energy > 0) {
                woundBeatricc.play();
            };
            enemybeatricc.style.opacity = beatriccObject.energy;
            if (beatriccObject.energy === 0) {
                localStorage.deadEnemies = Number(localStorage.deadEnemies) + 1;
                deadBeatricc.play();
                elixirbeatricc.style.display = 'block';
            };
        };
        if (event.button === 2) {
            beamHarryToSecond.style.display = 'block';
            secondEnemyObject.energy -= 0.125;
            if (secondEnemyObject.energy > 0) {
                woundTail.play();
            };
            enemiesSecond.style.opacity = secondEnemyObject.energy;
            if (secondEnemyObject.energy === 0) {
                localStorage.deadEnemies = Number(localStorage.deadEnemies) + 1;
                deadTail.play();
                elixirSecond.style.display = 'block';
            };
        };
        if (event.button === 1 && harry.doubleBeam === 1) {
            harry.doubleBeam = 0;
            beamHarryTobeatricc.style.display = 'block';
            beatriccObject.energy -= 0.125;
            beamHarryToSecond.style.display = 'block';
            secondEnemyObject.energy -= 0.125;
            if (secondEnemyObject.energy > 0) {
                wounTail.play();
            };
            enemiesSecond.style.opacity = secondEnemyObject.energy;
            if (secondEnemyObject.energy === 0) {
                localStorage.deadEnemies = Number(localStorage.deadEnemies) + 1;
                deadTail.play();
                elixirSecond.style.display = 'block';
            };
            if (beatriccObject.energy > 0) {
                woundBeatricc.play();
            };
            enemybeatricc.style.opacity = beatriccObject.energy;
            if (beatriccObject.energy === 0) {
                localStorage.deadEnemies = Number(localStorage.deadEnemies) + 1;
                deadBeatricc.play();
                elixirbeatricc.style.display = 'block';
            };
        };
        if (beatriccObject.energy <= 0 && secondEnemyObject.energy <= 0) {
            clearInterval(beatriccFireToHarry);
            clearInterval(secondFireToHarry);
            transition.style.display = 'block';
            toNextRound.style.display = 'block';
            winButton.style.display = 'block';
            firstAudio.pause();
            transitionAudio.play();
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
            if (elixirbeatricc.style.display === 'block') {
                harry.energy = 1;
                elixirbeatricc.style.display = 'none'
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
        witchcraftHarry(event);
    },
    fireOut: function (event) {
        if (event.button === 0) {
            beamHarryTobeatricc.style.display = 'none';
        };
        if (event.button === 2) {
            beamHarryToSecond.style.display = 'none';
        };
        if (event.button === 1) {
            beamHarryToSecond.style.display = 'none';
            beamHarryTobeatricc.style.display = 'none';
        };
    },
    subscribe: function (newSubscribe) {
        harry.subscribers.push(newSubscribe);
    },
    broadcast: function () {
        voiceHarry.play();
        speak[0].style.display = 'block';
        setTimeout(() => { speak[0].style.display = 'none'; }, 1200);
        harry.subscribers.forEach((sub) => { sub() });
    }
};

//???????? ???????????????????? ???????????????????? ?????? ???????????????? Observer

harry.subscribe(secondEnemyObject.myVoice);
harry.subscribe(beatriccObject.myVoice);

let beatriccFireToHarry = setInterval(beatriccObject.fireToHarry, 3500);
let secondFireToHarry = setInterval(secondEnemyObject.fireToHarry, 4500);

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


