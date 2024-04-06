const input = document.getElementById("number");
var res2 = "";
var res = "";

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
        alert("Key phải nằm trong khoảng 0-255");
        return;
    }

    var binaryString = "";
    for (var c of plaintext) {
        binaryString += charToBinary(c);
    }

    var encryptedBinaryString = "";
    for (var i = 0; i < binaryString.length; i += 8) {
        var bits = binaryString.substring(i, i + 8);
        var xorBits = parseInt(bits, 2) ^ key;
        encryptedBinaryString += xorBits.toString(2).padStart(8, '0');
    }

    var encodedBinaryString = "";
    for (var i = 0; i < encryptedBinaryString.length; i += 5) {
        encodedBinaryString += '1' + encryptedBinaryString.substring(i, i + 5);
    }

    var ciphertext = "";
    for (var i = 0; i < encodedBinaryString.length; i += 6) {
        var bits = encodedBinaryString.substring(i, i + 6);
        var charCode = parseInt(bits, 2);
        ciphertext += String.fromCharCode(charCode);
    }

    var binaryStringCipher = "";

    for (var c of ciphertext) {
        binaryStringCipher += charToBinary(c);
    }

    res = "";
    for (var i = 0; i < encodedBinaryString.length; i++) 
        if (i%6!=0) 
            res += encodedBinaryString[i]; 
    
    

    ciphertext = ciphertext.replaceAll(" ","⎵");

    var ciphertext2 = "";

    for (var i = 0; i < ciphertext.length; i++) {
        ciphertext2 += ciphertext[i];
        if (i%12==11) ciphertext2 += "\n";
    } 

    document.getElementById('ciphertext').textContent = ciphertext2;
}

function nam() {
    res2 = "";
    for (var i = 0; i < res.length; i++) {
        res2 += res[i];
        if (i%5==4) res2 += " ";
    }
    document.getElementById('bits').textContent = res2;
}


function tam() {
    res2 = "";
    for (var i = 0; i < res.length; i++) {
        res2 += res[i];
        if (i%8==7) res2 += " ";
    }
    document.getElementById('bits').textContent = res2;
}


function compare() {
    const plaintext = document.getElementById('plaintext').value;
    const answer = document.getElementById('answer').value;
    var cnt = 0;
    for (var i = 0; i < Math.min(35,answer.length); i++)
        if (plaintext[i] == answer[i]) cnt++;
    alert(cnt+"/35");
}

input.addEventListener('keyup', (e) => {
    if (e.key==13) {
        encrypt();
    }
})