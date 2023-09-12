import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} key={crypto.randomUUID()} />
      ) : (
        <DifferentContent />
      )}

      {/* This will render the component in the ui but its doesnot have its state its sate is passed to parent component
          calling component () like this will violate the rules of the hooks .
          In a React App We call the multiple component to create a whole app it is ceating its instances  and that intance is conveted to react.createElement 
          these instances are the once which holds the props and state and again convert to DOM ELEMENTS from that finally in UI.
        */}
      {/* {TabContent({ item: content.at(activeTab) })} */}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleUndo() {
    setShowDetails(true);
    setLikes(0);
  }

  function handleUndo2Sec() {
    setTimeout(handleUndo, 2000);
  }

  function handleInc() {
    setLikes((likes) => likes + 1);
  }

  function handleTripleInc() {
    // These will not incease by three times beacuse it is getting like from current value it is taking from state default which is 0
    // setLikes(likes + 1);
    // setLikes(likes + 1);
    // setLikes(likes + 1);
    //likes holds the current value in the state.
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndo2Sec}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

// STEPS HOW REACT RENDERS THE UI.

/*1.Trigger the render of the component there are two ways how the renders are triggered
a. Inital render of the component first time the applications run.
b.State upate happening in one or more component instances. also called re-render which is crate a
Virtual DOM (on initial render the entire component tree and react will transfer to react tree ).
Render process is triggred for entire applications but donot update the dom for all.
When a parent component state changes it re renders all the child components.It is also a lightweight copy of domtree object.


Reaconciliation :Deciding which component needs to be inserted updated and deleted with a latest state changes with the 
help of reconciler(fiber)  also known as heart of react.

Fiber Tree: which is a special internal tree which is based on Virtual DOM tree also called React Element tree and for each DOM element 
and component instances there is a fiber.These Fiber tree is not recreted on every render it is mutable tree so it get updated 
in reconciliation stage. The actual state and props of component are actually stored in internallyy in fiber. Fiber tree is 
Stored in LinkedList.
//2. Then it enters to the render phase (in this process the ui is not changed) the props and state are changed internally changed inside react.
/*3. Then comes the commit phase (render phase and commit phase are known as render phase at one) in this phase 
react writes to the DOM update insert or delete elements.
*/
//4. After commit to the DOM done by react the browser will render the updated UI in browser this process is called Browser paint.

// Diffing : is comparing between elements step by step  between two renders based on their position in the tree.
// is based on two fundamental assumtions:
//1. Two html header or h1 element of diffrent types will produce different trees.
//2.Element with stable key prop will stay the same among renders.

// KEY prop : When the component or element is of same type when not adding key which is a unique identifier
// to a component when there in a render (for eg : adding a same child item) the Virtual DOM tree will desttoy and re create all
// however if we add key it will not be destroyed in the virtual DOM tree and and so its states also.
//It is not noticable in samll 100 200 lists but when there is Application which has thousand of list when item is added
//then destroying all same elements and re creating would be terrable so key prop will prevent it.

// Side Effects : Function that value are comming from outside (modification or
// mutation of varaible outside scope) for eg :
// fetch req, timers and more mutating external variables.

// Pure Functions: Function that has no side effects.varaibles dont change
// outside the scope. (if function input is always the same
// for eg: const areas= {}
// function circleArea(r){
// return 3.14 * r * r ;
// }

// STATE BATCHING : for example in a onClick handler there is a function to reset
// the state for three states so react will not render or commit the chnages three times
// but instead there state will be batched in single state and then commit to the Virtual DOM
