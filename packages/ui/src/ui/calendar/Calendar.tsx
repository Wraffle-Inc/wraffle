import {ko} from 'date-fns/locale';
import type {DayPickerProps} from 'react-day-picker';
import {DayPicker} from 'react-day-picker';
import {cn} from '@wds/shared/utils';

export const Calendar = ({className, ...props}: DayPickerProps) => {
  return (
    <DayPicker
      locale={ko}
      className={cn('min-w-[260px] p-3', className)}
      classNames={{
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        nav_button_previous: 'absolute left-2',
        nav_button_next: 'absolute right-0',
        table: 'w-full',
        head_cell: 'text-muted-foreground font-normal text-[0.8rem]',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md [&:has(>.day-range-start):not(:has(>.day-range-end))]:bg-gradient-to-r [&:has(>.day-range-start):not(:has(>.day-range-end))]:from-transparent [&:has(>.day-range-start):not(:has(>.day-range-end))]:to-accent [&:has(>.day-range-end):not(:has(>.day-range-start))]:bg-gradient-to-l [&:has(>.day-range-end):not(:has(>.day-range-start))]:from-transparent [&:has(>.day-range-end):not(:has(>.day-range-start))]:to-accent [&:has([aria-selected]:not(.day-range-start):not(.day-range-end))]:bg-accent [&:has(>.day-range-start)][&:has(>.day-range-end)]:bg-none'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: 'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_disabled: 'text-muted-foreground opacity-20',
        day_selected:
          'bg-primary font-bold rounded text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground rounded-md',
        day_range_middle:
          'aria-selected:bg-accent/30 aria-selected:text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
      }}
      {...props}
    />
  );
};
