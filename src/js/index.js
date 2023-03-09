const Wallet = require("./models/Wallet").Wallet;

let wallet;

const resetFormFields = (form) => {
  const amountInput = form.amount;
  const descriptionInput = form.description;

  amountInput.value = 0;
  descriptionInput.value = "";
};

const addOperation = function (event) {
  event.preventDefault();
  const submitButton = event.submitter;
  const type = submitButton.getAttribute("data-type");
  const amountInput = event.target.amount;
  const descriptionInput = event.target.description;

  const operation = {
    amount: amountInput.value,
    description: descriptionInput.value,
    type,
  };

  try {
    wallet.addOperation(operation);
    toggleModal();
    resetFormFields(event.target);
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

const toggleModal = () => {
  const modalComponent = document.getElementById("modal");
  if (!modalComponent) {
    return;
  }

  const isHidden = modalComponent.classList.contains("hide");
  if (isHidden) {
    modalComponent.classList.remove("hide");
    return;
  }

  modalComponent.classList.add("hide");
};

window.addOperation = addOperation;
window.toggleModal = toggleModal;

document.addEventListener("DOMContentLoaded", function () {
  wallet = new Wallet();
});
