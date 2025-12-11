"use client";

import { useState } from "react";
import { useTimeSlots } from "@/hooks/useTimeSlots";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import "./BookingDateTimePicker.scss";

export default function BookingDateTimePicker({
  barberId,
  onSelect,
}: {
  barberId: string;
  onSelect: (date: string, time: string) => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const {
    availableSlots,
    bookedSlots,
    selectedTime,
    setSelectedTime,
    isLoading,
    error,
  } = useTimeSlots(barberId, selectedDate);

  function handleSelect(time: string) {
    setSelectedTime(time);
    onSelect(selectedDate, time);
  }

  return (
    <div className='picker'>
      <div className='picker__field'>
        <Label>Dátum</Label>
        <Input
          type='date'
          className='picker__input'
          value={selectedDate}
          min={today}
          onChange={e => {
            setSelectedDate(e.target.value);
            onSelect(e.target.value, "");
          }}
          required
        />

        {isLoading && (
          <p className='picker__loading'>
            <Spinner />
            Időpontok betöltése...
          </p>
        )}

        {error && <p className='picker__error'>{error}</p>}

        

        {!error && !isLoading && (
          <>
            <h3 className='picker__subtitle'>Szabad időpontok:</h3>
            <div className='picker__slots'>
              {availableSlots.length === 0 && (
                <p className='picker__no-slots'>
                  Nincs szabad időpont a kiválasztott napon.
                </p>
              )}

              {availableSlots.map(slot => (
                <Button
                  key={slot}
                  type='button'
                  variant={selectedTime === slot ? "default" : "outline"}
                  className='picker__slot-btn'
                  onClick={() => handleSelect(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
            {bookedSlots.length > 0 && (
              <div className='picker__booked'>
                <h3 className='picker__subtitle'>Foglalt időpontok:</h3>
                <div className='picker__booked-list'>
                  {bookedSlots.map(bookedSlot => (
                    <span key={bookedSlot} className='picker__booked-item'>
                      {bookedSlot}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
