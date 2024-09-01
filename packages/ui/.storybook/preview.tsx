import type {Preview} from '@storybook/react';
import '@wds/shared/styles/globals.css';
import IconLoader from '@wds/ui/icon/IconLoader';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <>
        {IconLoader}
        <Story />
      </>
    ),
  ],
};

export default preview;
