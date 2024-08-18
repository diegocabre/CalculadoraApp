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
    const [result, setResult] = useState<number | null>(null); // Para mostrar el resultado mientras se construye la fórmula
    const lastOperator = useRef<Operator | undefined>(undefined);

    // Actualiza la fórmula al cambiar el número o el operador
    useEffect(() => {
        if (lastOperator.current) {
            setFormula(`${previousNumber} ${lastOperator.current} ${number}`);
            const calculatedResult = calculateSubResult();
            setResult(calculatedResult); // Actualizar el resultado en tiempo real
        } else {
            setFormula(number);
            setResult(parseFloat(number)); // Mostrar el número actual como resultado
        }
    }, [number, previousNumber]);

    const clean = () => {
        setNumber('0');
        setPreviousNumber('0');
        lastOperator.current = undefined;
        setFormula('');
        setResult(null);
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
        calculateSubResult();
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

        const finalResult = calculateSubResult();
        setFormula(`${previousNumber} ${lastOperator.current} ${number} = ${finalResult}`);
        setNumber(finalResult.toString());
        setPreviousNumber('0');
        lastOperator.current = undefined;
        setResult(null); // Limpia el resultado en tiempo real una vez que se muestra el final
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
                return num;
        }
    }

    return {
        number,
        previousNumber,
        formula,
        result, // El resultado en tiempo real
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
