import { ActivityIndicator, View, StyleSheet, Text } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading</Text>
      <ActivityIndicator size="huge" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#171717",
  },

  text: {
    color: "white",
    margin: 20,
    fontSize: 25,
  },
});

export default LoadingScreen;
