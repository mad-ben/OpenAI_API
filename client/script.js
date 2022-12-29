import bot from './assets/bot.svg';
import user from './assets/user.svg';

// Access HTML elements manually
const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element){
  element.textContent = '';

  loadInterval = setInterval(() => {
    // Update the text content of the loading indicator
    element.textContent += ".";

    // If the loading indicator has reached three dots, reset it
    if (element.textContent === '....'){
      element.textContent = '';
    }
  }, 300)
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index)
      index++
    }else{
      clearInterval(interval);
    }
  }, 20)
}

function generetaUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}


function chatStripe (isAi, value, uniqueId) {
  return (
    `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
        <div class="profile">
          <img 
            src="${isAi ? bot : user}"
            alt="${isAi ? 'bot' : 'user'}"          
          />
        </div>
        <div class="message" id=${uniqueId}>
          ${value}
        </div>
      </div>
    </div>
    `
  )
}

const handleSubmit = async (e) => {

  //Default behavior is to reload the browser after you submit form. This line prevents it
  e.preventDefault();
  
  //Get data from textbox
  const data=new FormData(form);
  //Get data from comboBox
  const comboBox = document.getElementById('comboBox');
  const selectedOption = comboBox.options[comboBox.selectedIndex].value;

  //console.log(selectedOption);

  // users's chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  // clear form
  form.reset();


  // bot chat stripe
  const uniqueId = generetaUniqueId(); //generate unique id for bot message
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  //scroll when typing a message
  chatContainer.scrollTop = chatContainer.scrollHeight; 

  const messageDiv = document.getElementById(uniqueId); //fetch message

  loader(messageDiv); //load AI answer

  //fetch data from server -> bot's response
  const response = await fetch('https://chatgpt3.onrender.com',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt'), //message from text area on the screen
      model: selectedOption // Selected option
    })
  }) 

  clearInterval(loadInterval); //Clear interval
  messageDiv.innerHTML = '';

  if(response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    //Pass to function created before
    typeText(messageDiv, parsedData);
  }else {
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong";

    alert(err);
  }
}

form.addEventListener('submit', handleSubmit); // when pressed submit button call event
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e); //same event called by pressing enter key. 13 is enter key code
  }
})