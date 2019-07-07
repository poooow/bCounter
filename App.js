import React from 'react';
import {StyleSheet, Text, View, TextInput, Alert, ScrollView, TouchableOpacity, Linking, AsyncStorage} from 'react-native';
import {BarChart, Grid} from 'react-native-svg-charts'
import Swiper from 'react-native-swiper';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';


class bCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            beers: [],
            beerName: 'Beer',
            sysLog: '',
            graph: [0],
        };
        this.retrieveData();
        this.updateGraph();
        this.drinks = [['beer', 0x1f37a], ['wine', 0x1f377], ['cocktail', 0x1f378], ['shot', 0x1f943], ['coffee', 0x2615], ['milk', 0x1f95b]];
        this.drinkIcon = 0x1f37a;
    }

    static timestampToTime(timestamp) {
        let date = new Date(timestamp);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    };

    updateGraph = () => {
        let graph = [];

        for (let i = 1; i < this.state.beers.length; i++) {
            graph.push(this.state.beers[i].time - this.state.beers[i - 1].time);
        }

        if (graph.length) {
            this.setState({
                    graph: graph,
                }
            );
        }
    };

    storeData = async () => {
        try {
            await AsyncStorage.setItem('STORAGE_KEY', JSON.stringify(this.state.beers));
        } catch (error) {
            console.log(error);
        }
    };

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('STORAGE_KEY');
            if (value !== null) {
                const state = JSON.parse(value);
                this.setState({
                    beers: state,
                    count: state.length,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    setDrinkName = (drinkName) => {
        for (let index = 0; index < this.drinks.length; ++index) {
            let value = this.drinks[index];
            if (value[0].localeCompare(drinkName.toLowerCase()) === 0) {
                this.drinkIcon = value[1];
            }
        }

        this.setState({
            beerName: drinkName,
        })
    };

    increment = () => {
        const currentTime = Date.now();

        const beerName = this.state.beerName;

        const newState = {'name': beerName, 'time': currentTime};

        this.setState(state => {
            const beers = state.beers.concat(newState);
            return {
                beers,
                count: this.state.count + 1,
            }
        }, () => {
            this.storeData();
            this.updateGraph();
        });
    };

    decrement = () => {
        if (this.state.count < 1) return;
        this.setState(state => {
            const beers = state.beers;
            beers.pop();
            return {
                beers: beers,
                count: this.state.count - 1,
            }
        }, () => {
            this.storeData();
            this.updateGraph();
        });
    };

    clear = () => {
        this.setState({
            count: 0,
            beers: [],
            graph: [0],
        });
    };

    render() {
        const fill = '#cccccc';

        return (
            <MenuProvider>
            <Swiper
                loop={false}
                index={0}
                dot={<View style={{backgroundColor:'rgba(0,0,0,.1)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                activeDot={<View style={{backgroundColor: 'rgba(0,0,0,.3)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.setDrinkName}
                            value={this.state.beerName}
                        />
                        <Text style={styles.counter}>{this.state.count} {String.fromCodePoint(this.drinkIcon)}</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={this.increment}>
                                <Text style={styles.button}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.decrement}>
                                <Text style={styles.buttonMinus}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={styles.buttonClear}
                                    onPress={
                                        () => Alert.alert(
                                            "What!", "No more beers?",
                                            [
                                                {
                                                    text: 'Cancel',
                                                    style: 'cancel'
                                                },
                                                {text: 'Clear', onPress: this.clear},
                                            ],
                                            {cancelable: true}
                                        )}
                                >&#x1F5D1;</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.stats}>
                            <ScrollView style={styles.log}>
                                <Text>
                                    {this.state.beers.map((beer, index) => (
                                        <Text style={styles.logItem} key={index}>{beer.name} @ {bCounter.timestampToTime(beer.time)}{'\n'}</Text>
                                    ))}
                                </Text>
                            </ScrollView>
                            <BarChart
                                style={styles.graph}
                                data={this.state.graph}
                                svg={{fill}}
                                yMin={0}
                            >
                                <Grid/>
                            </BarChart>
                        </View>
                    </View>
                </View>
            </Swiper>
                <View style={styles.menu}>
                    <Menu>
                      <MenuTrigger>
                          <Text style={styles.menuTrigger}>&#x2630;</Text>
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption onSelect={() => Linking.openURL('https://github.com/poooow/bCounter/blob/master/privacy_policy.md')}>
                            <Text style={styles.menuItem}>Privacy Policy</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                </View>
            </MenuProvider>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    menuTrigger: {
        color: '#cccccc',
        fontSize: 30,
    },
    menuItem: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 20,
        color: '#555555',
    },
    container: {
        backgroundColor: '#fff',
    },
    content: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    input: {
        fontSize: 40,
        color: '#cccccc',
        marginTop: 130,
        marginBottom: 50,
    },
    counter: {
        textAlign: 'center',
        fontSize: 80,
        marginBottom: 60,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    button: {
        backgroundColor: '#555555',
        color: 'white',
        width: 75,
        height: 75,
        padding: 4,
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
        borderRadius: 100,
        fontSize: 35,
        fontWeight: 'bold',
        overflow: 'hidden',
        textAlign: 'center',
    },
    stats: {
        marginTop: 80,
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
    },
    graph: {
        height: 130,
        width: '40%',
        marginLeft: 20,
    },
});

export default bCounter;