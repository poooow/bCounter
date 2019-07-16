import {StyleSheet} from "react-native";

const textColor = '#555555';
const textColorLight = '#cccccc';
const backgroundColor = '#ffffff';

export default StyleSheet.create({
    menu: {
        position: 'absolute',
        right: 10,
        top: 10,
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
        backgroundColor: backgroundColor,
        alignItems: 'center',
    },
    drinkNameInput: {
        fontSize: 40,
        color: textColorLight,
        marginTop: 130,
        marginBottom: 50,
    },
    counterNameInput: {
        position: 'absolute',
        top: 50,
        fontSize: 30,
        color: textColorLight,
    },
    counter: {
        textAlign: 'center',
        fontSize: 80,
        marginBottom: 60,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
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
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    log: {
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