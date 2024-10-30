import {Typography, TypographyProps} from './Typography';
import {colorStyles} from './prop/color.prop';
import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<TypographyProps> = {
  title: 'Foundations/Typography',
  component: Typography,
  argTypes: {
    as: {
      description: '태그 이름',
      table: {
        type: {
          summary: 'h1 | h2 | h3 | h4 | h5 | h6 | span | div | p | label',
        },
      },
      control: {
        type: 'select',
        options: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'span',
          'div',
          'p',
          'label',
        ],
      },
    },
    size: {
      description: '텍스트 사이즈',
      table: {
        type: {summary: 'enum'},
      },
      control: {
        type: 'select',
        options: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p1',
          'p2',
          'p3',
          'p4',
          'sm1',
          'sm2',
        ],
      },
    },
    color: {
      description: '텍스트 색상',
      table: {
        type: {summary: 'enum'},
      },
      control: {
        type: 'select',
        options: Object.keys(colorStyles),
      },
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

const Template: StoryFn<TypographyProps> = args => <Typography {...args} />;

export const Heading = Template.bind({});
Heading.args = {
  children: (
    <>
      <Typography as='h1' size='h1' color='brand100'>
        Heading 1 (32px, Bold)
      </Typography>
      <Typography as='h2' size='h2' color='brand100'>
        Heading 2 (24px, Bold)
      </Typography>
      <Typography as='h3' size='h3' color='brand100'>
        Heading 3 (20px, Semi Bold)
      </Typography>
      <Typography as='h4' size='h4' color='brand100'>
        Heading 4 (17px, Semi Bold)
      </Typography>
      <Typography as='h5' size='h5' color='brand100'>
        Heading 5 (16px, Semi Bold)
      </Typography>
      <Typography as='h6' size='h6' color='brand100'>
        Heading 6 (15px, Semi Bold)
      </Typography>
    </>
  ),
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  children: (
    <>
      <Typography as='p' size='p1' color='brand100'>
        Paragraph 1 (16px)
      </Typography>
      <Typography as='p' size='p2' color='brand100'>
        Paragraph 2 (14px)
      </Typography>
      <Typography as='p' size='p3' color='brand100'>
        Paragraph 3 (14px)
      </Typography>
      <Typography as='p' size='p4' color='brand100'>
        Paragraph 4 (13px)
      </Typography>
    </>
  ),
};

export const SmallText = Template.bind({});
SmallText.args = {
  children: (
    <>
      <Typography as='p' size='sm1' color='brand100'>
        Small Text 1 (12px)
      </Typography>
      <Typography as='p' size='sm2' color='brand100'>
        Small Text 2 (10px)
      </Typography>
    </>
  ),
};
