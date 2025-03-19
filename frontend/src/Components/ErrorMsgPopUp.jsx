import React, { useEffect, useState } from 'react'

function ErrorMsgPopUp({ message }) {
    const [errorMessage, setErrorMessage] = useState("")
    useEffect(() => {
        setErrorMessage(message)

        // Set error message as "" after 5 seconds
        setTimeout(() => {
            setErrorMessage("")
        }, 5000)

    }, [message])

    const handleCancel = () => {
        setErrorMessage("")
    }

    return (
        errorMessage && <div className='fixed top-0 right-0 z-50 p-1 border-red-500 border-2 rounded-lg m-2 bg-[#181818] max-w-96 shadow-black shadow-lg'>
            <div className='flex border-2 rounded-lg border-dashed p-1 border-red-500'>
                <span
                    className='p-5 font-mono text-lg'
                >
                    {errorMessage}
                </span>
                <div
                    onClick={handleCancel}
                    className='p-1 cursor-pointer'>
                    ✖
                </div>
            </div>
        </div>
    )
}

export default ErrorMsgPopUp