import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {   
    calculateResult,
    checkInput,
    checkOperand,
    selectNumber,
    selectResult,
    selectCalculation,
    selectDisplay,
} from './calculatorSlice';
import styles from './Calculator.module.css';

export function Calculator() {
    const number = useSelector(selectNumber);
    const result = useSelector(selectResult);
    const calculation = useSelector(selectCalculation);
    const display = useSelector(selectDisplay);
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.display}>
                <p className={styles.calculation}>{calculation !== "" ? calculation : display}</p>
                <h4 className={styles.result}>{result}</h4>
            </div>

            <div className={styles.buttons}>
                <button className={styles.btn} onClick={() => dispatch(checkInput("7"))}>7</button>
                <button className={styles.btn} onClick={() => dispatch(checkInput("8"))}>8</button>
                <button className={styles.btn} onClick={() => dispatch(checkInput("9"))}>9</button>
                <button className={styles.operand} onClick={() => dispatch(checkOperand("+"))}>+</button>

                <button className={styles.btn} onClick={() => dispatch(checkInput("4"))}>4</button>
                <button className={styles.btn} onClick={() => dispatch(checkInput("5"))}>5</button>
                <button className={styles.btn} onClick={() => dispatch(checkInput("6"))}>6</button>
                <button className={styles.operand} onClick={() => dispatch(checkOperand("-"))}>-</button>

                <button className={styles.btn} onClick={() => dispatch(checkInput("1"))}>1</button>
                <button className={styles.btn} onClick={() => dispatch(checkInput("2"))}>2</button>
                <button className={styles.btn} onClick={() => dispatch(checkInput("3"))}>3</button>
                <button className={styles.operand} onClick={() => dispatch(checkOperand("x"))}>x</button>

                <button className={styles.btn} onClick={() => dispatch(checkInput("0"))}>0</button>
                <button className={styles.btn} onClick={() => dispatch(checkInput("."))}>.</button>
                <button className={styles.btn}></button>
                <button className={styles.operand} onClick={() => dispatch(checkOperand("%"))}>%</button>

                <button className={styles.operand} onClick={() => dispatch(calculateResult())}>=</button>
            </div>
        </div>
    )
}