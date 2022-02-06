import AnimatedMarker from './modules/animated_marker.js';
import WebSocket from './modules/websocket.js';
import { getIcon } from './modules/icons.js';

const markers = {}; // markers by id

const ws = new WebSocket("wss://dev.lolo.company/vZGyR24gxpDSifoRYxoez9/ws");
await ws.open();

const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 16,
  minZoom: 16,
  center: { lat: 57.70609407858215, lng: 11.970031873752204 },
});

// Send viewport bounds over websocket after pan / zoom
map.addListener('idle', () => ws.send(map.getBounds()));

// Update map when markers are received
ws.ondata = data => {
	const ids = [];

	for (const { id, name, bgColor, position } of data) {
		ids.push(id);

		if (markers[id]) {
			markers[id].animateTo(position);

		} else {
      markers[id] = new AnimatedMarker({
        position,
        map,
        icon: getIcon(name, bgColor)
      });
		}
	}

	for (const id in markers) {
		if (ids.includes(id)) continue;
		delete markers[id];
	}
}