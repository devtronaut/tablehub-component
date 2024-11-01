import React from 'react'
import { TableProps } from '../VolleyTables/VolleyTables'
import {
    LocationSchema,
    UpcomingGamesSchema,
} from '../../common/types/UpcomingGamesByTeam.type'
import { Spinner } from '../Loading/Spinner'
import { Toast } from '../Toast/Toast'
import { GameType } from '../../common/enums/GameType.enum'
import { useUpcomingGamesApi } from '../../common/hooks/api/useUpcomingGamesApi'
import { useDateTransformer } from '../../common/hooks/transformers/useDateTransformer'
import { useMapsLinkTransformer } from '../../common/hooks/transformers/useMapsLinkTransformer'
import { TeamLogo } from '../Logo/TeamLogo'

export const UpcomingGamesTable = ({ teamId, isDemo }: TableProps) => {
    const [loading, games, error] = useUpcomingGamesApi(teamId)

    if (error) {
        console.error('Error while fetching upcoming games.')
        return (
            <Toast text="Beim Laden der Spiele ist ein Fehler aufgetreten." />
        )
    }

    if (loading) {
        return <Spinner text="Lade nächste Spiele ..." />
    }

    if (!games.upcomingGames || games.upcomingGames.length === 0) {
        return (
            <Toast text="Für deine Mannschaft sind keine weiteren Spiele vorhanden." />
        )
    }

    return (
        <table
            className={`tw-w-full tw-table-fixed tablet:tw-table-auto @tablet:tw-table-auto tw-border-collapse ${
                isDemo ? '' : ''
            }`}
        >
            <thead className={`tw-sticky tw-top-0`}>
                <tr className={`tw-bg-th-gray tw-text-th-white`}>
                    <GamesTableHeader
                        text={`DATUM`}
                        styles={`tw-w-24 tw-text-center ${
                            isDemo ? '@phone:tw-w-auto' : 'phone:tw-w-auto'
                        }`}
                    />
                    <GamesTableHeader
                        text={`GEGNER`}
                        styles={`tw-text-center ${
                            isDemo
                                ? '@phone:tw-text-left'
                                : 'phone:tw-text-left'
                        }`}
                    />
                    <GamesTableHeader
                        text={`TYP`}
                        styles={`tw-hidden tw-text-center ${
                            isDemo
                                ? '@tablet:tw-table-cell'
                                : 'tablet:tw-table-cell'
                        }`}
                    />
                    <GamesTableHeader
                        text={`ORT`}
                        styles={`tw-w-12 tw-text-center ${
                            isDemo ? '@phone:tw-w-auto' : 'phone:tw-w-auto'
                        }`}
                    />
                </tr>
            </thead>
            <tbody>
                {games.upcomingGames.map(
                    (game: UpcomingGamesSchema, index: number) => {
                        return (
                            <GamesTableRow
                                key={index}
                                {...game}
                                isDemo={isDemo}
                            />
                        )
                    }
                )}
            </tbody>
        </table>
    )
}

type GamesTableHeaderProps = {
    text: string
    styles?: string
}

const GamesTableHeader = ({ text, styles }: GamesTableHeaderProps) => {
    return <th className={` tw-py-1 ${styles ?? ''}`}>{text}</th>
}

type GamesTableRowProps = {
    opponent: string
    mode: string
    type: GameType
    location: LocationSchema
    dateUtc: string
    opponentLogoUrl: string
    isDemo: boolean
}

