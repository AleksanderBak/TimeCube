import { useState, useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CubeSide from "../../components/CubeSide";
import LoadingScreen from "../../components/LoadingScreen";

import availableColors from "../../configs/availableCubeColors";
import cubeConfig from "../../configs/cubeConfig";

const Configure = ({ route, navigation }) => {
  const [cubes, setCubes] = useState();

  const getData = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      let resultObject = {};
      result.forEach((item) => {
        resultObject[item[0]] = JSON.parse(item[1]);
      });
      return resultObject;
    } catch (e) {
      console.log("No value");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await getData();
        setCubes(data);
      };
      fetchData();
    }, [])
  );

  return cubes ? (
    <View style={styles.container}>
      <CubeSide
        number={2}
        name={cubes[2] ? cubes[2].name : cubeConfig[2].name}
        color={
          cubes[2]
            ? availableColors[cubes[2].color]
            : availableColors[cubeConfig[2].color]
        }
        colorName={cubes[2] ? cubes[2].color : cubeConfig[2].color}
        navigation={navigation}
      />
      <View style={styles.containerRow}>
        <CubeSide
          number={4}
          name={cubes[4] ? cubes[4].name : cubeConfig[4].name}
          color={
            cubes[4]
              ? availableColors[cubes[4].color]
              : availableColors[cubeConfig[4].color]
          }
          navigation={navigation}
          colorName={cubes[4] ? cubes[4].color : cubeConfig[4].color}
        />
        <CubeSide
          number={6}
          name={cubes[6] ? cubes[6].name : cubeConfig[6].name}
          color={
            cubes[6]
              ? availableColors[cubes[6].color]
              : availableColors[cubeConfig[6].color]
          }
          navigation={navigation}
          colorName={cubes[6] ? cubes[6].color : cubeConfig[6].color}
        />
        <CubeSide
          number={3}
          name={cubes[3] ? cubes[3].name : cubeConfig[3].name}
          color={
            cubes[3]
              ? availableColors[cubes[3].color]
              : availableColors[cubeConfig[3].color]
          }
          navigation={navigation}
          colorName={cubes[3] ? cubes[3].color : cubeConfig[3].color}
        />
      </View>
      <CubeSide
        number={5}
        name={cubes[5] ? cubes[5].name : cubeConfig[5].name}
        color={
          cubes[5]
            ? availableColors[cubes[5].color]
            : availableColors[cubeConfig[5].color]
        }
        navigation={navigation}
        colorName={cubes[5] ? cubes[5].color : cubeConfig[5].color}
      />
      <CubeSide
        number={1}
        name={cubes[1] ? cubes[1].name : cubeConfig[1].name}
        color={
          cubes[1]
            ? availableColors[cubes[1].color]
            : availableColors[cubeConfig[1].color]
        }
        colorName={cubes[1] ? cubes[1].color : cubeConfig[1].color}
        navigation={navigation}
      />
    </View>
  ) : (
    <LoadingScreen />
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  containerRow: {
    flexDirection: "row",
  },
};

export default Configure;
