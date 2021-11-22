export const getCafeData = () => async (dispatch) => {
    try {
        const res = await fetch('https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099')
            .then((response) => {
                response.json().then((data) => {
                    dispatch({
                        type: 'GET_DETAILS',
                        payload: data,
                    })
                    return data;
                }).catch((err) => {
                    dispatch({
                        type: 'HANDLE_ERROR',
                        error: 'Some errors occured.',
                    })
                })
            });
    }
    catch {
        dispatch({
            type: 'HANDLE_ERROR',
            error: 'Some errors occured.',
        })
    }
}