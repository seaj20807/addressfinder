import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { API_URL, API_TOKEN } from "@env";

export default function App() {
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const [address, setAddress] = useState("");

  const getAddress = async (address) => {
    try {
      const response = await fetch(API_URL + address + "&api_key=" + API_TOKEN);
      const data = await response.json();
      setRegion({
        ...region,
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Current"
        />
      </MapView>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAddress(text)}
        />
        <Button title="Show" onPress={() => getAddress(address)} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 8,
    width: "100%",
    height: "100%",
  },
  search: {
    flex: 1,
  },
  input: {
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
  },
});
