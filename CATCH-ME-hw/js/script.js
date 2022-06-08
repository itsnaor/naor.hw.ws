var highScorers = [{
    pName: "Naor",
    score: "512",
    dateOfScore: "16/05/2022",
}, {
    pName: "Danny",
    score: "496",
    dateOfScore: "11/06/2022",
}, {
    pName: "Yulia",
    score: "317",
    dateOfScore: "12/01/2022",
}, {
    pName: "Svetlana",
    score: "278",
    dateOfScore: "01/03/2022",
}, {
    pName: "marina",
    score: "226",
    dateOfScore: "07/02/2021",
}];
class highScorer {
    constructor(_pName, _score, _dateOfScore) {
        this.pName = _pName;
        this.score = _score;
        this.dateOfScore = _dateOfScore;
    }
}
var gameElems = {
    score: 0,
    ToNextLevel: 10,
    Level: 1,
    sec: 60,
    badClicks: 0,
    escapeTime: 300,
    spinTime: 2,
}
const DOMElems = {
    haeder: document.getElementById("headDiv"),
    boxDiv: document.querySelector('.boxDiv'),
    gameDiv: document.querySelector('.gameDiv'),
    score: document.querySelector('.score'),
    ToNextLevel: document.querySelector('.ToNextLevel'),
    Level: document.querySelector('.level'),
    sec: document.querySelector('.timer'),
    badClicks: document.querySelector('.missed'),
    scorerDiv: null,
    dateDiv: null
}
const GameFuncs = {
    timer: null,
    startGame: function () {
        this.timer = setInterval(function () {
            if (gameElems.ToNextLevel == 0) {
                GameFuncs.levelUp();
            }
            if (gameElems.sec > 0) {
                gameElems.sec--;
                DOMElems.boxDiv.addEventListener("mouseenter", runer);
                DOMElems.boxDiv.addEventListener("click", GameFuncs.addGoodClicks);
                DOMElems.gameDiv.addEventListener("click", GameFuncs.addBadClicks);
                DOMElems.boxDiv.classList.add("boxDivInGame");
                DOMFuncs.toDomGameElemes();
            }
            else {
                clearInterval(GameFuncs.timer)
                DOMElems.boxDiv.removeEventListener("mouseenter", runer);
                DOMElems.boxDiv.removeEventListener("click", GameFuncs.addGoodClicks);
                DOMElems.gameDiv.removeEventListener("click", GameFuncs.addBadClicks);
                DOMElems.boxDiv.style.left = '0px';
                DOMElems.boxDiv.style.top = '0px';
                GameFuncs.gameOver(gameElems.score)
            }
        }, 1000);
        function runer() {
            setTimeout(() => {
                var top = Math.floor(Math.random() * 570);
                var left = Math.floor(Math.random() * 950);
                DOMElems.boxDiv.style.left = left + 'px';
                DOMElems.boxDiv.style.top = top + 'px';
            }, gameElems.escapeTime);
        }
    },
    gameOver: function (score) {
        DOMElems.boxDiv.classList.remove("boxDivInGame");
        alert("Game over!\n Your Score was: " + score + ".");
        if (score > highScorers[highScorers.length - 1].score) {
            var peronName = prompt("You've made it to the LeaderBoard!\nEnter your name:");
            if (peronName != '' && peronName != null) {
                console.log(peronName);
                this.addScorer(peronName, gameElems.score);
            }
            if (peronName == null || peronName == '') {
                DOMFuncs.pageLoad();
            }
        }
        else {
            DOMFuncs.pageLoad();
        }
    },
    addGoodClicks: function (e) {
        e.stopPropagation();
        gameElems.score += (gameElems.Level * 10);
        if (gameElems.ToNextLevel != 0) {
            gameElems.ToNextLevel--;
        }
    },
    addBadClicks: function (e) {
            if (gameElems.score > 0) {
                gameElems.score -= gameElems.Level;
            }
            gameElems.badClicks++;
    },
    levelUp: function () {
        if (gameElems.Level <= 4) {
            gameElems.sec += 10;
            gameElems.escapeTime -= 25;
            gameElems.spinTime -= 0.25;
            gameElems.Level++;
            gameElems.ToNextLevel = 10;
        }
    },
    updateLS: function () {
        var scoreJSON = JSON.stringify(highScorers);
        localStorage.setItem("LSHighScorers", scoreJSON);
    },
    getFormatedDate: function () {
        var nowDate = new Date;
        var setDateFormat = { year: "numeric", month: "numeric", day: "numeric" };
        return nowDate.toLocaleDateString("en", setDateFormat)
    },
    addScorer: function (pname, score) {
        var ddate = this.getFormatedDate();
        var newscore = new highScorer(pname, score, ddate);
        highScorers.push(newscore);
        highScorers.sort((a, b) => (a.score < b.score) ? 1 : -1);
        if (highScorers.length == 6) {
            highScorers.pop();
        }
        this.updateLS();
        DOMFuncs.pageLoad();
    },
}
const DOMFuncs = {
    getHighScores: function () {
        var HighScoresJSON = localStorage.getItem("LSHighScorers");
        if (HighScoresJSON != null) {
            highScorers = JSON.parse(HighScoresJSON);
        }
        else { GameFuncs.updateLS(); }
    },
    gameStart: function () {
        DOMElems.haeder.innerHTML = "CATCH ME IF YOU CAN!";
        var go = confirm("Ready To Start?");
        if (go) {
            DOMElems.haeder.removeEventListener("click", DOMFuncs.gameStart);
            DOMElems.haeder.onmouseover = null;
            DOMElems.haeder.onmouseout = null;
            GameFuncs.startGame();
        }
    },
    toDomGameElemes: function () {
        DOMElems.score.innerHTML = gameElems.score;
        DOMElems.ToNextLevel.innerHTML = gameElems.ToNextLevel;
        DOMElems.Level.innerHTML = gameElems.Level;
        DOMElems.sec.innerHTML = gameElems.sec;
        DOMElems.badClicks.innerHTML = gameElems.badClicks;
        DOMElems.boxDiv.style.animationDuration = gameElems.spinTime + "s";
    },
    setDefaultGame: function(){
        var gameJSON = JSON.stringify(gameElems);
        localStorage.setItem("LSgameElems", gameJSON); 
    },
    getDefaultGame: function(){
        var gameJSON = localStorage.getItem("LSgameElems");
        if (gameJSON != null) {
            gameElems = JSON.parse(gameJSON);
        }
        else { this.setDefaultGame(); }
    },
    pageLoad: function () {
        DOMFuncs.getHighScores();
        var ul = document.querySelector('.highScorersList');
        if (ul.childNodes.length > 2) {
            var child = document.querySelector('.list');
            child.parentNode.removeChild(child);
        }
        var li = document.createElement("li");
        li.className = "list";
        var toAppend = "";
        highScorers.forEach(function (highScorers, i) {
            toAppend += `
                <span class="scorer" id="scorer">${highScorers.score}<span1>- ${highScorers.pName}<div class="tempo">${highScorers.dateOfScore}</div></span1></span>
                `;
        });
        li.innerHTML = toAppend;
        ul.appendChild(li);
        DOMElems.scorerDiv = document.querySelectorAll(".scorer");
        DOMElems.dateDiv = document.querySelectorAll('.tempo');
        for (const div in DOMElems.scorerDiv) {
            DOMElems.scorerDiv[div].onmouseover = () => DOMElems.dateDiv[div].className = "dateOf";
            DOMElems.scorerDiv[div].onmouseout = () => DOMElems.dateDiv[div].className = "tempo";
        }
        DOMElems.haeder.onmouseover = () => DOMElems.haeder.innerHTML = "Click To Start!";
        DOMElems.haeder.onmouseout = () => DOMElems.haeder.innerHTML = "CATCH ME IF YOU CAN!";
        this.getDefaultGame();
        this.toDomGameElemes();
        DOMElems.haeder.addEventListener("click", DOMFuncs.gameStart);
    }
}

DOMFuncs.pageLoad();

