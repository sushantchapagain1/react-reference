import React from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

import CityItem from "./CityItem";

function CityList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return (
      <Message
        message={"Add your first city on list by selecting on the map ! "}
      />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
