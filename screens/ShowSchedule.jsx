import { StyleSheet, Text, View, ScrollView } from "react-native";

// Importación Firebase
import appFirebase from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const db = getFirestore(appFirebase);

export default function ShowSchedule({ route }) {
  const { sportName } = route.params;
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const q = query(
          collection(db, "schedule"),
          where("sport", "==", sportName),
        );
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
          const {
            idschedule,
            coach,
            dayWeek,
            endtime,
            limitStudents,
            sport,
            starttime,
            totalstudents,
          } = doc.data();
          docs.push({
            id: doc.id,
            idschedule,
            coach,
            dayWeek,
            endtime,
            limitStudents,
            sport,
            starttime,
            totalstudents,
          });
        });
        setSchedule(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [sportName]);

  // Función para formatear hora
  const formatTime = (time) => {
    // eslint-disable-next-line no-undef
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(time));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {schedule.length > 0 ? (
          schedule.map((schedule) => {
            // Verificar disponibilidad
            const availability =
              schedule.totalstudents >= schedule.limitStudents
                ? "Ocupado"
                : "Disponible";

            return (
              <View key={schedule.id} style={styles.scheduleContainer}>
                <View style={styles.leftSection}>
                  <View>
                    <Text style={styles.timeText}>
                      {formatTime(schedule.starttime)}
                    </Text>
                    <Text style={styles.timeText}>
                      {formatTime(schedule.endtime)}
                    </Text>
                  </View>
                </View>

                <View style={styles.centerSection}>
                  <View style={styles.coachContainer}>
                    <Text style={styles.coachLabel}>Entrenador:</Text>
                    <Text style={styles.coachText}>{schedule.coach}</Text>
                  </View>
                </View>

                <View style={styles.rightSection}>
                  {schedule.dayWeek.map((day, index) => (
                    <Text key={index} style={styles.dayText}>
                      {day}
                    </Text>
                  ))}
                </View>
                <View>
                  <Text
                    style={[
                      styles.availabilityText,
                      availability === "Ocupado"
                        ? styles.occupied
                        : styles.available,
                    ]}
                  >
                    {availability}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={styles.noScheduleText}>No hay horarios registrados</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  scheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9dc1c",
    padding: 10,
    marginBottom: 10,
    width: "100%",
    // height: 200,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  timeText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  centerSection: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    flex: 2,
  },
  coachContainer: {
    marginLeft: 10,
    width: 120,
  },
  coachLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  coachText: {
    fontSize: 14,
  },
  rightSection: {
    alignItems: "flex-start",
    flex: 1,
  },
  dayText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  availabilityText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  available: {
    color: "green",
  },
  occupied: {
    color: "red",
  },
  noScheduleText: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
});
