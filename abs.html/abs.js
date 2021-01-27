var TESTING = false;
var MAX_ITERATIONS = 100;

var MAX_POINTS = 400;
var POINT_VALS = [0, 5, 3, 1];

var currentPoints = 0;
var lastPos = -1;

var secondsLeft = 0;

var trialTime = 0;
var totalTime = 0;
var trials = 0;
var avgTime = 0;
var testingIterations = 0;
var leastTrial = Math.pow(10, 100);
var mostTrial = -Math.pow(10, 100);

function start() {
	currentPoints = 0;
	lastPos = -1;
	secondsLeft = 0;
	if(TESTING) {
		trialTime = 0;
	}
	addPos(-1, 30);
	document.getElementById("startButton").style.display = "none";
	document.getElementById("title").style.display = "none";
}

function abs() {
	if(currentPoints < MAX_POINTS) {
		var time = Math.floor(Math.random()*26) + 5;
		var pos = Math.abs(Math.floor(Math.random()*7)-3);
		if(TESTING) {
			trialTime += time;
		}
		addPos(pos, time);
	}else{
		document.getElementById("currentPoints").innerHTML =  "100%";
		setCurrentPos("DONE!");
		document.getElementById("startButton").style.display = "inline";
		document.getElementById("startButton").innerHTML = "Start Again!";
		if(TESTING && testingIterations < MAX_ITERATIONS) {
			trials++;
			testingIterations++;
			totalTime += trialTime;
			avgTime = totalTime/trials;
			if(trialTime < leastTrial) {
				leastTrial = trialTime;
			}
			if(trialTime > mostTrial) {
				mostTrial = trialTime;
			}
			start();
		}else
		if(TESTING) {
			document.getElementById("currentPoints").innerHTML =  "100%";
			setCurrentTime(Math.round(avgTime));
			console.log("avgTime: " + getTimeStr(avgTime));
			console.log("leastTrial: " + getTimeStr(leastTrial));
			console.log("mostTrial: " + getTimeStr(mostTrial));
		}
	}
}

function addPos(pos, time) {
	var oneSecond = 1000;
	if(TESTING) {
		oneSecond = 1;
	}
	
	setCurrentPos(pos);
	setCurrentTime(time);
	if(pos != -1) {
		if(lastPos != -1) {
			incrCurrentPoints(time*POINT_VALS[pos]*((4-Math.abs(lastPos-pos))/4));
		}else{
			incrCurrentPoints(time*POINT_VALS[pos]);
		}
	}
	secondsLeft = time;
	
	var inte = setInterval(function(){
		secondsLeft--;
		setCurrentTime(secondsLeft);
		if(secondsLeft == 0) {
			clearInterval(inte);
			abs();
		}
	}, oneSecond);
}

function setCurrentPoints(val) {
	currentPoints = val;
	document.getElementById("currentPoints").innerHTML = currentPoints;
}

function incrCurrentPoints(val) {
	currentPoints += val;
	document.getElementById("currentPoints").innerHTML = Math.floor((currentPoints/MAX_POINTS)*100) + "%";
}

function setCurrentTime(seconds) {
	document.getElementById("timeLeft").innerHTML = getTimeStr(seconds);
}

function getTimeStr(time) {
	var min = Math.floor(time/60);
	var sec = time % 60;
	
	if(min < 10) {
		min = "0" + min;
	}
	if(sec < 10) {
		sec = "0" + sec;
	}
	
	var timeStr = min + ":" + sec;
	
	return timeStr;
}

function setCurrentPos(pos) {
	document.getElementById("currentState").innerHTML = pos;
}