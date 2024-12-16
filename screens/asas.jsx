// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from "react-native";

// // Importación Firebase
// import appFirebase from "../firebaseConfig";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";

// const db = getFirestore(appFirebase);

// export default function ListSport(props) {
//   const [list, setList] = useState([]);

//   const navigation = useNavigation();

//   useEffect(() => {
//     const getList = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "sport"));
//         const docs = [];
//         querySnapshot.forEach((doc) => {
//           const { idsport, namesport } = doc.data();
//           docs.push({
//             id: doc.id,
//             idsport,
//             namesport,
//           });
//         });
//         setList(docs);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getList();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.listContainer}>
//         {list.map((item) => (
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("Schedule", { sportName: item.namesport })
//             }
//             key={item.id}
//             style={styles.card}
//           >
//             <Image
//               source={{
//                 uri: "https://sopenaonline.org/wp-content/uploads/2022/04/deporte-aire-libre-beneficios-1030x580.jpg",
//               }}
//               style={styles.image}
//             />
//             <Text style={styles.cardText}>{item.namesport}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContainer: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   Boton: {
//     backgroundColor: "cyan",
//     height: 35,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     marginBottom: 20,
//   },
//   TextBoton: {
//     fontSize: 18,
//   },
//   TextoTitulo: {
//     textAlign: "center",
//     marginTop: 10,
//     marginBottom: 20,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   listContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//   },
//   card: {
//     backgroundColor: "#FFD391",
//     borderRadius: 10,
//     marginBottom: 20,
//     overflow: "hidden",
//     width: 150,
//     height: 200,
//     alignItems: "center",
//   },
//   image: {
//     width: "100%",
//     height: "70%",
//   },
//   cardText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//     padding: 5,
//   },
// });
