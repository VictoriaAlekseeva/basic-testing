import { BankAccount, getBankAccount } from '.';

describe('BankAccount', () => {
  let account: BankAccount;
  const initialBalance = 1000;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(1001)).toThrowError(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account2 = getBankAccount(200);
    expect(() => account.transfer(1001, account2)).toThrowError(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(999, account)).toThrowError(
      `Transfer failed`,
    );
  });

  test('should deposit money', () => {
    account.deposit(500);
    expect(account.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    account.withdraw(500);
    expect(account.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const account2 = getBankAccount(2000);
    account.transfer(50, account2);
    expect(account.getBalance()).toBe(950);
    expect(account2.getBalance()).toBe(2050);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account.fetchBalance();
    if (balance !== null) expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(150);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(150);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      'Synchronization failed',
    );
  });
});
