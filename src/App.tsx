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
      <div>
        <h1>Default variant</h1>
        <DateInput label="Select Date" value={date} onChange={setDate} />
      </div>

      <div>
        <h1>Inline variant</h1>
        <DateInput
          variant="inline"
          label="Select Date"
          value={date2}
          onChange={setDate2}
        />
      </div>

      <div>
        <h1>Popup Only variant</h1>

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
