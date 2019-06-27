//Initialization of SpeechSynthesis API
const synth = window.speechSynthesis;

//DOM Elements
var selectedVoice;
var selectedIndex = 0;

//Initialize voices array
let voices = [];

// adding li
const voiceSelect = document.querySelector("#dropdown1");
const getVoices = () => {
	voices = synth.getVoices();
	// console.log(voices);
	var index = 0;
	voices.forEach(voice => {
		var node = document.createElement("LI"); // Create a <li> node
		var textnode = document.createTextNode(
			voice.name + " (" + voice.lang + ")"
		); // Create a text node
		node.appendChild(textnode); // Append the text to <li>
		node.setAttribute("data-lang", voice.lang);
		node.setAttribute("data-name", voice.name);
		node.setAttribute("voiceIndex", index);
		// console.log(node);
		//adding onclick fn
		node.onclick = function() {
			selectedVoice = this.getAttribute("data-name");
			// selectedVoice = this.getAttribute("voiceIndex");
			// speech(selectedVoice);
			selectedIndex = this.getAttribute("voiceIndex");
			// alert(selectedVoice + " " + this.getAttribute("voiceIndex"));
			console.log(selectedVoice + " " + this.getAttribute("voiceIndex"));
		};

		index++;
		document.querySelector("#dropdown1").append(node);
	});
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
	synth.onvoiceschanged = getVoices;
}
//Speak
const speak = str => {
	if (str == undefined) {
		str = "this is the default string value set inside speak function";
	}
	//check if speaking
	if (synth.speaking) {
		console.error("Already speaking, wait!");
		return;
	}
	// if (textInput.value !== "") {
	//get speak text
	// console.log(textInput.value + " " + textInput.innerHTML);
	let speakText = new SpeechSynthesisUtterance(str);
	//speak end
	speakText.onend = e => {
		console.log("Done speaking!");
	};
	//speak error
	speakText.onerror = e => {
		console.log("something went wrong");
	};

	//loop through voices to find selectedVoice
	speakText.voice = voices[selectedIndex];

	//speak
	synth.speak(speakText);
};

function speakClicked() {
	var str = document.querySelector("#text-input").value;
	// alert(str);
	console.log(str);
	speak(str);
}
