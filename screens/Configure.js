import { View, Text } from "react-native";
import CubeSide from "../components/CubeSide";
import cubeColors from "../configs/cubeColors";

const Configure = ({ route }) => {
  const cubes = route.params.cubes;
  return (
    <View style={styles.container}>
      <CubeSide
        number={2}
        name={cubes[2].Name}
        color={cubeColors[cubes[2].Color]}
      />
      <View style={styles.containerRow}>
        <CubeSide
          number={4}
          name={cubes[4].Name}
          color={cubeColors[cubes[4].Color]}
        />
        <CubeSide
          number={6}
          name={cubes[6].Name}
          color={cubeColors[cubes[6].Color]}
        />
        <CubeSide
          number={3}
          name={cubes[3].Name}
          color={cubeColors[cubes[3].Color]}
        />
      </View>
      <CubeSide
        number={5}
        name={cubes[5].Name}
        color={cubeColors[cubes[5].Color]}
      />
      <CubeSide
        number={1}
        name={cubes[1].Name}
        color={cubeColors[cubes[1].Color]}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  containerRow: {
    flexDirection: "row",
  },
};

export default Configure;
