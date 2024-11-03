import React, { useState } from 'react'
import { TableSwitchButton } from '../Controls/TableSwitchButton'
import { RankingTable } from '../Tables/RankingTable'
import { UpcomingGamesTable } from '../Tables/UpcomingGamesTable'
import { ResultsTable } from '../Tables/ResultsTable'

export type TeamProps = {
    teamId: number
    teamName: string
}

export const VolleyTables = ({ teamId, teamName }: TeamProps) =>
    Tables({ teamId, teamName })

const Tables = ({ teamId, teamName }: TeamProps) => {
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
            <div className="tw-@container tw-w-full tw-flex tw-flex-col tw-items-center tw-my-8 tw-text-th-black">
                <div className="tw-w-full tw-overflow-clip tw-relative">
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
                    <div className="tw-hidden @sm:tw-inline-block tw-absolute tw-top-2 tw-right-1 @md:tw-right-5">
                        <span className="tw-hidden @md:tw-inline">
                            <MadeWith showText={true} />
                        </span>
                        <span className="tw-inline @md:tw-hidden">
                            <MadeWith showText={false} />
                        </span>
                    </div>
                </div>
                <div
                    className={`tw-w-full tw-bg-th-white tw-rounded-md tw-rounded-tl-none tw-max-h-[550px] tw-overflow-y-auto`}
                >
                    {isRanking && (
                        <RankingTable teamId={teamId} teamName={teamName} />
                    )}
                    {isUpcomingGames && (
                        <UpcomingGamesTable
                            teamId={teamId}
                            teamName={teamName}
                        />
                    )}
                    {isResults && (
                        <ResultsTable teamId={teamId} teamName={teamName} />
                    )}
                </div>
                <div className="tw-inline-block @sm:tw-hidden tw-self-start tw-mt-2">
                    <MadeWith showText={true} />
                </div>
            </div>
        </div>
    )
}

type MadeWithProps = {
    showText?: boolean
}

const MadeWith = ({ showText = true }: MadeWithProps) => {
    return (
        <a
            href="https://tablehub.ch/"
            target="_blank"
            rel="noreferrer"
            className="tw-flex tw-items-center"
        >
            <TablehubLogo />
            {showText && <span className="tw-ml-1">Tablehub</span>}
        </a>
    )
}

const TablehubLogo = () => {
    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            preserveAspectRatio="xMidYMid meet"
            className="tw-h-6 @md:tw-h-5"
        >
            <g>
                <circle fill="#222" cx="256" cy="256" r="256" />
                <g fill="#fff">
                    <rect width="268" height="76" x="122" y="130" rx="8" />
                    <rect width="92" height="252" x="210" y="130" rx="8" />
                </g>
            </g>
        </svg>
    )
}
