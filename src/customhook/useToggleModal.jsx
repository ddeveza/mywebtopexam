import {useState } from 'react'

export const useToggleModal = (initialVal) => {

    const [toggle, setToggle] = useState(initialVal)
    const handleToggle = ()=>{
        setToggle(!toggle)
    }



    return [toggle, handleToggle];
}

