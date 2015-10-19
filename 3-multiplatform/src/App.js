const React   = require('react-native');

// Just require the Spinner, the packager will do the tricks
const Spinner = require('./Spinner');


const white  = 'white';
const black  = 'black';
const blue   = '#42AFE2';
const gray   = '#F0F2F4';
const red    = '#ED6C63';
const green  = '#97CD76';
const orange = '#F68B38';
const yellow = '#FCE473';
const purple = '#847AB9';

const {
  StyleSheet,
  View,
  Component,
  Text,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: gray,
  },
  text: {
    fontSize: 10,
    color: black,
    fontWeight: '300',
    margin: 30,
  },
});

class AnimationDemo extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello Bdxio !!!!</Text>
        <Spinner size={'large'}/>
      </View>
    );
  }

}

module.exports = AnimationDemo;
