/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  View,
} from 'react-native';
import { CalculadoraScreen } from './presentation/screens/CalculadoraScreen';
import { appTheme } from './config/theme/app-theme';

export const App = () => {

  return (
    <View style={appTheme.background}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'black'}
      />
      <CalculadoraScreen />
    </View>
  );
}
