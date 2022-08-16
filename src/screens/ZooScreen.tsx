import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  Text,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useQuery} from 'react-query';
import getZooAnimalsService from '../services/getZooAnimals';
import {ZooType} from '../models/zoo';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from '../components/SkeletonPlaceholder';
import {spacingSizes} from '../theme';

const ZooScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {data: zoo, isLoading} = useQuery({
    queryFn: () => getZooAnimalsService(),
    queryKey: ['zoo'],
  });

  console.log(zoo, 'zoo');
  console.log(isLoading, 'isLoading');

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isLoading ? (
        <View style={{minHeight: 84, justifyContent: 'center'}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={46}
                height={46}
                borderRadius={5}
              />
              <SkeletonPlaceholder.Item marginLeft={spacingSizes.md}>
                <SkeletonPlaceholder.Item
                  width={140}
                  height={16}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  width={240}
                  height={12}
                  marginTop={6}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  width={240}
                  height={12}
                  marginTop={6}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={zoo}
          keyExtractor={(item, index) => String(index)}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <View style={styles.screen}>
              <Text>Zoo list</Text>
            </View>
          }
          ListEmptyComponent={<Text>No zoo found</Text>}
          renderItem={({item}) => (
            <View style={styles.screen}>
              <Text>{item.name}</Text>
              <FastImage
                style={{width: 150, height: 120}}
                source={{
                  uri: item.image_link,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};
export default ZooScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
