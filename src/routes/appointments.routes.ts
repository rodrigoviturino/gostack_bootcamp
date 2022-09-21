import { Router } from 'express';
import { parseISO } from "date-fns";

import { CreateAppointmentService } from '../services/CreateAppointmentService';

import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
// instanciando Repositorio
const appointmentsRepository = new AppointmentsRepository();

// DTO - Data Transfer Object
// SoC

// Rota
appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {

  try {
    const { provider, date } = request.body;

    // tratar a data recebida e zerar ela
    const parsedAppointment = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointmentService.execute({
      provider,
      date: parsedAppointment
    });

    return response.json(appointment);

  } catch (erro){
    return response.status(400);
  }
});

export default appointmentsRouter;
