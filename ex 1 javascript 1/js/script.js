
// ex 26 js 1

let month = 1;
let rent = 3000;
let debt = 0;
let gift = false
let salary = parseInt(prompt(`enter salary this month`));
let BalanceCopy;


let balance = salary * 2;

if (balance >= rent) {
    balance = balance - rent;
}
else { debt = rent; }

month++
salary = salary / 2
balance = balance + salary

if (debt) {
    if (balance >= debt) {
        balance = balance - debt
        debt = 0
    }
}
if (balance >= rent + 200) {
    balance = balance - rent - 200
}
else { debt = debt + rent + 200 }
balance = balance - 500
month++
BalanceCopy = balance
balance = 0
if (BalanceCopy < 0) gift = true 
console.log(month)
console.log(Math.trunc(BalanceCopy))
console.log(debt)
console.log(gift)

