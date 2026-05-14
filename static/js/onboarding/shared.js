function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(function(screen) {
    screen.classList.remove('active');
  });

  const nextScreen = document.getElementById(screenId);
  if (!nextScreen) return;

  nextScreen.classList.add('active');

  if (screenId === 'screen-code' && window.MIGoRIXSms) {
    window.MIGoRIXSms.updateSmsPhoneText();
    window.MIGoRIXSms.startResendTimer();
  }
}

window.showScreen = showScreen;
