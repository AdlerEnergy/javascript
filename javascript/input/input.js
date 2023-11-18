
let btn = document.querySelector("#myButton");
let input = document.querySelector("#input1")
let pick = document.querySelector("#picked")

btn.addEventListener("click", button_clicked);

function button_clicked()
{
    alert(input.value);
    pick.textContent = input.value + " " + pick.textContent;
    input.value = "";
    
}


/*
let fname = "Aiden";
for(let i = 0; i<fname.length; i+= 1)
{
    alert(fname[i].toUpperCase);
}
*/