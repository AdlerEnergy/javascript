let btn = document.querySelector("#myButton");
let input = document.querySelector("#input1");
let prog = document.querySelector("#prog");
let img = document.querySelector('img');
let label = document.querySelector('label');
let ent = document.querySelector("#ent");
let newb = document.querySelector("#hello");
let lose = new Audio("characterpain-163914.mp3");
let pass = new Audio("coin-pickup-98269.mp3");
let click = new Audio("button-124476.mp3");
let win = new Audio("success-fanfare-trumpets-6185.mp3");
let die = new Audio("game-over-arcade-6435.mp3");

let textContent = prog.textContent;

let answers = ['Elephant', 'Sunshine', 'Daughter', 'Hospital', 'Template', 'Laughing', 'Register', 'Slippers', 'Sandwich', 'MAXIMIZE', 'Tricycle', 'Forestry']

let word = Math.floor(12 * Math.random() + 1);

word = answers[word];

let entered = [];

let check = false;

let lives = 0;

if (typeof word === 'undefined')
{
    word = "undefine";
}

console.log("Word = " + word);

btn.addEventListener("click", button_clicked);
newb.addEventListener("click", new_game);

function button_clicked()
{
    console.log("User entered: " + input.value);
    check = false;
    checkIfReal();
    if(check == true)
    {
        check = false;
        entered.push(input.value);
        ent.textContent = "Letters Entered: " + entered;
        for(let i = 0; i<word.length; i+= 1)
        {
            if (word[i].toLowerCase() === input.value.toLowerCase())
            {
                check = true;
                let newTextContent = textContent.substring(0, i) + input.value.toUpperCase() + textContent.substring(i + 1);
                prog.textContent = newTextContent;
                textContent = prog.textContent;
                console.log("Letter is in word!");
                if(prog.textContent.includes("_"))
                {
                    pass.play();
                }

                
            }
        }
        if(check == false)
        {
            lives += 1;
            img.src = "./img/img" + lives + ".png";
            console.log("letter is not in word: " + img.src);
            if(lives < 6)
            {
                lose.play();
            }
            
        }
    }
    else
    {
        alert("Your entered value of '" + input.value + "' is not valid or has already been entered.")
    }


    checkGameOver();

    input.value = "";
    
}


/*
let fname = "Aiden";
for(let i = 0; i<fname.length; i+= 1)
{
    alert(fname[i].toUpperCase);
}
*/

function checkGameOver()
{
    if(lives >= 6)
    {
        die.play();
        prog.textContent = word;
        input.style.display = "none";
        btn.style.display = "none";
        label.style.display = "none";
    }
    else
    {
        if(prog.textContent.includes("_"))
        {
            console.log("Not over yet, _")
        }
        else
        {
            win.play();
            img.src = "./img/win.png";
            prog.textContent = "You WIN";
            input.style.display = "none";
            btn.style.display = "none";
            label.style.display = "none";
        }
        
    }
    
}


function checkIfReal()
{
    if(isLetter(input.value))
    {
        check = true;
        console.log(check + ": is a letter")
    }
    
    for(let i = 0; i < entered.length; i += 1)
    {
        if(entered[i].toLowerCase() === input.value.toLowerCase())
        {
            check = false;
            console.log("already entered this letter")
        }
    }
}

function isLetter(char) {
    return /^[a-zA-Z]$/.test(char);
}

function new_game()
{
    click.play();
    console.log("new game");
    word = Math.floor(12 * Math.random() + 1);
    word = answers[word];
    check = false;
    lives = 0;
    entered.splice(0, entered.length);

    img.src = "./img/img0.png";
    prog.textContent = "________";
    input.style.display = "inline";
    btn.style.display = "inline";
    label.style.display = "inline";
    ent.textContent = "Entered Letters: ";
    console.log(entered);
    input.value = "";
    textContent = prog.textContent;

}