import { findIndex, isValidOperation, getWallet } from "./utils";
const {
  incomeOperation,
  invalidOperation,
} = require("../../jest/mockedStructures");

describe("Utils testing suite", () => {
  beforeEach(() => {
    localStorage.removeItem("wallet");
  });
  it("findIndex returns correct index", () => {
    const list = [1, 2, 3, 4];
    const index = findIndex(list, (item) => {
      return item === 3;
    });

    expect(index).toBe(2);
  });

  it("findIndex returns -1 when item not found", () => {
    const list = [1, 2, 3, 4];
    const index = findIndex(list, (item) => {
      return item === 10;
    });

    expect(index).toBe(-1);
  });

  it("isValidOperation returns true if operation is valid", () => {
    expect(isValidOperation(incomeOperation)).toBeTruthy();
  });

  it("isValidOperation returns false if operation is not valid", () => {
    expect(isValidOperation(invalidOperation)).toBeFalsy();
  });

  it("getWallet returns correct wallet if it exists in the local storage", () => {
    const wallet = {
      balance: 1000,
      operations: [incomeOperation],
    };

    localStorage.setItem("wallet", JSON.stringify(wallet));

    expect(getWallet()).toEqual(wallet);
  });

  it("getWallet returns standard wallet if it doesn't exists in the local storage", () => {
    const wallet = {
      balance: 0,
      operations: [],
    };

    expect(getWallet()).toEqual(wallet);
  });
});
