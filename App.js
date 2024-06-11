import { StyleSheet, View, StatusBar, Text, SafeAreaView } from "react-native";
import Timeline from "./screens/Timeline";
import Stats from "./screens/Stats";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import ConfigureScreen from "./screens/ConfigureScreen";
import colors from "./configs/colors";
import { Icon, PaperProvider, BottomNavigation } from "react-native-paper";
import { useFonts } from "expo-font";
import fonts from "./configs/fonts";

const App = () => {
  const [index, setIndex] = useState(0);

  let [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsItalic: require("./assets/fonts/Poppins-Italic.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    ChakraRegular: require("./assets/fonts/ChakraPetch-Regular.ttf"),
    ChakraBold: require("./assets/fonts/ChakraPetch-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <StatusBar
              animated={true}
              backgroundColor={colors.secondaryBackground}
            />
            <BottomNavigation
              keyboardHidesNavigationBar={true}
              barStyle={{
                backgroundColor: colors.secondaryBackground,
                marginTop: 5,
              }}
              renderLabel={({ route, focused }) => {
                return (
                  <Text
                    style={{
                      color: focused
                        ? colors.focusedBottomTab
                        : colors.unfocusedBottomTab,
                      fontFamily: fonts.Light,
                      alignSelf: "center",
                      fontSize: 12,
                    }}
                  >
                    {route.title}
                  </Text>
                );
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
              activeIndicatorStyle={{
                backgroundColor: colors.focusedBottomTab,
                height: 2,
                marginTop: 85,
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
                },
              }}
            />
          </View>
        </SafeAreaView>
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
