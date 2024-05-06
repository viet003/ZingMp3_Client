import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as apis from "../../controllers"

const SearchPage = () => {
    const { title } = useParams();
    const [data, setData] = useState(null)

    useEffect(() => {
        const handleGetApi = async () => {
            const response = await apis.searchApi(title);
            if (response?.data?.err === 0) {
                setData(response?.data?.data)
            }
        }

        handleGetApi()

    }, [])

    return (
        <div>

        </div>
    )
}

export default SearchPage
