let sum = 0;

for(let i=1; i <=100; i += 1)
{
    sum += i;
}

//alert("Answer = " + sum);
console.log("Answer = " + sum);

var answer = document.querySelector('p');

answer.textContent = ("Answer = " + sum);

//change the css

answer.style.color = "red";
answer.style.fontSize = "40px";