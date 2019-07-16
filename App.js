import React from 'react';
import {
    Text,
    View,
    TextInput,
    Alert,
    ScrollView,
    TouchableOpacity,
    Linking,
    AsyncStorage
} from 'react-native';
import {BarChart, Grid} from 'react-native-svg-charts'
import Swiper from 'react-native-swiper';
import {MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import update from 'immutability-helper';
import styles from './styles.js';
import * as Utils from './helpers.js';


class bCounter extends React.Component {

    constructor(props) {
        super(props);

        this.createPerson();

        this.state = {
            persons: [],
            currentPerson: 0,
            advancedMode: 0,
        };

        this.retrieveData();
        if (this.state.persons.length === 0) this.state.persons.push(this.emptyPerson);
        this.updateGraph();
        this.drinks = [['beer', 0x1f37a], ['wine', 0x1f377], ['cocktail', 0x1f378], ['shot', 0x1f943], ['coffee', 0x2615], ['milk', 0x1f95b]];
    }

    createPerson() {
        this.emptyPerson = {
            count: 0,
            beers: [],
            name: 'Beer',
            icon: 0x1f37a,
            graph: [0],
            counterName: bCounter.generateNickname(),
        };
    }

    updateGraph = () => {
        let graph = [];

        // Generates array of time differences for graph
        for (let i = 1; i < this.state.persons[this.state.currentPerson].beers.length; i++) {
            graph.push(this.state.persons[this.state.currentPerson].beers[i].time - this.state.persons[this.state.currentPerson].beers[i - 1].time);
        }

        const persons = update(this.state.persons, {
            [this.state.currentPerson]: {
                graph: {$set: graph},
            }
        });

        if (graph.length) {
            this.setState({
                    persons: persons,
                }
            );
        }
    };

    storeData = async () => {
        try {
            await AsyncStorage.setItem('STORAGE_KEY', JSON.stringify(this.state));
        } catch (error) {
            console.log(error);
        }
    };

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('STORAGE_KEY');
            if (value !== null) {
                const state = JSON.parse(value);
                this.setState(state);
            }
        } catch (error) {
            console.log(error);
        }
    };

    /*
     * Update drink name and icon if matches keyword
     */
    setDrinkName = (drinkName) => {
        let drinkIcon = this.state.persons[this.state.currentPerson].icon;
        for (let index = 0; index < this.drinks.length; ++index) {
            let value = this.drinks[index];
            if (value[0].localeCompare(drinkName.toLowerCase()) === 0) {
                drinkIcon = value[1];
            }
        }

        const persons = update(this.state.persons, {
            [this.state.currentPerson]: {
                name: {$set: drinkName},
                icon: {$set: drinkIcon}
            }
        });

        this.setState({
            persons
        })
    };

    /*
     * Update counter name
     */
    setCounterName = (counterName) => {

        const persons = update(this.state.persons, {
            [this.state.currentPerson]: {
                counterName: {$set: counterName},
            }
        });

        this.setState({
            persons
        })
    };

    /*
     * Add drink for current person
     */
    increment = () => {
        const currentTime = Date.now();

        const name = String.fromCodePoint(this.state.persons[this.state.currentPerson].icon) + ' ' + this.state.persons[this.state.currentPerson].name;

        const newBeerState = {'name': name, 'time': currentTime};

        const persons = update(this.state.persons, {
            [this.state.currentPerson]: {
                count: {$set: this.state.persons[this.state.currentPerson].count + 1},
                beers: {$push: [newBeerState]},
            }
        });

        this.setState({
            persons

        }, () => {
            this.storeData();
            this.updateGraph();
        });
    };

    /*
     * Remove last drink for current person
     */
    decrement = () => {

        // Cant be less than 0 drinks
        if (this.state.persons[this.state.currentPerson].count < 1) return;

        this.state.persons[this.state.currentPerson].beers.pop();

        const persons = update(this.state.persons, {
            [this.state.currentPerson]: {
                count: {$set: this.state.persons[this.state.currentPerson].count - 1},
                beers: {$set: this.state.persons[this.state.currentPerson].beers}
            }
        });

        this.setState({
            persons: persons,
        }, () => {
            this.storeData();
            this.updateGraph();
        });
    };

    /*
     * Clear all drinks of current person
     */
    clear = () => {
        const persons = update(this.state.persons, {
            [this.state.currentPerson]: {
                count: {$set: 0},
                beers: {$set: []},
                graph: {$set: [0]}
            }
        });

        this.setState({
            persons
        });
    };

    setCurrentPerson(person) {

        this.setState({
            currentPerson: person,
        });
    };

    newPerson = () => {
        this.createPerson();

        const persons = update(this.state.persons, {$push: [this.emptyPerson]});

        this.setState({
            persons: persons,
        });
    };

    /*
     * Delete current person
     */
    deletePerson = () => {
        let persons = this.state.persons;
        const filteredPersons = persons.slice(0, this.state.currentPerson).concat(persons.slice(this.state.currentPerson + 1, persons.length));

        this.setState({
            persons: filteredPersons,
        });
    };

    /*
     * Toggle graph and log visibility
     */
    toggleMode = () => {

        let newState = !this.state.advancedMode;

        this.setState({
            advancedMode: newState,
        });
    };

    /*
     * Nick Name generator
     */
    static generateNickname(){
        const nameFirst = ['anarchist', 'autocratic', 'feudal', 'communist', 'liberal', 'bureaucratic', 'religious', 'social', 'creative', 'technocratic', 'militant', 'imperial', 'capitalist', 'despotic', 'aristocratic', 'neutral', 'charismatic', 'technocratic', 'theocratic'];
        const nameSecond = ['alligator', 'donkey', 'badger', 'beaver', 'bobkitten', 'capybara', 'chameleon', 'chicken', 'coyote', 'crocodile', 'unicorn', 'dinosaur', 'dragon', 'duck', 'elephant', 'fox', 'gecko', 'panda', 'giraffe', 'goat', 'gorilla', 'goose', 'hyena', 'jellyfish', 'kangaroo', 'koala', 'lizard', 'mammoth', 'monkey', 'mouse', 'octopus', 'parrot', 'penguin', 'pigeon', 'rabbit', 'skunk', 'squirrel', 'toad', 'whale', 'zebra'];

        return Utils.capitalizeFirstLetter(nameFirst[Utils.getRandomInt(0, nameFirst.length - 1)]) + ' ' + nameSecond[Utils.getRandomInt(0, nameSecond.length - 1)];
    }

    /*
     * Single slide
     */
    personView(person) {
        const fill = '#cccccc';

        return (
            <View key={person} style={styles.container}>
                <View style={styles.content}>
                    {this.state.advancedMode ?
                        <TextInput
                            style={styles.counterNameInput}
                            onChangeText={this.setCounterName}
                            value={this.state.persons[person].counterName}
                        />
                    : null}
                    <TextInput
                        style={styles.drinkNameInput}
                        onChangeText={this.setDrinkName}
                        value={this.state.persons[person].name}
                    />
                    <Text
                        style={styles.counter}>{this.state.persons[person].count} {String.fromCodePoint(this.state.persons[person].icon)}</Text>
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
                    {this.state.advancedMode ?
                        <View style={styles.stats}>
                            <ScrollView style={styles.log}>
                                <Text>
                                    {this.state.persons[person].beers.map((beer, index) => (
                                        <Text style={styles.logItem}
                                              key={index}>{beer.name} @ {Utils.timestampToTime(beer.time)}{'\n'}</Text>
                                    ))}
                                </Text>
                            </ScrollView>
                            <BarChart
                                style={styles.graph}
                                data={this.state.persons[person].graph}
                                svg={{fill}}
                                yMin={0}
                            >
                                <Grid/>
                            </BarChart>
                        </View>
                        : null}
                </View>
            </View>
        );
    }

    render() {
        let personView = [];

        // Fill up slides Array
        for (let i = 0; i < this.state.persons.length; i++) {
            personView.push(this.personView(i));
        }

        // Last slide with add-person button
        const lastSwipe = (<View key={999} style={styles.lastSwipe}><Text onPress={this.newPerson}
                                                                          style={styles.lastSwipeText}>+</Text></View>);
        personView.push(lastSwipe);

        return (
            <MenuProvider>
                <Swiper
                    loop={false}
                    index={this.state.currentPerson}
                    dot={<View style={{
                        backgroundColor: 'rgba(0,0,0,.1)',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3,
                    }}/>}
                    activeDot={<View style={{
                        backgroundColor: 'rgba(0,0,0,.3)',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3,
                    }}/>}
                    onIndexChanged={(index) => this.setCurrentPerson(index)}
                >
                    {personView}
                </Swiper>
                <View style={styles.menu}>
                    <Menu>
                        <MenuTrigger>
                            <Text style={styles.menuTrigger}>&#x22EE;</Text>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption
                                onSelect={() => Linking.openURL('https://github.com/poooow/bCounter/blob/master/privacy_policy.md')}>
                                <Text style={styles.menuItem}>Privacy policy</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => this.toggleMode()}>
                                <Text style={styles.menuItem}>{this.state.advancedMode ? 'Disable' : 'Enable'} advanced
                                    mode</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => this.deletePerson()}>
                                <Text style={styles.menuItem}>Delete counter</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
            </MenuProvider>
        );
    }
}

export default bCounter;
