import Wallet from './Wallet';
const {
    incomeOperation,
    invalidOperation,
    outOperation,
} = require('../../../jest/mockedStructures');

const { WalletErrors } = require('../../js/models/enums');

describe('Wallet testing suite', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    it('First instance should be an empty wallet', () => {
        const wallet = new Wallet();
        expect(wallet.getBalance()).toBe(0);
        expect(wallet.getOperations().length).toBe(0);
    });

    it('addOperation: it works adding the correct balance and operations list', () => {
        const wallet = new Wallet();

        wallet.addOperation(incomeOperation);

        expect(wallet.getBalance()).toBe(incomeOperation.amount);
        expect(wallet.getOperations().length).toBe(1);
    });

    it('addOperation: it works removing the correct balance and operations list', () => {
        const wallet = new Wallet();

        wallet.addOperation(outOperation);

        expect(wallet.getBalance()).toBe(-outOperation.amount);
        expect(wallet.getOperations().length).toBe(1);
    });

    it('addOperation: INVALID_OPERATION', () => {
        const wallet = new Wallet();

        try {
            wallet.addOperation(invalidOperation);
        } catch (e) {
            expect(e.message).toBe(WalletErrors.INVALID_OPERATION);
        }
    });

    it('removeOperation: it works adding the correct balance and remove the operation from the list', () => {
        const savedWallet = {
            balance: 0,
            operations: [outOperation],
        };

        localStorage.setItem('wallet', JSON.stringify(savedWallet));

        const wallet = new Wallet();
        wallet.removeOperation(outOperation.date);

        expect(wallet.getBalance()).toBe(outOperation.amount);
        expect(wallet.getOperations().length).toBe(0);
    });

    it('removeOperation: it works removing the correct balance and remove the operation from the list', () => {
        const savedWallet = {
            balance: 1000,
            operations: [incomeOperation],
        };

        localStorage.setItem('wallet', JSON.stringify(savedWallet));

        const wallet = new Wallet();
        wallet.removeOperation(incomeOperation.date);

        expect(wallet.getBalance()).toBe(0);
        expect(wallet.getOperations().length).toBe(0);
    });

    it('removeOperation: return OPERATION_NOT_FOUND if the id is incorrect', () => {
        const savedWallet = {
            balance: 1000,
            operations: [incomeOperation],
        };

        localStorage.setItem('wallet', JSON.stringify(savedWallet));

        const wallet = new Wallet();
        try {
            wallet.removeOperation(4);
        } catch (e) {
            expect(e.message).toBe(WalletErrors.OPERATION_NOT_FOUND);
        }
    });

    it('findOperation: it works finding a correct if a correct description', () => {
        const wallet = new Wallet();

        wallet.addOperation(incomeOperation);

        const searchValue = incomeOperation.description.substring(0, 2);
        const operationsFound = wallet.findOperation(searchValue);

        expect(operationsFound.length).toBe(1);
    });
    it('saveWallet: it works adding a new operation', () => {
        const wallet = new Wallet();

        wallet.addOperation(incomeOperation);

        const savedWallet = localStorage.getItem('wallet');
        expect(JSON.parse(savedWallet)).toEqual({
            balance: wallet.getBalance(),
            operations: wallet.getOperations(),
        });
    });
});
