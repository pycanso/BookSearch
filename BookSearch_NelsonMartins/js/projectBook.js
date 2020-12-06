
let signedUsers = [];
//let favoritos =[];
let loggedIn = false;
let g_LastLog;

let emailLog = document.getElementById('emailLog');
let pswLog = document.getElementById('pswLog');

let loggedNav = document.getElementById('user');
let btnsign = document.getElementById('btnSign');
let btnlog = document.getElementById('btnLog');
let buttSair = document.getElementById('btnSair');
buttSair.style.display ='none';

let sectionInicio = document.getElementById('inicio');
let sectionSignIn = document.getElementById('signIn');
let sectionLogin = document.getElementById('login');
let sectionSearch = document.getElementById('search');

sectionInicio.style.display = 'block';
sectionSignIn.style.display = 'none';
sectionLogin.style.display = 'none';
sectionSearch.style.display = 'none';

function goSignIn() {
    sectionInicio.style.display = 'none';
    sectionLogin.style.display = 'none';
    sectionSignIn.style.display = 'block';
}
function goLogIn() {
    sectionInicio.style.display = 'none';
    sectionSignIn.style.display = 'none';
    sectionLogin.style.display = 'block';
}
function leaveSignInSucess() {
    sectionSignIn.style.display = 'none';
    sectionLogin.style.display = 'block';
}
function leaveLoginSucess() {
    sectionLogin.style.display = 'none';
    sectionInicio.style.display = 'none';
    sectionSearch.style.display = 'block';
    showUserNav();
}
function checkIfUserIsLog(){
    if (loggedIn == true){
        showUserNav();
    }
}

function showUserNav() {
    var d = new Date();
    var ssdate = d.toLocaleString();

    if (loggedIn == true &&  g_LastLog !=null){
    var lLog = g_LastLog.slice(0,24);
    
    btnsign.style.display = "none";
    btnlog.style.display = "none";
    buttSair.style.display ='block';

    document.getElementById("userLogged").innerHTML = "Olá! "+ key_email + "<br>Log: "+ ssdate +"<br>Last Log: "+lLog;
    }else{
        btnsign.style.display = "none";
        btnlog.style.display = "none";
        buttSair.style.display ='block';

        document.getElementById("userLogged").innerHTML = "Olá! Bemvindo"+ key_email + "<br>Log: "+ ssdate ;
    }
}
function cancelSign() {
    sectionSignIn.style.display = 'none';
    sectionInicio.style.display = 'block';
}
function cancelLog() {
    sectionLogin.style.display = 'none';
    sectionInicio.style.display = 'block';
}
const sign = document.querySelector('#btnSign');
const log = document.querySelector('#btnLog');
const out = document.querySelector('#btnSair');
const addUser = document.querySelector('#add');
const cancelS = document.querySelector('#cancelSign');
const entraLog = document.querySelector('#entrar');
const logCancel = document.querySelector('#logCancel');
const notSign  = document.querySelector('#notSigned');

// Event Listeners
eventListeners();

function eventListeners() {
     
     sign.addEventListener('click', goSignIn);
     log.addEventListener('click', goLogIn);
     out.addEventListener('click', sair);
     addUser.addEventListener('click', save);
     cancelS.addEventListener('click', cancelSign);
     entraLog.addEventListener('click', Login);
     logCancel.addEventListener('click', cancelLog);
     notSign.addEventListener('click',goSignIn );
     }  
function sair(){
    sectionSearch.style.display = 'none';
    sectionLogin.style.display='none';
    sectionInicio.style.display = 'block';
    loggedIn = false;
    sessionStorage.clear();  
    btnsign.style.display = "block";
    btnlog.style.display = "blocK";
    buttSair.style.display ='none';
    document.getElementById("userLogged").innerHTML ="";
}

function save() {
    var username = document.querySelector('#username');
    var useremail = document.querySelector('#email');
    var userpass = document.querySelector('#psw');
    var userconfpass = document.querySelector('#confPsw');
    if (userpass.value != userconfpass.value) {
        alert('Palavras passe não são idênticas')
        userpass.value = "";
        userconfpass.value = "";
    } else {
        // Criar objeto user
        const currentuser = {
            id: Date.now(),
            user: username.value,
            email: useremail.value,
            passw: userpass.value,
            confPass: userconfpass.value
        }
        signedUsers.push(currentuser);
        localStorage.setItem(currentuser.email, JSON.stringify(signedUsers));
        sectionSignIn.style.display = 'none';
        sectionLogin.style.display = 'block';
    }
}

function Login() {
    var e, p, i, ss;
    e = emailLog.value;
    p = pswLog.value;
    i = JSON.parse(localStorage.getItem(emailLog.value)) || [""];
    key_email = i[0].email;
    ssdate = new Date();

    if (e != key_email) {
        alert("O email não coincide.\nSe não se registou não pode efectuar Login");
        emailLog.value = "";
        pswLog.value = "";
        return;
    } else {
        pass = i[0].passw;
        if (p == pass) {
            if(localStorage.getItem(emailLog.value + '_login') != null){
            g_LastLog = (localStorage.getItem(emailLog.value + '_login'));
        }
            localStorage.setItem(emailLog.value + '_login', ssdate);
            sessionStorage.setItem(emailLog.value + '_login', ssdate);

            ss = sessionStorage.getItem(emailLog.value + '_login');

            loggedIn = true;
            emailLog.value = "";
            pswLog.value = "";
            leaveLoginSucess();
            alert("Successfully logged in!");
        } else {
            alert("Password não coincide.\nInsira outra");
            pswLog.value = "";
        }
    }

}
