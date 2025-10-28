import React from 'react'
import { useRef, useEffect } from 'react'

export default function useCloseModal(close) {
    const ref = useRef();

    useEffect(() => {
        const handleClose = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                close();
            }
        }
        document.addEventListener('click', handleClose, true);
        return () => {
            document.removeEventListener('click', handleClose, true);
        }
    }, [close])

    return ref;
}
