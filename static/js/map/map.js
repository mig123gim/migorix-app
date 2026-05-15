const MAPGL_API_KEY =
  window.MIGORIX_CONFIG &&
  window.MIGORIX_CONFIG.MAPGL_API_KEY
    ? window.MIGORIX_CONFIG.MAPGL_API_KEY
    : "";
const MAPGL_MOSCOW_CENTER = [37.6173, 55.7558];
const MAPGL_DEFAULT_ZOOM = 13;

let migorixMapGLInstance = null;

function isMapGLKeyReady() {
  return MAPGL_API_KEY && MAPGL_API_KEY !== 'PASTE_2GIS_KEY_HERE';
}

function initMapGL() {
  const container = document.getElementById('mapgl-container');
  if (!container) return false;

  if (!isMapGLKeyReady()) {
    console.warn('MIGoRIX MapGL fallback: 2GIS API key is not configured.');
    return false;
  }

  if (!window.mapgl || typeof window.mapgl.Map !== 'function') {
    console.warn('MIGoRIX MapGL fallback: 2GIS MapGL script is not available.');
    return false;
  }

  if (migorixMapGLInstance) {
    return true;
  }

  migorixMapGLInstance = new window.mapgl.Map(container, {
    key: MAPGL_API_KEY,
    center: MAPGL_MOSCOW_CENTER,
    zoom: MAPGL_DEFAULT_ZOOM,
    zoomControl: false
  });

  return true;
}

function initMapScreen() {
  initMapGL();

  if (window.MIGoRIXMapBottomPanel) {
    window.MIGoRIXMapBottomPanel.init();
  }
  if (window.MIGoRIXMapControls) {
    window.MIGoRIXMapControls.init();
  }
  return true;
}

window.MIGoRIXMap = {
  init: initMapScreen,
  initMapGL: initMapGL
};

// Removed auto init on DOMContentLoaded to avoid map init on hidden screen
// document.addEventListener('DOMContentLoaded', function() {
//   initMapScreen();
// });
