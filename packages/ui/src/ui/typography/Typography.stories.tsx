import {Typography, TypographyProps} from './Typography';
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
    weight: {
      description: '텍스트 굵기',
      table: {
        type: {summary: 'regular | medium | semibold | bold'},
      },
      control: {
        type: 'select',
        options: ['regular', 'medium', 'semibold', 'bold'],
      },
    },
    lineHeight: {
      description: '텍스트 라인 높이',
      table: {
        type: {summary: 'string'},
      },
      control: {
        type: 'text',
      },
    },
    textColor: {
      description: '텍스트 색상',
      table: {
        type: {summary: 'enum'},
      },
      control: {
        type: 'select',
        options: colorList,
      },
    },
    children: {
      control: {
        type: 'text',
      },
    },
    asChild: {
      table: {
        disable: true,
      },
      control: {
        disable: true,
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
      <Typography
        as='h1'
        size='h1'
        weight='bold'
        lineHeight='1.4'
        textColor='brand1'
      >
        Heading 1 (32px, Bold, 140%)
      </Typography>
      <Typography
        as='h2'
        size='h2'
        weight='bold'
        lineHeight='1.4'
        textColor='brand1'
      >
        Heading 2 (24px, Bold, 140%)
      </Typography>
      <Typography
        as='h3'
        size='h3'
        weight='semibold'
        lineHeight='1.4'
        textColor='brand1'
      >
        Heading 3 (20px, Semi Bold, 140%)
      </Typography>
      <Typography
        as='h4'
        size='h4'
        weight='semibold'
        lineHeight='1.4'
        textColor='brand1'
      >
        Heading 4 (17px, Semi Bold, 140%)
      </Typography>
      <Typography
        as='h5'
        size='h5'
        weight='semibold'
        lineHeight='1.4'
        textColor='brand1'
      >
        Heading 5 (16px, Semi Bold, 140%)
      </Typography>
      <Typography
        as='h6'
        size='h6'
        weight='semibold'
        lineHeight='1.4'
        textColor='brand1'
      >
        Heading 6 (15px, Semi Bold, 140%)
      </Typography>
    </>
  ),
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  children: (
    <>
      <Typography
        as='p'
        size='p1'
        weight='medium'
        lineHeight='1.4'
        textColor='brand1'
      >
        Paragraph 1 (16px, Medium, 140%)
      </Typography>
      <Typography
        as='p'
        size='p2'
        weight='medium'
        lineHeight='1.4'
        textColor='brand1'
      >
        Paragraph 2 (14px, Medium, 140%)
      </Typography>
      <Typography
        as='p'
        size='p3'
        weight='medium'
        lineHeight='1.4'
        textColor='brand1'
      >
        Paragraph 3 (14px, Medium, 140%)
      </Typography>
      <Typography
        as='p'
        size='p4'
        weight='medium'
        lineHeight='1.4'
        textColor='brand1'
      >
        Paragraph 4 (13px, Medium, 140%)
      </Typography>
    </>
  ),
};

export const SmallText = Template.bind({});
SmallText.args = {
  children: (
    <>
      <Typography
        as='p'
        size='sm1'
        weight='medium'
        lineHeight='1.4'
        textColor='brand1'
      >
        Small Text 1 (12px, Medium, 140%)
      </Typography>
      <Typography
        as='p'
        size='sm2'
        weight='medium'
        lineHeight='1.4'
        textColor='brand1'
      >
        Small Text 2 (10px, Medium, 140%)
      </Typography>
    </>
  ),
};
