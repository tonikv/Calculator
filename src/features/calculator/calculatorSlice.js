import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    number: "",         // Current number input
    calculation: "",    // Keep track of the whole calculation input
    display: "",        // For display 
    operand: "",        // Which calculation to perform
    result: "",         // Result of the calculation
    previous: "",       
}

export const calculatorSlice = createSlice ({
    name: 'calculator',
    initialState,
    reducers: {
        addNumber: (state, action) => {
            state.number += action.payload;
        },
        addPrevious: (state, action) => {
            state.previous = action.payload;
        },
        clearNumber: (state) => {
            state.number = "";
        },
        addToCalculation: (state, action) => {
            state.calculation += action.payload;
        },
        removeFromCalculation: (state, action) => {
            state.calculation = action.payload;
        },
        clearCalculation: (state) => {
            state.calculation = "";
        },
        allClear: (state) => {
            state.number = "";
            state.calculation = "";
            state.display = "0";
            state.operand = "";
            state.result = "0";
        },
        addToDisplay: (state, action) => {
            state.display = action.payload;
        },
        clearDisplay: (state) => {
            state.display = ""
        },
        chooseOperand: (state, action) => {
            state.operand = action.payload;
        },
        clearOperand: (state) => {
            state.operand = ""
        },
        compute: (state, action) => {
            state.result = action.payload;
        },
        clearCompute: (state) => {
            state.result = "";
        },
    }
})

export const { allClear, addNumber, addPrevious, clearNumber, addToDisplay, clearDisplay, addToCalculation, removeFromCalculation, clearCalculation, chooseOperand, clearOperand, compute, clearCompute } = calculatorSlice.actions;

export const selectCalculation = (state) => state.calculator.calculation;
export const selectOperand = (state) => state.calculator.operand;
export const selectResult = (state) => state.calculator.result;
export const selectNumber = (state) => state.calculator.number;
export const selectDisplay = (state) => state.calculator.display;
export const selectPrevious = (state) => state.calculator.previous;

export const checkANS = (result) => (dispatch, getState) => {
    dispatch(removeFromCalculation(result.toString()));
}

export const checkDelete = () => (dispatch, getState) => {
    const calculation = selectCalculation(getState());

    // if there is nothing to delete -> ignore it
    if (calculation.length === 0) {
        console.log("Cannot delete")
        return
    }
    
    let newCalculation = calculation.slice(0, -1);
    dispatch(removeFromCalculation(newCalculation))
}

export const checkOperand = (input) => (dispatch, getState) => {
    const operand = selectOperand(getState());
    const calculation = selectCalculation(getState());
    // if operand is first input -> ignore it
    if (calculation.length === 0) {
        console.log("input number first")
        return
    }
    
    if (operand.length === 0) {
        dispatch(chooseOperand(input))
        dispatch(addToCalculation(" " + input + " "))
        dispatch(clearNumber());
    }
}

export const checkInput = (input) => (dispatch, getState) => {
    const current = selectNumber(getState());
    const previous = selectPrevious(getState());
    const calculation = selectCalculation(getState());
    const regex = /[x÷+-]/

    if (previous === "0" && current.length === 1 && input === "0") {
        console.log("prevent multiple zeroes in the beginning");
        return;
    }

    if (input === "." && current.includes(".")) {
        console.log("prevent multiple decimals in one number");
        return;
    }

    if (regex.test(input) && regex.test(previous) && input !== "-") {
        console.log("only one operand");
        return;
    }   

    if (previous === "-" && input === "-" ) {
        const twoDown = calculation[calculation.length-2];
        if(twoDown === "-") {
            console.log("Prevent triple ---");
            return;
        }
        if(calculation.length === 1) {
            console.log("Cannot start with --");
            return;
        }
    }


    if (regex.test(input)) {
        dispatch(clearNumber());
    } else {
        dispatch(addNumber(input));
    }

    dispatch(addToCalculation(input));
    dispatch(addPrevious(input));
}

export const calculateResult = () => (dispatch, getState) => {
    const regex = /[x÷+-]/g
    const regexDouble = /--|\+-|x-|÷-|[x÷+-]/g
    let fixFirst = false;
    let calculation = selectCalculation(getState());

    // If there is not calculation --> Leave
    if (calculation.length === 0) {
        return
    }

    // Clean operands from the end 
    const lastInCalculation = calculation[calculation.length-1];
    if(lastInCalculation.match(regex)) {
        calculation = calculation.slice(0, -1);
    }

    //Check first number for negative
    const firstInCalculation = calculation[0];
    if (firstInCalculation === "-") {
        calculation = calculation.substring(1);
        fixFirst = true;
    }

    // Extract operands from calculation
    const operands = calculation.match(regexDouble);

    // Check for inputs like 25x-5 and clean away negative sign. Negative numbers are handled with operands
    let cleanedCalc = calculation.replace(/--/g, "-");
    cleanedCalc = cleanedCalc.replace(/\+-/g, "+");
    cleanedCalc = cleanedCalc.replace(/x-/g, "x");
    cleanedCalc = cleanedCalc.replace(/÷-/g, "÷");

    let numbers = []
    const inputs = cleanedCalc.split(regex);

    if(inputs.length === 1) {
        dispatch(compute(inputs[0]));
        return
    }
 
    inputs.forEach(item => numbers.push(parseFloat(item)));

    let first = numbers[0];
    // If -negative sign at start fix firstnumber to negative
    if (fixFirst) {
        first = -first;
    }
    let calc = 0;

    for (let i = 1; i < numbers.length; i++) {
        let second = numbers[i];
        let operand = operands[i - 1];
        calc = first;

        switch (operand){
            case "+":
                calc += second;
                first = calc;
                break;
            case "-":
                calc -= second;
                first = calc;
                break;
            case "x":
                calc *= second;
                first = calc;
                break;
            case "÷":
                calc /= second;
                first = calc;
                break;
            case "+-":
                calc += -second;
                first = calc;
                break;
            case "--":
                calc -= -second;
                first = calc;
                break;
            case "x-":
                calc *= -second;
                first = calc;
                break;
            case "÷-":
                calc /= -second;
                first = calc;
                break;
            default:
                break;
            
        }
    }
    if (calc % 1 !== 0) {
        calc = calc.toFixed(2);
    }
    
    dispatch(compute(calc.toString()));
}

export default calculatorSlice.reducer;