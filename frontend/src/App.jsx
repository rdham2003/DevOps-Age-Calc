import { useState, useEffect } from 'react';

function App() {
  const [ageResult, setAgeResult] = useState('');
  const [birthDate, setBirthDate] = useState(null); 
  const [unit, setUnit] = useState('years'); // Keep track of the selected unit

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const month = formData.get('month');
    const day = formData.get('day');
    const year = formData.get('year');
    const selectedUnit = formData.get('unit'); // Get selected unit

    const newBirthDate = new Date(`${year}-${month}-${day}`);
    setBirthDate(newBirthDate);
    setUnit(selectedUnit); // Update unit state
    fetchAge(newBirthDate, selectedUnit);
  };

  const fetchAge = async (birthDate, unit) => {
    const data = {
      month: birthDate.getMonth() + 1, 
      day: birthDate.getDate(),
      year: birthDate.getFullYear(),
      unit: unit,
    };

    try {
      const response = await fetch('http://localhost:5000/getAge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setAgeResult(`You are ${result.age} ${unit} old`);
    } catch (error) {
      console.error('Error calculating age:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (birthDate) {
        const currentDate = new Date();
        let age;
        const timeDifference = currentDate - birthDate; 

        switch (unit) {
          case 'years':
            age = timeDifference / 31536000000;
            break;
          case 'months':
            age = timeDifference / 2592000000;
            break;
          case 'days':
            age = timeDifference / 86400000;
            break;
          case 'hours':
            age = timeDifference / 3600000;
            break;
          case 'minutes':
            age = timeDifference / 60000;
            break;
          case 'seconds':
            age = timeDifference / 1000;
            break;
          default:
            age = 0;
        } 
        setAgeResult(`You are ${age} ${unit} old`); 
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [birthDate, unit]); 

  return (
    <div id="app_container">
      <div id="hi">
        <form onSubmit={handleSubmit}>
          <h1>Enter your birthday</h1>
          <br />
          <br />
          <label htmlFor=""><b>Month</b></label>
          <br />
          <select name="month">
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <br />
          <br />
          <label htmlFor=""><b>Day</b></label>
          <br />
          <input type="text" name='day' required />
          <br />
          <br />
          <label htmlFor=""><b>Year</b></label>
          <br />
          <input type="text" name='year' required />
          <br />
          <br />
          <label htmlFor=""><b>Get Age In: </b></label>
          <br />
          <select name="unit">
            <option value="years">Years</option>
            <option value="months">Months</option>
            <option value="days">Days</option>
            <option value="hours">Hours</option>
            <option value="minutes">Minutes</option>
            <option value="seconds">Seconds</option>
          </select>
          <br />
          <br />
          <br />
          <button className="btn btn-success" type="submit">Get Age</button>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>{ageResult}</h1>
      </div>
    </div>
  );
}

export default App;