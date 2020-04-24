import {StyleSheet} from "react-native";
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

const textColor = '#555555';
const textColorLight = '#cccccc';
const backgroundColor = '#ffffff';

export default StyleSheet.create({
    menu: {
        position: 'absolute',
        right: 10,
        top: Constants.statusBarHeight + 10,
    },
    menuTrigger: {
        color: textColorLight,
        fontSize: 30,
        width: 40,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    menuItem: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 15,
        color: textColor,
    },
    content: {
        marginTop: Constants.statusBarHeight + 40,
        backgroundColor: backgroundColor,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height - Constants.statusBarHeight - 90,
    },
    drinkNameInput: {
        fontSize: 40,
        color: textColorLight,
    },
    counterName: {
        height: 35,
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
        backgroundColor: textColor,
        borderColor: textColor,
        borderWidth: 2,
        color: '#fff',
        width: 75,
        height: 75,
        padding: 4,
        margin: 5,
        borderRadius: 100,
        fontSize: 45,
        fontWeight: 'bold',
        overflow: 'hidden',
        textAlign: 'center',
    },
    buttonMinus: {
        backgroundColor: 'transparent',
        borderColor: textColor,
        borderWidth: 2,
        color: textColor,
        width: 75,
        height: 75,
        padding: 4,
        margin: 5,
        borderRadius: 100,
        fontSize: 45,
        fontWeight: 'bold',
        overflow: 'hidden',
        textAlign: 'center',
        zIndex: 99
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
    },
    lastSwipe: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    lastSwipeText: {
        fontSize: 150,
        color: textColorLight,
    }
});
