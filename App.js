import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Timeline from "./screens/Timeline";
import Stats from "./screens/Stats";
import LoadingScreen from "./screens/LoadingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState, useCallback } from "react";
import firebaseConfig from "./configs/firebaseConfig";
import ConfigureScreen from "./screens/ConfigureScreen";
import colors from "./configs/colors";

const Tab = createBottomTabNavigator();

const App = () => {
  const [tasks, setTasks] = useState();
  const [cubes, setCube] = useState();

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const getData = useCallback(async () => {
    let taskResult = [];
    let cubeResult = {};
    const taskQuerySnapshot = await getDocs(collection(db, "Tasks"));
    const cubeQuerySnapshot = await getDocs(collection(db, "CubeSides"));
    taskQuerySnapshot.forEach((task) => {
      taskResult.push({
        id: task.id,
        CubeId: task.data().CubeId,
        StartTime: task.data().StartTime.seconds,
        StopTime: task.data().StopTime.seconds,
      });
    });
    setTasks(taskResult);

    cubeQuerySnapshot.forEach((cube) => {
      cubeResult[cube.id] = {
        Name: cube.data().Name,
        Color: cube.data().Color,
      };
    });

    setCube(cubeResult);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {tasks && cubes ? (
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Timeline"
              backBehavior="history"
              sceneContainerStyle={styles.sceneContainer}
              screenOptions={{
                tabBarActiveTintColor: colors.bottomTabActive,
                tabBarInactiveTintColor: colors.bottomTabInactive,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                  fontSize: 15,
                  paddingBottom: 10,
                },
                tabBarStyle: {
                  backgroundColor: colors.secondaryBackground,
                  height: 70,
                  borderTopWidth: 1.5,
                },
                headerShown: false,
                tabBarIconStyle: {
                  marginTop: 10,
                },
              }}
            >
              <Tab.Screen
                name="Timeline"
                component={Timeline}
                initialParams={{ tasks: tasks, cubes: cubes }}
                options={{
                  tabBarLabel: "Timeline",
                  tabBarIcon: ({ color }) => (
                    <Icon name="date-range" color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Stats"
                component={Stats}
                options={{
                  tabBarLabel: "Stats",
                  tabBarIcon: ({ color }) => (
                    <Icon name="insights" color={color} />
                  ),
                }}
              />
              {/* <ConfigureScreen props={{ tasks: tasks, cubes: cubes }} /> */}
              <Tab.Screen
                name="ConfigureScreen"
                component={ConfigureScreen}
                initialParams={{ cubes: cubes }}
                options={{
                  tabBarLabel: "Configure",
                  tabBarIcon: ({ color }) => (
                    <Icon name="casino" color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <LoadingScreen />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
  },
  sceneContainer: {
    backgroundColor: colors.primaryBackground,
  },
});

export default App;
