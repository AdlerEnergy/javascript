// get access to both text boxes

let fname = document.getElementById("fname");
let lname = document.getElementById("lname");

let radio_html = document.getElementById("html");
let radio_css = document.getElementById("css");
let radio_js = document.getElementById("java");

let check_idk = document.getElementById("checkbox_idk");
let check_voc = document.getElementById("checkbox_voc");
let check_col = document.getElementById("checkbox_col");
let check_mil = document.getElementById("checkbox_mil");

let my_slider = document.getElementById("my_slider");
let text_age = document.getElementById("text_age");

let submit = document.getElementById("submit");

my_slider.addEventListener("input", updateSliderText);

function updateSliderText()
{
    text_age.textContent = "Age = " + my_slider.value;
}

submit.addEventListener("click", submitForm);

function submitForm()
{
    console.log("First Name: " + fname.value);
    console.log("Last Name: " + lname.value);
    if(radio_html.checked == true)
    {
        console.log("Favorite Language: HTML");
        radio_html.checked = false;
    }
    else if(radio_css.checked == true)
    {
        console.log("Favorite Language: CSS");
        radio_css.checked = false;
    }
    else if(radio_js.checked == true)
    {
        console.log("Favorite language: JavaScript");
        radio_js.checked = false;
    }
    else
    {
        console.log("No favorite language");
    }

    fname.value = "";
    lname.value = "";

    if(check_idk.checked == true)
    {
        console.log("Not sure about after high school plans");
        check_idk.checked = false;
    }

    if(check_voc.checked == true)
    {
        console.log("Plans to go to Vocational School");
        check_voc.checked = false;
    }

    if(check_col.checked == true)
    {
        console.log("Plans to go to College");
        check_col.checked = false;
    }

    if(check_mil.checked == true)
    {
        console.log("Plans to go to Military");
        check_mil.checked = false;
    }

    console.log("Age = " + my_slider.value)
    my_slider.value = 50;
    text_age.textContent = "Age = 50";
    
}