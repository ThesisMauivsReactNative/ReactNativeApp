import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Image,Alert} from 'react-native';

const GETAPI = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getItems = async () => {
      try {
        const start = performance.now();
        const URL = 'http://10.0.2.2:3030/item';
        const response = await fetch(URL);
        const json = await response.json();
        const end = performance.now();
        Alert.alert(`TTC GET API= ${end - start} ms`);
        console.log(json);
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getItems();
    }, []);

    return (
      <View style={{flex: 5, padding: 24}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({_id}) => _id}
            renderItem={({item}) => (
              <View style={{display:'flex', flexDirection:'row',gap:10}}>
                 <Image style={{width: 150,height: 150}} source={{uri:item.image}} />
              <Text>
                {item.name}
              </Text>
              </View>

            )}
          />
        )}
      </View>
    );
  };
export default GETAPI;
