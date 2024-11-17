import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

// Pour une localisation en français
registerLocale('fr', fr);

const MonthYearPicker = ({ selectedDate, setSelectedDate }) => (
  <DatePicker
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    dateFormat="MM/yyyy"
    showMonthYearPicker
    locale="fr"
    className="border w-[100px] border-gray-300 rounded-lg p-2 dark:text-gray-500"
  />
);
export default MonthYearPicker;