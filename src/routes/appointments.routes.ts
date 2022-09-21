import { Router } from 'express';
import { startOfHour, parseISO } from "date-fns";

import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
// instanciando Repositorio
const appointmentsRepository = new AppointmentsRepository();

// Rota
appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // tratar a data recebida e zerar ela
  const parsedDate = startOfHour(parseISO(date));
  // Comparar se a data escolhida já existe
  const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

  if(findAppointmentInSameDate){
    return response
    .status(400)
    .json({
      message: 'This Appointment is already booked 😢'
    });
  }

  const appointment = appointmentsRepository.create(
    {
      provider,
      date: parsedDate
    }
  );

  return response.json(appointment);
});

export default appointmentsRouter;
