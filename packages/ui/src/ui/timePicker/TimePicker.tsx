import './TimePicker.css';
import type {LOCALE_MAP} from './TimePickerSource';
import TimePickerSource from './TimePickerSource';
import IosStylePicker from './utils/IosStylePicker';
import {useEffect, useRef} from 'react';

const ONCHANGE_TIMEOUT_DELAY = 100;

export type TimePickerProps = {
  onChange: (hour: number, minute: number) => void;
  initTime?: Date;
  infinite?: boolean;
  className?: string;
  hourFormat?: '12' | '24';
  locale?: keyof typeof LOCALE_MAP;
};

type TimePickerStateRef = {
  currentHour: number;
  currentMinute: number;
  currentAmPm: number;
  source: TimePickerSource;
  onChange: TimePickerProps['onChange'];
  onChangeTimeout: NodeJS.Timeout | null;
};

export const TimePicker = ({
  onChange,
  initTime: _initTime = new Date(),
  infinite = false,
  className: _className,
  hourFormat = '12',
  locale = 'en',
}: TimePickerProps) => {
  const className =
    'react-ios-style-time-picker' + (_className ? ` ${_className}` : '');

  const ref = useRef<TimePickerStateRef>({
    currentHour:
      hourFormat === '12' && !infinite
        ? _initTime.getHours() % 12 || 12
        : _initTime.getHours(),
    currentMinute: _initTime.getMinutes(),
    currentAmPm: _initTime.getHours() < 12 ? 1 : 2,
    source: new TimePickerSource({
      hourFormat: hourFormat,
      infinite: infinite,
      locale: locale,
    }),
    onChange,
    onChangeTimeout: null,
  }).current;

  const ampmPickerRef = useRef<HTMLDivElement>(null);
  const hourPickerRef = useRef<HTMLDivElement>(null);
  const minutePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.onChange = onChange;
  }, [onChange]);

  useEffect(() => {
    const onChange = () => {
      if (ref.onChangeTimeout) {
        clearTimeout(ref.onChangeTimeout);
      }
      ref.onChangeTimeout = setTimeout(() => {
        ref.onChange(ref.currentHour, ref.currentMinute);
        ref.onChangeTimeout = null;
      }, ONCHANGE_TIMEOUT_DELAY);
    };

    const updateHourSource = () => {
      hourSelector.selectByCurrentHour(ref.currentHour);
    };

    const ampmSelector =
      hourFormat === '12' &&
      new IosStylePicker(ampmPickerRef.current!, {
        variant: 'normal',
        source: ref.source.ampm,
        currentData: ref.currentAmPm,
        onChange: selected => {
          const changed = ref.currentAmPm !== selected.value;

          if (hourFormat === '12') {
            if (selected.value === 1) {
              ref.currentHour = ref.currentHour % 12;
            } else if (selected.value === 2) {
              ref.currentHour = (ref.currentHour % 12) + 12;
            }
            ref.currentAmPm = selected.value;
          }

          if (changed) {
            if (infinite === true) {
              updateHourSource();
            }
            onChange();
          }
        },
      });

    const hourSelector = new IosStylePicker(hourPickerRef.current!, {
      variant: infinite ? 'infinite' : 'normal',
      source: ref.source.hours,
      onChange: selected => {
        const changed = ref.currentHour !== selected.value;

        if (ref.currentAmPm === 2 && selected.value < 12) {
          ref.currentHour = selected.value + 12;
        } else if (ref.currentAmPm === 1 && selected.value === 12) {
          ref.currentHour = 0;
        } else {
          ref.currentHour = selected.value;
        }
        if (changed) {
          onChange();
        }
      },
      onSelect: currentIndex => {
        if (infinite === true && hourFormat === '12') {
          if (currentIndex.value < 12) {
            if (ampmSelector) {
              ampmSelector.updateAmPm(1);
              ref.currentAmPm = 1;
            }
          } else if (currentIndex.value >= 12) {
            if (ampmSelector) {
              ampmSelector.updateAmPm(2);
              ref.currentAmPm = 2;
            }
          }
        }
      },
    });

    const minuteSelector = new IosStylePicker(minutePickerRef.current!, {
      variant: infinite ? 'infinite' : 'normal',
      source: ref.source.minutes,
      onChange: selected => {
        const changed = ref.currentMinute !== selected.value;
        ref.currentMinute = selected.value;

        if (changed) {
          onChange();
        }
      },
    });

    setTimeout(() => {
      const initHour =
        hourFormat === '12' && !infinite
          ? _initTime.getHours() % 12 || 12
          : _initTime.getHours();
      const initMinute = _initTime.getMinutes();
      const initAmPm = _initTime.getHours() < 12 ? 1 : 2;

      if (hourFormat === '12' && ampmSelector) {
        ampmSelector.select(initAmPm);
      }

      hourSelector.select(initHour);
      minuteSelector.select(initMinute);
    }, 0);

    return () => {
      if (ampmSelector) {
        ampmSelector.destroy();
      }
      hourSelector.destroy();
      minuteSelector.destroy();
    };
  }, [infinite, hourFormat]);

  return (
    <div className={className}>
      {hourFormat === '12' && <div ref={ampmPickerRef} />}
      <div ref={hourPickerRef} />
      <div ref={minutePickerRef} />
    </div>
  );
};
