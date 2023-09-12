import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function FriendList({ friends, selectedFriend, onSelection }) {
  return (
    <ul>
      {friends.map((friend) => (
        <FriendListCard
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
          friend={friend}
        />
      ))}
    </ul>
  );
}

function FriendListCard({ friend, selectedFriend, onSelection }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected && "selected"}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const friend = { name, image: `${image}?=${id}`, balance: 0, id: id };
    onAddFriend(friend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤦‍♂️ Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const paidByFriend = bill ? bill - userExpense : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !userExpense) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -userExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {selectedFriend.name}</h2>

      <label>🤑 Bill Amount</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🤦‍♂️ Your expenses</label>
      <input
        type="number"
        value={userExpense}
        onChange={(e) =>
          setUserExpense(
            Number(e.target.value) > bill ? userExpense : Number(e.target.value)
          )
        }
      />

      <label>🏌️ {selectedFriend.name}'s expenses</label>
      <input type="number" disabled value={paidByFriend} />

      <label>🤑 Who is Paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value={"user"}>You</option>
        <option value={"friend"}>{selectedFriend.name}</option>
      </select>

      <Button>Spilt Bill</Button>
    </form>
  );
}
const App = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    //set selected with logic if close is clicked the set to null.
    setSelectedFriend((curr) => (curr?.id === friend?.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  console.log(crypto.randomUUID());

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
};

export default App;
