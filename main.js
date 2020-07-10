const dsp = document.querySelector(".display");
let state = {
	firstOperand: 0,
	nextOperand: 0,
	operation: "", //holds the operator
	mode: 0, // 0 -> reading first operand, 1 -> reading second
};

function evaluate()
{
	let val = 0;
	if(state.operation == "+")
	{
		val = state.firstOperand + state.nextOperand;
	}
	else if(state.operation == "-")
	{
		val = state.firstOperand - state.nextOperand;
	}
	else if(state.operation == "*")
	{
		val = state.firstOperand * state.nextOperand;
	}
	else if(state.operation == "/")
	{
		val = state.firstOperand / state.nextOperand;
	}
	return val;
}

function putNumber(e)
{
	console.log(e.target.value);
	if(!state.mode)
	{
		let op1 = state.firstOperand.toString();
		state.firstOperand = Number(op1 + e.target.value);
		dsp.textContent = state.firstOperand.toString();
	}
	else
	{
		let op2 = state.nextOperand.toString();
		state.nextOperand = Number(op2 + e.target.value);
		dsp.textContent = state.nextOperand.toString();
	}
	console.log(state);
}

function setOpBin(e) // binary ops
{
	let op = e.target.textContent; //hacky
	if(!state.mode) //if operator was entererd while reading the  first operand
	{
		state.mode = 1; //read the next operand now
		state.operation = op;
	}
	else
	{
		if(state.operation != "")
		{
			let interValue = evaluate();
			state.firstOperand = interValue;
			state.nextOperand = 0;
			dsp.textContent = interValue;
		}
		state.operation = op;

	}
}

function setOpUn(e)
{
	return 0; //placeholder
}

function eqButton()
{
	if(state.operation != "")
	{
		let val = evaluate();
		state.firstOperand = val;
		state.nextOperand = 0;
		state.operation = "";
		dsp.textContent = val;
	}
	console.log(state);
}

function init()
{
	const numBtns = Array.from(document.querySelectorAll(".num-button"));
	numBtns.forEach(btn => btn.addEventListener("click", putNumber));
	const opBtnsBin = Array.from(document.querySelectorAll(".bin-operator")); // for binary operators
	opBtnsBin.forEach(btn => btn.addEventListener("click", setOpBin));
	const opBtnsUn = Array.from(document.querySelectorAll(".un-operator"));
	opBtnsUn.forEach(btn => btn.addEventListener("click", setOpUn));
	const equalBtn = document.getElementById("equals");
	equalBtn.addEventListener("click", eqButton);
}

init();