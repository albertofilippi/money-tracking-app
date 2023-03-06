// (function () {
let wallet;

function addOperation(op) {
  try {
    wallet.addOperation(op);
  } catch (e) {
    console.log(e);
  }
}

function removeOperation(id) {
  try {
    wallet.removeOperation(id);
  } catch (e) {
    console.error(e);
  }
}

function findOperation(val) {
  return wallet.findOperation(val);
}

function getBalance() {
  return wallet.getBalance();
}

function getOperations() {
  return wallet.getOperations();
}

document.addEventListener("DOMContentLoaded", function () {
  wallet = new Wallet();
});
// })();
