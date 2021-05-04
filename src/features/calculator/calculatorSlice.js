import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    current: "",        // Current number input
    previous: "",       // Previous input mostly from input validation
    calculation: "",    // Keep track of the whole calculation input       
    result: "",         // Result of the calculation      
}

export const calculatorSlice = createSlice ({
    name: 'calculator',
    initialState,
    reducers: {
        appendCurrent: (state, action) => {
            state.current += action.payload;
        },
        setCurrent: (state, action) => {
            state.current = action.payload;
        },
        clearCurrent: (state) => {
            state.current = "";
        },
        setPrevious: (state, action) => {
            state.previous = action.payload;
        },
        appendCalculation: (state, action) => {
            state.calculation += action.payload;
        },
        setCalculation: (state, action) => {
            state.calculation = action.payload;
        },
        clearCalculation: (state) => {
            state.calculation = "";
        },
        allClear: (state) => {
            state.current = "";
            state.previous = "";
            state.calculation = "";
            state.result = "0";
        },
        setResult: (state, action) => {
            state.result = action.payload;
        },
        clearResult: (state) => {
            state.result = "";
        },
    }
})

export const { appendCurrent, setCurrent, clearCurrent, setPrevious, appendCalculation, setCalculation, clearCalculation, allClear, setResult, clearResult } = calculatorSlice.actions;

export const selectCalculation = (state) => state.calculator.calculation;
export const selectResult = (state) => state.calculator.result;
export const selectCurrent = (state) => state.calculator.current;
export const selectPrevious = (state) => state.calculator.previous;

// Handles delete function of the input
export const checkDelete = () => (dispatch, getState) => {
    const calculation = selectCalculation(getState());
    const current = selectCalculation(getState());

    // if there is nothing to delete -> ignore it
    if (calculation.length === 0) {
        return
    }

    if (current.length !== 0) {
        const newCurrent = current.slice(0, -1);
        dispatch(setCurrent(newCurrent))
    }
    
    const newCalculation = calculation.slice(0, -1);
    dispatch(setCalculation(newCalculation))
}

// Handles input validation for calculator 
export const checkInput = (input) => (dispatch, getState) => {
    const current = selectCurrent(getState());
    const previous = selectPrevious(getState());
    const calculation = selectCalculation(getState());
    const regex = /[*/+-]/

    // prevent multiple zeroes in the beginning
    if (previous === "0" && current.length === 1 && input === "0") {
        return;
    }

    // prevent multiple decimals in one number
    if (input === "." && current.includes(".")) {
        return;
    }

    // prevent multiple operands
    if (regex.test(input) && regex.test(previous) && input !== "-") {
        return;
    }   

    // prevent too many negative signs
    if (previous === "-" && input === "-" ) {
        const twoDown = calculation[calculation.length-2];
        // Triple negative
        if(twoDown === "-") {
            return;
        }
        // Cannot start with --
        if(calculation.length === 1) {
            return;
        }
    }

    // if input is operand -> start inputting new current number else append to current
    if (regex.test(input)) {
        dispatch(clearCurrent());
    } else {
        dispatch(appendCurrent(input));
    }

    dispatch(appendCalculation(input));
    dispatch(setPrevious(input));
}

// Handles calculation 
export const calculateResult = () => (dispatch, getState) => {
    const regex = /[*/+-]/g
    const regexDouble = /--|\+-|\*-|\/-|[*/+-]/g
    let fixFirst = false;
    let calculation = selectCalculation(getState());

    // If there is not calculation --> Leave
    if (calculation.length === 0) {
        return
    }

    // Clean operators from the end 
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

    // Check for inputs like 25x-5 and clean away negative sign. Negative numbers are handled in switch statement
    let cleanedCalc = calculation.replace(/--/g, "-");
    cleanedCalc = cleanedCalc.replace(/\+-/g, "+");
    cleanedCalc = cleanedCalc.replace(/\*-/g, "*");
    cleanedCalc = cleanedCalc.replace(/\/-/g, "/");

    // Get numbers and operands from calculation string
    const inputs = cleanedCalc.split(regex);
    const operators = calculation.match(regexDouble);
    // if only one number on calculation -> set it to result
    if(inputs.length === 1) {
        dispatch(setResult(inputs[0]));
        return
    }
    
    // Parse string values to numbers 
    let numbers = []
    inputs.forEach(item => numbers.push(parseFloat(item)));
    let first = numbers[0];
    // If -negative sign at start fix firstnumber to negative
    if (fixFirst) {
        first = -first;
    }

    // Loop throw all the numbers and perform calculation according to operator --> set it to result
    let calc = 0;
    for (let i = 1; i < numbers.length; i++) {
        let second = numbers[i];
        let operand = operators[i - 1];
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
            case "*":
                calc *= second;
                first = calc;
                break;
            case "/":
                calc /= second;
                first = calc;
                break;
            // These cases handle negative values inputted after operators 
            case "+-":
                calc += -second;
                first = calc;
                break;
            case "--":
                calc -= -second;
                first = calc;
                break;
            case "*-":
                calc *= -second;
                first = calc;
                break;
            case "/-":
                calc /= -second;
                first = calc;
                break;
            default:
                break;
            
        }
    }
    if (calc % 1 !== 0) {
        calc = calc.toFixed(4);
    }
    
    dispatch(setResult(calc.toString()));
}

export default calculatorSlice.reducer;