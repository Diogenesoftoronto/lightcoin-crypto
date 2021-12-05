
class Account {


  constructor(account) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.account.balance = 0;
    this.account = account;
    this.account.transactions = [];
    }
  get accountBalance() {
    // Calculate the balance using the transaction objects.
    const withdrawls = this.account.transactions.map(function (transaction) {
      if (this.account.transaction.type === 'withdrawl') {
        return this.account.transaction;}
     })

    const deposits = this.account.transactions.map(function (transaction) {
      if (this.account.transaction.type === 'deposit') {
        return this.account.transaction;}
      })

    if (deposits.length < 0) {
      this.account.balance = this.account.balance - withdrawls.reduce(function (acc, withdrawl) {
        return acc + withdrawl;
      });
    }
    const withdrawl = withdrawls[Symbol.iterator]();

    const transactionBalances = deposits.map(function (deposit) {
      return deposit - withdrawl.next().value;})

    this.account.balance = transactionBalances.reduce((acc, transaction) => {
      return acc + this.account.transaction;
    });
    console.log(this.account.balance);
    return this.account.balance;
  }
  set addTransaction(transaction) {
    this.account.transactions.push(transaction);
  }
}

class Transaction extends Account {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  get commit() {
    // Keep track of the time of the transaction
    this.account.time = new Date();
    this.account.addTransaction = this;
  }

   set transfer (amount) {
    this.amount = amount;

  }

}
class Deposit extends Transaction {

  get commit (){
    super.commit
    this.account.balance += this.amount;
    this.account.type = "deposit";
    return this.account.balance;
  }

}

class Withdrawal extends Transaction {

  get commit() {

    this.account.balance -= this.amount;
    super.commit
    this.account.type = 'withdrawal';
    return this.account.balance;
  }

}






// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");


w1 = new Withdrawal(50, myAccount);
w1.commit;
console.log('Transaction 1:', w1.transactions[0]);
console.log(myAccount)

w2 = new Withdrawal(myAccount);
w2.transfer = 50;
w2.commit;
console.log('Transaction 2:', w2.transactions[0]);

console.log('Balance:', w2.accountBalance);
//
