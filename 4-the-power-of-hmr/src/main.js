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
  pointer: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    position: 'absolute',
    top: -20, left: -20,
    borderRadius: 20,
    opacity: 0.5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
});

class ColorView extends Component {

  constructor() {
    super();
    this.state = {
      posX: new Animated.Value(0),
      posY: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this._pan = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // The move event will be complety managed by native thread ⚡️
      onPanResponderMove: Animated.event([
        null, // ignore the native event
        // extract moveX and moveY from gestureState, and bind them to posX and posY
        {moveY: this.state.posY, moveX: this.state.posX},
      ]),
      // When touching a point, we just send new coordinates to native thread and
      // animate it. Keep in mind that there is only one call from Javascript,
      // it stays fire and forget !
      onPanResponderGrant: (evt, gestureState) => {
        const{ x0, y0} = gestureState;
        this.animation = Animated.parallel([
          Animated.spring(this.state.posX, {toValue: x0}),
          Animated.spring(this.state.posY, {toValue: y0}),
        ]).start();
      },
    });
  }

  render() {
    // Put this value in render in case we rotate the device ;)
    const DEVICE_HEIGHT = Dimensions.get('window').height;

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

    const squareScale = this.state.posY.interpolate({
      inputRange: [0, DEVICE_HEIGHT],
      outputRange: [1, 3],
    });

    const pointerScale = this.state.posY.interpolate({
      inputRange: [0, DEVICE_HEIGHT],
      outputRange: [3, 1],
    });

    const translateX = this.state.posX;
    const translateY = this.state.posY;

    const shadowRadius = this.state.posY.interpolate({
      inputRange: [0, DEVICE_HEIGHT],
      outputRange: [10, 1],
    });

    return (
      <Animated.View style={[styles.container, {backgroundColor}]} {...this._pan.panHandlers}>
        <Animated.View style={[styles.square,
            {transform: [{rotate: squareRotation}, {scale: squareScale}]},
            {top: squareTop, backgroundColor: squareColor}]}>
        </Animated.View>
        <Animated.View style={[styles.pointer,
            {shadowRadius},
            {transform: [{translateX}, {translateY}, {scale: pointerScale}]}]} />
      </Animated.View>
    );
  }

}

AppRegistry.registerComponent('hotReload', () => ColorView);
