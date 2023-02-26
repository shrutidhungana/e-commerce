import { ADD_TO_CART, REMOVE_FROM_CART } from "./ReducerTypes";

const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { cartItems } = state;
      const { currentProductItem } = action;
      let updateCartItems = [...cartItems];
      console.log(updateCartItems, state);

      //if item is added for the first time then we just have to push that item into updateCartItems array
      //if the item is already added in that case we have to check the index of that item and we only have to increase the
      // quantity of that item

      const checkIndexOfCurrentItem = updateCartItems.findIndex(
        (item) => item.id === currentProductItem.id
      );
      if (checkIndexOfCurrentItem === -1) {
        updateCartItems.push({
          ...currentProductItem,
          quantity: 1,
        });
      } else {
        const checkIfTheItemIsAlreadyExists = updateCartItems.find(
          (item) => item.id === updateCartItems[checkIndexOfCurrentItem].id
        );
        console.log(checkIfTheItemIsAlreadyExists);
        updateCartItems[checkIndexOfCurrentItem] = {
          ...checkIfTheItemIsAlreadyExists,
          quantity: checkIfTheItemIsAlreadyExists.quantity + 1,
        };

        console.log(updateCartItems);
      }

      return {
        ...state,
        cartItems: updateCartItems,
      };
    case REMOVE_FROM_CART:
      const { currentIdToBeDeleted, typeOfDelete } = action;
      let updateCartItemsAfterDelete = [...state.cartItems];
      console.log(
        currentIdToBeDeleted,
        typeOfDelete,
        updateCartItemsAfterDelete
      );

      if (typeOfDelete === "partial") {
        const indexOfCurrentItemToBeDeleted =
          updateCartItemsAfterDelete.findIndex(
            (item) => item.id === currentIdToBeDeleted
          );
        updateCartItemsAfterDelete[indexOfCurrentItemToBeDeleted] = {
          ...updateCartItemsAfterDelete[indexOfCurrentItemToBeDeleted],
          quantity:
            updateCartItemsAfterDelete[indexOfCurrentItemToBeDeleted].quantity -
            1,
        };
      } else {
        updateCartItemsAfterDelete = updateCartItemsAfterDelete.filter(
          (item) => item.id !== currentIdToBeDeleted
        );
      }

      return {
        ...state,
        cartItems: updateCartItemsAfterDelete,
      };

    default:
      return state;
  }
};

export default CartReducer;