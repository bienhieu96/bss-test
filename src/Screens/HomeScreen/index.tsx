import {PageName} from '@/Configs';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'type/navigators';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import store from '@/Store';
import {fetchData} from '@/Store/reducers/userReducer';
import {useSelector} from 'react-redux';
import FlipCard from '@/Components/FlipCard';
import {FlatList} from 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');
const HomeScreen = () => {
  const [fetchCount, setFetchCount] = useState(0)
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
  useEffect(() => {
    store.dispatch(fetchData());
  }, [fetchCount]);

  

  const loading = useSelector((state: any) => state.user.loading);
  const data = useSelector((state: any) => state.user.data);

  const renderListItem = ({item, index}: any) => {
    return (
      <View style={styles.itemContainer}>
        <FlipCard item={item} index={index} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => setFetchCount(fetchCount + 1)}>
        <Text style={styles.buttonText}>Fetch Random</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            style={styles.listStyle}
            data={data}
            renderItem={renderListItem}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', backgroundColor: 'white'},
  contentContainer: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {color: 'white', fontWeight: 'bold'},
  listContainer: {
    flex: 1,
    backgroundColor: '#e1f5dc',
    width: width / 1.1,
    marginTop: 20,
  },
  listStyle: {flex: 1, padding: 10},
  itemContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 5,
  },
});
export default HomeScreen;
