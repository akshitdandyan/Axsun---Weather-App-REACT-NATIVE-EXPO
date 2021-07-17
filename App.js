import React,{ useEffect,useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,TextInput } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './Components/WeatherInfo';
import UnitsPicker from './Components/UnitsPicker';
import { colors } from './utils';
import ReloadIcon from './Components/ReloadIcon';
import MiscDetails from './Components/MiscDetails';
// import { WEATHER_API_KEY } from 'r';
// console.log(WEATHER_API_KEY);
const WEATHER_API_KEY = 'ed049ffd96a27de1320e946151836170'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [currentWeather,setCurrentWeather] = useState(null)
  const [locPermissionError,setLocPermissionError] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  const [tempUnitSystem,setTempUnitSystem] = useState('metric');
  const [customCity,setCustomCity] = useState('')

  useEffect(() => {
    load()
  }, [tempUnitSystem])

  useEffect(()=>{
    async function customcity(){
    const customCityUrl = `${BASE_WEATHER_URL}q=${customCity}&units=metric&appid=${WEATHER_API_KEY}`;
    const weatherResponse = await fetch(customCityUrl);
    const result = await weatherResponse.json();
    if(weatherResponse.ok) setCurrentWeather(result)
    else return setErrorMessage(result.message);
    }
    customcity()
  },[customCity])

  const load = async() => {
    setCurrentWeather(null)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status != 'granted') return setLocPermissionError(true);
      const location = await Location.getCurrentPositionAsync();
      const { latitude,longitude } = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${tempUnitSystem}&appid=${WEATHER_API_KEY}`;
      const weatherResponse = await fetch(weatherUrl);
      const result = await weatherResponse.json();
      if(weatherResponse.ok) setCurrentWeather(result)
      else return setErrorMessage(result.message);
      setErrorMessage(null)
    } catch (error) {
      console.log(error);
      setErrorMessage("ERROR CAUGHT IN CATCH")
    }
  }

  if(currentWeather){
    return(
      <View style={styles.container}>
        <View style={styles.main}>
          <UnitsPicker tempUnitSystem={tempUnitSystem} setTempUnitSystem={setTempUnitSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <TextInput
          style={styles.input}
          placeholder='Enter Custom City'
          defaultValue={customCity}
          onChangeText={text=>setCustomCity(text)}
        />
        <MiscDetails currentWeather={currentWeather} />
      </View>
  )
  }
  
  else if(errorMessage){
    return (
    <View style={styles.container}>
      <Text>{locPermissionError ? 'You need to give location permission to access weather report' : errorMessage}</Text>
    </View>
  );
}

else{
  return(
    <View style={styles.container}>
      <ActivityIndicator size='large' color={colors.PRIMARY_COLOR} />
    </View>
  )
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent:'center'
  },
  input:{
    borderBottomColor:colors.SECONDARY_COLOR,
    borderBottomWidth:2,
    width: 300
  }
});
