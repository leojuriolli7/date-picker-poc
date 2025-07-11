import type { CalendarDate } from "@internationalized/date";
import { useState } from "react";
import { DateInput } from "./DateInput";

const App: React.FC = () => {
  const [date, setDate] = useState<CalendarDate | null>(null);
  const [date2, setDate2] = useState<CalendarDate | null>(null);
  const [date3, setDate3] = useState<CalendarDate | null>(null);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Unstyled New Date Picker POC</h1>

      <div>
        <h2>Default variant</h2>
        <p>
          Click the input to type a date, or click the calendar icon to open a
          date picker popup.
        </p>
        <DateInput label="Select Date" value={date} onChange={setDate} />
      </div>

      <div>
        <h2>Inline variant</h2>
        <p>Can only type on the input, no popup available.</p>
        <DateInput
          variant="inline"
          label="Select Date"
          value={date2}
          onChange={setDate2}
        />
      </div>

      <div>
        <h2>Popup Only variant</h2>

        <p>
          Clicking anywhere on the input will open a popup, no typing allowed.
        </p>

        <DateInput
          variant="popup_only"
          label="Select Date"
          value={date3}
          onChange={setDate3}
        />
      </div>
    </div>
  );
};

export default App;
