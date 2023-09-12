import { useState } from "react";

export default function TextCollapseChallange() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  children,
  collapsedNumWords = 30,
  buttonColor = "blue",
  expandButtonText = "Show More",
  collapseButtonText = "Show Less",
  expanded = false,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const displayText = isExpanded
    ? children
    : String(children).split(" ").slice(0, collapsedNumWords) + "...";

  return (
    <div style={{ border: "1px solid black ", margin: "8px", padding: "12px" }}>
      <span>{displayText}</span>
      <button
        style={{ color: buttonColor, border: "none", background: "none" }}
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
      >
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}

/*
import { useState } from "react";

function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, position, error, getPosition };
}

export default function App() {
  const [countClicks, setCountClicks] = useState(0);
  const { isLoading, error, position, getPosition } = useGeolocation();
  const { lat, lng } = position;

  function handleCountClick() {
    getPosition();
    setCountClicks((countClicks) => countClicks + 1);
  }

  return (
    <div>
      <button onClick={handleCountClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
*/
