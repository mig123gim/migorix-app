let resendSeconds = 28;
let resendTimerId = null;

function getFullPhoneForSms() {
  const codeEl = document.getElementById('phoneCode');
  const input = document.getElementById('phoneInput');

  const code = codeEl ? codeEl.textContent.trim() : '+7';
  const number = input ? input.value.trim() : '';

  return `${code} ${number || '968-019-24-36'}`;
}

function updateSmsPhoneText() {
  const smsPhoneText = document.getElementById('smsPhoneText');
  if (!smsPhoneText) return;

  smsPhoneText.textContent = getFullPhoneForSms();
}

function setSmsTimerProgress(secondsLeft) {
  const timerBox = document.querySelector('#screen-code .sms-timer');
  if (!timerBox) return;

  const total = 28;
  const progress = Math.max(0, Math.min(360, (secondsLeft / total) * 360));

  timerBox.style.setProperty('--progress', `${progress}deg`);
}

function startResendTimer() {
  const timer = document.querySelector('#screen-code .sms-timer span');
  const resendBtn = document.getElementById('resendCodeBtn');

  resendSeconds = 28;

  if (resendTimerId) {
    clearInterval(resendTimerId);
  }

  if (resendBtn) {
    resendBtn.disabled = true;
    resendBtn.classList.remove('ready');
  }

  function render() {
    const value = `00:${String(resendSeconds).padStart(2, '0')}`;

    if (timer) timer.textContent = value;
    setSmsTimerProgress(resendSeconds);

    if (resendBtn) {
      if (resendSeconds > 0) {
        resendBtn.textContent = `Отправить повторно через ${value}`;
      } else {
        resendBtn.textContent = 'Отправить код повторно';
        resendBtn.disabled = false;
        resendBtn.classList.add('ready');
      }
    }
  }

  render();

  resendTimerId = setInterval(function() {
    resendSeconds -= 1;
    render();

    if (resendSeconds <= 0) {
      clearInterval(resendTimerId);
      resendTimerId = null;
    }
  }, 1000);
}

window.startResendTimer = startResendTimer;
window.MIGoRIXSms = {
  getFullPhoneForSms: getFullPhoneForSms,
  updateSmsPhoneText: updateSmsPhoneText,
  setSmsTimerProgress: setSmsTimerProgress,
  startResendTimer: startResendTimer
};
