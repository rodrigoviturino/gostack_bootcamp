import { startOfHour } from 'date-fns';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

  /**
   * Recebimento das informações
   * tratativa de excessões
   * acesso ao repositorio
   */

interface RequestDTO {
  provider: string;
  date: Date;
}

export class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  //
  constructor( appointmentsRepository: AppointmentsRepository ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date}: RequestDTO){

    const appointmentDate = startOfHour(date);

    // Comparar se a data escolhida já existe
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate,);

    if(findAppointmentInSameDate){
      throw Error("This Appointment is already booked 😢");
    }

    const appointment = this.appointmentsRepository.create(
      {
        provider,
        date: appointmentDate
      });

    return appointment;

  }

}
