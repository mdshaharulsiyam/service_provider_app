require("react-native-gesture-handler/jestSetup");

jest.mock("react-native-worklets", () => ({
  createWorkletRuntime: jest.fn(),
  runOnUI: (worklet) => worklet,
  runOnJS: (fn) => fn,
}));

jest.mock("react-native-reanimated", () => {
  const ReactNative = require("react-native");

  const animated = {
    View: ReactNative.View,
    Text: ReactNative.Text,
    ScrollView: ReactNative.ScrollView,
    Image: ReactNative.Image,
    addWhitelistedNativeProps: jest.fn(),
    addWhitelistedUIProps: jest.fn(),
    createAnimatedComponent: (component) => component,
  };

  return {
    ...animated,
    default: animated,
    Easing: {
      linear: jest.fn(),
      ease: jest.fn(),
      out: jest.fn((fn) => fn),
      inOut: jest.fn((fn) => fn),
    },
    Extrapolation: {
      CLAMP: "clamp",
    },
    ReduceMotion: {
      Never: "never",
    },
    interpolate: jest.fn(() => 0),
    runOnJS: (fn) => fn,
    useAnimatedProps: (factory) => factory(),
    useAnimatedStyle: (factory) => factory(),
    useEvent: jest.fn(),
    useHandler: jest.fn(() => ({ context: {}, doDependenciesDiffer: false })),
    useDerivedValue: (factory) => ({ value: factory() }),
    useSharedValue: (value) => ({ value }),
    addWhitelistedNativeProps: jest.fn(),
    addWhitelistedUIProps: jest.fn(),
    withSpring: (value, _config, callback) => {
      callback?.(true);
      return value;
    },
    withTiming: (value, _config, callback) => {
      callback?.(true);
      return value;
    },
  };
});

jest.mock("react-native-keyboard-controller", () => {
  const React = require("react");
  const { ScrollView } = require("react-native");

  return {
    KeyboardProvider: ({ children }) =>
      React.createElement(React.Fragment, null, children),
    KeyboardAwareScrollView: ({ children, ...props }) =>
      React.createElement(ScrollView, props, children),
  };
});

jest.mock("expo-document-picker", () => ({
  getDocumentAsync: jest.fn(async () => ({ canceled: true, assets: null })),
}));

jest.mock("expo-image-picker", () => ({
  launchCameraAsync: jest.fn(async () => ({ canceled: true, assets: null })),
  launchImageLibraryAsync: jest.fn(async () => ({ canceled: true, assets: null })),
  requestCameraPermissionsAsync: jest.fn(async () => ({ granted: true })),
}));

jest.mock("expo-clipboard", () => ({
  getStringAsync: jest.fn(async () => ""),
  setStringAsync: jest.fn(async () => true),
}));
