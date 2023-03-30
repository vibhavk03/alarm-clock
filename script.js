// h1 tag displaying time
const timeDisplay = document.querySelector("h1");

// input form for alarm
const alarmForm = document.querySelector(".alarm-form");

// to store the alarms
let alarmList = [];

// update the time in h1 tag
const updateTime = function () {
  const date = new Date();
  const hr = getTwoDigits(date.getHours());
  const mins = getTwoDigits(date.getMinutes());
  const secs = getTwoDigits(date.getSeconds());
  const timeNow = `${hr}:${mins}:${secs}`;
  timeDisplay.innerText = timeNow;
  if (alarmList.includes(timeNow)) {
    alert("Alarm is ringing!");
  }
};

// add zero before the time digit
const getTwoDigits = (time) => {
  if (time.toString().length === 1) {
    return "0" + time;
  }
  return time;
};

// add alarm to alarm list
alarmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log("here", alarmForm);
  let h = getTwoDigits(alarmForm.hrs.value);
  let m = getTwoDigits(alarmForm.min.value);
  let s = getTwoDigits(alarmForm.sec.value);
  console.log(h, m, s);
  const newAlarm = `${h}:${m}:${s}`;
  if (alarmList.includes(newAlarm)) {
    alert("Alarm already included!");
  } else {
    alarmList.push(newAlarm);
    alarmForm.reset();
  }
});

setInterval(updateTime, 1000);
