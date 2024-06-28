import './App.css'
import {useState,useEffect} from 'react';
function App() {
  const [activities, setActivities] = useState([]);
  /* Fetching the data from the backend and setting the state of activities to the data. */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/activities`);
        if (!result.ok) {
          throw new Error(`Error fetching activities: ${result.statusText}`);
        }
        const data = await result.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    
    fetchData();
  }, []);

  /**
   * When the user clicks the submit button, the function will prevent the default action of the form,
   * create a new activity object with the name and time values from the form, and then send a POST
   * request to the backend to create a new activity
   */
  const addActivity = async (event) => {
    event.preventDefault();
    const newActivity = {
      name: event.target.activity.value,
      time: event.target.time.value,
    };

    try {
      const result = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/activity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivity),
      })
      // .then(response => response.json())
      // .then(data => console.log(data))
      // .catch(error => console.error('Error:', error));

      if (!result.ok) {
        throw new Error(`Error adding activity: ${result.statusText}`);
      }

      event.target.activity.value = "";//sets input empty after clicking submit
      event.target.time.value = "";// sets input empty after clicking submit
      // window.location.reload();//reloads the page after adding activity

      // Fetch updated activities
      const updatedResult = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/activities`);
      const updatedData = await updatedResult.json();
      setActivities(updatedData);
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  
  return (
    <>
     <div className="app">
  <header className="app-header">
    <h1>Productivity Tracker</h1>
    <form onSubmit={addActivity}>
      <div>
        <label htmlFor="activity">Activity:</label>
        <input
          type="text"
          id="activity"
          name="activity"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="time">Time Taken:</label>
        <input type="text" id="time" name="time" autoComplete="off" />
      </div>
      <button type="submit">Add</button>
    </form>
  </header>
  <main className="app-main">
    <h2>Today</h2>
    {activities && activities.length>0 ? (
      <ol>
      {activities && activities.map(activity=>(
        <li key={activity._id}>
          {activity.name} - {activity.time}
        </li>
      ))}
    </ol>):(<p>No activities added yet</p>)}
  </main>
</div>

    </>
  )
}

export default App
