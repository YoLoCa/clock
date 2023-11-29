
(function (){
    //Variables globales
    const countrySelect = document.getElementById('country-select');
    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmButton = document.getElementById('alarm-button');
    const audio = document.getElementById('audio');
    const stopwatchStartButton = document.getElementById('stopwatch-start');
    const stopwatchResetButton = document.getElementById('stopwatch-reset');
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    let alarmActive = false;
    let stopwatchActive = false;
    let stopwatchInterval;
    let stopwatchStartTime;
    let stopwatchElapsedTime = 0;

    //Reloj Mundial
    function updateTime() {
        setInterval(() => {
          const selectedCountry = document.getElementById('country-select').value;
          const options = { timeZone: selectedCountry, timeStyle: 'medium', hour12: false };
          const currentTime = new Date().toLocaleTimeString('en-US', options);
          document.getElementById('country-time').textContent = currentTime;
        }, 1000); // Update every second
      }
//Funcion canción
    function playAudio() {
        if(alarmActive){
          audio.play();
          const controles = document.getElementById('audio-container');
          controles.classList.remove('audio-off');
          controles.classList.add('audio-on');    
        }
    }
    //Funcionalidad boton Alarma
      function toggleAlarm() {
        if (alarmActive) {
          // Deactivate the alarm
          alarmActive = false;
          alarmButton.classList.remove('activated');
          alarmButton.classList.add('deactivated');
          alarmButton.textContent = 'Activar';
          alert('Alarm deactivated.');
        } else {
          // Activate the alarm
          const alarmTime = alarmTimeInput.value;
          const selectedCountry = countrySelect.value;
          const options = { timeZone: selectedCountry, hour12: false };
          const currentTime = new Date().toLocaleTimeString('en-US', options);
  
          const timeDifference = new Date(`01/01/2023 ${alarmTime}`) - new Date(`01/01/2023 ${currentTime}`);
  
          if (timeDifference > 0) {
            alarmActive = true;
            alarmButton.classList.add('activated');
            alarmButton.classList.remove('deactivated');
            alarmButton.textContent = 'Activada';

            setTimeout(() => {
                playAudio();
              // Deactivate the button after a delay and update text
              setTimeout(() => {
                alarmButton.classList.remove('activated');
                alarmButton.classList.remove('deactivated');
                alarmButton.textContent = 'Activar';
                alarmActive = false;
              }, 2000); // 2000 milliseconds (2 seconds) delay
            }, timeDifference);
          } else {
            alert('Inserte una hora Correcta');
          }
        }
      }

      function startStopwatch() {
        if (!stopwatchActive) {
            stopwatchActive = true;
            stopwatchStartTime = Date.now() - stopwatchElapsedTime;
            stopwatchInterval = setInterval(updateStopwatch, 10);
        } else{
            clearInterval(stopwatchInterval);
            stopwatchActive = false;
        }
    }

    function resetStopwatch() {
        stopwatchElapsedTime = 0;
        updateStopwatchDisplay();
    }

    function updateStopwatch() {
        const currentTime = Date.now();
        stopwatchElapsedTime = currentTime - stopwatchStartTime;
        updateStopwatchDisplay();
    }

    function updateStopwatchDisplay() {
        const minutes = Math.floor(stopwatchElapsedTime / 60000);
        const seconds = Math.floor((stopwatchElapsedTime % 60000) / 1000);
        const milliseconds = Math.floor((stopwatchElapsedTime % 1000) / 10);

        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`;
        stopwatchDisplay.textContent = formattedTime;
    }     
  //llamadas a funciones
      countrySelect.addEventListener('change', updateTime);
      alarmButton.addEventListener('click', toggleAlarm);
      stopwatchStartButton.addEventListener('click', startStopwatch);
      stopwatchResetButton.addEventListener('click', resetStopwatch);

    updateTime();
})();
