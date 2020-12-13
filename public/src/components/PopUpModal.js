/* ********************************************************* IMPORT ********************************************************* */
import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

/* ********************************************************* COMPONENT ********************************************************* */
class PopUpModal extends React.Component {
    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.close} className="modal-dialog-centered">
                <ModalHeader toggle={this.props.close} className={this.props.className}>
                    {this.props.title}
                </ModalHeader>
                <ModalBody className="text-dark">
                    {this.props.children}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.close}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

/* ********************************************************* EXPORT ********************************************************* */
export default PopUpModal;