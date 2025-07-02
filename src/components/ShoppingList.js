import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // useEffect hook
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((resp) => resp.json())
      .then((items) => setItems(items))
    }, [])

  // call setItems in component with a new list of items that does not contain deleted item
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id)
    setItems(updatedItems);
  }

  // add a callback function and pass it as a prop to the Item component
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if(item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    });
    setItems(updatedItems);
  }

  // add handleAddItem function and pass a reference as a prop on onAddItem to ItemForm
  function handleAddItem(newItem) {
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/* pass it as a prop to Item */}
        {itemsToDisplay.map((item) => (
          <Item 
            key={item.id} 
            item={item} 
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
