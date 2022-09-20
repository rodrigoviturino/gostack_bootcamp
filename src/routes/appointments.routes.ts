import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from "date-fns";

import { Appointment } from '../models/Appointment';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';


const appointmentsRouter = Router();
// instanciando Repositorio
const appointmentsRepository = new AppointmentsRepository();

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
  // const appointment = new Appointment(provider, parsedDate);
  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;
