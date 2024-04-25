import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Configure from "./Configure";
import CubeSideDetails from "./CubeSideDetails";
import TestScreen from "./TestScreen";
const Stack = createStackNavigator();

const ConfigureScreen = ({ route }) => {
  const cubes = route.params.cubes;
  return (
    <Stack.Navigator
      initialRouteName="Configure"
      screenOptions={{
        cardStyle: { backgroundColor: "#121212" },
      }}
    >
      <Stack.Screen
        name="Configure"
        component={Configure}
        initialParams={cubes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CubeSideDetails"
        component={CubeSideDetails}
        options={({ route }) => ({
          headerTitle: route.params.name,
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "white",
        })}
      />
      {/* <Stack.Screen name="Configure" component={Configure} initialParams={cubes}/>
        <Stack.Screen name="CubeSideDetails" component={CubeSideDetails} /> */}
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default ConfigureScreen;
