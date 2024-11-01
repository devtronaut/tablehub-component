import React from 'react'
import {
    DemoTables,
    VolleyTables,
} from './components/VolleyTables/VolleyTables'
import { createRoot } from 'react-dom/client'

type TablesConfig = {
    teamName: string
    teamId: number
    referenceNode: HTMLElement
    position: 'before' | 'after'
}

type RenderConfig = TablesConfig & {
    isDemo: boolean
}

export const renderVolleyTables = ({
    teamName,
    teamId,
    referenceNode,
    position,
}: TablesConfig) => {
    renderTables({ teamName, teamId, referenceNode, position, isDemo: false })
}

export const renderDemoTables = ({
    teamName,
    teamId,
    referenceNode,
    position,
}: TablesConfig) => {
    renderTables({ teamName, teamId, referenceNode, position, isDemo: true })
}

const renderTables = ({
    teamName,
    teamId,
    referenceNode,
    position,
    isDemo,
}: RenderConfig) => {
    // generate rootDiv with 'root' id
    const rootDiv = document.createElement('div')
    rootDiv.id = 'root'

    // position the root element as specified in the config
    if (position === 'before') {
        referenceNode.before(rootDiv)
    } else if (position === 'after') {
        referenceNode.after(rootDiv)
    }

    const root = createRoot(rootDiv)

    if (isDemo) {
        root.render(<DemoTables teamId={teamId} teamName={teamName} />)
    } else {
        root.render(<VolleyTables teamId={teamId} teamName={teamName} />)
    }
}
