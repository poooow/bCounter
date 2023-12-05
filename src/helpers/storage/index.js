import store from 'react-native-simple-store';

export async function updateData(data) {
  store.update('bCounterStorage', data)
}

export async function retrieveData() {
  const data = await store.get('bCounterStorage')
  return data
}

