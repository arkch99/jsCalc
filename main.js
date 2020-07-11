const dsp = document.querySelector(".display");
let state = {
	firstOperand: 0,
	nextOperand: 0,
	operation: "", //holds the operator
	mode: 0, // 0 -> reading first operand, 1 -> reading second
	displayVal: 0, //0 => first op, 1 => 2nd op
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
	else if(state.mode == 1)
	{
		let op2 = state.nextOperand.toString();
		state.nextOperand = Number(op2 + e.target.value);
		dsp.textContent = state.nextOperand.toString();
		state.displayVal = 1;
	}
	else // number entered while displaying answer
	{
		state.firstOperand = Number(e.target.value);
		state.nextOperand = 0;
		state.mode = 0;
		state.displayVal = 0;
		dsp.textContent = state.firstOperand.toString();
	}
	console.log(state);
}

function setOpBin(e) // binary ops
{
	let op = e.target.textContent; //hacky
	if(state.mode == 2)
	{
		state.mode = 1;
	}
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
			state.displayVal = 1;
			dsp.textContent = interValue;
		}
		state.operation = op;

	}
}

function setOpUn(e)
{
	if(e.target.textContent == "+/-")
	{
		if(!state.displayVal) //if displaying first operand
		{
			state.firstOperand = -state.firstOperand;
			dsp.textContent = state.firstOperand;
		}
		else
		{
			state.nextOperand = -state.nextOperand;
			dsp.textContent = state.nextOperand;
		}
	}
	else
	{
		if(!state.displayVal)
		{
			state.firstOperand = Math.sqrt(state.firstOperand);
			dsp.textContent = state.firstOperand;
			state.mode = 2;
		}
		else
		{
			state.nextOperand = Math.sqrt(state.nextOperand);
			dsp.textContent = state.nextOperand;
			state.mode = 2;
		}
	}
}

function eqButton()
{
	if(state.operation != "")
	{
		let val = evaluate();
		state.firstOperand = val;
		state.nextOperand = 0;
		state.operation = "";
		state.displayVal = 0;
		dsp.textContent = val;
		state.mode = 2; //2 => displaying answer
	}
	console.log(state);
}

function acButton()
{
	dsp.textContent = "";
	state.firstOperand = 0;
	state.nextOperand = 0;
	state.operation = "";
	state.displayVal = 0;
	state.mode = 0;
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
	const clrBtn = document.getElementById("clear");
	clrBtn.addEventListener("click", acButton);
}

init();