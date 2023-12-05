let btn = document.querySelector("#myButton");
let input = document.querySelector("#input1");
let totalT = document.querySelector("#totalT");
let ETR = document.querySelector("#ETR");
let Net = document.querySelector("#Net");
let month = document.querySelector("#month");

let values = [11000, 33725, 50650, 86725, 49150, 346875];
let rates = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]
let check = 0;
let taxed = 0;
let gross = 0;

btn.addEventListener("click", button_clicked);

function button_clicked()
{
    console.log("User entered: " + input.value);
    gross = input.value; /*The total amount that we subtract from */
    taxed = 0;
    if (!isNaN(gross))
    {
        
        for(let i = 0; i < values.length; i += 1)
        {
            if (gross > values[i])
            {
                gross -= values[i];
                taxed += (values[i]*rates[i]);
            }
            else
            {
                taxed += gross*rates[i];
                gross = 0;
                break;
            }
        }
        if (gross > 0)
        {
            taxed += gross*rates[6];
            gross = 0;
        }

        updateStats();
        
    }
    else
    {
        alert("Please enter a number.");
    }
    
}

function updateStats()
{
    totalT.textContent = taxed;
    ETR.textContent = (taxed/input.value) * 100
    ETR.textContent = ETR.textContent + "%";
    Net.textContent = input.value-taxed;
    month.textContent = Net.textContent/12;
}