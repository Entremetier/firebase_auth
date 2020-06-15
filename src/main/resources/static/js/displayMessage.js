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

    const auth = firebase.auth();


//Reference to collection "messages"
    let messagesRef = firebase.database().ref('messages');

    let key;
    let id;

    //Daten von allen Elementen auf der Seite werden geholt
    const txtEmail = document.getElementById("email");
    const txtPassword = document.getElementById("password");
    const loginBttn = document.getElementById("loginBttn");
    const logOutBttn = document.getElementById("logOutBttn");

    document.getElementById('messageForm').addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        document.getElementById('outputName').innerText = "";
        document.getElementById('outputEmail').innerText = "";
        document.getElementById('outputCompany').innerText = "";
        document.getElementById('outputMessage').innerText = "ID ist nicht vorhanden oder es ist kein Benutzer eingeloggt!";

        //Get Values
        id = getInputVal('id');
        //console.log("Die ID: " + id);

        //Get Message with ID
        messagesRef.on('value', gotData, errData);

        function gotData(data) {
            let contact = data.val();
            console.log("data.val(): " + contact);
            let keys = Object.keys(contact);
            console.log("Was ist das? " + keys);
            for (let i = 0; i < keys.length; i++) {
                key = keys[i];
                if (key === id) {
                    console.log(key + " ID: " + id)
                    let name = contact[key].name;
                    let email = contact[key].email;
                    let company = contact[key].company;
                    let message = contact[key].message;

                    document.getElementById('outputName').innerText = name;
                    document.getElementById('outputEmail').innerText = email;
                    document.getElementById('outputCompany').innerText = company;
                    document.getElementById('outputMessage').innerText = message;
                }
            }
        }

        function errData(err) {
            console.log('Error!');
            console.log(err);
        }

        function getInputVal(id) {
            return document.getElementById(id).value;
        }
    }


    //Login
    loginBttn.addEventListener('click', e => {
        const email = txtEmail.value;
        const password = txtPassword.value;
        console.log(email + " " + password);

        //Möglichkeit des Loginverfahrens, hier nur mit Email und Password
        const promise = auth.signInWithEmailAndPassword(email, password);

        //Promise wenn der User nicht in der DB gefunden wird
        promise.catch(e => alert(email + " konnte nicht gefunden werden. E-Mail oder Passwort falsch."));
        $('#password').val('');

    });

    //Status ob ein User eingeloggt ist oder nicht wird kontrolliert
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            // alert("You`re signed in!")
            $('#email').val('');
            $('#password').val('');
            loginBttn.classList.add('hide');
            logOutBttn.classList.remove('hide');
        } else {
            // alert("You`re not signed in!")
            loginBttn.classList.remove('hide');
            logOutBttn.classList.add('hide');
        }
    });


    logOutBttn.addEventListener('click', event => {
        event.preventDefault();
        auth.signOut().then(() => {
            // alert("Benutzer wurde ausgeloggt!");
            $('#id').val('');
            document.getElementById('outputName').innerText = "";
            document.getElementById('outputEmail').innerText = "";
            document.getElementById('outputCompany').innerText = "";
            document.getElementById('outputMessage').innerText = "";
        });
    });

}());