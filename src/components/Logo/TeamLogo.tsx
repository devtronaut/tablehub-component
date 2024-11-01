import React from 'react'

type TeamLogoProps = {
    src?: string
    styles?: string
}

export const TeamLogo = ({ src, styles }: TeamLogoProps) => {
    return (
        <div className={`tw-h-full ${styles}`}>
            {src ? (
                <img
                    src={src}
                    className="tw-h-full tw-max-w-none tw-object-cover tw-rounded-full"
                />
            ) : (
                <VolleyballIcon />
            )}
        </div>
    )
}

const VolleyballIcon = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="tw-h-full"
        >
            <path
                d="M10.5766 12.3986C9.64853 13.5794 8.49484 14.5395 7.19986 15.2377C5.62198 11.4336 5.51513 7.26225 6.87932 3.40844C7.93127 2.78009 9.1083 2.33946 10.3642 2.13281L10.1849 2.55865C8.86607 5.69077 9.08193 9.23933 10.7467 12.1822L10.5766 12.3986Z"
                fill="#1C274C"
            />
            <path
                d="M4.8586 4.99964C3.09033 6.8034 2 9.2742 2 11.9997C2 13.6171 2.38398 15.1448 3.06576 16.4966C4.01958 16.4037 4.94937 16.1871 5.83307 15.8574C4.37799 12.3754 4.05507 8.6042 4.86431 4.99382L4.8586 4.99964Z"
                fill="#1C274C"
            />
            <g opacity="0.7">
                <path
                    d="M12.0171 12.9932C13.94 13.0388 15.7856 13.5929 17.38 14.5626C14.4914 17.598 10.3916 19.7027 6.21503 20.1574C5.33563 19.5327 4.56159 18.7693 3.9248 17.8992C7.00233 17.4189 9.8119 15.7989 11.756 13.3254L12.0171 12.9932Z"
                    fill="#1C274C"
                />
                <path
                    d="M20.4402 17.365C18.6653 20.1514 15.5485 21.9996 12 21.9996C10.7178 21.9996 9.49189 21.7583 8.36533 21.3186C12.2684 20.4474 15.9424 18.313 18.6152 15.4387C19.2956 15.9976 19.91 16.643 20.4402 17.365Z"
                    fill="#1C274C"
                />
            </g>
            <g opacity="0.4">
                <path
                    d="M21.6242 11.3581L21.6263 11.3601L21.9966 11.7327C21.999 11.8215 22.0001 11.9106 22.0001 11.9999C22.0001 13.3876 21.7175 14.7093 21.2066 15.9105C18.9643 13.2085 15.6377 11.5871 12.0813 11.4946C11.2525 10.0502 10.8303 8.43473 10.8281 6.81111C14.8827 6.8899 18.7528 8.51769 21.6242 11.3581Z"
                    fill="#1C274C"
                />
                <path
                    d="M10.946 5.31334C11.0639 4.5752 11.2707 3.84586 11.5675 3.14096L12.0479 2C16.6315 2.02142 20.4865 5.12669 21.6446 9.34767C18.6557 6.83888 14.8812 5.4099 10.946 5.31334Z"
                    fill="#1C274C"
                />
            </g>
        </svg>
    )
}
