import clsx from 'clsx';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useState} from 'react';
import {DayPicker} from 'react-day-picker';
import {CalendarIcon} from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';

interface CalendarFormProps {
  dateLabel: string;
  selected: Date | undefined;
  setSelected: (selected: Date | undefined) => void;
  fromDate: Date;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface CalendarProps {
  selected: Date | undefined;
  setSelected: (selected: Date | undefined) => void;
  setCalendarOpen: (calendarOpen: boolean) => void;
  fromDate: Date;
}

export const CalendarForm = ({
  dateLabel,
  selected,
  setSelected,
  fromDate,
  onClick,
}: CalendarFormProps) => {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  return (
    <Popover.Root open={calendarOpen} onOpenChange={setCalendarOpen}>
      <Popover.Trigger asChild>
        <button
          onClick={onClick}
          className={clsx(
            'flex w-full items-center justify-between gap-3 px-3 py-3.5',
            selected ? 'font-normal' : 'font-medium text-[#ADB5BD]',
            'truncate rounded-lg border-2 border-solid border-[#F5F5F7] bg-[#FAFAFB] text-sm hover:bg-accent hover:text-accent-foreground',
          )}
        >
          {selected ? format(selected, 'PPP', {locale: ko}) : dateLabel}
          <CalendarIcon className='h-5 w-5 text-black' />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align='center'
          sideOffset={5}
          className={clsx(
            'z-50 w-[--radix-popover-trigger-width] rounded-md border bg-white p-4 shadow-md outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          )}
        >
          <SingleDayPickCalendar
            selected={selected}
            setSelected={setSelected}
            setCalendarOpen={setCalendarOpen}
            fromDate={fromDate}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const SingleDayPickCalendar = ({
  selected,
  setSelected,
  setCalendarOpen,
  fromDate,
}: CalendarProps) => {
  return (
    <DayPicker
      mode='single'
      selected={selected}
      onSelect={date => {
        setSelected(date);
        setCalendarOpen(false);
      }}
      required
      fromDate={fromDate}
      locale={ko}
      classNames={{
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full',
        head_cell: 'text-muted-foreground font-normal text-[0.8rem]',
        cell: 'relative p-0 text-center focus-within:relative focus-within:z-20',
        day: 'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
        day_disabled: 'text-muted-foreground opacity-20',
        day_selected:
          'bg-primary font-bold rounded text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent rounded text-accent-foreground',
      }}
    />
  );
};
