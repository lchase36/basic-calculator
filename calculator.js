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
		firstNumString = firstNumString.slice(0,10) 
		firstNumString += text;
		updateScreen(firstNumString);
	} else {
		if (hasDecimal(secondNumString) && text === '.') return;
		secondNumString = secondNumString.slice(0,10) 
		secondNumString += text;
		updateScreen(secondNumString);
	}
}

function convertSign() {
	if (pendingOperation === '') {
		if(firstNumString.includes('-')) {
			firstNumString = firstNumString.replace('-','');
		} else {
			firstNumString = '-' + firstNumString.slice(0,10);
		}
		updateScreen(firstNumString);
	} else {
		if(secondNumString.includes('-')) {
			secondNumString = secondNumString.replace('-','');
		} else {
			secondNumString = '-' + secondNumString.slice(0,10);
		}
		updateScreen(secondNumString);
	}
}

function roundLongResult(resultString) {
	if (resultString.length <= 11) return resultString;
	
	let resultArray = resultString.split('.');
	console.log(resultArray[0].length)
	if (resultArray.length === 2 && resultArray[0].length <= 9) {
		//Identify decimal place to round
		let zeroCount = 10 - resultArray[0].length;
		return Math.round(parseFloat(resultString)*10**(zeroCount))/10**(zeroCount);
	} else {
		return parseFloat(resultString).toExponential(3);
	}
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
	updateScreen(roundLongResult(firstNumString));
}

digits.forEach((digit) => {
	digit.addEventListener('click', getDigit);
});

operators.forEach((operator) => {
	operator.addEventListener('click', doOperation);
});

posneg.addEventListener('click', convertSign);