const GamesTableRow = ({
    opponent,
    mode,
    type,
    location,
    dateUtc,
    opponentLogoUrl,
    isDemo,
}: GamesTableRowProps) => {
    const [long, short, shortTwoDigitYear, time] = useDateTransformer(dateUtc)
    const mapsLink = useMapsLinkTransformer(location.plusCode)

    return (
        <tr
            className={`tw-border-0 tw-border-y-2 tw-border-solid tw-border-th-slate-200 tw-duration-200 tw-bg-th-white hover:tw-bg-th-slate-100 even:tw-bg-th-slate-50 first:tw-border-t-0 last:tw-border-b-0`}
        >
            <td className={`tw-text-center tw-py-1`}>
                <div className={`tw-w-full tw-text-center`}>
                    <span
                        className={`tw-hidden ${
                            isDemo ? '@tablet:tw-block' : 'tablet:tw-block'
                        }`}
                    >
                        {long}
                    </span>
                    <span
                        className={`tw-hidden ${
                            isDemo
                                ? '@tablet:tw-hidden'
                                : 'phone:tw-block tablet:tw-hidden'
                        }`}
                    >
                        {short}
                    </span>
                    <span
                        className={`tw-block ${
                            isDemo ? '@tablet:tw-hidden' : 'phone:tw-hidden'
                        }`}
                    >
                        {shortTwoDigitYear}
                    </span>
                </div>
                {`${time} Uhr`}
            </td>
            <td
                className={`tw-text-center tw-py-1 tw-th-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis`}
            >
                <div
                    className={`tw-h-12 tw-flex tw-flex-col tw-items-center tw-gap-0 ${
                        isDemo
                            ? '@phone:tw-gap-2 @phone:tw-flex-row @tablet:tw-h-8'
                            : 'phone:tw-gap-2 phone:tw-flex-row tablet:tw-h-8'
                    }`}
                >
                    <div
                        className={`tw-h-[50%] ${
                            isDemo ? '@tablet:tw-h-full' : 'tablet:tw-h-full'
                        }`}
                    >
                        <TeamLogo src={opponentLogoUrl} />
                    </div>
                    {opponent}
                </div>
            </td>
            <td
                className={`tw-text-center tw-py-1 tw-hidden ${
                    isDemo ? '@tablet:tw-table-cell' : 'tablet:tw-table-cell'
                }`}
            >
                {mode}
                <br />
                {type}
            </td>
            <td
                className={`tw-text-center tw-align-middle tw-py-1 tw-text-ellipsis`}
            >
                <a
                    href={mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`tw-hidden ${
                        isDemo ? '@tablet:tw-inline' : 'tablet:tw-inline'
                    }`}
                >
                    {location.caption}
                </a>
                <div
                    className={`tw-text-balance tw-mt-1 tw-hidden ${
                        isDemo ? '@tablet:tw-block' : 'tablet:tw-block'
                    }`}
                >
                    <div
                        className={`tw-th-whitespace-nowrap tw-text-center`}
                    >{`${location.zip} ${location.city}`}</div>
                </div>
                <div
                    className={`tw-h-8 tw-flex tw-flex-row tw-justify-around ${
                        isDemo ? '@tablet:tw-hidden' : 'tablet:tw-hidden'
                    }`}
                >
                    <PinLink mapsLink={mapsLink} />
                </div>
            </td>
        </tr>
    )
}

type PinLinkProps = {
    mapsLink: string
}

const PinLink = ({ mapsLink }: PinLinkProps) => {
    return (
        <a href={mapsLink} target="_blank" rel="noreferrer" className="tw-h-8">
            <GoogleMapsIcon />
        </a>
    )
}

const GoogleMapsIcon = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="tw-h-[75%]"
        >
            <g transform="scale(1.03, 1.03), translate(3.5, 0)">
                <path
                    d="M14.45.78A8.09,8.09,0,0,0,5.8,3.29L9.63,6.51Z"
                    transform="translate(-3.91 -0.4)"
                    fill="#1a73e8"
                />
                <path
                    d="M5.8,3.29a8.07,8.07,0,0,0-1.89,5.2,9.06,9.06,0,0,0,.8,3.86L9.63,6.51Z"
                    transform="translate(-3.91 -0.4)"
                    fill="#ea4335"
                />
                <path
                    className="cls-3"
                    d="M12,5.4a3.09,3.09,0,0,1,3.1,3.09,3.06,3.06,0,0,1-.74,2l4.82-5.73a8.12,8.12,0,0,0-4.73-4L9.63,6.51A3.07,3.07,0,0,1,12,5.4Z"
                    transform="translate(-3.91 -0.4)"
                    fill="#4285f4"
                />
                <path
                    className="cls-4"
                    d="M12,11.59a3.1,3.1,0,0,1-3.1-3.1,3.07,3.07,0,0,1,.73-2L4.71,12.35A28.67,28.67,0,0,0,8.38,17.6l6-7.11A3.07,3.07,0,0,1,12,11.59Z"
                    transform="translate(-3.91 -0.4)"
                    fill="#fbbc04"
                />
                <path
                    className="cls-5"
                    d="M14.25,19.54c2.7-4.22,5.84-6.14,5.84-11a8.1,8.1,0,0,0-.91-3.73L8.38,17.6c.46.6.92,1.24,1.37,1.94C11.4,22.08,10.94,23.6,12,23.6S12.6,22.08,14.25,19.54Z"
                    transform="translate(-3.91 -0.4)"
                    fill="#34a853"
                />
            </g>
        </svg>
    )
}
