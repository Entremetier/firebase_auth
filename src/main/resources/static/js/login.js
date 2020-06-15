(function () {

const firebaseConfig = {
    apiKey: "",
    authDomain: "contact-form-96065.firebaseapp.com",
    databaseURL: "https://contact-form-96065.firebaseio.com",
    projectId: "contact-form-96065",
    storageBucket: "contact-form-96065.appspot.com",
    messagingSenderId: "",
    appId: "1:405674194627:web:4209b0e6944bd91f7a9476"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

    //Daten von allen Elementen auf der Seite werden geholt
     const txtEmail = document.getElementById("email");
     const txtPassword = document.getElementById("password");
     const loginBttn = document.getElementById("loginBttn");

     //Login
     loginBttn.addEventListener('click', e => {
       const email = txtEmail.value;
       const password = txtPassword.value;
       console.log(email + " " + password);
       const auth = firebase.auth();

       //Möglichkeit des Loginverfahrens, hier nur mit Email und Password
       const promise = auth.signInWithEmailAndPassword(email, password);

       //Promise wenn der User nicht in der DB gefunden wird
       promise.catch(e => console.log("Message: " + e.message));

     });

     //Status ob ein User eingeloggt ist oder nicht wird kontrolliert
     firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser){
            // console.log("Firebase User: " + firebaseUser.value);
            //Bei erfolgreichem login wird der User auf diese Seite weitergeleitet
            window.location = "http://localhost:8080/message"
        } else {
            console.log("not logged in");
        }
     });

}());