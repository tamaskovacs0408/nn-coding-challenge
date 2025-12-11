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

  return (
    <div className='booking-form-field'>
      <Label>{labelName}</Label>
      <Input
        type={inputType}
        name={inputName}
        required
      />
    </div>
  );
}
