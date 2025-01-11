import { Button, Modal } from "react-bootstrap";
import { MediaType } from "../../utils/type";

import Stories from 'react-insta-stories';
import { cloneElement, ReactElement, useState } from "react";


interface StoryModalType{
    media:MediaType,
    children: ReactElement,
}
export default function StoryModal({ media, children }: StoryModalType) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    return <>
        {cloneElement(children, {
            onClick: (e: any) => {
                e.stopPropagation()
                e.preventDefault()
                setShow(true)
            }
        })}
        <Modal show={show} onHide={handleClose} className="cp-modal">
            <Modal.Body className="p-0">
                <Stories
                    stories={[
                        {
                            url: media.url,
                            type: media.type,
                        }
                    ]}
                    defaultInterval={1500}
                    width={'100%'}
                    height={400}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-gray px-2 py-1" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}