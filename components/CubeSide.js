import { View, Text, TouchableOpacity } from "react-native";

const CubeSide = ({ number, color, name }) => {
  let bgColor = color.dim;
  let borderColor = color.bright;

  return (
    <TouchableOpacity
      style={[
        styles.sideContainer,
        { backgroundColor: bgColor, borderTopColor: borderColor },
      ]}
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
    color: "white",
  },
  sideText: {
    fontSize: 12,
    color: "white",
  },
};
export default CubeSide;
