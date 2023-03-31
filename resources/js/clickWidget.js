
let clickCounter = document.getElementById("clickCount")

document.querySelector('#clickButton').addEventListener('click', function(){

    fetch("api/click", {method: "POST"})
        .then((response)=>response.json())
        .then((data)=>{clickCounter.innerHTML = data.clickCount});
        
})

setInterval(() => {

    fetch("api/click", {method: "GET"})
        .then((response) => response.json())
        .then((data) => {clickCounter.innerHTML = data.clickCount});

}, 1000);

