import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element){
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === '....'){
      element.textContent = '';
    }
  }, 300)
}

function typeText(element, text) {
  let index=0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.chatAt(index);
      index++
    }else{
      clearInterval(interval);
    }
  }, 200)
}

function generetaUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe (isAI, value, uniqueId) {
  return (
    `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
        <div className="profile">
          <img 
            src="${isAI ? bot : user}"
            alt="${isAI ? 'bot' : 'user'}"          
          />
        </div>
        <div className="message" id=${uniqueId}>
          ${value}
        </div>
      </div>
    </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const data=new FormData(form);

  // users's chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  // clear form
  form.reset();


  // bot chat stripe
  const uniqueId = generetaUniqueId(); //generate unique id for bot message
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight; 

  const messageDiv = document.getElementById(uniqueId);//fetch message
  loader(messageDiv); //load AI answer
}

form.addEventListener('submit', handleSubmit); // when pressed submit button call event
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e); //same event called by pressing enter key. 13 is enter key code
  }
})