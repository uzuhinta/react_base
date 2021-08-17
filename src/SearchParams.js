import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { useSelector, useDispatch } from "react-redux";
import changeLocation from "./actionCreator/changeLocation";
import changeAnimal from "./actionCreator/changeAnimal";
import changeBreed from "./actionCreator/changeBreed";
import changeTheme from "./actionCreator/changeTheme";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const animal = useSelector((state) => state.animal);
  const location = useSelector((state) => state.location);
  const theme = useSelector((state) => state.theme);
  const breed = useSelector((state) => state.breed);
  const dispatch = useDispatch();
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json = await res.json();
    console.log(json);
    setPets(json.pets);
  }

  function handleAnimalSelect(e) {
    dispatch(changeBreed(""));
    dispatch(changeAnimal(e.target.value));
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={(e) => dispatch(changeLocation(e.target.value))}
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={handleAnimalSelect}
            onBlur={handleAnimalSelect}
          >
            <option></option>
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => dispatch(changeBreed(e.target.value))}
            onBlur={(e) => dispatch(changeBreed(e.target.value))}
          >
            <option></option>
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
