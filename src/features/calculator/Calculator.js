import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {   
    calculateResult,
    checkInput,
    checkOperand,
    checkDelete,
    selectResult,
    selectCalculation,
    selectDisplay,
    allClear,
    checkANS,
} from './calculatorSlice';
import styles from './Calculator.module.css';

export function Calculator() {
    const result = useSelector(selectResult);
    const calculation = useSelector(selectCalculation);
    const display = useSelector(selectDisplay);
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.display}>
                <p id="display" className={styles.calculation}>{calculation}</p>
                <h4 className={styles.result}>{result}</h4>
            </div>

            <div className={styles.buttons}>
                <button id="seven" className={styles.btn} onClick={() => dispatch(checkInput("7"))}>7</button>
                <button id="eight" className={styles.btn} onClick={() => dispatch(checkInput("8"))}>8</button>
                <button id="nine" className={styles.btn} onClick={() => dispatch(checkInput("9"))}>9</button>
                <button id="add" className={styles.btn} onClick={() => dispatch(checkInput("+"))}>+</button>

                <button id="four" className={styles.btn} onClick={() => dispatch(checkInput("4"))}>4</button>
                <button id="five" className={styles.btn} onClick={() => dispatch(checkInput("5"))}>5</button>
                <button id="six" className={styles.btn} onClick={() => dispatch(checkInput("6"))}>6</button>
                <button id="subtract" className={styles.btn} onClick={() => dispatch(checkInput("-"))}>-</button>

                <button id="one" className={styles.btn} onClick={() => dispatch(checkInput("1"))}>1</button>
                <button id="two" className={styles.btn} onClick={() => dispatch(checkInput("2"))}>2</button>
                <button id="three" className={styles.btn} onClick={() => dispatch(checkInput("3"))}>3</button>
                <button id="multiply" className={styles.btn} onClick={() => dispatch(checkInput("x"))}>x</button>

                <button id="zero" className={styles.btn} onClick={() => dispatch(checkInput("0"))}>0</button>
                <button id="decimal" className={styles.btn} onClick={() => dispatch(checkInput("."))}>.</button>
                <button className={styles.btn} onClick={() => dispatch(checkANS(result))}>ANS</button>
                <button id="divide" className={styles.btn} onClick={() => dispatch(checkInput("÷"))}>÷</button>
                
                <button className={`${styles.btn} ${styles.red}`} onClick={() => dispatch(checkDelete())}>DEL</button>
                <button id="clear" className={`${styles.btn} ${styles.red}`}onClick={() => dispatch(allClear())}>AC</button>
                <button id="equals" className={`${styles.btn} ${styles.spantwo}`} onClick={() => dispatch(calculateResult())}>=</button>
            </div>
            <div className={styles.footer}> Calculator by tonikv </div>
        </div>
    )
}