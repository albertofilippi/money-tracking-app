const Wallet = require("./models/Wallet").Wallet;

let wallet;

const addOperation = function (op) {
  try {
    wallet.addOperation(op);
  } catch (e) {
    console.log(e);
  }
};

const removeOperation = function (id) {
  try {
    wallet.removeOperation(id);
  } catch (e) {
    console.error(e);
  }
};

const findOperation = function (val) {
  return wallet.findOperation(val);
};

const getBalance = function () {
  return wallet.getBalance();
};

const getOperations = function () {
  return wallet.getOperations();
};

document.addEventListener("DOMContentLoaded", function () {
  wallet = new Wallet();
});
