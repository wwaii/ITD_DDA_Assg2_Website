// Import the functions you need from the SDKs you need
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import {
  getAuth,
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  onValue,
  query,
  orderByChild,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Get Database
const db = getDatabase();
const playersRef = ref(db, "users");

//Working with Auth
const auth = getAuth();

var user
var currentUserId

document.getElementById("Login").addEventListener("click", loginUser);

function loginUser(email, password) {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  console.log("logging in");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("logged in user ... " + JSON.stringify(userCredential));
      console.log("User is now logged in ");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
    });
}


onAuthStateChanged(auth, (currentUser) => 
{
  if(currentUser)
  {
    currentUserId = currentUser.uid
    console.log(currentUser.uid);
  }
});



document.getElementById("Update").addEventListener("click", updateData);


function updateData(){
  var Gamemap = document.getElementById("Gamemap").value;
  console.log("chosen map : " + Gamemap);
  set(ref(db, 'gameSettings'), {
    currentMap: Gamemap
  });
}



//Start of read player data
document.getElementById("Refresh").addEventListener("click", getPlayerData);

function getPlayerData() {
get(playersRef).then((snapshot) => {
  if (snapshot.exists()) {
    try {
      var playerContent = document.getElementById("player-content");
      var content = "";
      snapshot.forEach((Snapshot) => {
        content += `<tr>
        <td>${Snapshot.child("userName").val()}</td>
        <td>${Snapshot.child("bookshelfTime").val()}</td>
        <td>${Snapshot.child("drawerTime").val()}</td>
        <td>${Snapshot.child("electricalTime").val()}</td>
        <td>${Snapshot.child("paintingTime").val()}</td>
        <td>${Snapshot.child("puzzleTime").val()}</td>
        <td>${Snapshot.child("reportAccuracy").val()}</td>
        </tr>`;
      });
      playerContent.innerHTML = content;
      document.getElementById("errorMessage").innerHTML = ""; 
      
    } catch (error) {
      console.log("Error getPlayerData" + error);
    }
  }
  else
  {
    document.getElementById("errorMessage").innerHTML = "No player data found";
  }
});
}
//End of read player data

