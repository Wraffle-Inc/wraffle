import type { Meta, StoryObj } from '@storybook/react';
import { Typography, TypographyProps } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Foundations/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'paragraph-1',
          'paragraph-2',
          'paragraph-3',
          'paragraph-4',
          'smalltext-1',
          'smalltext-2',
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

const createStory = (
  variant: TypographyProps['variant'],
  children: React.ReactNode
): Story => ({
  args: {
    variant,
    children,
  },
});

// Heading Variants
export const Heading = () => (
  <>
    <Typography variant='h1'>Heading 1 (32px, Bold, 140%)</Typography>
    <Typography variant='h2'>Heading 2 (24px, Bold, 140%)</Typography>
    <Typography variant='h3'>Heading 3 (20px, Semi Bold, 140%)</Typography>
    <Typography variant='h4'>Heading 4 (17px, Semi Bold, 140%)</Typography>
    <Typography variant='h5'>Heading 5 (16px, Semi Bold, 140%)</Typography>
    <Typography variant='h6'>Heading 6 (15px, Semi Bold, 140%)</Typography>
  </>
);

// Paragraph Variants
export const Paragraph = () => (
  <>
    <Typography variant='p1'>Paragraph 1</Typography>
    <Typography variant='p2'>Paragraph 2</Typography>
    <Typography variant='p3'>Paragraph 3</Typography>
    <Typography variant='p4'>Paragraph 4</Typography>
  </>
);

// SmallText Variants
export const SmallText = () => (
  <>
    <Typography variant='sm1'>SmallText 1</Typography>
    <Typography variant='sm2'>SmallText 2</Typography>
  </>
);
