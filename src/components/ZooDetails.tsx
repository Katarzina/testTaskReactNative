import {ZooType} from '../models/zoo';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Spinner from '../components/Spinner';
import {colors, spacingSizes} from '../theme';

export type ZooDetailsProps = {
  zoo: ZooType;
};

const ZooDetails = ({zoo}: ZooDetailsProps) => {
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  return (
    <View style={styles.screen}>
      <View style={styles.view}>
        <Text style={{fontWeight: 'bold'}}>Name:</Text>
        <Text>{zoo.name}</Text>
        <View style={styles.row}>
          <Text style={{fontWeight: 'bold'}}>Type:</Text>
          <Text>{zoo.animal_type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{fontWeight: 'bold'}}>Length:</Text>
          <Text>
            {zoo.length_min}-{zoo.length_max}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{fontWeight: 'bold'}}>Weight:</Text>
          <Text>
            {zoo.weight_min}-{zoo.weight_max}
          </Text>
        </View>
        <Text style={{fontWeight: 'bold'}}>Geo Range:</Text>
        <Text>{zoo.geo_range}</Text>
      </View>
      {loadingImage && (
        <View style={styles.zoo}>
          <Spinner color="dark" size="sm" />
        </View>
      )}
      <FastImage
        style={{width: 150, height: 120}}
        source={{
          uri: zoo.image_link,
          priority: FastImage.priority.normal,
        }}
        onLoadEnd={() => setLoadingImage(false)}
      />
    </View>
  );
};

export default ZooDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacingSizes.md,
  },
  view: {
    flex: 1,
    flexWrap: 'nowrap',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  zoo: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 15,
  },
});
