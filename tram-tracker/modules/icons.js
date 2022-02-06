const buildSvg = (textBody, bgColor, rotation) => {
  return `
    <svg width="44" height="44" xmlns="http://www.w3.org/2000/svg">
     <g>
      <g transform="rotate(${rotation}, 22, 22)">
        <path stroke-width="0" fill="${bgColor}" d="m50.74994,19.94756l0.745,-1.30375l0.745,1.30375l-1.49,0z"/>
        <path stroke-width="0" fill="${bgColor}" d="m61.2527,6.68092l0.745,-1.30375l0.745,1.30375l-1.49,0z"/>
        <path stroke-width="0" fill="${bgColor}" d="m10.55357,11.07471l11.45727,-11.07471l11.45727,11.07471l-22.91452,0l-0.00003,0z"/>
      </g>
      <ellipse stroke-width="0" ry="16" rx="16" id="svg_1" cy="22" cx="22" fill="${bgColor}"/>
      ${textBody}
    </g>
    </svg>
  `
};

const tram = (text, bgColor, rotation) => {
  const textX = text.length > 1 ? 10 : 16;
  const textColor = getTextColor(bgColor);
  const textBody = `
    <text 
      font-family="Caladea" font-size="24" y="30" x="${textX}" 
      stroke-width="0" fill="${textColor}">
      ${text}
    </text>
  `;

  return buildSvg(textBody, bgColor, rotation);
}

const other = (text, bgColor, rotation) => {
  const rows = text.split(' ').filter(row => row).map(row => row.slice(0,4));
  const textColor = getTextColor(bgColor);
  const textBody = `
    <text 
      font-family="Caladea" font-size="11" x="12" y="19" 
      stroke-width="0" fill="${textColor}">
      ${rows[0]}
    </text>
    <text 
      font-family="Caladea" font-size="11" x="12" y="30" 
      stroke-width="0" fill="${textColor}">
      ${rows[1]}
    </text>
  `;

  return buildSvg(textBody, bgColor, rotation);
};

const getTextColor = bgColor => (
  /^#ff/i.test(bgColor) ? '#000000' : '#FFFFFF'
);

const getIcon = (name, bgColor, rotation) => {
  const m = name.match(/^Spå ([0-9]+)$/);
  const svg = m ? tram(m[1], bgColor, rotation) : other(name, bgColor, rotation);

  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
  };
};

export { tram, other, getIcon }