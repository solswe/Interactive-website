function mouseonNF(){
    document.getElementById("contactsImg").src = "resources/images/netflix.jpg";
}

function mouseonMS(){
    document.getElementById("contactsImg").src = "resources/images/morganStanley.jpg";
}

function mouseonMT(){
    document.getElementById("contactsImg").src = "resources/images/meta.jpg";
}

function mouseonRG(){
    document.getElementById("contactsImg").src = "resources/images/riotGames.jpg";
}

function mouseonWD(){
    document.getElementById("contactsImg").src = "resources/images/waltDisney.jpg";
}

function backToOrig(){
    document.getElementById("contactsImg").src = "resources/images/gophers-mascot.png";
}

function resort(n){
    var i, j, lowest;
    var table = document.getElementById("contactsTable");
    var tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length - 1; i++){
        lowest = i;
        var target = tr[i].getElementsByTagName("td")[n].innerText;

        for (j = i + 1; j < tr.length; j++){
            var comparison = tr[j].getElementsByTagName("td")[n].innerText;
    
            if (target > comparison){
                var currlowest = tr[lowest].getElementsByTagName("td")[n].innerText;
                if (currlowest > comparison){
                    lowest = j;
                }
            }
        }
        
        if (lowest != i){
            tr[i].parentNode.insertBefore(tr[lowest], tr[i]);
        }
    }
}
