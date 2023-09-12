import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import Stats from "./Stats";
import PackingList from "./PackingList";

const App = () => {
  //brining this state to parent component because we need to provide data in siblings component
  const [items, setItems] = useState([]);

  function handleAdditems(item) {
    // setItems((items) => items.push(item)); throws error since we will muatate the array so in react it is not allowed to do so.
    setItems((items) => [...items, item]);
  }

  // getting the value from child component (children to parent communication)
  function handleRemoveitem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearLists() {
    const confirmed = window.confirm("Are you sure you want to clear the list");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAdditems} />
      <PackingList
        items={items}
        onDeleteItem={handleRemoveitem}
        onToggleItem={handleToggleItem}
        onClearLists={handleClearLists}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;
