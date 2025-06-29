async function buttonFullscreenClicked() {
    if (!document.fullscreenElement) {
        await document.querySelector("body").requestFullscreen();
    } else {
        await document.exitFullscreen();
    }
}

async function buttonPlayClicked() {
  const SoundBegin = document.getElementById('sound-begin');
  const SoundAmbience = document.getElementById('sound-ambience');
  SoundAmbience.loop = true;

  SoundBegin.play();
  
  SoundBegin.addEventListener('ended', () => {
    SoundAmbience.play();
  });
}

async function enterValue() {
    console.log("Here")
    const response = await fetch('/enter_value', {
        method: 'POST',
    });
}

document.addEventListener('DOMContentLoaded', () => {
  
  const textInput = document.getElementById('text-input');
  const inputContainer = document.getElementById('input-container');
  const retryContainer = document.getElementById('retry-container');
  const retryButton = document.getElementById('retry-button');
  const background = document.querySelector('.background');
  const SoundGreen = document.getElementById('sound-green');
  const SoundRed = document.getElementById('sound-red');
  const SoundBegin = document.getElementById('sound-begin');
  const SoundAmbience = document.getElementById('sound-ambience');

  // Function to reset to the initial state
  function resetToInitialState() {
    background.style.backgroundImage = "url('/static/images/grey.png')";
    inputContainer.style.display = 'flex';
    retryContainer.style.display = 'none';
    textInput.value = '';
  }

 
  function handleSubmit() {
    const name = textInput.value;

    if (name.trim() === '') {
      alert('Please enter a value.');
      return;
    }

   
    fetch('/enter_value', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.result == "green") {
          background.style.backgroundImage = "url('/static/images/green.png')";
          inputContainer.style.display = 'none';
          retryContainer.style.display = 'flex';
          SoundGreen.play();
        } else if (data.result == "red"){
          background.style.backgroundImage = "url('/static/images/red.png')";
          inputContainer.style.display = 'none';
          retryContainer.style.display = 'none';
          SoundRed.play();
          SoundAmbience.pause();
          SoundAmbience.currentTime = 0;
        } else {
            textInput.value = '';
        }

        
      })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     alert('Failed to communicate with the server.');
    //   });
  }

  textInput.addEventListener('keydown', (event) => {
    console.log("EVENT")
    if (event.key === 'Enter') {
      handleSubmit();
    }
  });


  retryButton.addEventListener('click', resetToInitialState);
});
