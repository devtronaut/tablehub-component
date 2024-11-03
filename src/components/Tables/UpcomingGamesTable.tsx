import React from 'react'
import { TeamProps } from '../VolleyTables/VolleyTables'
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

export const UpcomingGamesTable = ({ teamId }: TeamProps) => {
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
        <table className={`tw-w-full tw-border-collapse`}>
            <thead className={`tw-sticky tw-top-0`}>
                <tr className={`tw-bg-th-gray tw-text-th-white`}>
                    <GamesTableHeader text={`Datum`} styles={``} />
                    <GamesTableHeader text={`Gegner`} styles={``} />
                    <GamesTableHeader
                        text={`Typ`}
                        styles={`tw-hidden @xl:tw-table-cell`}
                    />
                    <GamesTableHeader text={`Ort`} styles={``} />
                </tr>
            </thead>
            <tbody>
                {games.upcomingGames.map(
                    (game: UpcomingGamesSchema, index: number) => {
                        return <GamesTableRow key={index} {...game} />
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
    return (
        <th className={`tw-text-center tw-py-1 tw-px-2 ${styles ?? ''}`}>
            {text}
        </th>
    )
}

type GamesTableRowProps = {
    opponent: string
    mode: string
    type: GameType
    location: LocationSchema
    dateUtc: string
    opponentLogoUrl: string
}

const GamesTableRow = ({
    opponent,
    mode,
    type,
    location,
    dateUtc,
    opponentLogoUrl,
}: GamesTableRowProps) => {
    const [long, short, shortTwoDigitYear, time] = useDateTransformer(dateUtc)
    const mapsLink = useMapsLinkTransformer(location.plusCode)

    return (
        <tr
            className={`tw-border-0 tw-border-y-2 tw-border-solid tw-border-th-slate-200 tw-duration-200 tw-bg-th-white hover:tw-bg-th-slate-100 even:tw-bg-th-slate-50 first:tw-border-t-0 last:tw-border-b-0`}
        >
            <td className={`tw-text-center tw-py-1`}>
                <div className={`tw-w-full tw-text-center`}>
                    <span className={`tw-hidden @xl:tw-inline`}>{long}</span>
                    <span className={`tw-hidden @sm:tw-inline @xl:tw-hidden`}>
                        {short}
                    </span>
                    <span className={`@sm:tw-hidden`}>{shortTwoDigitYear}</span>
                </div>
                <div className="tw-flex tw-justify-center tw-gap-1">
                    <span>{time}</span>
                    <span className="tw-hidden @sm:tw-inline">{'Uhr'}</span>
                </div>
            </td>
            <td
                className={`tw-text-center tw-py-1 tw-th-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis`}
            >
                <div
                    className={`tw-h-12 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1`}
                >
                    <div className={`tw-h-1/2`}>
                        <TeamLogo src={opponentLogoUrl} />
                    </div>
                    {opponent}
                </div>
            </td>
            <td
                className={`tw-text-center tw-py-1 tw-hidden @xl:tw-table-cell`}
            >
                <div className="tw-w-full tw-text-center">{mode}</div>
                <div className="tw-w-full tw-text-center">{type}</div>
            </td>
            <td
                className={`tw-text-center tw-align-middle tw-py-1 tw-text-ellipsis`}
            >
                <a
                    href={mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`tw-hidden @lg:tw-block`}
                >
                    {location.caption}
                </a>
                <div className={`tw-text-balance tw-mt-1`}>
                    <div
                        className={`tw-th-whitespace-nowrap tw-text-center tw-hidden @lg:tw-block`}
                    >{`${location.zip} ${location.city}`}</div>
                </div>
                <div
                    className={`tw-h-8 tw-flex tw-flex-row tw-justify-around @lg:tw-hidden`}
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
