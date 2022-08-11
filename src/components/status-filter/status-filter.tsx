import React, { useEffect } from 'react'
import { useAppDispatch } from 'app/hooks'
import { setStatusFilter } from 'features/books/books-slice'
import StatusToggle from 'components/ui/status-toggle'

function StatusFilter() {
    const dispatch = useAppDispatch()
    const [value, setValue] = React.useState<string>('reading')
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    useEffect(() => {
        dispatch(setStatusFilter(value as string))
    }, [value, dispatch])
    return (
        <StatusToggle
            stateValue={value}
            onChangeHandler={handleOnChange}
            legend={'Filters:'}
        />
    )
}

export default StatusFilter
