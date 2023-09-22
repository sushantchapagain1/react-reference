import { useEffect, useState } from "react";
import { useUrlGeoPosition } from "../hooks/useUrlGeoPosition";
import styles from "./Form.module.css";
import Button from "./Button";
import Spinner from "./Spinner";
import Message from "./Message";
import GoBackButton from "./GoBackButton";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isGeoCodingLoading, setIsGeoCodingLoading] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");
  const navigate = useNavigate();

  const [lat, lng] = useUrlGeoPosition();
  const { createCity, isLoading } = useCities();

  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCityReserveGeoCoding() {
      try {
        setIsGeoCodingLoading(true);
        setGeoCodingError("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "This doesnot seems be a country click somewhere else!"
          );

        setCountry(data.countryName || "");
        setCityName(data.cityName || data.locality || "");
        setEmoji(convertToEmoji(data.countryCode));
        setIsGeoCodingLoading(false);
      } catch (error) {
        setGeoCodingError(error.message);
        setIsGeoCodingLoading(false);
      } finally {
        setIsGeoCodingLoading(false);
      }
    }
    fetchCityReserveGeoCoding();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isGeoCodingLoading) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking on the map " />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <>
      <form
        className={`${styles.form} ${isLoading ? styles.loading : ""}`}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <label htmlFor="cityName">City name</label>
          <input
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <span className={styles.flag}>{emoji}</span>
        </div>

        <div className={styles.row}>
          <label htmlFor="date">When did you go to {cityName}?</label>
          <DatePicker
            id="date"
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
            id="notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>

        <div className={styles.buttons}>
          <Button type="primary">Add</Button>
          <GoBackButton />
        </div>
      </form>
    </>
  );
}

export default Form;
