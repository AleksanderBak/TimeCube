import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import colors from "../configs/colors";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading</Text>
      <ActivityIndicator size="huge" color={colors.primaryText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryBackground,
  },

  text: {
    color: colors.primaryText,
    margin: 20,
    fontSize: 25,
  },
});

export default LoadingScreen;
