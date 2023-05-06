import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

export default function GuidePage() {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState({
    latitude: '',
    longitude: '',
    description: '',
    languages: '',
    city: '',
    phoneNumber: '',
  });
  const [weather, setWeather] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = '33db253a8484b9fdfe87a52814678900'; // Replace with your own API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&mode=cors`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setWeather(data);

        if (data.name) {
          setUser((prev) => ({ ...prev, city: data.name }));

          const { latitude, longitude, description, languages, city, phoneNumber } = user;

          fetch('/guide-details', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
              latitude,
              longitude,
              description,
              languages,
              city,
              phoneNumber,
            }),
          })
          .then((result) => {
            if (!result) {
              window.alert('Invalid attempt');
            } else if (result.error) {
              M.toast({ html: result.error });
            } else if (result.userDetails) {
              M.toast({ html: 'Data Saved Successfully' });
              localStorage.setItem('user', JSON.stringify(result.userDetails));
              setShowForm(false);
            } else {
              window.alert('Unknown error');
            }
          })
        }
      });
    }
  };

 


  return (
    <div>
     
         
    <div className="container-fluid">
    <div className="row align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
   
        <div className="card col-md-4 col-11 my-2 p-3 d-flex flex-column align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className="m-2 p-1 w-100">
            <h2 className="text-left m-1 mb-4">Sign in</h2>

            <input
              type=""
              className="form-control my-3 py-3"
              placeholder="Enter your latitude"
              name="latitude"
              required
              style={{
                borderRadius: '10px',
                outline: 'none',
                backgroundColor: '#f7f7f7',
                border: 'none',
              }}
              value={user.latitude}
              onChange={handleChange}
            />

            <input
              type=""
              className="form-control my-3 py-3"                  placeholder="Enter your longitude"
              name="longitude"
              required
              style={{
                borderRadius: '10px',
                outline: 'none',
                backgroundColor: '#f7f7f7',
                border: 'none',
              }}
              value={user.longitude}
              onChange={handleChange}
            />

            <input
              type="text"
              className="form-control my-3 py-3"
              placeholder="Tell us about yourself"
              name="description"
              required
              style={{
                borderRadius: '10px',
                outline: 'none',
                backgroundColor: '#f7f7f7',
                border: 'none',
              }}
              value={user.description}
              onChange={handleChange}
            />

            <input
              type="text"
              className="form-control my-3 py-3"
              placeholder="Languages you speak"
              name="languages"
              required
              style={{
                borderRadius: '10px',
                outline: 'none',
                backgroundColor: '#f7f7f7',
                border: 'none',
              }}
              value={user.languages}
              onChange={handleChange}
            />

            <input
              type="text"
              className="form-control my-3 py-3"
              placeholder="Enter your phone number"
              name="phoneNumber"
              required
              style={{
                borderRadius: '10px',
                outline: 'none',
                backgroundColor: '#f7f7f7',
                border: 'none',
              }}
              value={user.phoneNumber}
              onChange={handleChange}
            />

            <button
              className="btn btn-success my-3 w-100"
              type="submit"
              style={{ borderRadius: '10px', outline: 'none' }}
            >
              Submit
            </button>
          </form>
        </div>
    </div>
    </div>
    </div>
  );
}

