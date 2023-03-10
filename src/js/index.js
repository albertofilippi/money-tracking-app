import Wallet from "./models/Wallet";
import { SnackbarTypes } from "./models/enums";

let wallet;

const closeSnackbar = () => {
  const toastElement = document.getElementById("toast");

  if (!toastElement) {
    return;
  }

  toastElement.classList.remove("show");
  toastElement.classList.remove("toast--error");
};

const showMessage = (msg, type) => {
  const toastElement = document.getElementById("toast");
  if (!toastElement || !msg || !SnackbarTypes[type]) {
    return;
  }

  if (type === SnackbarTypes.ERROR) {
    toastElement.classList.add("toast--error");
  }

  const messageElement = toastElement.querySelector(".toast__message");
  messageElement.textContent = msg;

  toastElement.classList.add("show");

  setTimeout(() => closeSnackbar(), 4000);
};

// const resetFormFields = (form) => {
//   const amountInput = form.amount;
//   const descriptionInput = form.description;

//   amountInput.value = 0;
//   descriptionInput.value = "";
// };

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
    updateBalance();
    toggleModal();
    // resetFormFields(event.target);
    event.target.reset();
    updateOperationsTable();
    showMessage("Operation added succesfully!", SnackbarTypes.SUCCESS);
  } catch (e) {
    showMessage("Operation not added!", SnackbarTypes.ERROR);
  }
};

const removeOperation = function (id) {
  try {
    wallet.removeOperation(id);
    updateOperationsTable();
    updateBalance();
    showMessage("Operation removed succesfully!", SnackbarTypes.SUCCESS);
  } catch (e) {
    showMessage("Operation not removed!", SnackbarTypes.ERROR);
  }
};

const resetSearch = (event) => {
  event.preventDefault();
  const formElement = event.target.closest("form");

  if (!formElement) {
    return;
  }

  formElement.reset();
  updateOperationsTable();
};

const searchOperation = function (event) {
  event.preventDefault();
  const searchValue = event.target.searchInput;
  const operationsToAdd = wallet.findOperation(searchValue.value);

  updateOperationsTable(operationsToAdd);
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

const updateBalance = () => {
  const balanceElement = document.getElementById("balance-box");
  if (!balanceElement) {
    return;
  }

  balanceElement.textContent = parseFloat(getBalance()).toLocaleString();
};

const updateOperationsTable = (initialOperations = getOperations()) => {
  const tableContainerElement = document.getElementById("table-container");
  const tableElement = document.getElementById("table-body");

  if (
    !Array.isArray(initialOperations) ||
    !tableElement ||
    !tableContainerElement
  ) {
    return;
  }
  const operations = [...initialOperations];

  tableElement.innerHTML = "";
  if (!operations.length) {
    tableContainerElement.classList.add("no-data");
    return;
  }

  tableContainerElement.classList.remove("no-data");

  operations
    .reverse()
    .forEach((operation) =>
      tableElement.appendChild(getOperationTableRow(operation))
    );
};

const getOperationTableRow = (operation) => {
  const trRow = document.createElement("tr");
  trRow.setAttribute("data-op-type", operation.type.toLowerCase());

  const cells = [
    {
      value: operation.description,
    },
    {
      value: parseFloat(operation.amount).toLocaleString(),
      classes: "operation-amount",
    },
    {
      value: new Date(operation.date).toLocaleString(),
    },
  ];

  cells.forEach((cell) => {
    const td = document.createElement("td");
    td.textContent = cell.value;
    if (cell.classes) {
      td.className = cell.classes;
    }
    trRow.appendChild(td);
  });

  trRow.appendChild(getDeleteActionBtn(operation));

  return trRow;
};

const getDeleteActionBtn = (operation) => {
  const tdAction = document.createElement("td");
  const actionButton = document.createElement("button");
  actionButton.className = "button button-icon button-animated icon-delete";
  tdAction.className = "align-text-center";

  actionButton.onclick = () => {
    removeOperation(operation.date);
  };

  tdAction.appendChild(actionButton);

  return tdAction;
};

const onSearchInputChange = (event) => {
  const { value: searchValue } = event.target;
  const resetSearchElmnt = document.getElementById("reset-search-btn");

  if (!resetSearchElmnt) {
    return;
  }
  resetSearchElmnt.style.display = searchValue ? "inline-block" : "none";
};

window.addOperation = addOperation;
window.toggleModal = toggleModal;
window.closeSnackbar = closeSnackbar;
window.searchOperation = searchOperation;
window.resetSearch = resetSearch;
window.onSearchInputChange = onSearchInputChange;

document.addEventListener("DOMContentLoaded", function () {
  wallet = new Wallet();
  updateBalance();
  updateOperationsTable();
});
