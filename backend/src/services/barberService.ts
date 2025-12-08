interface WorkHours {
  start: string;
  end: string;
}

interface WorkSchedule {
  monday: WorkHours;
  tuesday: WorkHours;
  wednesday: WorkHours;
  thursday: WorkHours;
  friday: WorkHours;
  saturday: WorkHours;
  sunday: WorkHours;
}

interface Barber {
  id: string;
  name: string;
  workSchedule: WorkSchedule;
}

async function fetchBarbers(): Promise<Barber[]> {
  const url = process.env.BARBER_API_URL!;
  const key = process.env.BARBER_API_KEY!;

  const response = await fetch(url,
    {
      headers: {
        "x-api-key": key
      }
  })

  if (!response.ok) {
    throw new Error(`HTTP error, status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export default fetchBarbers