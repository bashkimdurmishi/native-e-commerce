import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
const EditProductScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (NavData) => {
  return {
    title: NavData.navigation.getParam() ? "Edit Product" : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={
            Platform.OS === "android"
              ? "md-checkmark-circle"
              : "ios-checkmark-circle"
          }
          onPress={() => {
            NavData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderColor: "#CCC",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
