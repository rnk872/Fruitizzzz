// ===============================
// FruitShell Premium Prototype JS
// ===============================

// Smooth Scroll Navigation
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// ===============================
// Nature Index System
// ===============================

const natureSlider = document.getElementById("nature");
const natureValue = document.getElementById("natureValue");
const preview = document.getElementById("preview");

if (natureSlider) {
    natureSlider.addEventListener("input", function () {

        const value = parseInt(this.value);

        natureValue.innerText = value;

        let creaminess = 100 - value;
        let sweetness = Math.floor((100 - value) * 0.8);
        let fruitRichness = value;

        preview.innerHTML = `
            <h3>Your FruitShell Recipe</h3>

            <p><b>Fruit Richness:</b> ${fruitRichness}%</p>

            <p><b>Creaminess:</b> ${creaminess}%</p>

            <p><b>Sweetness:</b> ${sweetness}%</p>

            <p><b>Nature Index:</b> ${value}%</p>
        `;
    });
}

// ===============================
// Smart Mix Generator
// ===============================

const mixes = [

{
name: "Tropical Blast",
shell: "Pineapple",
cream: "40%",
fruit: "90%",
sweetness: "35%"
},

{
name: "Mango Volcano",
shell: "Mango",
cream: "60%",
fruit: "80%",
sweetness: "50%"
},

{
name: "Orange Sunset",
shell: "Orange",
cream: "55%",
fruit: "75%",
sweetness: "45%"
},

{
name: "Coconut Paradise",
shell: "Coconut",
cream: "70%",
fruit: "60%",
sweetness: "40%"
},

{
name: "Royal FruitShell",
shell: "Premium Mix",
cream: "50%",
fruit: "95%",
sweetness: "35%"
}

];

function generateMix() {

const randomMix =
mixes[Math.floor(Math.random() * mixes.length)];

const mixCard =
document.getElementById("smartMixResult");

if(mixCard){

mixCard.innerHTML = `

<h2>${randomMix.name}</h2>

<p><b>Shell:</b> ${randomMix.shell}</p>

<p><b>Cream:</b> ${randomMix.cream}</p>

<p><b>Fruit:</b> ${randomMix.fruit}</p>

<p><b>Sweetness:</b> ${randomMix.sweetness}</p>

`;

}

}

// ===============================
// Investor Calculator
// ===============================

function calculateRevenue() {

let dailySales = 150;
let sellingPrice = 149;

let monthlyRevenue =
dailySales * sellingPrice * 30;

const output =
document.getElementById("revenueResult");

if(output){

output.innerHTML = `

<h2>Revenue Projection</h2>

<p><b>Daily Sales:</b> ${dailySales}</p>

<p><b>Selling Price:</b> ₹${sellingPrice}</p>

<p><b>Monthly Revenue:</b> ₹${monthlyRevenue.toLocaleString()}</p>

`;

}

}

// ===============================
// FruitShell Theme Changer
// ===============================

function changeTheme(theme){

const body = document.body;

switch(theme){

case "orange":
body.style.background =
"linear-gradient(135deg,#ff8c00,#ffa500)";
break;

case "mango":
body.style.background =
"linear-gradient(135deg,#ffb300,#ffd54f)";
break;

case "coconut":
body.style.background =
"linear-gradient(135deg,#ffffff,#d7ccc8)";
break;

case "pineapple":
body.style.background =
"linear-gradient(135deg,#fdd835,#ffee58)";
break;

default:
body.style.background =
"linear-gradient(135deg,#ff8c00,#ffd54f)";
}

}

// ===============================
// Live Clock
// ===============================

function updateClock(){

const clock =
document.getElementById("clock");

if(clock){

const now = new Date();

clock.innerHTML =
now.toLocaleTimeString();

}

}

setInterval(updateClock,1000);

// ===============================
// Customer Counter Animation
// ===============================

let customerCount = 0;

function animateCustomers(){

const counter =
document.getElementById("customerCounter");

if(counter){

customerCount += Math.floor(Math.random()*3);

counter.innerHTML = customerCount;

}

}

setInterval(animateCustomers,3000);

// ===============================
// Floating Fruit Animation
// ===============================

document.addEventListener(
"mousemove",
function(event){

const fruits =
document.querySelectorAll(".fruit");

fruits.forEach(function(fruit,index){

const speed =
(index+1)*0.01;

fruit.style.transform =
`translate(
${event.clientX*speed}px,
${event.clientY*speed}px
)`;

});

});

// ===============================
// QR Demo Popup
// ===============================

function showQR(){

alert(
"QR Payment Demo\\n\\nUPI: fruitshell@upi"
);

}

// ===============================
// Newsletter
// ===============================

function subscribe(){

const email =
document.getElementById("email");

if(email){

alert(
"Thank You For Joining FruitShell!\\n\\n" +
email.value
);

email.value = "";

}

}

// ===============================
// Startup Message
// ===============================

console.log(
"FruitShell Prototype Loaded Successfully"
);
