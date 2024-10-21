import React from 'react';
import './Home.css'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import arrow_right from '../assets/arrow_right_white.svg';

export default function Home () {
  return (
    <div className="home-container">
      <div className="location-input-container flex max-w-md items-center space-x-2">
        <Input className="location-input" type="text" placeholder="Display weather at..." />
        <Button className="location-input-button" type="submit">
          <img src={arrow_right} className="arrow-icon" alt="Search button arrow icon"/>
        </Button>
      </div>
    </div>
  );
};
