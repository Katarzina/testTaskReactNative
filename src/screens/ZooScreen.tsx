import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Text,
  FlatList,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useQuery} from 'react-query';
import getZooAnimalsService from '../services/getZooAnumals';
import SkeletonPlaceholder from '../components/SkeletonPlaceholder';
import {headingSizes, spacingSizes} from '../theme';
import ZooDetails from '../components/ZooDetails';

export const WIDTH = Dimensions.get('window').width;
const ZooScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {data: zoo, isLoading} = useQuery({
    queryFn: () => getZooAnimalsService(),
    queryKey: ['zoo'],
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isLoading ? (
        <View style={{minHeight: 84, justifyContent: 'center'}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              alignItems="center"
              marginLeft={spacingSizes.md}>
              <SkeletonPlaceholder.Item
                width={WIDTH - 50}
                height={100}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width={WIDTH - 50}
                height={100}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width={WIDTH - 50}
                height={100}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width={WIDTH - 50}
                height={100}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={zoo}
          keyExtractor={(item, index) => String(index)}
          ListHeaderComponent={
            <View style={styles.screen}>
              <Text style={styles.text}>Zoo list</Text>
            </View>
          }
          ListEmptyComponent={<Text>No zoo found</Text>}
          renderItem={({item}) => <ZooDetails zoo={item} />}
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
    padding: spacingSizes.xs,
  },
  text: {
    size: headingSizes.lg,
    fontWeight: 'bold',
  },
});
