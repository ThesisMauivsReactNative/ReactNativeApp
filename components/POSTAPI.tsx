import React, { useEffect } from 'react';
import {Alert, StyleSheet, View, Text} from 'react-native';

const POSTAPI = ({trigger}) => {

    const postData = () => {
        const start = performance.now();
        const URL = 'http://10.0.2.2:3030/item';
        fetch(URL, {
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'test',
                description: 'test description',
                image: 'https://www.hkr.se/globalassets/bildbank-hogskolegemensam/medarbetare/hkr.medarbetare.campus.jpg',
                latitude: 56.0485,
                longitude: 14.1462,
              }),
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(JSON.stringify(error));
          });

        const end = performance.now();
        Alert.alert(`Item is posted to the server, TTC POST API= ${end - start} ms`);
        };

        useEffect(() =>{
            if (trigger) {postData();}
        }, [trigger]);

    return (
        <View style={styles.btn}>
        {/*trigger && <Text> Item is posted to the server</Text>*/}
    </View>
    );
  };
  const styles = StyleSheet.create({
    btn: {
        flex:1,
    },
});
export default POSTAPI;
