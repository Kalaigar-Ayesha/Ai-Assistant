let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-GB";
  window.speechSynthesis.speak(text_speak);
}
function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning mam");
  } else if (hours >= 12 && hours < 16) {
    speak("Good afternoon mam");
  } else {
    speak("Good Evening mam");
  }
}
window.addEventListener("load", () => {
  wishMe();
});
let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};
btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  if (message.includes("hello") || message.includes("hey")) {
    speak("hello mam, how can i help you?");
  } else if (message.includes("who are you")) {
    speak("i am your virtual assistant created by Ayesha ");
  } else if (message.includes("open youtube")) {
    speak("opening youtube");
    window.open("https://www.youtube.com/");
  } else if (message.includes("open google")) {
    speak("opening google");
    window.open("https://www.google.com/");
  } else if (message.includes("open chat gpt")) {
    speak("opening chat gpt");
    window.open("https://chatgpt.com/");
  } else if (message.includes("open whatsapp")) {
    speak("opening whatsapp");
    window.open("https://web.whatsapp.com/");
  } else if (message.includes("open calculator")) {
    speak("opening calculator");
    window.open("calculator://");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    speak(time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    speak(date);
  } else {
    speak(`this i what i found on internet regarding ${message}`);
    window.open(`https://www.google.com/search?q=${message}`);
  }
}
