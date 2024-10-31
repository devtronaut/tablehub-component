import React, { useState } from 'react'
import { TableSwitchButton } from '../Controls/TableSwitchButton'
import { RankingTable } from '../Tables/RankingTable'
import { UpcomingGamesTable } from '../Tables/UpcomingGamesTable'
import { ResultsTable } from '../Tables/ResultsTable'

export type TableProps = {
    isDemo: boolean
} & TeamProps

export type TeamProps = {
    teamId: number
    teamName: string
}

export const VolleyTables = ({ teamId, teamName }: TeamProps) =>
    Tables({ teamId, teamName, isDemo: false })
export const DemoTables = ({ teamId, teamName }: TeamProps) =>
    Tables({ teamId, teamName, isDemo: true })

const Tables = ({ teamId, teamName, isDemo = false }: TableProps) => {
    const [isRanking, setRanking] = useState(true)
    const [isResults, setResults] = useState(false)
    const [isUpcomingGames, setUpcomingGames] = useState(false)

    const rankingButtonClicked = () => {
        setRanking(true)
        setResults(false)
        setUpcomingGames(false)
    }

    const resultsButtonClicked = () => {
        setRanking(false)
        setResults(true)
        setUpcomingGames(false)
    }

    const upcomingGamesButtonClicked = () => {
        setRanking(false)
        setResults(false)
        setUpcomingGames(true)
    }

    return (
        <div className="tw-parent">
            <div className="tw-w-full tw-flext tw-flex-col tw-items-center tw-my-8 tw-text-th-black">
                <div className="tw-w-full tw-overflow-clip">
                    <TableSwitchButton
                        text={'Tabelle'}
                        handler={rankingButtonClicked}
                        isActive={isRanking}
                    />
                    <TableSwitchButton
                        text={'Resultate'}
                        handler={resultsButtonClicked}
                        isActive={isResults}
                    />
                    <TableSwitchButton
                        text={'Nächste Spiele'}
                        handler={upcomingGamesButtonClicked}
                        isActive={isUpcomingGames}
                    />
                </div>

                <div className="tw-@container tw-w-full tw-bg-th-white tw-rounded-md tw-rounded-tl-none tw-max-h-[550px] tw-overflow-y-auto tw-shadow">
                    {isRanking && (
                        <RankingTable
                            teamId={teamId}
                            teamName={teamName}
                            isDemo={isDemo}
                        />
                    )}
                    {isUpcomingGames && (
                        <UpcomingGamesTable
                            teamId={teamId}
                            teamName={teamName}
                            isDemo={isDemo}
                        />
                    )}
                    {isResults && (
                        <ResultsTable
                            teamId={teamId}
                            teamName={teamName}
                            isDemo={isDemo}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
