import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    number: "",         // Current number input
    calculation: "",    // Keep track of the whole calculation input
    display: "0",        // For display 
    operand: "",        // Which calculation to perform
    result: "0",          // Result of the calculation
}

export const calculatorSlice = createSlice ({
    name: 'calculator',
    initialState,
    reducers: {
        addNumber: (state, action) => {
            state.number += action.payload;
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
            state.display = "0"
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

export const { allClear, addNumber, clearNumber, addToDisplay, clearDisplay, addToCalculation, removeFromCalculation, clearCalculation, chooseOperand, clearOperand, compute, clearCompute } = calculatorSlice.actions;

export const selectCalculation = (state) => state.calculator.calculation;
export const selectOperand = (state) => state.calculator.operand;
export const selectResult = (state) => state.calculator.result;
export const selectNumber = (state) => state.calculator.number;
export const selectDisplay = (state) => state.calculator.display;

export const checkANS = (result) => (dispatch, getState) => {
    dispatch(removeFromCalculation(result.toString()));
}

export const checkDelete = () => (dispatch, getState) => {
    const calculation = selectCalculation(getState());
    dispatch(clearDisplay());

    // if there is nothing to delete -> ignore it
    if (calculation.length === 0) {
        dispatch(clearNumber());
        dispatch(clearOperand());
        dispatch(clearDisplay());
        console.log("Cannot delete")
        return
    }
    
    let lastLetter = calculation[calculation.length-1];
    let newCalculation = "";
    let regex = /\D/;

    if (lastLetter === ".") {
        newCalculation= calculation.slice(0, -1);
        dispatch(removeFromCalculation(newCalculation))
        return
    }

    if (regex.test(lastLetter)) {
        newCalculation= calculation.slice(0, -3);
        console.log("last digit is not number and new calculation:", newCalculation)
        dispatch(clearOperand())
        dispatch(removeFromCalculation(newCalculation))
    } else {
        newCalculation= calculation.slice(0, -1);
        console.log("last digit is number and new calculation:", newCalculation)
        dispatch(removeFromCalculation(newCalculation))
    }
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
    const number = selectNumber(getState());
    const calculation = selectCalculation(getState());
    dispatch(clearDisplay());

    if (calculation.length > 53) {
        console.log("Too many inputs for the display")
        return;
    }
    // Check zero
    // if zero is first input  -> ignore it
    if (input ==="0" && number.length === 0) {
        console.log("do not add leading zeros")
        return
    } 
    // Check for period
    // If period is first input -> add zero before it
    if (input === "." && number === "") {
        dispatch(addNumber("0."));
        dispatch(addToCalculation("0."))
        return
    }
    // if period is already added -> ignore input
    if (input === "." && number.includes(".")) {
        console.log("cannot add second period");
    } else {
        dispatch(addNumber(input));
        dispatch(addToCalculation(input))
    }
}

export const calculateResult = () => (dispatch, getState) => {
    const calculation = selectCalculation(getState());
    if (calculation.length === 0) {
        return
    }
    const regex = /[x÷+-]/g
    let numbers = []
    const operand = selectOperand(getState());
    const inputs = calculation.split(regex);
    inputs.forEach(item => numbers.push(parseFloat(item)));

    let result = 0.0;
    switch (operand) {
        case "+":
            result = numbers[0] + numbers[1];
            break;
        case "-":
            result = numbers[0] - numbers[1];
            break;
        case "x":
            result = numbers[0] * numbers[1];
            break;
        case "÷":
            result = numbers[0] / numbers[1];
            break;
        default:
            break;
    }
    dispatch(addToDisplay(calculation));
    dispatch(clearCalculation());
    dispatch(clearNumber());
    dispatch(clearOperand());
    dispatch(compute(result));
}

export default calculatorSlice.reducer;