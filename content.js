"use strict";

var dataArray = [];

function storeData(text) {
  dataArray.unshift(text);
  
  if (dataArray.length > 10) {
    dataArray.pop();
  }

  //Set dataArray to Local Storage
  chrome.storage.local.set({ key: dataArray });
}

chrome.storage.local.get("key", function (result) {
  if (result.key ?? false) {
    dataArray = result.key;
  }
});

//Posting copied content to the extension script using portMsg
document.addEventListener("copy", (ev) => {
  let copiedText = document.getSelection().toString();
  if (copiedText) {
    storeData(copiedText);
  }
});

console.log("Content Script Loaded");
