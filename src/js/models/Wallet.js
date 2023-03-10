import { isValidOperation, getWallet, findIndex } from '../utils';
import { WalletErrors, OpType } from './enums';

class Wallet {
    #balance = 0;
    #operations = [];

    constructor() {
        this.#init();
    }

    #init() {
        const wallet = getWallet();
        this.#balance = wallet.balance;
        this.#operations = wallet.operations;
    }

    saveWallet() {
        localStorage.setItem(
            'wallet',
            JSON.stringify({
                balance: this.#balance,
                operations: this.#operations,
            })
        );
    }

    addOperation(op) {
        if (!isValidOperation(op)) {
            throw new Error(WalletErrors.INVALID_OPERATION);
        }

        const { description, type, amount } = op;
        const currentDate = new Date().getTime();

        const operation = {
            amount: parseFloat(amount),
            description: description.trim(),
            type,
            date: currentDate,
        };

        if (type === OpType.IN) {
            this.#balance += operation.amount;
        } else if (type === OpType.OUT) {
            this.#balance -= operation.amount;
        }

        this.#operations.push(operation);

        this.saveWallet();
    }

    removeOperation(id) {
        const operationIndex = findIndex(
            this.#operations,
            ({ date }) => date === id
        );

        if (operationIndex === -1) {
            throw new Error(WalletErrors.OPERATION_NOT_FOUND);
        }

        const { type, amount } = this.#operations[operationIndex];

        if (type === OpType.IN) {
            this.#balance -= amount;
        } else if (type === OpType.OUT) {
            this.#balance += amount;
        }

        this.#operations.splice(operationIndex, 1);
        this.saveWallet();
    }

    findOperation(searchValue) {
        const val = searchValue.toLowerCase().trim();

        if (!val) {
            return this.#operations;
        }

        const operationsFound = [];

        for (let i = 0; i < this.#operations.length; i++) {
            const description = this.#operations[i].description.toLowerCase();
            if (description.includes(val)) {
                operationsFound.push(this.#operations[i]);
            }
        }

        return operationsFound;
    }

    getBalance() {
        return this.#balance;
    }

    getOperations() {
        return this.#operations;
    }
}

export default Wallet;
