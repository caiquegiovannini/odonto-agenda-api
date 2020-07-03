import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './styles.css';

import Hour from '../Hour';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  const hours = () => {
    const hours = [];

    for (let hour = 0; hour <= 23; hour++) {
      hours.push(hour);
      hours.push(`${hour}:30`);
    }

    return hours;
  }

  const formatDate = date => {
    let day = `${date.getDate()}`;
    let month = `${date.getMonth() + 1}`;
    const year = date.getFullYear();

    const formattedDate = `
      ${year}-${month.length === 1 ? '0' + month : month}-${day.length === 1 ? '0' + day : day}
    `;

    return formattedDate;
  }

  useEffect(() => {
    fetch('http://localhost:3333/appointments')
      .then(res => res.json())
      .then(data => {
        const appointmentsOfDay = data.map(appointment => {
          const appointmentDate = new Date(appointment.date);

          if (formatDate(appointmentDate) === formatDate(date)) {
            return {
              client: appointment.name,
              hour: `${appointmentDate.getHours()}:${appointmentDate.getMinutes()}`,
            };
          }
          
        });
        setAppointments(appointmentsOfDay);
      });
  }, [date]);
  console.log(appointments)

  return (
    <div className="dashboard">
      <section className="calendar">
        <Calendar 
          value={date}
          onChange={event => {setDate(event)}}
        />
      </section>

      <section className="schedule">
        {hours().map((hour, index) => (
          <Hour key={`${hour}-${index}`} hour={hour} appointments={appointments}/>
        ))}
      </section>
    </div>
  );
}

export default Dashboard;