import type { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';

const meta = {
  component: CheckBox,
  title: 'Components/CheckBox',
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckBoxDefault: Story = {
  name: 'CheckBox',
  args: { id: 'default', label: 'default', onCheckedChange: () => {} },
};

export const CheckBoxDisabled: Story = {
  name: 'CheckBox-Disabled',
  args: {
    id: 'disabled',
    label: 'disabled',
    disabled: true,
    onCheckedChange: () => {},
  },
};

export const CheckBoxChecked: Story = {
  name: 'CheckBox-Checked',
  args: {
    id: 'checked',
    label: 'checked',
    checked: true,
    onCheckedChange: () => {},
  },
};

export const CheckBoxCheckedDisabled: Story = {
  name: 'CheckBox-Checked-Disabled',
  args: {
    id: 'checkedDisabled',
    label: 'checkedDisabled',
    checked: true,
    disabled: true,
    onCheckedChange: () => {},
  },
};

export const CheckBoxWithLabel: Story = {
  name: 'CheckBox-Label',
  args: {
    id: 'asdfadsfsadfsadfasdfsadfsdfadsfdf',
    label: 'asdfadsfsadfsadfasdfsadfsdfadsfdf',
    className: 'text-red-500',
    onCheckedChange: () => {},
  },
};

export const CheckBoxGroup: Story = {
  name: 'CheckBox-Group',
  args: { id: '', onCheckedChange: () => {} },
  render: () => (
    <div className='flex flex-col gap-2'>
      <CheckBox id='group1' label='Option 1' onCheckedChange={() => {}} />
      <CheckBox id='group2' label='Option 2' onCheckedChange={() => {}} />
      <CheckBox id='group3' label='Option 3' onCheckedChange={() => {}} />
      <CheckBox id='group4' label='Option 4' onCheckedChange={() => {}} />
    </div>
  ),
};

export const CheckBoxPreview: Story = {
  name: 'CheckBox-Preview',
  args: { id: '', onCheckedChange: () => {} },
  render: () => (
    <div className='flex flex-col gap-2'>
      <CheckBox id='group1' label='' onCheckedChange={() => {}} />
      <CheckBox
        id='group2'
        label=''
        disabled={true}
        onCheckedChange={() => {}}
        className='cursor-not-allowed'
      />
      <CheckBox
        id='group3'
        label=''
        checked={true}
        onCheckedChange={() => {}}
      />
      <CheckBox
        id='group4'
        label=''
        checked={true}
        disabled={true}
        onCheckedChange={() => {}}
        className='cursor-not-allowed'
      />
      <CheckBox
        id='group5'
        label='label test'
        onCheckedChange={() => {}}
        className='text-red-1 text-xl'
      />
    </div>
  ),
};
