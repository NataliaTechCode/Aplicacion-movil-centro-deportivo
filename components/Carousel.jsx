// import React, { useRef, useEffect, useState } from "react";
// import { View, Image, FlatList, Dimensions, StyleSheet } from "react-native";

// const images = [
//   require("../assets/Image_1.jpg"),
//   require("../assets/Image_2.jpg"),
//   require("../assets/Image_3.jpg"),
//   require("../assets/Image_4.jpg"),
// ];

// const Carousel = () => {
//   console.log("DSA");
//   const flatListRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const screenWidth = Dimensions.get("window").width;

//   useEffect(() => {
//     // eslint-disable-next-line no-undef
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // Cambia la imagen cada 3 segundos

//     // eslint-disable-next-line no-undef
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToIndex({
//         animated: true,
//         index: currentIndex,
//       });
//     }
//   }, [currentIndex]);

//   return (
//     <View style={styles.carouselContainer}>
//       <FlatList
//         ref={flatListRef}
//         data={images}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(_, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={[styles.imageContainer, { width: screenWidth / 2 }]}>
//             <Image source={item} style={styles.image} />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   carouselContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   imageContainer: {
//     height: 200, // Puedes ajustar la altura del carrusel aquí
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
// });

// export default Carousel;
