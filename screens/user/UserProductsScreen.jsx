import React from "react";
import { FlatList, StyleSheet, Text, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item, Items } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/products";
const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imgUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => editProductHandler(itemData.item.id)}
        >
          <Button
            color={Colors.accent}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          ></Button>
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productActions.deleteProduct(itemData.item.id));
            }}
          ></Button>
        </ProductItem>
      )}
    ></FlatList>
  );
};

UserProductsScreen.navigationOptions = (NavData) => {
  return {
    title: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            NavData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            NavData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
