class JsonWebSocket extends WebSocket {
  constructor(...args) {
    super(...args);
    this.onopen = function(ev) {
      console.log('ws open');
    };

    this.onerror = function(ev) {
      alert('Websocket error');
    }
  }

  send(obj) {
    try {
      const rs = this.readyState;
      
      if (rs !== 1) {
        throw new Error('skip send in readyState ' + rs);
      }

      super.send(JSON.stringify(obj));

    } catch (err) {
      console.error('send', err);
    }
  }

  set ondata (cb) {
    super.onmessage = msg => {
      try {
        cb(JSON.parse(msg.data));

      } catch (err) {
        console.error('onmessage', err);
      }
    };
  }
}

export default JsonWebSocket