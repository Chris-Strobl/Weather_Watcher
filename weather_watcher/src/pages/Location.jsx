import React from 'react';
import './Location.css'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import { ChartContainer,ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import cloudIcon from '../assets/cloud.svg';
import clearIcon from '../assets/clear.svg';
import clearNightIcon from '../assets/clear_night.svg';
import mistIcon from '../assets/mist.svg';
import snowIcon from '../assets/snow.svg';
import rainIcon from '../assets/rain.svg';
import thunderIcon from '../assets/thunder.svg';
import { Separator } from "@/components/ui/separator";


export default function Location () {
  const location = useLocation();
  const suggestionData = location.state || {};
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (suggestionData) {
      const fetchWeatherData = async () => {
        try {
          setLoading(true);

          // TODO: HIDE API KEY

          const [currentWeather, forecastWeather] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${suggestionData.lat}&lon=${suggestionData.lon}&units=metric&appid=d6661ffa1d140b112ffb5b0c3193d595`).then(res => res.json()),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${suggestionData.lat}&lon=${suggestionData.lon}&units=metric&appid=d6661ffa1d140b112ffb5b0c3193d595`).then(res => res.json())
          ]);
          setWeatherData({currentWeather: currentWeather, forecastWeather: forecastWeather});

          // TODO: CHART DATA, max and min temps for each day, icon for each day (most common icon)
          

          console.log(weatherData);
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false);
        };
      };
      fetchWeatherData();
    };
  }, [suggestionData]);

  const getCurrentTemp = () => {
    return weatherData.currentWeather.main.temp;
  };

  const getCurrentWeatherIcon = () => {
    return iconFromCode(weatherData.currentWeather.weather[0].id, new Date().getHours());
  };

  const getCurrentWindSpeed = () => {
    return weatherData.currentWeather.wind.speed;
  };

  const getCurrentWindDirection = () => {
    let deg = weatherData.currentWeather.wind.deg;
    if(deg >= 337) {
      return 'N';
    } else if (deg >= 294) {
      return 'NW';
    } else if (deg >= 249) {
      return 'W';
    } else if (deg >= 204) {
      return 'SW';
    } else if (deg >= 159) {
      return 'S';
    } else if (deg >= 114) {
      return 'SE';
    } else if (deg >= 69) {
      return 'E';
    } else if (deg >= 24) {
      return 'NE';
    } else if (deg >= 0) {
      return 'N';
    };
  };

  const iconFromCode = (code, time) => {
      if(code > 800) {
        return cloudIcon;
      } else if (code === 800) {
        if(time >= 6 && time <= 20) {
          return clearIcon;
        } else {
          return clearNightIcon;
        };
      } else if (code >= 700) {
        return mistIcon;
      } else if (code >= 600) {
        return snowIcon;
      } else if (code >= 500) {
        return rainIcon;
      } else if (code >= 300) {
        return rainIcon;
      } else if (code >= 200) {
        return thunderIcon;
      };
  };

  const chartConfig = {
    temperature: {
      label: "Temperature",
      color: "hsl(var(--chart-1))",
    },
    percipitation: {
      label: "Percipitation",
      color: "hsl(var(--chart-2))",
    },
  };

  if (loading) {
    return (
      <div className="location-container">
        <p className="loading-message">Loading weather data...</p>
      </div>
    );
  };

  return (
    <div className="location-container">
      <h1 className="location-name">{suggestionData.name.slice(0, suggestionData.name.indexOf(','))}</h1>
      <div className="location-current-weather">
        <img src={getCurrentWeatherIcon()} className="location-icon"/>
        <h1 className="location-temp">{getCurrentTemp()+" °C"}</h1>
        <Separator orientation="vertical"/>
        <div className="loaction-wind-container">
          <h1 className="location-wind-speed">{getCurrentWindSpeed()+" km/h"}</h1>
          <h1 className="location-wind-direction">{getCurrentWindDirection()}</h1>
        </div>
      </div>
      <Card className="chart-card">
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                tickFormatter={(value) => value.slice(0, 5)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="temperature"
                type="natural"
                stroke="var(--color-temperature)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-temperature)",
                  r: 0,
                }}
                activeDot={{
                  r: 4,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
              <Line
                dataKey="percipitation"
                type="natural"
                stroke="var(--color-percipitation)"
                strokeWidth={0}
                dot={{
                  fill: "var(--color-percipitation)",
                  r: 0,
                }}
                activeDot={{
                  r: 0,
                }}
              >
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Carousel opts={{ align: "start" }} className="day-carousel w-full max-w-sm">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="day-carousel-item basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="day-carousel-button" />
        <CarouselNext className="day-carousel-button" />
      </Carousel>
    </div>
  );
};