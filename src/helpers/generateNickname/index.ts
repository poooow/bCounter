/*
 * Nick Name generator
 */
export function generateNickname() {
  const nameFirst = ['anarchist', 'autocratic', 'feudal', 'communist', 'liberal', 'bureaucratic', 'religious', 'social', 'creative', 'technocratic', 'militant', 'imperial', 'capitalist', 'despotic', 'aristocratic', 'neutral', 'charismatic', 'technocratic', 'theocratic', 'conservative', 'marxist', 'enlightened', 'feminist', 'skeptical', 'utilitarian'];
  const nameSecond = ['alligator', 'donkey', 'badger', 'beaver', 'bobkitten', 'capybara', 'chameleon', 'chicken', 'coyote', 'crocodile', 'unicorn', 'dinosaur', 'dragon', 'duck', 'elephant', 'fox', 'gecko', 'panda', 'giraffe', 'goat', 'gorilla', 'goose', 'hyena', 'jellyfish', 'kangaroo', 'koala', 'lizard', 'mammoth', 'monkey', 'rat', 'octopus', 'parrot', 'penguin', 'pigeon', 'rabbit', 'skunk', 'squirrel', 'toad', 'whale', 'zebra'];

  return capitalizeFirstLetter(nameFirst[getRandomInt(0, nameFirst.length - 1)]) + ' ' + nameSecond[getRandomInt(0, nameSecond.length - 1)];
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}