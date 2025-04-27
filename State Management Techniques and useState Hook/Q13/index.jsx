import React, { useState } from 'react';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const handleAddItem = () => {
    if (!itemName || itemQuantity < 1) {
      alert('Please enter a valid item name and quantity greater than 0.');
      return;
    }
    const newItem = {
      name: itemName,
      quantity: itemQuantity
    };
    setItems([...items, newItem]);
    setItemName('');
    setItemQuantity('');
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  const handleClearAll = () => {
    setItems([]);
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <div>
        <input
          type="text"
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} kg
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleClearAll}>Clear All</button>
    </div>
  );
}

export default ShoppingList;