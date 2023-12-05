import React from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import styles from './styles';
import { Slide } from '../../../App';
import { timestampToTime } from '../../helpers/timestampToTime';
//@ts-ignore
import { YAxis, BarChart, Grid } from 'react-native-svg-charts'

interface Props {
  slideId: number;
  slide: Slide;
  isAdvancedMode: boolean;
  isDarkMode: boolean;
  setCounterName: (name: string) => void;
  setDrinkName: (name: string) => void;
  increment: () => void;
  decrement: () => void;
  clear: () => void;
}

export default function SlideView(props: Props): JSX.Element {
  const { slideId, slide, isDarkMode, isAdvancedMode, setCounterName, setDrinkName, increment, decrement, clear} = props;

  return (
    <View key={slideId}>
      <View style={[styles.content, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
        {isAdvancedMode ?
          <View style={styles.counterName}>
            <TextInput
              style={[styles.counterNameInput, { color: isDarkMode ? '#666' : '#ccc' }]}
              onChangeText={setCounterName}
              value={slide.counterName}
            />
          </View>
          : null}
        <TextInput
          style={[styles.drinkNameInput, { color: isDarkMode ? '#666' : '#ccc', marginTop: isAdvancedMode ? 0 : '20%' }]}
          onChangeText={setDrinkName}
          value={slide.drinkName}
        />
        <Text
          style={[styles.counter, { color: isDarkMode ? '#fff' : '#000' }]}>{slide.count} {String.fromCodePoint(props.slide.icon)}
        </Text>
        <View style={[styles.buttons, { height: isAdvancedMode ? 84 : '30%' }]}>
          <TouchableOpacity onPress={increment}>
            <Text style={[styles.buttonPlus,
            { color: isDarkMode ? '#000' : '#fff' },
            { backgroundColor: isDarkMode ? '#fff' : '#555' },
            { borderColor: isDarkMode ? '#fff' : '#555' },
            ]}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={decrement}>
            <Text style={[styles.buttonMinus,
            { color: isDarkMode ? '#fff' : '#000' },
            { borderColor: isDarkMode ? '#fff' : '#555' },
            ]}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[styles.buttonClear,
              { borderColor: isDarkMode ? '#fff' : '#555' },
              ]}
              onPress={
                () => Alert.alert(
                  "What!", "No more beers?",
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel'
                    },
                    { text: 'Clear', onPress: props.clear },
                  ],
                  { cancelable: true }
                )}
            >&#x1F5D1;</Text>
          </TouchableOpacity>
        </View>
        {isAdvancedMode ?
          <View style={styles.stats}>
            <ScrollView>
              <Text>
                {slide.drinks.map((drink, index) => (
                  <Text style={[styles.logItem, { color: isDarkMode ? '#666' : '#ccc' }]}
                    key={index}>{drink.name} @ {timestampToTime(drink.time)}{'\n'}</Text>
                ))}
              </Text>
            </ScrollView>
            <YAxis
              data={slide.graph}
              contentInset={{ top: 10, bottom: 10 }}
              svg={{
                fill: 'grey',
                fontSize: 10,
              }}
              numberOfTicks={5}
              formatLabel={(value: number) => `${Math.round(value / 1000 / 60)} min`}
            />
            <BarChart
              style={styles.graph}
              data={slide.graph}
              svg={{ fill: isDarkMode ? '#333' : '#ccc' }}
              yMin={0}
            >
              <Grid />
            </BarChart>
          </View>
            : null}
      </View>
    </View>
  )
}