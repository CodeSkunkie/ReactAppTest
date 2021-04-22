// import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ locCity, setCity ] = useState('loading...');
  const [ locState, setState ] = useState('loading...');
  const onSubmit = data => getLLInfo(data);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://java.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="lat">Latitude</label>
        <input id="lat" {...register('lat', { required: true, maxLength: 15, pattern: /^(-?([0-8]?[0-9](\.\d+)?|90(.[0]+)?))/ })} />
        {errors.lat && errors.lat.type === "required" && <span>This is required</span>}
        {errors.lat && errors.lat.type === "maxLength" && <span>Max length exceeded</span>}
        {errors.lat && errors.lat.type === "pattern" && <span>Invalid latitude format</span>}
        <br/>
        <label htmlFor="lon">Longitude</label>
        <input id="lon" {...register('lon', { required: true, maxLength: 15, pattern: /^(-?([1]?[0-7]?[0-9](\.\d+)?|180((.[0]+)?)))/ })} />
        {errors.lon && errors.lon.type === "required" && <span>This is required</span>}
        {errors.lon && errors.lon.type === "maxLength" && <span>Max length exceeded</span>}
        {errors.lon && errors.lon.type === "pattern" && <span>Invalid longitude format</span>}
        <br/>
        <input type="submit" />
      </form>
      <br/>
      
    </div>
  );
}

function getLLInfo(data) {
  const locData = fetch('https://api.weather.gov/points/' + data.lat + ',' + data.lon).then(data => data.json());
  console.log(locData);
  return locData;
}

// function displayWeather(data) {
//   return (
//     //console.log(!!(data)?data:"loading...")
//     <div className="Weather">
//       <label>
//         City:
//         <input type="text" value={!!(data)?data:'loading...'} />
//       </label>
//       {/* <label>
//         State:
//         <input type="text" value={!!(data)?data.properties.relativeLocation.properties.state:'loading...'} />
//       </label> */}
//     </div>
//   );
// }

export default App;
