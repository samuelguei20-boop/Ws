const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

const balanceText = document.getElementById("balanceText");
const cfaText = document.getElementById("cfaText");
const rewardBalance = document.getElementById("rewardBalance");

let mainBalance = 0;
let rewardAmount = 0;
let visible = true;
let currentStream = null;

/* NAVIGATION */

navItems.forEach(btn=>{

btn.addEventListener("click",()=>{

pages.forEach(page=>{
page.classList.remove("active-page");
});

navItems.forEach(nav=>{
nav.classList.remove("active-nav");
});

const pageId = btn.getAttribute("data-page");

document
.getElementById(pageId)
.classList.add("active-page");

btn.classList.add("active-nav");

});

});

/* UPDATE BALANCE */

function updateBalance(){

if(visible){

balanceText.innerText = mainBalance;

cfaText.innerText = `≈ ${mainBalance} FCFA`;

}else{

balanceText.innerText = "••••";

cfaText.innerText = "≈ ••••";

}

}

/* BALANCE SHOW */

const toggleBalance =
document.getElementById("toggleBalance");

toggleBalance.addEventListener("click",()=>{

visible = !visible;

if(visible){

toggleBalance.innerHTML =
'<i class="fa-regular fa-eye"></i>';

}else{

toggleBalance.innerHTML =
'<i class="fa-regular fa-eye-slash"></i>';

}

updateBalance();

});

/* DARK MODE */

const themeToggle =
document.getElementById("themeToggle");

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

themeToggle.innerHTML =
'<i class="fa-solid fa-sun"></i>';

}else{

themeToggle.innerHTML =
'<i class="fa-solid fa-moon"></i>';

}

});

/* XP */

let xp = 0;

document
.getElementById("xpFill")
.style.width = xp + "%";

document
.getElementById("levelPercent")
.innerText = xp + "%";

/* MODAL */

const modal =
document.getElementById("mainModal");

const modalContent =
document.getElementById("modalContent");

function openModal(content){

modal.style.display = "flex";

modalContent.innerHTML = content;

}

function stopCamera(){

if(currentStream){

currentStream
.getTracks()
.forEach(track=>track.stop());

currentStream = null;

}

}

function closeModal(){

modal.style.display = "none";

stopCamera();

}

window.closeModal = closeModal;

window.addEventListener("click",(e)=>{

if(e.target === modal){

closeModal();

}

});

/* COPY REFERRAL */

const copyBtn =
document.getElementById("copyReferral");

copyBtn.addEventListener("click",()=>{

const input =
document.querySelector(".referral-box input");

navigator.clipboard.writeText(input.value);

copyBtn.innerText =
"Lien copié ✓";

setTimeout(()=>{

copyBtn.innerText =
"Copier le lien";

},2000);

});

/* COPY REFERRAL SETTINGS */

document
.getElementById("copyReferral2")
.addEventListener("click",()=>{

navigator.clipboard.writeText(
"https://bccfuture.com/ref/BCC20458"
);

openModal(`

<h2>
✅ Lien copié
</h2>

<p style="margin-top:15px">

Votre lien de parrainage
a été copié.

</p>

<button class="close-btn"
onclick="closeModal()">

Fermer

</button>

`);

});

/* MISSIONS */

document
.querySelectorAll(".mission-btn")
.forEach(btn=>{

btn.addEventListener("click",()=>{

openModal(`

<h2>
🎯 ${btn.innerText}
</h2>

<p style="margin-top:10px">
💰 Gain : 0 BCC
</p>

<p style="margin-top:10px">
⏱️ Durée : 0 min
</p>

<p style="margin-top:10px">
📋 Conditions : mission admin
</p>

<button class="main-btn"
style="width:100%;margin-top:20px">

COMMENCER

</button>

<button class="close-btn"
onclick="closeModal()">

Fermer

</button>

`);

});

});

/* SEND */

document
.getElementById("sendBtn")
.addEventListener("click",()=>{

openModal(`

<h2>
📤 Envoyer BCC
</h2>

<input id="sendId"
placeholder="ID BCC destinataire">

<input id="sendAmount"
type="number"
placeholder="Montant BCC">

<p style="margin-top:15px">
Frais : 1%
</p>

<button class="main-btn"
id="confirmSendBtn"
style="width:100%;margin-top:20px">

Confirmer

</button>

<button class="close-btn"
onclick="closeModal()">

Fermer

</button>

`);

setTimeout(()=>{

const confirmBtn =
document.getElementById("confirmSendBtn");

confirmBtn.addEventListener("click",()=>{

const amount =
parseFloat(
document.getElementById("sendAmount").value
);

if(!amount || amount <= 0){

alert("Montant invalide");
return;

}

if(amount > mainBalance){

alert("Solde insuffisant");
return;

}

const fees = amount * 0.01;

mainBalance =
mainBalance - amount - fees;

if(mainBalance < 0){
mainBalance = 0;
}

updateBalance();

openModal(`

<h2>
✅ Transfert effectué
</h2>

<p style="margin-top:15px">

Montant envoyé :
${amount} BCC

</p>

<p style="margin-top:10px">

Frais :
${fees.toFixed(2)} BCC

</p>

<button class="close-btn"
onclick="closeModal()">

Fermer

</button>

`);

});

},100);

});

