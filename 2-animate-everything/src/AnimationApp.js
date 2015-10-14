const React = require('react-native');

// I use the rgba notation because this is currently the only way to
// interpolate color => to animate color
const white  = 'rgba(255, 255, 255, 1)';
const blue   = 'rgba(66, 175, 226, 1)';
const gray   = 'rgba(240, 242, 244, 1)';
const red    = 'rgba(237, 108, 99, 1)';
const green  = 'rgba(151, 205, 118, 1)';
const orange = 'rgba(246, 139, 56, 1)';
const yellow = 'rgba(252, 228, 115, 1)';
const purple = 'rgba(132, 122, 185, 1)';

const {
  AppRegistry,
  StyleSheet,
  View,
  Component,
  Animated,
  PanResponder,
  Dimensions,
} = React;

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

class AnimationApp extends Component {

  constructor() {
    super();
    this.state = {
      /**
      * Animated.Value are special object which will
      * communicate with native UI
      * We will then be able to trigger UI modifications
      * directly throught them without trigger react rendering
      **/
      posX: new Animated.Value(130),
      posY: new Animated.Value(130),
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
        /**
        * Here is the magic ! 💫🎩
        * Bind moveX and moveY from gestureState to posX and posY
        **/
        {moveY: this.state.posY, moveX: this.state.posX},
      ]),
      /**
      * When touching a point on the screen, we just send new coordinates
      * to native thread and animate it. Keep in mind that there is only
      * one call from Javascript, it stays fire and forget !
      **/
      onPanResponderGrant: (evt, gestureState) => {
        const {x0, y0} = gestureState;
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

    // We DECLARE the relation between the backgroundColor and the Y position
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
            {top: squareTop, backgroundColor: squareColor}]} />
        <Animated.View style={[styles.pointer,
            {shadowRadius},
            {transform: [{translateX}, {translateY}, {scale: pointerScale}]}]} />
      </Animated.View>
    );
  }

}

module.exports = AnimationApp;
