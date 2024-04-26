import { View, Text, TouchableOpacity } from "react-native";
import colors from "../configs/colors";

const CubeSide = ({ number, color, name, navigation }) => {
  let bgColor = color.dim;
  let borderColor = color.bright;

  return (
    <TouchableOpacity
      style={[
        styles.sideContainer,
        { backgroundColor: bgColor, borderTopColor: borderColor },
      ]}
      onPress={() =>
        navigation.navigate("CubeSideDetails", {
          number,
          name,
          bgColor,
          borderColor,
        })
      }
    >
      <Text style={styles.sideNumber}>{number}</Text>
      <Text style={styles.sideText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  sideContainer: {
    height: 120,
    width: 120,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderTopWidth: 5,
  },
  sideNumber: {
    fontSize: 30,
    color: colors.primaryText,
  },
  sideText: {
    fontSize: 12,
    color: colors.primaryText,
  },
};
export default CubeSide;
