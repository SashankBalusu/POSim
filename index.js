function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
//set up
const button = document.getElementById("move")
button.addEventListener("click", function(){
    button.setAttribute("style", "display:none")
    run()
})
const main = document.getElementById("main")
const preset = document.getElementById("preset")
const timer = document.getElementById("timer")
let names = ["Balusu", "Mittal", "Srinivasan", "Rajasekar", "Tyagali", "Wang", "Lu", "Belur", "Muthusamy", "Vemu", "Woodhead", "Mardikar", "Bhutani", "Lee", "Huang", "Park"]
var seconds = 0; 
var tens = 0; 
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")

var Interval ;

clearInterval(Interval);
Interval = setInterval(startTimer, 10);
function startTimer () {
  tens++; 
  
  if(tens <= 9){
    appendTens.innerHTML = "0" + tens;
  }
  
  if (tens > 9){
    appendTens.innerHTML = tens;
    
  } 
  
  if (tens > 99) {
    console.log("seconds");
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
  
  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }

}
function run(){
    let row = 1
    let col = 0
    removeAllChildNodes(main)
    removeAllChildNodes(preset)
    shuffle(names)
    console.log(names)
    for (let i = 1; i <= 16; i++){
        if (i % 4 == 1){
            row = 1
            col ++
        }
    
        let d = document.createElement("div")
        d.id = i
        // let p = document.createElement("p")
        // p.textContent = names[i-1]
        d.textContent = names[i-1]
        //d.appendChild(p)
        d.classList.add("personSquare")
    
        d.style.gridArea = `${row} / ${col}`;
        main.appendChild(d)
        row ++
    }
    shuffle(names)
    for (let i = 0; i < names.length; i++){
        let p = document.createElement("p")
        p.style.fontSize = "20px"
        p.style.margin = "0"
        p.textContent = names[i]
        p.classList.add("recency")
        preset.appendChild(p)
    }
    
    
    let numPeople = Math.floor(Math.random() * (11 - 4) + 4)
    console.log(numPeople)
    for (let i = 1; i <= numPeople; i++){
        let randPerson = Math.floor(Math.random() * (16 - 1) + 1)
        console.log(randPerson)
        let person = document.getElementById(randPerson)
        person.style.background = "#F4A4A4"
    }
    let recency = document.getElementsByClassName("recency")
    let seating = document.getElementsByClassName("personSquare")
    let correctOrder = []
    
    for (let i = 0; i < recency.length;i++){
        for (let j= 0; j < seating.length; j++){
            console.log(document.getElementById(j+1).style.background)
            if (recency[i].textContent == seating[j].textContent && document.getElementById(j+1).style.background == "rgb(244, 164, 164)"){
                correctOrder.push(recency[i].textContent)
                console.log("hiii")
                break
            }
        }
        if (correctOrder.length == 2){
            break
        }
    }
    console.log(correctOrder)
    for (let i = 0; i < seating.length;i++){
        seating[i].addEventListener("click", function(){
            if (seating[i].textContent != correctOrder[0]){
                seating[i].style.animation = 'none';
                seating[i].offsetHeight; /* trigger reflow */
                seating[i].style.animation = null; 
                timer.style.animation = 'none';
                timer.offsetHeight; /* trigger reflow */
                timer.style.animation = null; 
                console.log("incorrect")
                seconds+=5
                seating[i].style.animation = "changeBackgroundColor 1s"
                timer.style.animation = "changeBackgroundColor2 1s"
                
            }
            else{
                seating[i].style.animation = 'none';
                seating[i].offsetHeight; /* trigger reflow */
                seating[i].style.animation = null; 
                timer.style.animation = 'none';
                timer.offsetHeight; /* trigger reflow */
                timer.style.animation = null; 
                correctOrder.shift()
                seating[i].style.background = "white"
                console.log(correctOrder)
                if (correctOrder.length == 0){
                    console.log("next round!")
                    button.setAttribute("style", "display:block")

                }
                seating[i].style.animation = "changeBackgroundColor3 0.6s"
                timer.style.animation = "changeBackgroundColor4 0.6s"
            }
        })
    }
}
run()
