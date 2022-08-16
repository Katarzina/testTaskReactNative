import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const MainScreen = (props: any) => {
  return (
    <View style={styles.screen}>
      <Text>Main Screen</Text>
      <Button
        onPress={() => props.navigation.navigate('ZooScreen')}
        title="Go to Zoo Screen"
      />
    </View>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
