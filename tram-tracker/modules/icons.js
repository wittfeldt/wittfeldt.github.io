const tram = (text, bgColor) => {
  const textX = text.length > 1 ? 4 : 10;

  return `
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
     <g>
      <rect rx="8" stroke-width="0" stroke="#000" height="32" width="32" y="0" x="0" fill="${bgColor}"/>
      <text font-family="Caladea" font-size="24" y="24" x="${textX}" stroke-width="0" stroke="#000" fill="#ffffff">${text}</text>
     </g>
    </svg>
  `;
}

const other = (text, bgColor) => {
  const rows = text.split(' ');

  return `
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
     <g>
      <rect rx="8" stroke-width="0" stroke="#000" height="32" width="32" y="0" x="0" fill="${bgColor}"/>
      <text font-family="Caladea" font-size="13" y="14" x="4" stroke-width="0" stroke="#000" fill="#ffffff">${rows[0]}</text>
      <text font-family="Caladea" font-size="13" y="26" x="4" stroke-width="0" stroke="#000" fill="#ffffff">${rows[1]}</text>
     </g>
    </svg>
  `;
};

const getIcon = (name, bgColor) => {
  const m = name.match(/^Spå ([0-9]+)$/);
  const svg = m ? tram(m[1], bgColor) : other(name, bgColor);

  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
  };
};

export { tram, other, getIcon }