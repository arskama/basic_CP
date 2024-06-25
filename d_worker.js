
/*
var n = 1;
search: while (true) {
  n += 1;
  for (var i = 2; i <= Math.sqrt(n); i += 1)
    if (n % i == 0)
     continue search;
  // found a prime!
  postMessage(n);
}
*/

/*let n = 0;
let timer = setInterval(function() {
  n = n + 1;
  postMessage(n);
}, 1000);
*/
function pressureCallbackWkr(update) {
    console.log("Update from Worker");
    console.log("cpuState X = " + update[0].state);
    console.log("timestamp = " + update[0].time);
    postMessage(update[0].toJSON());
};

let observerWorker = new PressureObserver(pressureCallbackWkr);

observerWorker.observe("cpu");

console.log("started from worker");

