(function () {
  var wallet;

  function addOperation() {}

  function removeOperation() {}

  function findOperation() {}

  function getBalance() {
    return wallet.getBalance();
  }

  function getOperations() {
    return wallet.getOperations();
  }

  document.addEventListener("DOMContentLoaded", () => {
    wallet = new Wallet();
  });
})();
