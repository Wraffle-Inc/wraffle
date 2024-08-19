import type { Meta, StoryFn } from "@storybook/react";
import { Typography, TypographyProps } from "./Typography";

const meta: Meta<TypographyProps> = {
  title: "Foundations/Typography",
  component: Typography,
  argTypes: {
    fontSize: {
      control: {
        type: "select",
        options: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p1",
          "p2",
          "p3",
          "p4",
          "sm1",
          "sm2",
        ],
      },
    },
    fontWeight: {
      control: {
        type: "select",
        options: ["medium", "semibold", "bold"],
      },
    },
    lineHeight: {
      control: {
        type: "text",
      },
      defaultValue: "tight",
    },
    children: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

const Template: StoryFn<TypographyProps> = (args) => <Typography {...args} />;

export const Heading = Template.bind({});
Heading.args = {
  children: (
    <>
      <Typography fontSize="h1" fontWeight="bold" lineHeight="tight">
        Heading 1 (32px, Bold, 140%)
      </Typography>
      <Typography fontSize="h2" fontWeight="bold" lineHeight="tight">
        Heading 2 (24px, Bold, 140%)
      </Typography>
      <Typography fontSize="h3" fontWeight="semibold" lineHeight="tight">
        Heading 3 (20px, Semi Bold, 140%)
      </Typography>
      <Typography fontSize="h4" fontWeight="semibold" lineHeight="tight">
        Heading 4 (17px, Semi Bold, 140%)
      </Typography>
      <Typography fontSize="h5" fontWeight="semibold" lineHeight="tight">
        Heading 5 (16px, Semi Bold, 140%)
      </Typography>
      <Typography fontSize="h6" fontWeight="semibold" lineHeight="tight">
        Heading 6 (15px, Semi Bold, 140%)
      </Typography>
    </>
  ),
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  children: (
    <>
      <Typography fontSize="p1" fontWeight="medium" lineHeight="tight">
        Paragraph 1 (16px, Medium, 140%)
      </Typography>
      <Typography fontSize="p2" fontWeight="medium" lineHeight="tight">
        Paragraph 2 (14px, Medium, 140%)
      </Typography>
      <Typography fontSize="p3" fontWeight="medium" lineHeight="tight">
        Paragraph 3 (14px, Medium, 140%)
      </Typography>
      <Typography fontSize="p4" fontWeight="medium" lineHeight="tight">
        Paragraph 4 (13px, Medium, 140%)
      </Typography>
    </>
  ),
};

export const SmallText = Template.bind({});
SmallText.args = {
  children: (
    <>
      <Typography fontSize="sm1" fontWeight="medium" lineHeight="tight">
        Small Text 1 (12px, Medium, 140%)
      </Typography>
      <Typography fontSize="sm2" fontWeight="medium" lineHeight="tight">
        Small Text 2 (10px, Medium, 140%)
      </Typography>
    </>
  ),
};
