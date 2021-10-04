import {useState} from 'react'
import pt from 'prop-types'
import { Button,Modal } from 'react-bootstrap';




export const ActionButton = ({action,actionTitle,title,children,type,...props}) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const callAction = () =>{
        setIsLoading(true)
        if(action){
            action.finally(()=>{
                setIsLoading(false)
                setShow(false)
            })

        }else{
            setIsLoading(false)
            setShow(false)
        }
    }

    

    return (
        <>
            {
                type==="delete"?(
                    <a href="#" onClick={handleShow} {...props}>
                    <span className="themify-glyph-165"></span>{" "}Delete
                    </a>
                ):(
                    <a href="#" onClick={handleShow} {...props}>
                        <span className="themify-glyph-29"></span>{" "}Edit
                    </a>
                )

            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                {
                    children?(
                        <Modal.Body>{children}</Modal.Body>
                    ):null
                }
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={callAction}>
                    {isLoading?"loading...":actionTitle}
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}



ActionButton.propTypes = {
    action:pt.func,
    actionTitle:pt.string.isRequired,
    title:pt.string.isRequired,
    type:pt.oneOf(["delete","edit"]),
    
}



export default ActionButton
