// import React, { useState } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// import Rating from "./Rating";
// import TextCollapseChallange from "./Challenge";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Rating
      maxStar={5}
      messages={["poor", "average", "good", "amazing", "perfect"]}
      defaultRating={6}
    />
    <Rating maxStar={10} size={24} color="red" defaultRating={4} />
    <RatingUsedOnOther /> */}
    {/* <TextCollapseChallange /> */}
  </React.StrictMode>
);

// function RatingUsedOnOther() {
//   const [rating, setRating] = useState(0);
//   return (
//     <>
//       <Rating maxStar={5} size={52} color="blue" onSetRating={setRating} />
//       <p>This movie was rated {rating} stars</p>
//     </>
//   );
// }
