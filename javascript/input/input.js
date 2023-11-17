let btn = document.querySelector("#myButton");
let input = document.querySelector("#input1")

btn.addEventListener("click", button_clicked);

function button_clicked()
{
    alert(input.value);
}