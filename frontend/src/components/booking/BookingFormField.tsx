import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./BookingFormField.scss";

export default function BookingFormField({
  labelName,
  inputType,
  inputName,
}: {
  labelName: string;
  inputType: string;
  inputName: string;
}) {
  const timeProps =
    inputType === "time"
      ? { min: "07:00", max: "20:00" }
      : {};
  const getDefaultValue = () => {
    if (inputType === "date") {
      return new Date().toISOString().split("T")[0];
    }

    if (inputType === "time") {
      const now = new Date();
      const nextHour = now.getHours() + 1;
      const clampedHour = Math.min(nextHour, 20);
      return `${clampedHour.toString().padStart(2, "0")}:00`;
    }
    return undefined;
  };

  return (
    <div className='booking-form-field'>
      <Label>{labelName}</Label>
      <Input
        type={inputType}
        name={inputName}
        defaultValue={getDefaultValue()}
        required
        {...timeProps}
      />
    </div>
  );
}
