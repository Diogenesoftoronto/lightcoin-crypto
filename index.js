
class Account {


  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.balance = 0;
    this.transactions = [];
    }
  get accountBalance() {
    // Calculate the balance using the transaction objects.
    const withdrawls = this.transactions.map(function (transaction) {
      if (transaction.type === 'withdrawl') {
        return transaction.amount;}
     })

    const deposits = this.transactions.map(function (transaction) {
      if (transaction.type === 'deposit') {
        return transaction.amount;}
      })

    if (deposits.length < 0) {
      this.balance = this.balance - withdrawls.reduce(function (acc, withdrawl) {
        return acc + withdrawl;
      });
    }
    const withdrawl = withdrawls[Symbol.iterator]();

    const transactionBalances = deposits.map(function (deposit) {
      return deposit - withdrawl.next().value;})

    this.balance = transactionBalances.reduce((acc, transaction) => {
      return acc + transaction.amount;
    });
    console.log(this.balance);
    return this.balance;
  }
  set addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction extends Account {
  get commit() {
    // Keep track of the time of the transaction
    this.time = new Date();
    this.addTransaction = this;
  }

   set transfer (amount) {
    this.amount = amount;

  }

}
class Deposit extends Transaction {

  get commit (){
    super.commit
    this.balance += this.amount;
    this.type = "deposit";
    return this.balance;
  }

}

class Withdrawal extends Transaction {

  get commit() {

    this.balance -= this.amount;
    super.commit
    this.type = 'withdrawal';
    return this.balance;
  }

}






// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = "snow-patrol";

w1 = new Withdrawal(myAccount);
w1.transfer = 50;
w1.commit;
console.log('Transaction 1:', w1.transactions[0]);
console.log(myAccount)

w2 = new Withdrawal(myAccount);
w2.transfer = 50;
w2.commit;
console.log('Transaction 2:', w2.transactions[0]);

console.log('Balance:', w2.accountBalance);
// 
