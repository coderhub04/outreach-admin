import { cloneElement, ReactElement, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface DeleteConfirmationType {
    title: string,
    children: ReactElement,
    message: string,
    onDisable: () => void;
    btnTxt: string;
}
export default function DeleteConfirmationModal({ title, children, message, onDisable, btnTxt }: DeleteConfirmationType) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const submitModal = () => {
        onDisable()
        handleClose()
    }
    return <>
        {cloneElement(children, {
            onClick: (e: any) => {
                e.stopPropagation()
                e.preventDefault()
                setShow(true)
            }
        })}
        <Modal show={show} onHide={handleClose} className="cp-modal">
            <Modal.Header >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}</Modal.Body>
            <Modal.Footer>
                <Button className="btn-gray px-2 py-1" onClick={handleClose}>
                    Close
                </Button>
                <Button className="btn-red" onClick={submitModal}>
                    {btnTxt}
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}