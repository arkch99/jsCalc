const dsp = document.querySelector(".display");
let state = {
	firstOperand: "",
	nextOperand: "",
	operation: "", //holds the operator
	mode: 0, // 0 -> reading first operand, 1 -> reading second
	displayVal: 0, //0 => first op, 1 => 2nd op
};

function evaluate()
{
	let val = 0;
	if(state.operation == "+")
	{
		val = Number(state.firstOperand) + Number(state.nextOperand);
	}
	else if(state.operation == "-")
	{
		val = Number(state.firstOperand) - Number(state.nextOperand);
	}
	else if(state.operation == "*")
	{
		val = Number(state.firstOperand) * Number(state.nextOperand);
	}
	else if(state.operation == "/")
	{
		val = Number(state.firstOperand) / Number(state.nextOperand);
	}
	return val;
}

function putNumber(e)
{
	console.log(e.target.value);
	if(!state.mode)
	{
		let op1 = state.firstOperand;
		state.firstOperand = (op1 + e.target.value).toString();
		dsp.textContent = state.firstOperand;
	}
	else if(state.mode == 1)
	{
		let op2 = state.nextOperand;
		state.nextOperand = (op2 + e.target.value).toString();
		dsp.textContent = state.nextOperand;
		state.displayVal = 1;
	}
	else if(state.mode == 2) // number entered while displaying answer
	{
		state.firstOperand = e.target.value.toString();
		state.nextOperand = "";
		state.mode = 0;
		state.displayVal = 0;
		dsp.textContent = state.firstOperand;
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
	else if(state.mode != 3)
	{
		if(state.operation != "")
		{
			let interValue = evaluate();
			state.firstOperand = interValue.toString();
			state.nextOperand = "";
			state.displayVal = 1;
			dsp.textContent = interValue;
		}
		state.operation = op;

	}
}

function setOpUn(e)
{
	if(state.mode == 3)
	{
		return;
	}
	if(e.target.textContent == "+/-")
	{
		if(!state.displayVal) //if displaying first operand
		{
			state.firstOperand = (-Number(state.firstOperand)).toString();
			dsp.textContent = state.firstOperand;
		}
		else
		{
			state.nextOperand = (-Number(state.nextOperand)).toString();
			dsp.textContent = state.nextOperand;
		}
	}
	else
	{
		if(!state.displayVal)
		{
			state.firstOperand = Math.sqrt(Number(state.firstOperand));
			if(isNaN(state.firstOperand) || !isFinite(state.firstOperand))
			{
				raiseError();
				return;
			}
			dsp.textContent = state.firstOperand.toString();
			state.mode = 2;
		}
		else
		{
			state.nextOperand = Math.sqrt(Number(state.nextOperand));
			if(isNaN(state.nextOperand) || !isFinite(state.nextOperand))
			{
				raiseError();
				return;
			}
			dsp.textContent = state.nextOperand.toString();
			state.mode = 2;
		}
	}
}

function eqButton()
{
	if(state.operation != "")
	{
		let val = evaluate();
		//console.log(interValue);
		if(isNaN(val) || !isFinite(val))
		{
			raiseError();
			return;
		}
		state.firstOperand = val.toString();
		state.nextOperand = "";
		state.operation = "";
		state.displayVal = 0;
		dsp.textContent = val;
		state.mode = 2; //2 => displaying answer
	}
	else
	{
		dsp.textContent = 0;
	}
	console.log(state);
}

function acButton()
{
	dsp.textContent = "";
	state.firstOperand = "";
	state.nextOperand = "";
	state.operation = "";
	state.displayVal = 0;
	state.mode = 0;
}

function raiseError()
{
	dsp.textContent = "ERROR";
	state.mode = 3;
}

function decPt()
{
	if(dsp.textContent.indexOf(".") != -1 && state.mode != 2) //checks for multiple decimal pts; 2nd condition ensures that an error is not thrown if dispalyed value is the answer of an operation
	{
		raiseError();
		return;
	}
	if(!state.mode)
	{
		state.firstOperand += ".";
		dsp.textContent = state.firstOperand;
	}
	else if(state.mode == 1)
	{
		state.nextOperand += ".";
		dsp.textContent = state.nextOperand;
	}
	else if(state.mode == 2)
	{
		state.firstOperand = ".";
		state.nextOperand = "";
		state.mode = 0;
		state.displayVal = 0;
		dsp.textContent = state.firstOperand;
	}
}

function del()
{
	let orgDsp = dsp.textContent;
	if(state.mode != 3)
	{
		dsp.textContent = dsp.textContent.slice(0,-1);
	}
	if(dsp.textContent == "-")
	{
		dsp.textContent = "";
	}
	if(!state.mode)
	{
		state.firstOperand = dsp.textContent;
	}
	if(state.mode == 1)
	{
		if(orgDsp == "") //press delete when operator has been entered but not second operand
		{
			state.operation = "";
		}
		else
		{
			if(!state.displayVal) //press delete when displaying first operand
			{
				state.mode = 0;
				state.firstOperand = dsp.textContent;
			}
			else
			{
				state.nextOperand = dsp.textContent;
			}
		}
	}
	else if(state.mode == 2)
	{
		acButton();
	}
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
	const decPtBtn = document.getElementById("decimal-point");
	decPtBtn.addEventListener("click", decPt);
	const delBtn = document.getElementById("del");
	delBtn.addEventListener("click", del)
}

init();