import { View, Text, StyleSheet } from "react-native";

const CubeSideDetails = ({ route }) => {
  const { number, name, bgColor, borderColor } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.number}>Id: {number}</Text>
      <Text style={styles.text}>Task: {name}</Text>
      <View style={styles.colorContainer}>
        <View
          style={[styles.borderContainer, { backgroundColor: borderColor }]}
        ></View>
        <View style={[styles.bgContainer, { backgroundColor: bgColor }]}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 30,
    color: "white",
  },
  text: {
    fontSize: 20,
    color: "white",
  },

  colorContainer: {
    flexDirection: "row",
    margin: 5,
  },

  bgContainer: {
    height: 100,
    width: 100,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  borderContainer: {
    height: 100,
    width: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default CubeSideDetails;
