const getQueryParamFromURL = (queryString: string, key: string) => {
    return (new URLSearchParams(queryString)).get(key)
}

export default getQueryParamFromURL;
