import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from './Popover';
import {PopoverProvider, usePopover} from './use-popover';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta = {
  title: 'Components/Popover',
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Popover content alignment',
    },
    sideOffset: {
      control: 'number',
      description: 'Distance between trigger and content',
    },
    className: {
      control: 'text',
      description: 'Custom class for styling',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: args => (
    <Popover>
      <PopoverTrigger className='rounded border p-2'>
        Open Popover
      </PopoverTrigger>
      <PopoverContent {...args}>Popover Content</PopoverContent>
    </Popover>
  ),
};

export const WithAnchor: StoryObj = {
  render: () => (
    <Popover>
      <PopoverAnchor className='absolute right-0 top-0' />
      <PopoverTrigger className='rounded border p-2'>
        Open Popover
      </PopoverTrigger>
      <PopoverContent className='border bg-white p-4 shadow-md'>
        Popover Content with Anchor
      </PopoverContent>
    </Popover>
  ),
};

const PopoverWithHook = () => {
  const {openPopover, closePopover} = usePopover();

  return (
    <div className='flex gap-4'>
      <button
        className='rounded border p-2'
        onClick={() =>
          openPopover(
            <div className='flex flex-col gap-2'>
              <p>This is a popover content using usePopover hook</p>
              <button className='rounded border p-1' onClick={closePopover}>
                Close
              </button>
            </div>,
          )
        }
      >
        Open Popover with Hook
      </button>
      <button
        className='rounded border p-2'
        onClick={() =>
          openPopover(
            <div className='flex flex-col gap-2'>
              <p>This is another popover content</p>
              <button className='rounded border p-1' onClick={closePopover}>
                Close
              </button>
            </div>,
          )
        }
      >
        Open Another Popover
      </button>
    </div>
  );
};

export const WithHook: StoryObj = {
  render: () => (
    <PopoverProvider>
      <PopoverWithHook />
    </PopoverProvider>
  ),
};
