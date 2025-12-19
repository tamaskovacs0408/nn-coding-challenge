interface WorkHours {
  start: string;
  end: string;
}

export interface WorkSchedule {
  monday: WorkHours;
  tuesday: WorkHours;
  wednesday: WorkHours;
  thursday: WorkHours;
  friday: WorkHours;
  saturday: WorkHours;
  sunday: WorkHours;
}

export interface Barber {
  id: string;
  name: string;
  workSchedule: WorkSchedule;
}