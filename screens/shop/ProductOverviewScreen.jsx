import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Platform,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item, Items } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";

const Productoverviewscreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItem = (id, title) => {
    props.navigation.navigate("ProductsDetails", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      initialNumToRender={10}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imgUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItem(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.accent}
            title="View Details"
            onPress={() => selectItem(itemData.item.id, itemData.item.title)}
          ></Button>
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          ></Button>
        </ProductItem>
      )}
    />
  );
};
Productoverviewscreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "All Products",
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
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            NavData.navigation.navigate("CartScreen");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default Productoverviewscreen;
