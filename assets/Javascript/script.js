function countdown() {
    var timeLeft = 150;
  
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
  
      if (timeLeft == 1) {
        timerEl.textContent = (timeLeft + " second remaining.")
      }
      else {
          timerEl.textContent = timeLeft + " seconds remaining."
      }
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timeInterval);
        displayMessage();
      }
    }, 1000);
  }