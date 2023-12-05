import { StyleSheet, Dimensions, Platform, NativeModules } from "react-native";

const textColor = '#555555';
const textColorLight = '#cccccc';
const backgroundColor = '#ffffff';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

export default StyleSheet.create({
  content: {
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 80,
    paddingTop: 20,
    height: Dimensions.get('window').height - 80,
  },
  drinkNameInput: {
    fontSize: 40,
    color: textColorLight,
  },
  counterName: {
  },
  counterNameInput: {
    fontSize: 30,
    color: textColorLight,
  },
  counter: {
    textAlign: 'center',
    fontSize: 80,
  },
  buttons: {
    flexDirection: 'row',
    height: 84,
  },
  buttonPlus: {
    backgroundColor: 'transparent',
    borderColor: textColor,
    borderWidth: 2,
    color: textColor,
    width: 75,
    height: 75,
    margin: 5,
    borderRadius: 100,
    fontSize: 50,
    fontWeight: 'bold',
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: "center",
    lineHeight: 60,
  },
  buttonMinus: {
    backgroundColor: 'transparent',
    borderColor: textColor,
    borderWidth: 2,
    color: textColor,
    width: 75,
    height: 75,
    margin: 5,
    borderRadius: 100,
    fontSize: 50,
    fontWeight: 'bold',
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: "center",
    lineHeight: 60,
  },
  buttonClear: {
    backgroundColor: 'transparent',
    borderColor: textColor,
    borderWidth: 2,
    width: 75,
    height: 75,
    padding: 11,
    margin: 5,
    borderRadius: 100,
    fontSize: 35,
    fontWeight: 'bold',
    overflow: 'hidden',
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: 130,
  },
  logItem: {
    fontSize: 15,
    color: textColorLight,
    lineHeight: 21,
  },
  graph: {
    height: 130,
    width: '40%',
    marginLeft: 20,
  }
});
