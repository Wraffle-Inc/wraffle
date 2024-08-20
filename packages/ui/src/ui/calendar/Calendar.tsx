import { DayPicker } from 'react-day-picker';

import * as Popover from '@radix-ui/react-popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Label } from '../form';
import clsx from 'clsx';
import { cn } from '@/shared/utils';

const Calendar = () => (
  <div className=''>
    <Label>당첨자 발표 일정</Label>
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={clsx(
            'flex w-full items-center justify-between px-3 py-3.5',
            'border-2 border-solid border-[#F5F5F7] rounded-lg bg-[#FAFAFB] hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <span className='font-medium text-sm text-[#ADB5BD]'>
            당첨자 발표 시간을 입력해주세요
          </span>
          <CalendarIcon className=' w-6 h-6' />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align='center'
          sideOffset={5}
          className='z-50 w-full rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        >
          <JapCalendar />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  </div>
);

export default Calendar;

const JapCalendar = () => (
  <DayPicker
    showOutsideDays
    classNames={{
      months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
      month: 'space-y-4',
      caption: 'flex justify-center pt-1 relative items-center',
      caption_label: 'text-sm font-medium',
      nav: 'space-x-1 flex items-center',
      nav_button: cn('h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
      nav_button_previous: 'absolute left-1',
      nav_button_next: 'absolute right-1',
      table: 'w-full border-collapse space-y-1',
      head_row: 'flex',
      head_cell:
        'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
      row: 'flex w-full mt-2',
      cell: cn(
        'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md'
      ),
      day: cn('h-8 w-8 p-0 font-normal aria-selected:opacity-100'),
      day_range_start: 'day-range-start',
      day_range_end: 'day-range-end',
      day_selected:
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
      day_today: 'bg-accent text-accent-foreground',
      day_outside:
        'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
      day_disabled: 'text-muted-foreground opacity-50',
      day_range_middle:
        'aria-selected:bg-accent aria-selected:text-accent-foreground',
      day_hidden: 'invisible',
    }}
  />
);
