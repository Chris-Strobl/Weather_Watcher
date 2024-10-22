import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { useDebounce } from '../hooks/use-debounce';

const LocationInput = forwardRef((props, ref) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const debouncedInput = useDebounce(input, 1000);

  const fetchSuggestions = async (query) => {
    if (query.length < 3) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=3`);
      const data = await response.json();
      console.log(data);
      let suggestions = [];
      data.forEach((location) => {
        suggestions.push({ name: location.display_name, lat: location.lat, lon: location.lon});
      });
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    };
  };

  useEffect(() => {
    if (debouncedInput) {
      fetchSuggestions(debouncedInput);
    } else {
      setSuggestions([]);
    }
  }, [debouncedInput]);

  useImperativeHandle(ref, () => ({
    triggerSelection: () => {
      if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    },
  }));

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  const handleSelect = (suggestion) => {
    setSelectedLocation(suggestion);
    setInput(suggestion.name);
    setSuggestions([]);

    console.log(suggestion);

    // TODO: HIDE API KEY
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${suggestion.lat}&lon=${suggestion.lon}&appid=d6661ffa1d140b112ffb5b0c3193d595`).then(res => res.json()).then(data => {
      console.log("API result", data);
      // TODO: Process the API response here => Pass the data to the Location page.
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    }
  };

  return (
    <>
      <input type="text" value={input} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Display weather at..." className="location-input flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-1 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
      {suggestions.length > 0 && (
        <ul className="suggestion-list bg-white shadow-lg rounded-md border w-full border-gray-300">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelect(suggestion)} className="suggestion-list-item cursor-pointer p-2 hover:bg-gray-100 h-12">
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </>
    );
});

export default LocationInput;