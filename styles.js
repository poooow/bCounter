import {StyleSheet} from "react-native";

export default StyleSheet.create({
    menu: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    menuTrigger: {
        color: '#cccccc',
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
        color: '#555555',
    },
    container: {
        backgroundColor: '#fff',
    },
    content: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    drinkNameInput: {
        fontSize: 40,
        color: '#cccccc',
        marginTop: 130,
        marginBottom: 50,
    },
    counterNameInput: {
        position: 'absolute',
        top: 50,
        fontSize: 30,
        color: '#cccccc',
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
    button: {
        backgroundColor: '#555555',
        borderColor: '#555555',
        borderWidth: 2,
        color: 'white',
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
        backgroundColor: 'white',
        borderColor: '#555555',
        borderWidth: 2,
        color: '#555555',
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
        backgroundColor: 'white',
        borderColor: '#555555',
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
        color: '#cccccc',
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
        color: '#cccccc'
    }
});