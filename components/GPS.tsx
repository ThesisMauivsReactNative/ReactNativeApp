import {
  StyleSheet,
  Alert,
  View,
  Button,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useState} from 'react';
import GETAPI from './GETAPI';
import POSTAPI from './POSTAPI';

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const GPS = () => {
  const [location, setLocation] = useState(false);
  const [isrenderedList, setisrenderedList] = useState(false);
  const [triggerPost, settriggerPost] = useState(false);
  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    const start = performance.now();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            const end = performance.now();
            setLocation(position);
            Alert.alert(
              'Latitude=' +
                position.coords.longitude +
                ', Longitude=' +
                position.coords.latitude +
                ', TTC=' +
                (end - start),
            );
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      {/*location &&
        <View>
            <Text>Latitude: {location ? location.coords.longitude : null} </Text>
         <Text>Longitude: {location ? location.coords.longitude : null} </Text>
        </View>
  */}
      {isrenderedList && <GETAPI />}
      {/*triggerPost && <POSTAPI trigger={triggerPost} />*/}
      <View style={styles.bottom}>
        <Button
          style={styles.button}
          title="Get Location"
          onPress={getLocation}
        />
        <Button
          style={styles.button}
          title="Get List"
          onPress={() => setisrenderedList(true)}
        />
        <Button
          style={styles.button}
          title="Post Item"
          onPress={() => settriggerPost(true)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 8,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
});

export default GPS;
