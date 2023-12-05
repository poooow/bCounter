import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  useColorScheme,
  View,
  Linking
} from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Swiper from 'react-native-swiper';
import { generateNickname } from './src/helpers/generateNickname';
import SlideView from './src/components/slideView';
import styles from './App.styles';
import { updateData, retrieveData } from './src/helpers/storage';
import getDrinkIcon from './src/helpers/getDrinkIcon';

export interface Slide {
  count: number;
  drinks: { name: string; time: number }[],
  drinkName: string,
  icon: number,
  graph: number[],
  counterName: string,
}

const blankPerson = {
  count: 0,
  drinks: [],
  drinkName: 'Beer',
  icon: 0x1f37a,
  graph: [],
  counterName: generateNickname(),
}

export default function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark')
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [currentSlideId, setCurrentSlideId] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([JSON.parse(JSON.stringify(blankPerson))])

  useEffect(() => {
    (async () => {
      const data = await retrieveData() as any
      data?.isDarkMode && setIsDarkMode(data.isDarkMode)
      data?.isAdvancedMode && setIsAdvancedMode(data.isAdvancedMode)
      data?.currentSlideId && setCurrentSlideId(data.currentSlideId)
      data?.slides && setSlides(data.slides)
    })();
  }, [])

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    updateData({ isDarkMode, isAdvancedMode, currentSlideId, slides })
  }, [isDarkMode, isAdvancedMode, currentSlideId, slides]);

  useEffect(() => {
    const updateGraph = () => {

      if (!slides[currentSlideId]) return; // Slide with + button

      let graph = [];

      // Generates array of time differences for graph
      for (let i = 1; i < slides[currentSlideId].drinks.length; i++) {
        graph.push(slides[currentSlideId].drinks[i].time - slides[currentSlideId].drinks[i - 1].time);
      }

      let newSlides = [...slides]
      newSlides[currentSlideId].graph = graph;
      setSlides(slides)
    };
    updateGraph()
  }, [slides, currentSlideId])

  const createSlide = () => {
    // Duplicate object
    const newSlide = JSON.parse(JSON.stringify(blankPerson));
    newSlide.counterName = generateNickname()
    setSlides(current => [...current, newSlide])
  }

  const deleteSlide = () => {
    let newSlides = [...slides]
    newSlides.splice(currentSlideId, 1)
    setSlides(newSlides)
  }

  /*
   * Update counter name
   */
  const setCounterName = (name: string) => {
    let newPersons = [...slides];
    newPersons[currentSlideId].counterName = name;
    setSlides(newPersons)
  }

  /*
   * Update drink name and icon if matches keyword
   */
  const setDrinkName = (name: string) => {
    let newPersons = [...slides];

    const drinkIcon = getDrinkIcon(name);
    if (drinkIcon) newPersons[currentSlideId].icon = drinkIcon;

    newPersons[currentSlideId].drinkName = name;
    setSlides(newPersons)
  }

  /*
   * Add drink for current person
   */
  const increment = () => {
    const currentTime = Date.now();

    const name = String.fromCodePoint(slides[currentSlideId].icon) + ' ' + slides[currentSlideId].drinkName;

    const newDrink = { 'name': name, 'time': currentTime };

    let newSlides = [...slides];
    newSlides[currentSlideId].count++;
    newSlides[currentSlideId].drinks.push(newDrink);
    setSlides(newSlides)
  };

  /*
   * Remove last drink for current person
   */
  const decrement = () => {
    // Cant be less than 0 drinks
    if (slides[currentSlideId]?.count < 1) return;

    let newSlides = [...slides];
    newSlides[currentSlideId].count--;
    newSlides[currentSlideId].drinks.pop();
    setSlides(newSlides)
  };

  /*
   * Clear all drinks of current person
   */
  const clear = () => {
    let newSlides = [...slides];
    newSlides[currentSlideId].count = 0;
    newSlides[currentSlideId].drinks = [];
    newSlides[currentSlideId].graph = [0];
    setSlides(newSlides)
  };

  // Fill up slides Array
  const slideViews = slides.map((slide, index) => (
    <SlideView
      key={index}
      slideId={index}
      slide={slide}
      isAdvancedMode={isAdvancedMode}
      isDarkMode={isDarkMode}
      setCounterName={setCounterName}
      setDrinkName={setDrinkName}
      increment={increment}
      decrement={decrement}
      clear={clear} />
  ))

  // Last slide with add-person button
  slideViews.push(
    <View key={9999} style={styles.lastSwipe}>
      <Text onPress={createSlide} style={[styles.lastSwipeText, { color: isDarkMode ? '#666' : '#ccc' }]}>
        +
      </Text>
    </View>
  )

  return (
    <MenuProvider>
      <View style={[styles.menu, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
        <Menu>
          <MenuTrigger>
            <Text
              style={[styles.menuTrigger, { color: isDarkMode ? '#666' : '#ccc' }]}>&#x22EE;</Text>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() => Linking.openURL('https://github.com/poooow/bCounter/blob/master/privacy_policy.md')}>
              <Text style={styles.menuItem}>Privacy policy</Text>
            </MenuOption>
            <MenuOption onSelect={() => setIsAdvancedMode(!isAdvancedMode)}>
              <Text style={styles.menuItem}>{isAdvancedMode ? 'Disable ' : ''}Advanced mode</Text>
            </MenuOption>
            <MenuOption onSelect={() => setIsDarkMode(!isDarkMode)}>
              <Text style={styles.menuItem}>{isDarkMode ? 'Disable ' : ''}Dark mode</Text>
            </MenuOption>
            {currentSlideId !== slides.length ?
              <MenuOption onSelect={deleteSlide}>
                <Text style={styles.menuItem}>Delete counter</Text>
              </MenuOption>
              : null}
          </MenuOptions>
        </Menu>
      </View>
      <Swiper
        containerStyle={{ backgroundColor: isDarkMode ? '#000' : '#fff' }}
        loop={false}
        index={currentSlideId}
        dot={<View style={{
          backgroundColor: isDarkMode ? '#222' : '#eee',
          width: 8,
          height: 8,
          borderRadius: 4,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        }} />}
        activeDot={<View style={{
          backgroundColor: isDarkMode ? '#444' : '#ccc',
          width: 8,
          height: 8,
          borderRadius: 4,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        }} />}
        onIndexChanged={(index: number) => setCurrentSlideId(index)}
      >
        {slideViews}
      </Swiper>
    </MenuProvider>
  );
}