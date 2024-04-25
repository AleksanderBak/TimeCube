const CubeSideDetails = ({ route }) => {
  const { number, name, color } = route.params;
  return (
    <View style={styles.container}>
      <Text>Number: {number}</Text>
      <Text>Name: {name}</Text>
      <Text>Color: {color}</Text>
    </View>
  );
};

export default CubeSideDetails;
