import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Text,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import * as productsActions from "../../store/actions/products";
const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidation = {
        ...state.inputValidation,
        [action.input]: action.isValid,
      };
      let updateFormIsValid = true;
      for (const key in updatedValidation) {
        updateFormIsValid = updateFormIsValid && updatedValidation[key];
      }
      return {
        formIsValid: updateFormIsValid,
        inputValues: updatedValues,
        inputValidation: updatedValidation,
      };
    default:
      return state;
  }
};

const EditProductScreen = (props) => {
  console.log("Rendered");
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imgUrl : "",
      price: editedProduct ? editedProduct.price : "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidation: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    console.log(formState);
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please check for errors in your input", [
        { text: "Okay" },
      ]);
    } else {
      if (editedProduct) {
        dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
            +formState.inputValues.price
          )
        );
      } else {
        dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    }
  }, [formState, dispatch, prodId]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (text, input) => {
    let isValid = true;
    if (text.trim().length === 0) {
      isValid = false;
    } else {
      isValid = true;
    }
    formDispatch({
      type: FORM_UPDATE,
      value: text,
      isValid: isValid,
      input: input,
    });
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={(text) => textChangeHandler(text, "title")}
          />
          {!formState.inputValidation.title && (
            <Text>Please enter a valid title!</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => textChangeHandler(text, "imageUrl")}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.price.toString()}
            onChangeText={(text) => textChangeHandler(text, "price")}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(text) => textChangeHandler(text, "description")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (NavData) => {
  const submitFn = NavData.navigation.getParam("submit");
  return {
    title: NavData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={
            Platform.OS === "android"
              ? "md-checkmark-circle"
              : "ios-checkmark-circle"
          }
          onPress={submitFn}
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
