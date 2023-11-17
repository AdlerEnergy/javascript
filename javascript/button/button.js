let h1_text = document.querySelector("#text");
let btn = document.querySelector("#myButton")

let red = document.querySelector("#red")
let blue = document.querySelector("#blue")
let green = document.querySelector("#green")

btn.addEventListener("click", button_clicked)
red.addEventListener("click", red_click)
blue.addEventListener("click", blue_click)
green.addEventListener("click", green_click)

function button_clicked()
{
    if(h1_text.textContent == "Hello")
    {
        h1_text.textContent = "Bye";
    }
    else
    {
        h1_text.textContent = "Hello";
    }
}

function red_click()
{
    h1_text.style.color = "red";
}

function blue_click()
{
    h1_text.style.color = "blue";
}

function green_click()
{
    h1_text.style.color = "green";
}