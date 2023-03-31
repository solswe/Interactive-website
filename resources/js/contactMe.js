const emailInput = document.querySelector("#email");
emailInput.addEventListener("keyup", autofillUsername);

function autofillUsername() {

    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;

    if (email.includes("@") && (username == null || username == "")){
        var tempName = email.slice(0, email.indexOf("@"));
        document.querySelector("#username").value = tempName;
    }

}

const notconcernClicked = document.querySelectorAll(".notconcern");
var i;

var message = document.getElementById("concernMessage");
message.style.visibility = "hidden";

for (i = 0; i < notconcernClicked.length; i++){
    notconcernClicked[i].addEventListener("click", function(){
        message.style.visibility = "hidden";
    });
}

document.getElementById("concern").addEventListener("click", function(){
    message.style.visibility = "visible";
});

