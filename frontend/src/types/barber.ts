export type WorkHours = {
  start: string;
  end: string;
}

export type WorkSchedule = {
  sunday?: WorkHours;
  monday?: WorkHours;
  tuesday?: WorkHours;
  wednesday?: WorkHours;
  thursday?: WorkHours;
  friday?: WorkHours;
  saturday?: WorkHours;
}

export type Barber = {
  id: string;
  name: string;
  workSchedule: WorkSchedule;
}