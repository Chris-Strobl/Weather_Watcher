import React, { useRef } from 'react';
import './Home.css'
import Input from '../components/LocationInput';
import { Button } from '@/components/ui/button';
import arrow_right from '../assets/arrow_right.svg';

export default function Home () {

  const locationInputRef = useRef(null);

  function handleInputButtonClick() {
    if(locationInputRef.current) {
      locationInputRef.current.triggerSelection();
    };
  };

  return (
    <div className="home-container">
      <div className="location-input-container flex max-w-md items-center space-x-2">
        <Input ref={locationInputRef} />
        <Button onClick={handleInputButtonClick} className="location-input-button" type="submit">
          <img src={arrow_right} className="arrow-icon" alt="Search button arrow icon"/>
        </Button>
      </div>
    </div>
  );
};
