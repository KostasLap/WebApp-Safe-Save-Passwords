document.getElementById('saveButton').addEventListener('click', passwordInput);

        function passwordInput() {
            const myPasswords = {
                userName: document.forms.registration.username.value,
                passWord: document.forms.registration.password.value,
            };

            const character1 = ["1", "q", "5", "k", "@", "Q", "K"];
            const character2 = ["3", "9", "a", "!", "f", "A", "F"];
  
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            function modifyString(str, chars) {
                let modifiedStr = '';
                for (let i = 0; i < str.length; i++) {
                    let randomChar = chars[getRandomInt(0, chars.length)];
                    modifiedStr += str[i] + randomChar;
                }
                return modifiedStr;
            }

            
            if (myPasswords.userName.length % 2 === 0) {
                myPasswords.passWord = modifyString(myPasswords.passWord, character1);
            } else {
                myPasswords.passWord = modifyString(myPasswords.passWord, character2);
            }
            

            const jsonString = JSON.stringify(myPasswords);
            

            // Create a Blob with the JSON string
            const blob = new Blob([jsonString], { type: 'text/plain' });

            // Create a link element
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'myPasswords.txt';

            // Append the link to the body (necessary for Firefox)
            document.body.appendChild(link);

            // Programmatically click the link to trigger the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        }


document.getElementById('reversePassword').addEventListener('click',reversePassword);

function reversePassword() {
    const fileInput = document.getElementById('myfile');
    
    // Check if a file has been selected
    if (fileInput.files.length === 0) {
        alert("Please select a file.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const fileContent = event.target.result;
        const myPsw = JSON.parse(fileContent);

        let originalPassword = '';
        for (let i = 0; i < myPsw.passWord.length; i++) {
            if (i % 2 === 0) {
                originalPassword += myPsw.passWord[i];
            }
        }

        alert(myPsw.userName + "\n" + originalPassword);
    };

    reader.readAsText(file);
}
