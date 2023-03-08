const { OpType } = require("../src/js/models/enums");

const incomeOperation = {
  description: "Salary",
  amount: 1000,
  type: OpType.IN,
  date: 1,
};

const outOperation = {
  description: "Bill",
  amount: 100,
  type: OpType.OUT,
  date: 2,
};

const invalidOperation = {
  description: "Salary",
  amount: 0,
  type: OpType.IN,
  date: 3,
};

module.exports = {
  incomeOperation: incomeOperation,
  invalidOperation: invalidOperation,
  outOperation: outOperation,
};
