import React from 'react'

import { TeamRankingSchema } from '../../common/types/RankingByTeam.type'
import { Spinner } from '../Loading/Spinner'
import { Toast } from '../Toast/Toast'
import { useRankingApi } from '../../common/hooks/api/useRankingsApi'
import { TeamLogo } from '../Logo/TeamLogo'
import { TeamProps } from '../VolleyTables/VolleyTables'

export const RankingTable = ({ teamId, teamName }: TeamProps) => {
    const [loading, ranking, error] = useRankingApi(teamId)

    if (error) {
        console.error('Error while fetching rankings.')
        return (
            <Toast text="Beim Laden der Tabelle ist ein Fehler aufgetreten." />
        )
    }

    if (loading) {
        return <Spinner text="Lade Tabelle ..." />
    }

    if (!ranking.teams || ranking.teams.length === 0) {
        return (
            <Toast text="Für deine Mannschaft ist keine Tabelle vorhanden." />
        )
    }

    return (
        <table className={`tw-w-full tw-border-collapse`}>
            <thead className={`tw-sticky tw-top-0`}>
                <tr className={`tw-bg-th-gray tw-text-th-white`}>
                    <th
                        className={`tw-text-center tw-py-1 tw-px-2 tw-text-nowrap`}
                    >
                        Rang
                    </th>
                    <th className={`tw-text-left tw-py-1 tw-text-nowrap`}>
                        Team
                    </th>
                    <th
                        className={`tw-text-center tw-py-1 tw-px-2 tw-text-nowrap tw-hidden @md:tw-table-cell`}
                    >
                        Siege
                    </th>
                    <th
                        className={`tw-text-center tw-py-1 tw-px-2 tw-text-nowrap tw-overflow-hidden tw-text-ellipsis tw-hidden @md:tw-table-cell`}
                    >
                        Niederlagen
                    </th>
                    <th
                        className={`tw-text-center tw-py-1 tw-px-2 tw-text-nowrap`}
                    >
                        Punkte
                    </th>
                </tr>
            </thead>
            <tbody>
                {ranking.teams.map((team: TeamRankingSchema, index: number) => {
                    return (
                        <RankingTableRow
                            key={index}
                            team={team}
                            isHomeTeam={team.teamCaption?.includes(teamName)}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

type RankingTableRowProps = {
    team: TeamRankingSchema
    isHomeTeam?: boolean
}

const RankingTableRow = ({
    team,
    isHomeTeam = false,
}: RankingTableRowProps) => {
    return (
        <tr
            className={`tw-border-0 tw-border-y-2 tw-border-solid tw-border-th-slate-200 tw-duration-200 first:tw-border-t-0 last:tw-border-b-0 ${
                isHomeTeam
                    ? `tw-bg-th-red-100 tw-duration-200 hover:tw-bg-th-red-200`
                    : `tw-bg-th-white hover:tw-bg-th-slate-100 even:tw-bg-th-slate-50`
            }`}
        >
            <td className={`tw-text-center tw-py-2`}>
                <TextContent text={team.rank} bold={isHomeTeam} />
            </td>
            <td
                className={`tw-th-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis tw-py-1`}
            >
                <div
                    className={`tw-h-8 tw-flex tw-flex-row tw-items-center tw-gap-2 tw-text-nowrap`}
                >
                    <TeamLogo
                        src={team.teamLogoUrl}
                        styles={`tw-hidden @sm:tw-block`}
                    />
                    <TextContent text={team.teamCaption} bold={isHomeTeam} />
                </div>
            </td>
            <td
                className={`tw-text-center tw-py-2 tw-hidden @md:tw-table-cell`}
            >
                <TextContent text={team.wins} bold={isHomeTeam} />
            </td>
            <td
                className={`tw-text-center tw-py-2 tw-hidden @md:tw-table-cell`}
            >
                <TextContent text={team.defeats} bold={isHomeTeam} />
            </td>
            <td className={`tw-text-center tw-py-2`}>
                <TextContent text={team.points} bold={isHomeTeam} />
            </td>
        </tr>
    )
}

type TextContentProps = {
    text: string | number
    bold?: boolean
}

// Component to work around unreliable font settings
const TextContent = ({ text, bold = false }: TextContentProps) => {
    return bold ? <strong>{text}</strong> : <>{text}</>
}
