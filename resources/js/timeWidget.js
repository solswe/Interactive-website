// set the end of the semester date and time
const endOfSem = new Date("December 22, 2022 12:00:00").getTime();

function timeUntil(currentTime){
  var timeLeft = endOfSem - currentTime;

  var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds }
}

var calculation = setInterval(function showResult(){
  var currentTime = new Date().getTime();
  const { days, hours, minutes, seconds } = timeUntil(currentTime);
  document.getElementById("timeresult").innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds";

}, 1000);
