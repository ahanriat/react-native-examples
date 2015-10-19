const React = require('react-native');

const {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Component,
  Animated,
  PanResponder,
  Dimensions,
} = React;

const blue = 'rgba(66, 133, 244, 1)';
const red = 'rgba(222, 62, 53, 1)';
const yellow = 'rgba(247, 194, 35, 1)';
const green = 'rgba(27, 154, 89, 1)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  square: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    position: 'absolute',
    top: 20, left: 150,
  },
  text: {
    color: 'black',
    fontWeight: '400',
    backgroundColor: 'transparent',
  },
});

const positions = [
  {x: 50, y:50},
  {x: 200, y:120},
  {x: 200, y:0},
  {x: 50, y:300},
];

class ColorView extends Component {

  constructor() {
    super();
    this.state = {
      posX: new Animated.Value(0),
      posY: new Animated.Value(0),
    };
    this.positionIndex = 0;
  }

  componentDidMount() {
    this.startAnimation();
  }

  render() {
    // Put this value in render in case we rotate the device ;)
    const DEVICE_HEIGHT = Dimensions.get('window').height;
    const DEVICE_WIDTH = Dimensions.get('window').width;

    const backgroundColor = this.state.posY.interpolate({
      inputRange: [0, DEVICE_HEIGHT],
      outputRange: [blue, red],
    });
    const squareColor = this.state.posY.interpolate({
      inputRange: [0, DEVICE_HEIGHT],
      outputRange: [yellow, green],
    });

    const squareRotation = this.state.posY.interpolate({
      inputRange: [0, DEVICE_HEIGHT],
      outputRange: ['0deg', '360deg'],
    });

    // We can't use the translateY property as it will rotate 😉
    const squareTop = this.state.posY.interpolate({
      inputRange: [0, DEVICE_HEIGHT],
      outputRange: [0, DEVICE_HEIGHT],
    });

    const squareLeft = this.state.posX.interpolate({
      inputRange: [0, DEVICE_WIDTH],
      outputRange: [0, DEVICE_WIDTH],
    });

    const squareScale = this.state.posY.interpolate({
      inputRange: [0, DEVICE_HEIGHT],
      outputRange: [1, 3],
    });

    return (
      <Animated.View style={[styles.container, {backgroundColor}]}>
        <Animated.View style={[styles.square,
            {transform: [{rotate: squareRotation}, {scale: squareScale}]},
            {top: squareTop, left: squareLeft, backgroundColor: squareColor}]}>
        </Animated.View>
        <Animated.Text style={[styles.text, {transform: [{scale: squareScale}]}]}>
        Hello Bdxio !!
        </Animated.Text>
      </Animated.View>
    );
  }

  startAnimation() {
    this.positionIndex = (this.positionIndex + 1) % positions.length;
    const {x, y} = positions[this.positionIndex];
    Animated.parallel([
      Animated.spring(this.state.posX, {toValue: x}),
      Animated.spring(this.state.posY, {toValue: y}),
    ]).start(() => this.startAnimation());
  }

}

AppRegistry.registerComponent('hotReload', () => ColorView);
