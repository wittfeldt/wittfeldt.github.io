class AnimatedMarker extends google.maps.Marker {
  constructor(...args) {
    super(...args);
    this._animate = {};
  }

  arrive() {
    this.setPosition(this._animate.nextPos);
    clearInterval(this._animate.ivt);
  }

  animateTo(latLng, durationMs = 5000) {
    if (this._animate.nextPos){
      this.arrive();
    }

    this._animate.nextPos = latLng;

    const stepMs = 100;
    let numSteps = durationMs / stepMs;
    let currPos = this.getPosition();
    const stepLat = (currPos.lat() - latLng.lat) / numSteps;
    const stepLng = (currPos.lng() - latLng.lng) / numSteps;

    let step = 1;

    this._animate.ivt = setInterval(() => {
      this.setPosition(new google.maps.LatLng(
        currPos.lat() - stepLat * step,
        currPos.lng() - stepLng * step
      ));

      if (++step > numSteps) {
        this.arrive();
      }
    }, stepMs);
  }
}

export default AnimatedMarker
