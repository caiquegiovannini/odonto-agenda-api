import React from 'react';

import './styles.css';

const Hour = ({ hour, appointments }) => {
  let hourAppointment = '';
  appointments.map(appointment => {
    if (appointment !== undefined && appointment.hour === hour) {
      hourAppointment = `Marcado para o paciente ${appointment.client}`
    }
  })

  return (
    <div>
      {hourAppointment
      ? <div className="hour">
          {hour}
          <p>{hourAppointment}</p>
      </div>
      : <input 
        type="text"
        className="hour__input"
      />}
    </div>
  );
}

export default Hour;