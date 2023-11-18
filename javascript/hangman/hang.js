
let btn = document.querySelector("#myButton");
let input = document.querySelector("#input1")
let pick = document.querySelector("#picked")

let answers = ['Elephant', 'Sunshine', 'Daughter', 'Hospital', 'Template', 'Laughing', 'Register', 'Slippers', 'Sandwich', 'Breathe', 'Tricycle', 'Forestry']

let word = Math.floor(12 * Math.random() + 1);

word = answers[word];

let entered = [];

let check = false;

console.log("Random int = " + word);

btn.addEventListener("click", button_clicked);

function button_clicked()
{
    console.log("User entered: " + input.value);
    entered.push(input.value);
    check = false;
    for(let i = 0; i<word.length; i+= 1)
    {
        if(word[i].toLowercase() == input.value.toLowercase())
        {
            check = true;
        }
    }

    input.value = "";
    
}


/*
let fname = "Aiden";
for(let i = 0; i<fname.length; i+= 1)
{
    alert(fname[i].toUpperCase);
}
*/