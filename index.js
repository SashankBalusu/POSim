// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
    finish ++
    if (finish == 1){
        const dbRef = ref(getDatabase());
        let dataArr = []
        let labelArr = []
        get(child(dbRef, `users/${userName}`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              let i = 0
                for (let key in snapshot.val()){
                    i++
                    dataArr.push(parseInt(snapshot.val()[key]["time"]))
                    labelArr.push(i)
                }
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
        
        clearInterval(Interval);
        let time = document.getElementById("seconds").textContent
        var ctx = document.getElementById('myChart').getContext("2d");

        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, '#f49080');

        var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
        gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");
        removeAllChildNodes(document.getElementById('myChart'))
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labelArr,
                datasets: [{
                    label: "Data",
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointBorderWidth: 10,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: true,
                    backgroundColor: gradientFill,
                    borderWidth: 4,
                    data: dataArr
                }]
            },
            options: {
                legend: {
                    position: "bottom"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            padding: 20
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });
        const db = getDatabase();
            push(ref(db, 'users/' + userName), {
                time: time
            });
            document.getElementById("post-login").style.display = "none"
            document.getElementById("game-finished").style.display = "block"
            document.getElementById("finishTime").textContent = time + " seconds"
            const playAgain = document.getElementById("playAgain")
            playAgain.style.display = "block"
            playAgain.addEventListener("click", function(){
                finish = 0
                document.getElementById("game-finished").style.display = "none"
                document.getElementById("post-login").style.display = "block"
                tens = "00";
                seconds = "00";
                document.getElementById("tens").innerHTML = tens;
                document.getElementById("seconds").innerHTML = seconds;
                Interval = setInterval(startTimer, 10);
                run()
            })
    }
    
})

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATnjpXqIEIlsdr3QdP24zxEAIGXmvWh-Y",
    authDomain: "posim-ca7f7.firebaseapp.com",
    projectId: "posim-ca7f7",
    storageBucket: "posim-ca7f7.appspot.com",
    messagingSenderId: "1077006971535",
    appId: "1:1077006971535:web:1e8b0988f067da6c31f6fa"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const loginBut = document.getElementById("loginBut")
const loginPage = document.getElementById("login-page")
const postLogin = document.getElementById("post-login")




const main = document.getElementById("main")
const preset = document.getElementById("preset")
const timer = document.getElementById("timer")
let names = ["Balusu", "Mittal", "Srinivasan", "Rajasekar", "Tyagali", "Wang", "Lu", "Belur", "Muthusamy", "Vemu", "Woodhead", "Mardikar", "Bhutani", "Lee", "Huang", "Park"]
var seconds = 0; 
var tens = 0; 
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
let finish = 0
var Interval ;
let userName

clearInterval(Interval);
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
loginBut.addEventListener("click", function(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)
        userName = user["displayName"]
        if (user["metadata"]["creationTime"] == user["metadata"]["lastSignInTime"]){
            const db = getDatabase();
            set(ref(db, 'users/' + userName), {
                name: userName
            });
        }
        const start = document.getElementById("start")
        start.style.display = "block"
        loginBut.style.display = "none"
        start.addEventListener("click", function(){
            loginPage.style.display = "none"
            postLogin.style.display = "block"
            start.style.display = "none"
            Interval = setInterval(startTimer, 10);
            run()
        })
        


        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
})