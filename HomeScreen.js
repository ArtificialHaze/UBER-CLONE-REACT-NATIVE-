import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import React from "react";
import NavOptions from "./NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "./navSlice";
import NavFavorites from "./NavFavorites";

const GOOGLE_MAPS_APIKEY = "";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Text style={{ width: 100, height: 100, resizeMode: "contain" }}>
          UBER
        </Text>
        <GooglePlacesAutocomplete
          styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "EN",
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          returnKeyTpye={"search"}
          fetchDetails={true}
          minLength={2}
          enablePoweredByContainer={false}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where from?"
        />
        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
