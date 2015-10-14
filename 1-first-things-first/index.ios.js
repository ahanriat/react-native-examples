const React  = require('react-native');

const white  = 'white';
const blue   = '#42AFE2';
const gray   = '#F0F2F4';
const red    = '#ED6C63';
const green  = '#97CD76';
const orange = '#F68B38';
const yellow = '#FCE473';
const purple = '#847AB9';

const {
  AppRegistry,
  Text,
  View,
  StyleSheet,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: white,
    fontWeight: '300',
  },
});

/**
* A basic example of React (Native) Component
**/
class FirstApp extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello Bdxio !!</Text>
      </View>
    );
  }

}

AppRegistry.registerComponent('rnBasics', () => FirstApp);
