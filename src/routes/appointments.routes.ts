import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from "date-fns";

import { Appointment } from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [] ;

// Rota
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // tratar a data recebida e zerar ela
  const parsedDate = startOfHour(parseISO(date));
  // Comparar se a data escolhida já existe
  const findAppointmentInSameDate = appointments.find( appointment =>
    isEqual(parsedDate, appointment.date)
  );

  if(findAppointmentInSameDate){
    return response.status(400).json({
      message: 'This Appointment is already booked 😢'
    });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
