import { Pressable, Text, View } from "react-native"
import { appTheme, colors } from "../../config/theme/app-theme"

interface Props {
    label: string;
    color?: string;
    dobleSize?: boolean;
    blackText?: boolean;
    onPress?: () => void;
}

export const CalculadoraBoton = ({
    label,
    color = colors.darkGray, 
    dobleSize = false,
    blackText = false,
    onPress,
}: Props) => {
  return (
    <View>
        <Pressable 
        onPress={() => onPress?.()}
        style={ ({pressed})  => ({
            ...appTheme.button,
            backgroundColor: color,
            width: (dobleSize) ? 180 : 80,
            opacity: (pressed) ? 0.8 : 1,
            })}>
          <Text style={{
            ...appTheme.buttonText,
            color: (blackText) ? 'black' : 'white',
          }}>{label}</Text>          
        </Pressable>
    </View>
  )
}


