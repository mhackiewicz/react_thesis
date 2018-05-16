import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import CompetitorsList from './CompetitorsList';
import Details from './Details';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

const RootStack = createStackNavigator(
  {
    Home: CompetitorsList,
    Details: Details
  },
  {
    initialRouteName: 'Home',
  }
);

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <RootStack />
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
