import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { cloneElement, createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ModalContext = createContext();

export default function Modal({ children }) {
    const [modalName, setModalName] = useState('');

    const open = (name) => setModalName(name);
    const close = () => setModalName('');

    // Disable background scroll
    useEffect(() => {
        document.body.style.overflow = modalName ? 'hidden' : '';
    }, [modalName]);

    return (
        <ModalContext.Provider value={{ modalName, open, close }}>
            {children}
        </ModalContext.Provider>
    );
}

export function Open({ children, opens }) {
    const { open } = useContext(ModalContext);
    return cloneElement(children, { onClick: () => open(opens) });
}

export function Window({ children, name }) {
    const { modalName, close } = useContext(ModalContext);

    if (modalName !== name) return null;

    // Close modal when clicking the overlay (outside modal content)
    const handleOverlayClick = (e) => {
        // Only close if clicking on the overlay itself
        if (e.target === e.currentTarget) {
            close();
        }
    };

    return createPortal(
        <div
            className='fixed top-0 left-0 w-full h-full backdrop-blur-xs flex justify-center items-center z-50 '
            onClick={handleOverlayClick}>
            <div className='felx flex-col relative'>
                <button onClick={close} className='cursor-pointer absolute top-2 right-2 bg-red-400 p-2 rounded-full hover:bg-red-500 transition-all duration-300'>
                    <CloseOutlinedIcon />
                </button>
                {cloneElement(children, { onClose: close })}
            </div>
        </div>,
        document.body
    );
}

Modal.Open = Open;
Modal.Window = Window;
