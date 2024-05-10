import { View, Text, StyleSheet } from "react-native";
import colors from "../../configs/colors";
import availableCubeColors from "../../configs/availableCubeColors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";
import { useEffect, useState, useCallback } from "react";
import { Button, TextInput } from "react-native-paper";
import Task from "../../components/Task";
import { useContext } from "react";
import { CubeContext } from "../../components/CubeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fonts from "../../configs/fonts";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const Active = () => {
  return (
    <View style={styles.checked}>
      <Icon name="check-box" color={colors.unfocusedBottomTab} size={18} />
    </View>
  );
};

const CubeSideDetails = ({ route, navigation }) => {
  const updateCube = useCallback(async (id, name, color) => {
    const values = { name: name, color: color };
    try {
      await AsyncStorage.setItem(id.toString(), JSON.stringify(values));
    } catch (e) {
      console.log("Error saving data");
    }
  }, []);

  const { number, name, colorName } = route.params;
  const [activeColor, setActiveColor] = useState(colorName);
  const [activeName, setActiveName] = useState();

  useEffect(() => {
    setActiveName(name);
  }, []);

  const availableColors = Object.keys(availableCubeColors).map((color) => {
    return (
      <TouchableOpacity
        key={color}
        onPress={() => {
          setActiveColor(color);
        }}
      >
        <View
          style={[
            {
              backgroundColor: availableCubeColors[color].dim,
              borderLeftColor: availableCubeColors[color].bright,
            },
            styles.colorOption,
          ]}
        >
          {activeColor === color ? <Active /> : <Text></Text>}
        </View>
      </TouchableOpacity>
    );
  });

  previewBoxBg = availableCubeColors[activeColor].dim;
  previewBoxBorder = availableCubeColors[activeColor].bright;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.taskNameBox,
          { backgroundColor: previewBoxBg, borderColor: previewBoxBorder },
        ]}
      >
        <Text style={styles.taskNameText}>{activeName}</Text>
      </View>
      <TextInput
        label={<Text style={styles.textInputLabel}>TaskName:</Text>}
        value={activeName}
        onChangeText={(text) => setActiveName(text)}
        style={{
          width: 250,
          margin: 10,
          height: 60,
          overflow: "hidden",
          borderColor: colors.unfocusedBottomTab,
        }}
        contentStyle={{
          color: colors.primaryText,
          backgroundColor: colors.secondaryBackground,
          includeFontPadding: false,
          fontFamily: fonts.Light,
          fontSize: 18,
        }}
        theme={{
          colors: {
            primary: colors.focusedBottomTab,
            background: colors.secondaryBackground,
          },
        }}
        underlineColor={colors.unfocusedBottomTab}
        selectionColor={colors.focusedBottomTab}
      />
      <View style={styles.colorContainer}>{availableColors}</View>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons
            name="cancel"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 10, marginTop: 2 }}
          />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            updateCube(number, activeName, activeColor);
            navigation.navigate("Configure", { refresh: true });
          }}
        >
          <FontAwesome
            name="check"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 10, marginTop: 2 }}
          />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    alignItems: "center",
  },
  number: {
    fontSize: 30,
    color: colors.primaryText,
    margin: 20,
  },
  textInputLabel: {
    color: colors.unfocusedBottomTab,
    fontSize: 16,
    fontFamily: fonts.Regular,
  },

  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: 300,
    marginTop: 30,
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

  colorOption: {
    height: 50,
    width: 50,
    borderRadius: 3,
    borderLeftWidth: 5,
    margin: 4,
  },

  checked: {
    position: "absolute",
    top: 2,
    right: 2,
  },

  buttonBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    borderTopWidth: 1,
    borderTopColor: colors.unfocusedBottomTab,
  },

  saveButton: {
    marginVertical: 20,
    marginLeft: 20,
    width: 150,
    borderRadius: 5,
    backgroundColor: colors.saveButton,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
  },

  cancelButton: {
    marginVertical: 20,
    width: 150,
    backgroundColor: colors.error,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
  },

  taskNameText: {
    color: colors.primaryText,
    fontSize: 20,
    top: 10,
    left: 10,
    fontFamily: fonts.Regular,
  },

  taskNameBox: {
    margin: 30,
    borderLeftWidth: 6,
    borderRadius: 5,
    height: 70,
    width: 200,
  },

  buttonText: {
    color: colors.primaryText,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
});

export default CubeSideDetails;
