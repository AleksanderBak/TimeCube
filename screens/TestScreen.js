import { View, Text } from "react-native";

const TestScreen = ({ route }) => {
  const cubes = route.params;
  console.error(cubes);
  <View>
    <Text>Test Screen</Text>
  </View>;
};

export default TestScreen;
