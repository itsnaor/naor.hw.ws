const number = 123;
let tempNum = number;
let reverseNum = 0;
let rest = 0;
let digit = 0;

while (tempNum > 0) {
    let digit = tempNum % 10
    tempNum /= 10;

    rest = tempNum % 1;

    tempNum -= rest;

    reverseNum = reverseNum *10 + digit;

    console.log(reverseNum)

}
