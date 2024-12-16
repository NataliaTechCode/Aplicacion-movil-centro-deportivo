// eslint-disable-next-line import/namespace
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default function ShowMonthly(props) {
  const initialState = {
    CI: "",
  };

  const [state, setState] = useState(initialState);

  const handleChangeText = (value, name) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <ImageBackground
      source={require("../assets/fondo.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mensualidad</Text>

        <View style={styles.card}>
          <Text style={styles.label}>CI:</Text>

          <TextInput
            style={styles.input}
            placeholder="CI"
            placeholderTextColor="#8D8D8D"
            keyboardType="numeric"
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              handleChangeText(
                numericValue === "" ? "" : Number(numericValue),
                "CI",
              );
            }}
            value={state.CI.toString()}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              props.navigation.navigate("MonthlyStudent", { CI: state.CI })
            }
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    top: 50,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  card: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: "#8D8D8D",
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#8D8D8D",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#000",
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#188fd1",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
