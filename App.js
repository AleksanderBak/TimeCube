import { StyleSheet, View } from "react-native";
import Timeline from "./screens/Timeline";
import Stats from "./screens/Stats";
import LoadingScreen from "./screens/LoadingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState, useCallback } from "react";
import firebaseConfig from "./configs/firebaseConfig";
import ConfigureScreen from "./screens/ConfigureScreen";
import colors from "./configs/colors";
import { Icon, PaperProvider, BottomNavigation } from "react-native-paper";
import cubeConfig from "./configs/cubeConfig";

const App = () => {
  const [index, setIndex] = useState(0);

  return (
    <PaperProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <BottomNavigation
            keyboardHidesNavigationBar={true}
            barStyle={{
              backgroundColor: colors.secondaryBackground,
              width: "85%",
              alignSelf: "center",
              height: 70,
              bottom: 10,
              borderRadius: 10,
              overflow: "hidden",
              justifyContent: "center",
            }}
            activeColor={colors.focusedBottomTab}
            inactiveColor={colors.unfocusedBottomTab}
            navigationState={{
              index: index,
              routes: [
                {
                  key: "Timeline",
                  title: "Timeline",
                  focusedIcon: "calendar-month",
                  unfocusedIcon: "calendar-blank",
                },
                {
                  key: "Stats",
                  title: "Stats",
                  focusedIcon: "chart-areaspline",
                  unfocusedIcon: "chart-line",
                },
                {
                  key: "ConfigureScreen",
                  title: "Configure",
                  focusedIcon: "dice-5",
                  unfocusedIcon: "dice-5-outline",
                },
              ],
            }}
            renderIcon={({ route, focused }) => {
              return (
                <Icon
                  size={25}
                  source={focused ? route.focusedIcon : route.unfocusedIcon}
                  color={
                    focused
                      ? colors.focusedBottomTab
                      : colors.unfocusedBottomTab
                  }
                />
              );
            }}
            renderScene={({ route }) => {
              switch (route.key) {
                case "Timeline":
                  return <Timeline />;
                case "Stats":
                  return <Stats />;
                case "ConfigureScreen":
                  return <ConfigureScreen />;
                default:
                  return null;
              }
            }}
            onIndexChange={setIndex}
            theme={{
              colors: {
                background: colors.primaryBackground,
                secondaryContainer: colors.focusedBottomTabBackground,
              },
            }}
          />
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
});

export default App;
