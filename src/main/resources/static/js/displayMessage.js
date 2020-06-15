var firebaseConfig = {
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

document.getElementById('messageForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    document.getElementById('outputName').innerText = "";
    document.getElementById('outputEmail').innerText = "";
    document.getElementById('outputCompany').innerText = "";
    document.getElementById('outputMessage').innerText = "ID ist nicht vorhanden!";

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

const logOutBttn = document.getElementById("#logOutBttn");

logOutBttn.addEventListener('click', event => {
    event.preventDefault();
    auth.signOut().then(() => {
        console.log("User logged out!");
    });
});