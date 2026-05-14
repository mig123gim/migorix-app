function initMapControls() {
  document.querySelectorAll('#screen-map [data-map-control]').forEach(function(button) {
    button.addEventListener('click', function() {
      button.classList.toggle('is-active');
    });
  });
}

window.MIGoRIXMapControls = {
  init: initMapControls
};
