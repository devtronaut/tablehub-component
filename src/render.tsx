import React from 'react'
import { VolleyTables } from './components/VolleyTables/VolleyTables'
import { createRoot } from 'react-dom/client'

type TablesConfig = {
    teamName: string
    teamId: number
    referenceNode: HTMLElement
    position: 'before' | 'after'
}

export const renderVolleyTables = ({
    teamName,
    teamId,
    referenceNode,
    position,
}: TablesConfig) => {
    renderTables({ teamName, teamId, referenceNode, position })
}

const renderTables = ({
    teamName,
    teamId,
    referenceNode,
    position,
}: TablesConfig) => {
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
    root.render(<VolleyTables teamId={teamId} teamName={teamName} />)
}
