/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { useDateField, useDateSegment } from "react-aria";
import { useDateFieldState } from "react-stately";
import { createCalendar, CalendarDate } from "@internationalized/date";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DateInputProps {
  label?: string;
  value?: CalendarDate | null;
  onChange?: (date: CalendarDate | null) => void;
  defaultValue?: CalendarDate;
  variant?: "default" | "inline" | "popup_only";
}

const locale = "pt-BR";

interface DateSegmentProps {
  segment: any;
  state: any;
}

const DateSegment: React.FC<DateSegmentProps> = ({ segment, state }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <span
      {...segmentProps}
      ref={ref}
      style={{
        padding: "0 2px",
        fontVariantNumeric: "tabular-nums",
        textAlign: "end" as const,
        outline: "none",
        borderRadius: "2px",
        backgroundColor: segment.isPlaceholder ? "transparent" : "transparent",
        color: segment.isPlaceholder ? "#999" : "inherit",
      }}
      onFocus={(e) => {
        segmentProps.onFocus?.(e as any);
        e.target.style.backgroundColor = "#007acc";
        e.target.style.color = "white";
      }}
      onBlur={(e) => {
        segmentProps.onBlur?.(e as any);
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = segment.isPlaceholder ? "#999" : "inherit";
      }}
    >
      {segment.text}
    </span>
  );
};

export const DateInput: React.FC<DateInputProps> = ({
  label = "Date",
  value,
  onChange,
  defaultValue,
  variant = "default",
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value?.toDate("UTC") || defaultValue?.toDate("UTC")
  );

  const state = useDateFieldState({
    value,
    defaultValue,
    isDisabled: variant === "popup_only",
    onChange: (newValue) => {
      onChange?.(newValue);
      setSelectedDate(newValue?.toDate("UTC"));
    },
    locale,
    createCalendar,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { labelProps, fieldProps } = useDateField({ label }, state, ref);

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      const calendarDate = new CalendarDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
      onChange?.(calendarDate);
      setSelectedDate(date);
    }
    setIsCalendarOpen(false);
  };

  const currentYear = selectedDate?.getFullYear() || new Date().getFullYear();

  const currentMonth = selectedDate?.getMonth() || new Date().getMonth();

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{ marginBottom: "4px" }}>
        <label {...labelProps}>{label}</label>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          {...fieldProps}
          onClick={variant === "popup_only" ? () => setIsCalendarOpen(true) : undefined}
          ref={ref}
          style={{
            display: "flex",
            padding: "4px 8px",
            border: "1px solid #ccc",
            alignItems: "center",
            borderRadius: "4px",
            backgroundColor: "#fff",
            minWidth: "120px",
          }}
        >
          {state.segments.map((segment, i) => (
            <DateSegment key={i} segment={segment} state={state} />
          ))}

          {variant !== "inline" && (
            <button
              type="button"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              style={{
                border: "none",
                backgroundColor: "transparent",
                marginLeft: "4px",
                cursor: "pointer",
              }}
            >
              📅
            </button>
          )}
        </div>
      </div>

      {isCalendarOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1000,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "4px",
          }}
        >
          <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
            <select
              value={currentMonth}
              onChange={(e) => {
                const newDate = new Date(
                  currentYear,
                  parseInt(e.target.value),
                  1
                );
                setSelectedDate(newDate);
              }}
              style={{
                padding: "4px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(2000, i, 1).toLocaleDateString(locale, {
                    month: "long",
                  })}
                </option>
              ))}
            </select>

            <select
              value={currentYear}
              onChange={(e) => {
                const newDate = new Date(
                  parseInt(e.target.value),
                  currentMonth,
                  1
                );
                setSelectedDate(newDate);
              }}
              style={{
                padding: "4px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {Array.from({ length: 50 }, (_, i) => {
                const year = new Date().getFullYear() - 25 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleCalendarSelect}
            month={new Date(currentYear, currentMonth)}
            onMonthChange={(month) => setSelectedDate(month)}
          />

          <div style={{ marginTop: "8px", textAlign: "right" }}>
            <button
              onClick={() => setIsCalendarOpen(false)}
              style={{
                padding: "4px 8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
