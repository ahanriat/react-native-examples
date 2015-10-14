const React = require('react-native');

const {
  StyleSheet,
  View,
  Component,
  Text,
} = React;

const blue = 'rgba(66, 133, 244, 1)';
const red = 'rgba(222, 62, 53, 1)';
const yellow = 'rgba(247, 194, 35, 1)';
const green = 'rgba(27, 154, 89, 1)';

const styles = StyleSheet.create({
});

class Spinner extends Component {

  render() {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

}

module.exports = Spinner;
