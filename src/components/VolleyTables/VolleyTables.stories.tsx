import type { Meta, StoryObj } from '@storybook/react';
import {VolleyTables} from './VolleyTables';

const meta: Meta<typeof VolleyTables> = {
  title: 'Components/VolleyTables',
  component: VolleyTables,
};

type Story = StoryObj<typeof VolleyTables>;

export const Primary: Story = {
    args: {
        teamId: 2798,
        teamName: "VBC Uni Bern a"
    }
}

export default meta;