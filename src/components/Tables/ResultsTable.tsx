import React from 'react'
import { TableProps } from '../VolleyTables/VolleyTables'
import { useDateTransformer } from '../../common/hooks/transformers/useDateTransformer'
import { useResultsApi } from '../../common/hooks/api/useResultsApi'
import {
    ResultsSchema,
    ResultTeamSchema,
} from '../../common/types/ResultsByTeam.type'
import { Spinner } from '../Loading/Spinner'
import { Toast } from '../Toast/Toast'

export const ResultsTable = ({ teamId, isDemo }: TableProps) => {
    const [loading, results, error] = useResultsApi(teamId)

    if (error) {
        console.error('Error while fetching results.')
        return (
            <Toast text="Beim Laden der Resultate ist ein Fehler aufgetreten." />
        )
    }

    if (loading) {
        return <Spinner text="Lade Resultate ..." />
    }

    if (!results.results || results.results.length === 0) {
        return (
            <Toast text="Für deine Mannschaft sind noch keine Resultate vorhanden." />
        )
    }

    const maxPlayedSets = Math.max(
        ...results.results.map((r) => r.winner.sets.length)
    )

    return (
        <table
            className={`tw-w-full tw-table-auto tablet:tw-table-fixed tw-border-collapse`}
        >
            <thead className={`tw-sticky tw-top-0`}>
                <tr className={`tw-bg-th-gray tw-text-th-white tw-w-full`}>
                    <th className={`tw-text-center tw-py-1 tw-w-24`}>DATUM</th>
                    <th
                        className={`tw-text-center tw-py-1 tw-hidden tw-w-32 ${
                            isDemo
                                ? '@phone:tw-table-cell'
                                : 'tablet:tw-table-cell'
                        }`}
                    >
                        MODUS
                    </th>
                    <th className={`tw-text-center tw-py-1`}>TEAMS</th>
                    <th className={`tw-text-center tw-py-1 tw-w-20`}>SÄTZE</th>
                    <th
                        colSpan={maxPlayedSets}
                        className={`tw-text-left tw-py-1 tw-hidden tw-w-60 ${
                            isDemo
                                ? '@phone:tw-table-cell'
                                : 'phone-sm:tw-table-cell'
                        }`}
                    >
                        PUNKTE
                    </th>
                </tr>
            </thead>
            {results.results.map((result: ResultsSchema, index: number) => {
                return (
                    <ResultTableRow
                        key={index}
                        winner={result.winner}
                        loser={result.loser}
                        dateUtc={result.dateUtc}
                        mode={result.mode}
                        maxPlayedSets={maxPlayedSets}
                        isDemo={isDemo}
                    />
                )
            })}
        </table>
    )
}

type TableRowProps = {
    winner: ResultTeamSchema
    loser: ResultTeamSchema
    dateUtc: string
    mode: string
    maxPlayedSets: number
    isDemo: boolean
}

const ResultTableRow = ({
    winner,
    loser,
    dateUtc,
    mode,
    maxPlayedSets,
    isDemo,
}: TableRowProps) => {
    const [, short, shortDateTwoDigitYear] = useDateTransformer(dateUtc)

    // Fill the sets array to the maximum number of sets played (to have an equal amount of cells in each row)
    const setDifference = maxPlayedSets - winner.sets.length
    const fillArray = new Array(setDifference).fill(null, 0, setDifference)
    const winnerSets = winner.sets.concat(fillArray)
    const loserSets = loser.sets.concat(fillArray)

    const [winnerSetObjects, loserSetObjects] = getSetObjects(
        winnerSets,
        loserSets
    )

    return (
        <tbody
            className={`tw-bg-th-white even:tw-bg-th-slate-50 hover:tw-bg-th-slate-100`}
        >
            <tr>
                <td rowSpan={2} className={`tw-text-center tw-py-1`}>
                    <span className="tw-hidden phone:tw-inline">{short}</span>
                    <span className="tw-inline phone:tw-hidden">
                        {shortDateTwoDigitYear}
                    </span>
                </td>
                <td
                    rowSpan={2}
                    className={`tw-text-center tw-py-1 tw-hidden ${
                        isDemo ? '@phone:tw-table-cell' : 'tablet:tw-table-cell'
                    }`}
                >
                    {mode}
                </td>
                <TeamResultRow
                    isWinner={true}
                    caption={winner.caption}
                    setsWon={winner.setsWon}
                    sets={winnerSetObjects}
                    isDemo={isDemo}
                />
            </tr>
            <tr
                className={`tw-border-0 tw-border-b-2 tw-border-solid tw-border-th-slate-200 hover:tw-bg-th-slate-100`}
            >
                <TeamResultRow
                    isWinner={false}
                    caption={loser.caption}
                    setsWon={loser.setsWon}
                    sets={loserSetObjects}
                    isDemo={isDemo}
                />
            </tr>
        </tbody>
    )
}

type Set = {
    points: number
    won: boolean
}

type TeamResultRowProps = {
    isWinner: boolean
    caption: string
    setsWon: number
    sets: Set[]
    isDemo: boolean
}

const TeamResultRow = ({
    isWinner,
    caption,
    setsWon,
    sets,
    isDemo,
}: TeamResultRowProps) => {
    return (
        <>
            <td
                className={`tw-text-center tw-pt-1 tw-px-2 phone:tw-px-5 tw-th-whitespace-nowrap tw-text-nowrap tw-min-w-fit`}
            >
                {isWinner ? <strong>{caption}</strong> : caption}
            </td>
            <td className={`tw-text-center tw-pt-1 tw-block tw-w-20`}>
                {isWinner ? <strong>{setsWon}</strong> : setsWon}
            </td>
            {sets.map((set, index) => {
                return (
                    <td
                        className={`tw-text-left tw-pt-1 tw-px-2 tw-hidden ${
                            isDemo
                                ? '@phone:tw-table-cell'
                                : 'phone-sm:tw-table-cell'
                        }`}
                        key={index}
                    >
                        {set.won ? (
                            <strong>{set.points}</strong>
                        ) : (
                            <span className={`tw-text-th-neutral-600`}>
                                {set.points}
                            </span>
                        )}
                    </td>
                )
            })}
        </>
    )
}

const getSetObjects = (
    winnerSets: number[],
    loserSets: number[]
): [Set[], Set[]] => {
    const winnerSetObjects: Set[] = []
    const loserSetObjects: Set[] = []

    winnerSets.forEach((winnerPoints, idx) => {
        const loserPoints = loserSets[idx]
        const winnerWonSet = winnerPoints > loserPoints

        winnerSetObjects.push({
            points: winnerPoints,
            won: winnerWonSet,
        })

        loserSetObjects.push({
            points: loserPoints,
            won: !winnerWonSet,
        })
    })

    return [winnerSetObjects, loserSetObjects]
}
