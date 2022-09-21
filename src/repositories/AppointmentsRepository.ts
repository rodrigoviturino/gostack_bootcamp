import { isEqual } from 'date-fns';
import { Appointment } from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

export class AppointmentsRepository {
  private appointments: Appointment[];

  constructor(){
    this.appointments = [];
  }

  public all() {
    return this.appointments;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment{
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;

  }

  public findByDate(date:Date): Appointment | null {
    const findAppointments = this.appointments.find(appointment => {
      isEqual(date, appointment.date);
    });

    return findAppointments ||  null;
  }

}
