import { StyleSheet } from "react-native";

export const colors = {
    darkGray: '#2D2D2D',
    lightGray: '#9b9b9b',
    orange: '#F99427',

    textPrimary: '#FFFFFF',
    textSecondary: '#666666',
    background: '#000000',
}

export const appTheme = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.background,
    },
    calculadoraContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-end',
    },
    mainResult: {
      color: colors.textPrimary,
      fontSize: 70,
      textAlign: 'right',
      marginBottom: 10,
      fontWeight: '400',
      },
    secondaryResult: {
      color: colors.textSecondary,
      fontSize: 30,
      textAlign: 'right',
      marginBottom: 10,
      fontWeight: '300',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 18,
      paddingHorizontal: 10,
    },
    button: {
      width: 80,
      height: 80,
      borderRadius: 100,
      backgroundColor: colors.darkGray,
      justifyContent: 'center',
      marginHorizontal: 10,
    },
    buttonText: {
      textAlign: 'center',
      color: colors.textPrimary,
      fontSize: 40,
      fontWeight: '500',
    }
});