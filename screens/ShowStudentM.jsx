// eslint-disable-next-line import/namespace
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

// Importación Firebase
import appFirebase from "../firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const db = getFirestore(appFirebase);
const formatDate = (dateString) => {
  if (!dateString) return "Fecha no disponible";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function ShowStudentM({ route }) {
  const { CI } = route.params;
  const [monthly, setMonthly] = useState([]);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const getMonthly = async () => {
      try {
        const q = query(collection(db, "monthly"), where("ci", "==", CI));
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
          const {
            idmonthly,
            ci,
            startdate,
            enddate,
            schedule,
            sport,
            student,
          } = doc.data();
          docs.push({
            id: doc.id,
            idmonthly,
            ci,
            startdate,
            enddate,
            schedule,
            sport,
            student,
          });
        });
        setMonthly(docs);
        if (docs.length > 0) setStudentName(docs[0].student);
      } catch (error) {
        console.log(error);
      }
    };
    getMonthly();
  }, [CI]);

  const formatSchedule = (schedule) => {
    if (!schedule) {
      return "Horario sin asignar";
    }

    const [start, end] = schedule.split(" ");

    if (
      !start ||
      !end ||
      isNaN(new Date(start).getTime()) ||
      isNaN(new Date(end).getTime())
    ) {
      return "Horario sin asignar";
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const formatTime = (date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    };

    return `${formatTime(startDate)} - ${formatTime(endDate)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.studentName}>{studentName}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {monthly.map((monthly, index) => (
          <View key={monthly.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>Mensualidad #{index + 1}</Text>
              <View>
                <Text>Horario:</Text>
                <Text style={styles.dateText}>
                  {formatSchedule(monthly.schedule)}
                </Text>
              </View>
            </View>

            <Text style={styles.sportText}>{monthly.sport}</Text>

            <View style={styles.footer}>
              <Text style={styles.subtitle}>Fecha de inicio:</Text>
              <Text style={styles.detailText}>
                {formatDate(monthly.startdate)}
              </Text>
              <Text style={styles.subtitle}>Fecha de vencimiento:</Text>
              <Text style={styles.detailText}>
                {formatDate(monthly.enddate)}
              </Text>
            </View>
          </View>
        ))}
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#75b403",
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#black",
  },
  content: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#FFD391",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  dateText: {
    fontSize: 14,
    color: "#000",
    textAlign: "right",
  },
  sportText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    marginBottom: 10,
  },
  footer: {
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: "black",
    marginBottom: 10,
  },
});
