let vocalsToEncrypted = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat'
}

let encryptedToVocals = {
    ai: 'a',
    enter: 'e',
    imes: 'i',
    ober: 'o',
    ufat: 'u'
}


function addTextQuery(tag, text) {
    let elementText = document.querySelector(tag);
    elementText.innerHTML = text;
}

function copyButton(status){
    let copy = document.querySelector('#copy');
    copy.disabled = status;
}

function copyText() {
    let text = document.querySelector('#blank-message').innerText;
    navigator.clipboard.writeText(text).then(() => {
        let buttonText = document.querySelector('#copy');
        buttonText.innerText = "Copied";
        console.log('The text was copied');

        setTimeout(() => {
            buttonText.innerText = 'Copy';
        }, 3000);
    }).catch(err => {
        console.error('Error copying the text: ', err);
    });
}


function cleanText(text){

    let p = document.querySelector("#no-message");
    let h2 = document.querySelector("h2");

    if (text != '') {
        copyButton(false, text);
        p.style.display = 'none'
        h2.style.display = 'none'

    } else {
        copyButton(true, text);
        p.style.display = 'block'
        h2.style.display = 'block'
    }
}


function cleanBox() {
    document.querySelector('textarea').value = '';
}


function validateText() {
    let text = document.querySelector('textarea').value;
    let regex = /^[a-z ,.!?\n\r]+$/;

    if (regex.test(text)) {
        return text;
    } else {
        cleanBox();
        alert("⚠️ Only lowercase letters without special characters or numbers.");
        return '';
    }
}


function normalToEncript() { //texto normal a encriptado
    let userText = validateText();
    let textEncrypted = '';
    for (let letter of userText) {
        textEncrypted += vocalsToEncrypted[letter] || letter;
    }
    addTextQuery('#blank-message', textEncrypted);
    cleanText(textEncrypted);
}


function encriptToNormal() { // texto encriptado a normal
    let userText = validateText();
    for (let encrypted in encryptedToVocals) {
        let regex = new RegExp(encrypted, "g");
        userText = userText.replace(regex, encryptedToVocals[encrypted]);
    }
    addTextQuery('#blank-message', userText);   
    cleanText(userText);
}