/* RECEIVE */

document
.getElementById("receiveBtn")
.addEventListener("click",()=>{

openModal(`

<h2>
📥 Recevoir
</h2>

<div class="receive-id-box">

BCC20458

</div>

<button class="main-btn"
id="copyIdBtn"
style="width:100%;margin-top:20px">

Copier ID

</button>

<button class="close-btn"
onclick="closeModal()">

Fermer

</button>

`);

setTimeout(()=>{

document
.getElementById("copyIdBtn")
.addEventListener("click",()=>{

navigator.clipboard.writeText(
"BCC20458"
);

alert("ID copié");

});

},100);

});

/* SCANNER */

document
.getElementById("scanBtn")
.addEventListener("click",
async()=>{

try{

const stream =
await navigator
.mediaDevices
.getUserMedia({
video:{
facingMode:"environment"
}
});

currentStream = stream;

openModal(`

<h2>
📷 Scanner QR
</h2>

<video
id="scannerVideo"
autoplay
playsinline
style="
width:100%;
height:260px;
border-radius:20px;
margin-top:20px;
background:black;
object-fit:cover;
">
</video>

<button class="close-btn"
onclick="closeModal()">

Fermer

</button>

`);

const video =
document.getElementById("scannerVideo");

video.srcObject = stream;

}catch(error){

alert(
"Accès caméra refusé"
);

}

});

/* CONVERT */

document
.getElementById("convertBtn")
.addEventListener("click",()=>{

openModal(`

<h2>
🔄 Convertir
</h2>

<select>

<option>
Wave
</option>

<option>
Orange Money
</option>

<option>
MTN Money
</option>

<option>
Moov Money
</option>

</select>

<input placeholder="Numéro mobile money">

<input type="number"
placeholder="Montant">

<button class="main-btn"
style="width:100%;margin-top:20px">

Valider

</button>

<button class="close-btn"
onclick="closeModal()">

Fermer

</button>

`);

});

/* NOTIFICATION */

document
.querySelector(".notif-btn")
.addEventListener("click",()=>{

openModal(`

<h2>
🔔 Notifications
</h2>

<p style="margin-top:15px">

Aucune notification admin

</p>

<button class="close-btn"
onclick="closeModal()">

Fermer

</button>

`);

});

/* MISSION DAY */

document
.querySelector(".center-btn")
.addEventListener("click",()=>{

openModal(`

<h2>
🔥 Mission du jour
</h2>

<p style="margin-top:15px">

Mission administrateur bientôt disponible

</p>

<button class="close-btn"
onclick="closeModal()">

Fermer

</button>

`);

});

/* SCRATCH CARD */

document
.getElementById("scratchCard")
.addEventListener("click",()=>{

const gains =
[10,25,50,100];

const gain =
gains[
Math.floor(
Math.random()*gains.length
)
];

rewardAmount += gain;

rewardBalance.innerText =
rewardAmount + " BCC";

document
.getElementById("scratchCard")
.innerHTML =
`🎉 ${gain} BCC GAGNÉS`;

});

/* TRANSFER REWARD */

document
.getElementById("transferRewardBtn")
.addEventListener("click",()=>{

if(rewardAmount <= 0){

alert("Aucune récompense");

return;

}

mainBalance += rewardAmount;

rewardAmount = 0;

rewardBalance.innerText =
"0 BCC";

updateBalance();

openModal(`

<h2>
✅ Récompenses transférées
</h2>

<p style="margin-top:15px">

Le solde principal
a été mis à jour.

</p>

<button class="close-btn"
onclick="closeModal()">

Fermer

</button>

`);

});

/* LEVELS */

document
.getElementById("levelBadge")
.addEventListener("click",()=>{

openModal(`

<h2>
🏆 Niveaux BCC
</h2>

<div style="
margin-top:20px;
display:flex;
flex-direction:column;
gap:12px;
">

<div class="badge">
🥉 Niveau 1 → 15 : BRONZE
</div>

<div class="badge">
🥈 Niveau 16 → 30 : SILVER
</div>

<div class="badge">
🥇 Niveau 31 → 45 : GOLD
</div>

<div class="badge">
💎 Niveau 46 → 50 : PREMIUM
</div>

<div class="badge">
🔥 Niveau 51 → 60 : PRO
</div>

<div class="badge">
👑 Niveau 65+ : SUPER PRO
</div>

</div>

<button class="close-btn"
onclick="closeModal()">

Fermer

</button>

`);

});

/* INIT */

updateBalance();
