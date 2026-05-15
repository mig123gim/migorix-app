const mapPanelStates = ['compact', 'half', 'full'];
let mapPanelStateIndex = 0;

function setMapPanelState(state) {
  const panel = document.querySelector('#screen-map .map-bottom-panel');
  if (!panel || !mapPanelStates.includes(state)) return;

  mapPanelStates.forEach(function(panelState) {
    panel.classList.toggle(panelState, panelState === state);
  });
  panel.dataset.mapPanelState = state;
  mapPanelStateIndex = mapPanelStates.indexOf(state);
}

function toggleMapPanelState() {
  mapPanelStateIndex = (mapPanelStateIndex + 1) % mapPanelStates.length;
  setMapPanelState(mapPanelStates[mapPanelStateIndex]);
}

function initMapBottomPanel() {
  const handle = document.querySelector('#screen-map .map-panel-handle');
  const tabs = document.querySelectorAll('#screen-map [data-map-tab]');

  if (!handle || tabs.length === 0) {
    console.warn('MIGoRIX bottom panel init skipped: handle or tabs not found');
    return;
  }


  handle.addEventListener('click', toggleMapPanelState);

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(item) {
        item.classList.remove('active');
      });
      tab.classList.add('active');
    });
  });

  console.log('MIGoRIX bottom panel tabs initialized:', tabs.length);

  setMapPanelState('compact');
}


window.MIGoRIXMapBottomPanel = {
  init: initMapBottomPanel,
  setState: setMapPanelState,
  toggleState: toggleMapPanelState
};
console.log('MIGoRIX bottom panel tabs initialized:', document.querySelectorAll('#screen-map [data-map-tab]').length);
