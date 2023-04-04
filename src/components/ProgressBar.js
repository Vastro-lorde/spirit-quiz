import React from 'react'

export const ProgressBar = (props) => {
    return (
        <div className={`w-full bg-gray-200 rounded-full h-${props.progressWidth} dark:bg-gray-700`}>
            <div className={`bg-amber-600 h-${props.progressWidth} rounded-full`} style={{width: `${props.progress}%`}}></div>
        </div>
    )
}
