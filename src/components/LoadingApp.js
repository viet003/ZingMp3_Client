import React, { memo } from 'react'
import { Triangle } from "react-loader-spinner"

const LoadingApp = () => {
    return (
        <Triangle
            visible={true}
            height="80"
            width="80"
            color="#0e8080"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}

export default memo(LoadingApp)
