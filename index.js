// 0 - CLEAR the console on every REFRESH
// 1 - Lenght Properties 
	// 1.1 - The trailing color that you see when you DRAG the LENGTH slider.
	// 1.2 - Passing the length_line VALUES to the lenght_title.
// 2 - Toggle Buttons
	// 2.1 - Create the OBJECTS of the Toggle Buttons functions names that we will use to create the passwords.
	// 2.2 - Create each one of the 4 functions of the Toggle Buttons that are responsible for the options choosen for the password content.
	// 2.3 - The 4 checkboxes, representing the options that are and arent selected by the user to generate the password.
	// 2.4 - Function that reassure that at least, one of the checkboxes is selected.
	// 2.5 - Add a click event to the buttons.
	// 2.6 - When the DOM is ready, call the function.
// 3 - COPY Password 
	// 3.1 - Get from the DOM the text that will appears after the generate button is clicked.
	// 3.2 - Get from the DOM the info that will appears after the copy text is clicked.
	// 3.3 - Get from the DOM the Viewbox where the Password will be shown and copied.
	// 3.4 - COPY the PASSWORD from the Viewbox.
// 4 - Button to GENERATE the PASSWORD
	// 4.1 - Function responsible to GENERATE the password and then returning it.
	// 4.2 - Get from the DOM the Button to GENERATE the password.
	// 4.3 - When the button GENERATE is clicked, the Password is GENERATED.
		// 4.3.1 - The COPY text appears and the COPIED the text remains hidden.
// 5 - Get the Current Year 



		

// 0 - CLEAR the console on every REFRESH
console.clear();

// 1 - Lenght Properties ---------------------------------------------------------------------------------------------------------------------------------------------------------/

	// 1.1 - The trailing color that you see when you DRAG the LENGTH slider.
	document.getElementById("line").oninput = function() {
		var value = (this.value-this.min)/(this.max-this.min)*100
		this.style.background = 'linear-gradient(to right, #68e0cf 0%, #0B1EDF ' + value + '%, rgba(255, 255, 255, 0.214)' + value + '%, white 100%)'
  	};

	// 1.2 - Passing the length_line VALUES to the lenght_title.

	// Selecting the text that will show the value of the length line.
	const lengthValue = document.querySelector(".length_title");

	// Selecting the length line that affects the LENGTH property of the password.
	const lengthEl = document.getElementById("line");

	lengthEl.addEventListener("input", event => {
		lengthValue.setAttribute("data-length", event.target.value);
	});

// 2 - Toggle Buttons ---------------------------------------------------------------------------------------------------------------------------------------------------------/

	// 2.1 - Create the OBJECTS of the Toggle Buttons functions names that we will use to create the passwords.
	const randomFunc = {
		lower: getRandomLower,
		upper: getRandomUpper,
		number: getRandomNumber,
		symbol: getRandomSymbol,
	};

	// 2.2 - Create each one of the 4 functions of the Toggle Buttons that are responsible for the options choosen for the password content.
	// https://i.stack.imgur.com/voeVM.gif - charcode
	function getRandomLower() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}

	function getRandomUpper() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
	}

	function getRandomNumber() {
		return Math.floor(Math.random() * 10);
	}

	function getRandomSymbol() {
		const symbols = '~!@#$%^&*()_+{}":?><;.,';
		return symbols[Math.floor(Math.random() * symbols.length)];
	}

	// 2.3 - The 4 checkboxes, representing the options that are and arent selected by the user to generate the password.
	const uppercaseEl = document.getElementById("settings_upp");
	const lowercaseEl = document.getElementById("settings_low");
	const numberEl = document.getElementById("settings_numbers");
	const symbolEl = document.getElementById("settings_symbols");

	// 2.4 - Function that reassure that at least, one of the checkboxes is selected.
	function disableOnlyCheckbox(){
		let totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(el => el.checked)
		totalChecked.forEach(el => {
			if(totalChecked.length == 1){
				el.disabled = true;
			}else{
				el.disabled = false;
			}
		})
	}

	// 2.5 - Add a click event to the buttons.
	[uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach(el => {
		el.addEventListener('click', () => {
			disableOnlyCheckbox()
		})
	})

	// 2.6 - When the DOM is ready, call the function.
	window.onload = () => {
		disableOnlyCheckbox();
	};

	// The same 2.5.
	// window.onload = function () {
	// 	disableOnlyCheckbox();
	// };

// 3 - COPY Password ------------------------------------------------------------------------------------------------------------------------------------------------------------------/

	// 3.1 - Get from the DOM the text that will appears after the generate button is clicked.
	const copyInfo = document.querySelector(".container_password_right");

	// 3.2 - Get from the DOM the info that will appears after the copy text is clicked.
	const copiedInfo = document.querySelector(".container_password_left");

	// 3.3 - Get from the DOM the Viewbox where the Password will be shown and copied.
	const resultEl = document.getElementById("result");

	// 3.4 - COPY the PASSWORD from the Viewbox.
	copyInfo.addEventListener("click", () => {
		const textarea = document.createElement("textarea");
		const password = resultEl.innerText;
		if (!password || password == "CLICK GENERATE") {
			return;
		}
		textarea.value = password;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		textarea.remove();

		// Copy desaparece e aparece o Copiado
		copyInfo.style.transform = "translateY(200%)";
		copyInfo.style.opacity = "0";
		copiedInfo.style.transform = "translateY(0%)";
		copiedInfo.style.opacity = "0.75";
	});


// 4 - Button to GENERATE the PASSWORD -------------------------------------------------------------------------------------------------------------------------------------------------/

	// 4.1 - Function responsible to GENERATE the password and then returning it.
	function generatePassword(length, lower, upper, number, symbol) {
		let generatedPassword = "";
		const typesCount = lower + upper + number + symbol;
		const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
		if (typesCount === 0) {
			return "";
		}
		for (let i = 0; i < length; i++) {
			typesArr.forEach(type => {
				const funcName = Object.keys(type)[0];
				generatedPassword += randomFunc[funcName]();
			});
		}
		return generatedPassword.slice(0, length)
									.split('').sort(() => Math.random() - 0.5)
									.join('');
	}
	
	// 4.2 - Get from the DOM the Button to GENERATE the password.
	const generateBtn = document.getElementById("generate");

	// 4.3 - When the button GENERATE is clicked, the Password is GENERATED.
	generateBtn.addEventListener("click", (btn) => {
		const length = lengthEl.value;
		const hasLower = lowercaseEl.checked;
		const hasUpper = uppercaseEl.checked;
		const hasNumber = numberEl.checked;
		const hasSymbol = symbolEl.checked;
		resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);

		// 4.3.1 - The COPY text appears and the COPIED the text remains hidden.
		copyInfo.style.transform = "translateY(0%)";
		copyInfo.style.opacity = "0.75";
		copiedInfo.style.transform = "translateY(200%)";
		copiedInfo.style.opacity = "0";
	});

// 5 - Get the Current Year -------------------------------------------------------------------------------------------------------------------------------------------------/

document.getElementById("year").innerHTML = new Date().getFullYear();

// THE END ------------------------------------------------------------------------------------------------------------------------------------------------------------------------/