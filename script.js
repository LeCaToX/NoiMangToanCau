const input = document.getElementById("number");

function charToBinary(c) {
    return c.charCodeAt(0).toString(2).padStart(8, '0');
}

function encrypt() {
    const plaintext = document.getElementById('plaintext').value;
    const key = parseInt(document.getElementById('key').value);
    if (plaintext.length % 5 !== 0) {
        alert("Input không chia hết cho 5");
        return;
    }
    if (key<0||key>255) {
        alert("Key phải nằm trong khoản 0-255");
        return;
    }

    let binaryString = "";
    for (let c of plaintext) {
        binaryString += charToBinary(c);
    }

    let encryptedBinaryString = "";
    for (let i = 0; i < binaryString.length; i += 8) {
        let bits = binaryString.substring(i, i + 8);
        let xorBits = parseInt(bits, 2) ^ key;
        encryptedBinaryString += xorBits.toString(2).padStart(8, '0');
    }

    let encodedBinaryString = "";
    for (let i = 0; i < encryptedBinaryString.length; i += 5) {
        encodedBinaryString += '1' + encryptedBinaryString.substring(i, i + 5);
    }

    let ciphertext = "";
    for (let i = 0; i < encodedBinaryString.length; i += 6) {
        let bits = encodedBinaryString.substring(i, i + 6);
        let charCode = parseInt(bits, 2);
        ciphertext += String.fromCharCode(charCode);
    }

    let binaryStringCipher = "";

    for (let c of ciphertext) {
        binaryStringCipher += charToBinary(c);
    }

    let res = "";

    for (let i = 0; i < encodedBinaryString.length; i++) 
        if (i%6!=0) 
            res += encodedBinaryString[i]; 
    
    let res2 = "";
    for (let i = 0; i < res.length; i++) {
        res2 += res[i];
        if (i%8==7) res2 += " ";
    }

    ciphertext = ciphertext.replaceAll(" ","⎵");

    document.getElementById('ciphertext').textContent = ciphertext;
    document.getElementById('bits').textContent = res2;
}

function compare() {
    const plaintext = document.getElementById('plaintext').value;
    const answer = document.getElementById('answer').value;
    if (plaintext == answer) {
        alert("AC");
    } else alert("WA");
}

input.addEventListener('keyup', (e) => {
    if (e.key==13) {
        encrypt();
    }
})