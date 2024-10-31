import type { Meta, StoryObj } from '@storybook/react'
import { DemoTables } from './VolleyTables'

const meta: Meta<typeof DemoTables> = {
    title: 'Components/DemoTables',
    component: DemoTables,
}

type Story = StoryObj<typeof DemoTables>

export const Primary: Story = {
    args: {
        teamId: 2798,
        teamName: 'VBC Uni Bern a',
    },
}

export default meta
