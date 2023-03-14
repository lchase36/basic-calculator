let firstNumString = '';
let secondNumString = '';
let firstNumVal = 0;
let secondNumVal = 0;
let pendingOperation = '';

const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const screen = document.querySelector('#screen');
const posneg = document.querySelector('#posneg');

function updateScreen(value) {
	if (value === '') {
		screen.textContent = 0;
	} else {
	screen.textContent = value;
	}
}

function convertInputs() {
	firstNumVal = parseFloat(firstNumString);
	secondNumVal = parseFloat(secondNumString);
}

function hasDecimal(str) {
	return str.includes('.');
}

function getDigit() {
	let text = this.textContent;
	if (pendingOperation === '') {
		if (hasDecimal(firstNumString) && text === '.') return;
		firstNumString += text;
		updateScreen(firstNumString);
	} else {
		if (hasDecimal(secondNumString)) return;
		secondNumString += text;
		updateScreen(secondNumString);
	}
}

function convertSign() {
	console.log('click!');
	if (pendingOperation === '') {
		if(firstNumString.includes('-')) {
			firstNumString = firstNumString.replace('-','');
		} else {
			firstNumString = '-' + firstNumString;
		}
		updateScreen(firstNumString);
	} else {
		if(secondNumString.includes('-')) {
			secondNumString = secondNumString.replace('-','');
		} else {
			secondNumString = '-' + secondNumString;
		}
		updateScreen(secondNumString);
	}
	console.table({firstNumString, secondNumString});
}


function doOperation() {
	let tempOperation = this.textContent;
	if (tempOperation === 'AC') {
		firstNumString = '';
		secondNumString = '';
		operationSelection = '';
	} else {
		convertInputs();
		switch(pendingOperation) {
			case '%':
				firstNumString = String(firstNumVal % secondNumVal);
				break;
			case '/':
				if (secondNumVal === 0) {
					firstNumString = 'ERROR';
				} else {
				firstNumString = String(firstNumVal / secondNumVal);
				}
				break;
			case '*':
				firstNumString = String(firstNumVal * secondNumVal);
				break;
			case '-':
				firstNumString = String(firstNumVal - secondNumVal);
				break;
			case '+':
				firstNumString = String(firstNumVal + secondNumVal);
				break;
		}
		if (tempOperation === '=') {
			pendingOperation = '';
			} else {
				pendingOperation = tempOperation;
			}
	}
	secondNumString = '';
	updateScreen(firstNumString);
	console.table({
		firstNumString,
		secondNumString,
		firstNumVal,
		secondNumVal,
		pendingOperation,
		tempOperation,
	});
}

digits.forEach((digit) => {
	digit.addEventListener('click', getDigit);
});

operators.forEach((operator) => {
	operator.addEventListener('click', doOperation);
});

posneg.addEventListener('click', convertSign);