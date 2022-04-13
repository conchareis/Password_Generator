// Array to hold all the possible chars (Maiusculas, Minusculas, Numeros e Simbolos)
// Button to generate 4 random passwords options
// Display password options
// Ability to set the password length
// 1-click copy password to the clipboard ( <input type="text"> to display the password options )



// Clear the concole on every refresh
console.clear();
// set the body to full height
// document.body.style.height = `${innerHeight}px`

// Range Slider Properties:
// The trailing color that you see when you drag the slider.
document.getElementById("slider").oninput = function() {
	var value = (this.value-this.min)/(this.max-this.min)*100
	this.style.background = 'linear-gradient(to right, #68e0cf 0%, #0B1EDF ' + value + '%, rgba(255, 255, 255, 0.214)' + value + '%, white 100%)'
  };