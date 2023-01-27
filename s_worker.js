onconnect = function(e) {
  var port = e.ports[0]; //get the port
  console.log("in onconnect------------>");
  let started = false;

  port.start(); // Open the port connection to enable two-way communication

  let observerWorker = new PressureObserver(pressureCallbackWkr, {sampleRate : 0.5});
  console.log ("observer is " + typeof observerWorker)

  port.onmessage = function(e) {
    console.log("received from client. " + e.data[0]);
    if (started === false)
      observerWorker.observe("cpu");
    started = true;
    port.postMessage(e.data[0]);
  }
  function pressureCallbackWkr(update) {
    console.log("Update from Worker");
    console.log("cpuState X = " + update[0].state);
    console.log("cpu factor X = " + update[0].factors[0]);
    if (update[0].factors[1])
      console.log("cpu factor X = " + update[0].factors[1]);
    console.log("timestamp = " + update[0].time);
    port.postMessage(update[0].toJSON());
};

}

console.log("started from worker");
