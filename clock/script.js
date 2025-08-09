// DIGITAL CLOCK
function updateClock() {
  const now = new Date();
  document.getElementById("digitalClock").textContent =  now.toLocaleTimeString();
// Date
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = now.getFullYear();
  const dateString = `${day}-${month}-${year}`;
  document.getElementById("dateDisplay").textContent = dateString;
}
setInterval(updateClock, 1000);
updateClock();

// STOPWATCH
let swInterval;
let swTime = 0;

function updateStopwatch() {
  swTime += 10;
  let date = new Date(swTime);
  let mins = String(date.getUTCMinutes()).padStart(2, '0');
  let secs = String(date.getUTCSeconds()).padStart(2, '0');
  let ms = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0,2);
  document.getElementById("stopwatchDisplay").textContent = `${mins}:${secs}:${ms}`;
}

document.getElementById("startSW").onclick = () => {
  if (!swInterval) swInterval = setInterval(updateStopwatch, 10);
};

document.getElementById("stopSW").onclick = () => {
  clearInterval(swInterval);
  swInterval = null;
};

document.getElementById("resetSW").onclick = () => {
  clearInterval(swInterval);
  swInterval = null;
  swTime = 0;
  document.getElementById("stopwatchDisplay").textContent = "00:00:00";
};

// ALARM
let alarmTime = null;
let alarmTimeout = null;

document.getElementById("setAlarmBtn").onclick = () => {
  const input = document.getElementById("alarmTime").value;
  if (!input) return alert("Please select a time!");

  const now = new Date();
  const [hour, minute] = input.split(":");
  const alarmDate = new Date(now);
  alarmDate.setHours(+hour, +minute, 0, 0);

  if (alarmDate <= now) {
    alarmDate.setDate(now.getDate() + 1);
  }

  const timeToAlarm = alarmDate - now;

  clearTimeout(alarmTimeout);
  alarmTimeout = setTimeout(() => {
    alert("⏰ Alarm Ringing!");
    document.getElementById("alarmStatus").textContent = "Alarm completed.";
  }, timeToAlarm);

  alarmTime = input;
  document.getElementById("alarmStatus").textContent = `Alarm set for ${input}`;
};
