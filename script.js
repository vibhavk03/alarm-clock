// TODO - give maximum number of alarms

const alarmTone = new Audio("./assets/alarm_tone.m4a");
// h1 tag displaying time
const hrssDisplay = document.getElementById("hrss-display");
const minsDisplay = document.getElementById("mins-display");
const secsDisplay = document.getElementById("secs-display");

// input form for alarm
const alarmForm = document.querySelector(".alarm-form");
const upcomingAlarmList = document.querySelector(".upcoming-alarms-list");

// to store the alarms
let alarmList = [];

// play the alarm
alarmTone.loop = true;
const playAlarm = function (timeNow) {
  alarmTone.play();
  alert(`It is ${timeNow}!`);
};

// stop the alarm
const stopAlarm = function () {
  alarmTone.pause();
};

// update the time in h1 tag
const updateTime = function () {
  const date = new Date();
  const hrss = getTwoDigits(date.getHours());
  const mins = getTwoDigits(date.getMinutes());
  const secs = getTwoDigits(date.getSeconds());
  hrssDisplay.innerText = hrss;
  minsDisplay.innerText = mins;
  secsDisplay.innerText = secs;
  const timeNow = `${hrss}:${mins}:${secs}`;
  if (alarmList.includes(timeNow)) {
    playAlarm(timeNow);
  }
};

// add zero before the time digit
const getTwoDigits = (time) => {
  if (time.toString().length === 1) {
    return "0" + time;
  }
  return time;
};

// delete alarm li from page
upcomingAlarmList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteAlarm")) {
    e.target.parentElement.remove();
  }
});

// remove alarm from alarm list
const removeFromAlarmList = (newAlarm) => {
  alarmList = alarmList.filter((alarm) => {
    return alarm !== newAlarm;
  });
};

// add alarm to list
const addAlarmToList = (newAlarm) => {
  const newAlarmString = `${newAlarm}`;
  const newAlarmHTML = `
  <li class="newAlarm-list-item-${newAlarm}">
    <span>${newAlarmString}</span>
    <button class="deleteAlarm" onclick = "removeFromAlarmList(this.value)" value=${newAlarm}>Delete Alarm</button>
  </li>`;
  upcomingAlarmList.innerHTML += newAlarmHTML;
};

// add alarm to alarm list
alarmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let h = getTwoDigits(alarmForm.hrs.value);
  let m = getTwoDigits(alarmForm.min.value);
  let s = getTwoDigits(alarmForm.sec.value);
  const newAlarm = `${h}:${m}:${s}`;

  if (alarmList.includes(newAlarm)) {
    alert("Alarm already included!");
  } else {
    alarmList.push(newAlarm);
    addAlarmToList(newAlarm);
    alarmForm.reset();
  }
});

setInterval(updateTime, 1000);
