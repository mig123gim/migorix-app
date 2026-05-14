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
  if (handle) {
    handle.addEventListener('click', toggleMapPanelState);
  }

  document.querySelectorAll('#screen-map [data-map-tab]').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#screen-map [data-map-tab]').forEach(function(item) {
        item.classList.toggle('active', item === tab);
      });
    });
  });

  setMapPanelState('compact');
}

window.MIGoRIXMapBottomPanel = {
  init: initMapBottomPanel,
  setState: setMapPanelState,
  toggleState: toggleMapPanelState
};
