import { useEffect, useRef, useState } from "react";

enum Operator {
    sum = '+',
    subtraction = '-',
    multiplication = 'x',
    division = '÷'
}

export const useCalculator = () => {
    const [formula, setFormula] = useState('');
    const [number, setNumber] = useState('0');
    const [previousNumber, setPreviousNumber] = useState('0');
    const lastOperator = useRef<Operator>();

    useEffect(() => {
        if (lastOperator.current) {
            setFormula(`${previousNumber} ${lastOperator.current} ${number}`);
        } else {
            setFormula(number);
        }
    }, [number, previousNumber]);

    const clean = () => {
        setNumber('0');
        setPreviousNumber('0');
        lastOperator.current = undefined;
        setFormula('');
    }

    const cleanLastNumber = () => {
        if (number.length > 1) {
            setNumber(number.slice(0, -1));
        } else {
            setNumber('0');
        }
    }

    const toggleSign = () => {
        setNumber(number.startsWith('-') ? number.slice(1) : `-${number}`);
    }

    const buildNumber = (textNumber: string) => {
        if (number.includes('.') && textNumber === '.') return;

        if (number === '0' && textNumber !== '.') {
            setNumber(textNumber);
        } else {
            setNumber(number + textNumber);
        }
    }

    const setLastNumber = () => {
        setPreviousNumber(number.endsWith('.') ? number.slice(0, -1) : number);
        setNumber('0');
    }

    const applyOperator = (operator: Operator) => {
        if (lastOperator.current) {
            const result = calculateSubResult();
            setPreviousNumber(result.toString());
            setNumber('0');
            setFormula(`${result} ${operator}`);
        } else {
            setLastNumber();
        }
        lastOperator.current = operator;
    }

    const calculate = () => {
        if (!lastOperator.current) return;

        const result = calculateSubResult();
        setFormula(`${previousNumber} ${lastOperator.current} ${number} = ${result}`);
        setNumber(result.toString());
        setPreviousNumber('0');
        lastOperator.current = undefined;
    }

    const calculateSubResult = (): number => {
        const num = parseFloat(previousNumber);
        const prev = parseFloat(number);

        if (isNaN(prev)) return num;

        switch (lastOperator.current) {
            case Operator.sum:
                return num + prev;
            case Operator.subtraction:
                return num - prev;
            case Operator.multiplication:
                return num * prev;
            case Operator.division:
                return num / prev;
            default:
                throw new Error('Operación no soportada');
        }
    }

    return {
        number,
        previousNumber,
        formula,
        buildNumber,
        clean,
        cleanLastNumber,
        toggleSign,
        sum: () => applyOperator(Operator.sum),
        subtraction: () => applyOperator(Operator.subtraction),
        multiplication: () => applyOperator(Operator.multiplication),
        division: () => applyOperator(Operator.division),
        calculate,
    }
}
