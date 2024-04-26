import { createStackNavigator } from "@react-navigation/stack";
import Configure from "./configure/Configure";
import CubeSideDetails from "./configure/CubeSideDetails";
import colors from "../configs/colors";

const Stack = createStackNavigator();

const ConfigureScreen = ({ route }) => {
  const cubes = route.params.cubes;
  return (
    <Stack.Navigator
      initialRouteName="Configure"
      screenOptions={{
        cardStyle: { backgroundColor: colors.primaryBackground },
        animationEnabled: false,
      }}
      animated={false}
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
            backgroundColor: colors.primaryBackground,
          },
          headerTintColor: colors.primaryText,
        })}
      />
    </Stack.Navigator>
  );
};

export default ConfigureScreen;
