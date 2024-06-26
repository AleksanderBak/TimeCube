import { Text, TouchableOpacity } from "react-native";
import colors from "../configs/colors";
import fonts from "../configs/fonts";

const CubeSide = ({ number, color, name, navigation, colorName }) => {
  const bgColor = color.dim;
  const borderColor = color.bright;
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
          colorName,
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
    padding: 10,
    borderTopWidth: 5,
  },
  sideNumber: {
    fontSize: 30,
    color: colors.primaryText,
    fontFamily: fonts.Regular,
  },
  sideText: {
    fontSize: 12,
    color: colors.primaryText,
    fontFamily: fonts.Regular,
  },
};
export default CubeSide;
