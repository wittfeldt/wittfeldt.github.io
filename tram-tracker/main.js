import AnimatedMarker from './modules/animated_marker.js';
import WebSocket from './modules/websocket.js';
import { getIcon } from './modules/icons.js';

const markers = {}; // markers by id

const ws = new WebSocket("wss://dev.lolo.company/vZGyR24gxpDSifoRYxoez9/ws");
await ws.open();

const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 16,
  minZoom: 14,
  center: { lat: 57.70609407858215, lng: 11.970031873752204 },
  styles: [
  	{ 
			featureType: 'all',
  		stylers: [{ saturation: -50 }]
  	},
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    }
  ]
});

// Send viewport bounds over websocket after pan / zoom
map.addListener('idle', () => ws.send(map.getBounds()));

// Update map when markers are received
ws.ondata = data => {
	const ids = [];

	for (const { id, name, bgColor, position, rotation } of data) {
		ids.push(id);

		if (markers[id]) {
			markers[id].setIcon(getIcon(name, bgColor, rotation));
			markers[id].animateTo(position);

		} else {
      markers[id] = new AnimatedMarker({
        position,
        map,
        icon: getIcon(name, bgColor, rotation)
      });
		}
	}

	for (const id in markers) {
		if (ids.includes(id)) continue;
		delete markers[id];
	}
}