import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";

// Importar componentes
import Home from "./screens/Home";
// import ShowSport from "./screens/ShowSport";
// import ListSport from "./screens/ShowSport";
import ShowSport from "./screens/ShowSports";
import ShowActivity from "./screens/activity";
import ShowSchedule from "./screens/ShowSchedule";
import ShowMonthly from "./screens/ShowMonthly";
import ShowStudentM from "./screens/ShowStudentM";
import Information from "./screens/Information";
// import Apps from "./components/as"; // Aquí importamos el componente Apps

export default function App() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#75b403",
    },
    headerTintColor: "#000000",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  function MyStack() {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sport"
          component={ShowSport}
          options={{
            headerTitle: "Deportes",
          }}
        />
        <Stack.Screen
          name="Show"
          component={ShowActivity}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Schedule"
          component={ShowSchedule}
          options={{
            headerTitle: "Horarios",
          }}
        />
        <Stack.Screen
          name="Monthly"
          component={ShowMonthly}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MonthlyStudent"
          component={ShowStudentM}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Information"
          component={Information}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {/* <View style={styles.container}>
          <Apps />
        </View> */}
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Asegura que el contenido se alinee desde arriba
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
