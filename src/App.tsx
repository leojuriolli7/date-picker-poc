import type { CalendarDate } from "@internationalized/date";
import { useState } from "react";
import { DateInput } from "./DateInput";

const App: React.FC = () => {
  const [date, setDate] = useState<CalendarDate | null>(null);

  return (
    <div style={{ padding: "20px" }}>
      <DateInput label="Select Date" value={date} onChange={setDate} />

      <div style={{ marginTop: "16px" }}>
        <p>Selected date: {date ? date.toString() : "None"}</p>
      </div>
    </div>
  );
};

export default App;
