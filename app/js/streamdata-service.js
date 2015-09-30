'use strict';
function StreamdataService(streamdataAppToken, xigniteToken, bus) {
  var eventSources = {};

  function fetchJson(currency) {
    var xigniteURL = "https://globalcurrencies.xignite.com/xGlobalCurrencies.json/GetRealTimeRate";
    //Build URL with proper params
    xigniteURL = xigniteURL + "?Symbol=" + currency + "&_token=" + xigniteToken;

    var eventSource = new Streamdata(xigniteURL, streamdataAppToken, currency);
    eventSources[currency] = eventSource;
    eventSource.open();
  }

  function stopFetchJson(currency) {
    eventSources[currency].close();
  }

  return {
    fetchJson: fetchJson,
    stopFetchJson: stopFetchJson
  }
}

// Streamdata():: wrapper function to create a data object through the two APIs
function Streamdata(xigniteURL, streamdataAppToken, currency) {
  var data;
  var eventSource = streamdataio.createEventSource(xigniteURL, streamdataAppToken);

  eventSource.onOpen(function() {
    data = [];
    bus.trigger('connectionOpenEvent');

  }).onData(function(snapshot) {
    data = snapshot;
    bus.trigger(currency, data);
// callback to receive first set of data

  }).onPatch(function(patches) {
    jsonpatch.apply(data, patches);
    bus.trigger(currency, data);
// callback to receive 'patch' operations & call to json patch library to apply the changes

  }).onError(function(error) {
    bus.trigger('errorQuoteEvent', error);
    eventSource.close();
  });

  return eventSource;
}
