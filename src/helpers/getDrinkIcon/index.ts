const drinks: { [key: string]: number } = {
  "beer": 0x1f37a,
  "wine": 0x1f377,
  "cocktail": 0x1f378,
  "shot": 0x1f943,
  "coffee": 0x2615,
  "tea": 0x1f375,
  "milk": 0x1f95b,
  "mate": 0x1f9c7,
  "sake": 0x1f37b
}

export default function getDrinkIcon(drink: string) {
  for (const key in drinks) {
    if (drink.toLocaleLowerCase().includes(key)) {
      return drinks[key];
    }
  }
  return false;
}