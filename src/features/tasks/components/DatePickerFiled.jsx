import React from 'react';
import { Controller } from 'react-hook-form';
import DayPicker from '../../../components/DayPicker';
import dayjs from 'dayjs';

export default function DatePickerField({ name, control, startDate, endDate, label }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState }) => (
        <div className="flex flex-col">
          <span>{label}</span>
          <DayPicker
            date={field.value ?? dayjs()}
            setDate={field.onChange}
            startDate={startDate}
            endDate={endDate}
          />
          {fieldState.error && (
            <p className="text-red-600">{label} is required</p>
          )}
        </div>
      )}
    />
  );
}
