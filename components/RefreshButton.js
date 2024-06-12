import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../configs/colors";
import { Ionicons } from "@expo/vector-icons";

const RefreshButton = ({ refreshFunction }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          refreshFunction();
        }}
      >
        <Ionicons name="reload" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    borderRadius: 25,
    height: 70,
    width: 70,
  },

  text: {
    color: colors.primaryText,
    margin: 20,
    fontSize: 25,
  },
});

export default RefreshButton;
