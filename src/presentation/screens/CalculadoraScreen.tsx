import { View, Text, Pressable } from "react-native"
import { appTheme, colors } from "../../config/theme/app-theme"
import { CalculadoraBoton } from "../components/CalculadoraBoton"
import { useCalculator } from "../hooks/useCalculator"

export const CalculadoraScreen = () => {

const {
  formula,
  number,
  previousNumber,
  buildNumber,
  clean,
  cleanLastNumber,
  toggleSign,
  calculate,
  sum,
  subtraction,
  multiplication,
  division,
} = useCalculator()

  return (
    <View style={appTheme.calculadoraContainer}>
      <View style={{paddingHorizontal: 20, paddingBottom: 20}}>    
        <Text
         adjustsFontSizeToFit
         numberOfLines={1}
         style={appTheme.mainResult}>{formula}</Text>
        <Text
         adjustsFontSizeToFit
         numberOfLines={1} 
        style={appTheme.secondaryResult}>
          {(previousNumber !== '0') && (previousNumber)}</Text>
      </View>
      <View style={appTheme.row}>
        <CalculadoraBoton onPress={() => clean()} label="AC" color={colors.lightGray} blackText />
        <CalculadoraBoton onPress={() => toggleSign()} label="+/-" color={colors.lightGray} blackText />
        <CalculadoraBoton onPress={() => cleanLastNumber()} label="del" color={colors.lightGray} blackText />
        <CalculadoraBoton onPress={() => division()} label="÷" color={colors.orange} />
      </View>
      <View style={appTheme.row}>
        <CalculadoraBoton onPress={() => buildNumber('7')} label="7"  />
        <CalculadoraBoton onPress={() => buildNumber('8')} label="8"  />
        <CalculadoraBoton onPress={() => buildNumber('9')} label="9"  />
        <CalculadoraBoton onPress={() => multiplication()} label="x" color={colors.orange} />
      </View>
      <View style={appTheme.row}>
        <CalculadoraBoton onPress={() => buildNumber('4')} label="4"  />
        <CalculadoraBoton onPress={() => buildNumber('5')} label="5"  />
        <CalculadoraBoton onPress={() => buildNumber('6')} label="6"  />
        <CalculadoraBoton onPress={() => subtraction()} label="-" color={colors.orange} />
      </View>
      <View style={appTheme.row}>
        <CalculadoraBoton onPress={() => buildNumber('1')} label="1"  />
        <CalculadoraBoton onPress={() => buildNumber('2')} label="2"  />
        <CalculadoraBoton onPress={() => buildNumber('3')} label="3"  />
        <CalculadoraBoton onPress={() => sum()} label="+" color={colors.orange} />
      </View>
      <View style={appTheme.row}>
        <CalculadoraBoton onPress={() => buildNumber('0')} label="0" dobleSize />
        <CalculadoraBoton onPress={() => buildNumber('.')} label="."  />
        <CalculadoraBoton onPress={() => calculate()} label="=" color={colors.orange} />
      </View>

    </View>
  )
}
