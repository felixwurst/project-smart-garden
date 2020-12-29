/* ********************************************************* IMPORT ********************************************************* */
// react
import React, {Fragment} from 'react';
// redux
import {connect} from 'react-redux';
import {setBackgroundImageAction, setBackgroundColor1Action, setBackgroundColor5Action} from '../actions';
// router dom
import {Link} from 'react-router-dom';
// reactstrap
import {Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
// components
import PopUpModal from './PopUpModal';
// services
import {registerPost} from '../services/api';
// validator
import validator from 'validator';

/* ********************************************************* COMPONENT ********************************************************* */
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            repassword: '',
            showModal: false,
            modalContent: null,
            badgeContent: null,
            touched: {
                firstName: false,
                lastName: false,
                userName: false,
                email: false,
                password: false,
                repassword: false
            }
        };
    }

    componentDidMount() {
        this.props.setBackgroundColor1Action("color-1");
        this.props.setBackgroundColor5Action(null);
    }
    
/* ********************************************************* FUNCTIONS ********************************************************* */    
    // check exsiting input
    validate = (firstName, lastName, userName, email, password, repassword) => {
        return {
            firstName: firstName.length === 0,
            lastName: lastName.length === 0,
            userName: userName.length === 0,
            email: email.length === 0,
            password: password.length === 0,
            repassword: repassword.length === 0
        };
    }
    // check blur of inputs
    handleBlur = field => e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            touched: {...this.state.touched, [field]: true}
        });
    }

/* ********************************************************* REGISTRATION ********************************************************* */
    // The user can register on the site by entering his name, email, a user name of his choice and a password. 
    // If all fields are filled in correctly, the user will receive an email with a link to verify the email 
    // and complete the registration.
    onRegisterBtnClick = e => {
        e.preventDefault();
        if (
            this.state.firstName.trim() === '' ||
            this.state.lastName.trim() === '' ||
            this.state.userName.trim() === '' ||
            this.state.email.trim() === '' ||
            this.state.password === '' ||
            this.state.password !== this.state.repassword ||
            !validator.isEmail(this.state.email.trim())
        ) {
            const errorsElement = (
                <ul>
                    {this.state.firstName.trim() === '' ? <li>Please enter your first name</li> : null}
                    {this.state.lastName.trim() === '' ? <li>Please enter your last name</li> : null}
                    {this.state.userName.trim() === '' ? <li>Please enter an user name</li> : null}
                    {this.state.email.trim() === '' ? <li>Please enter your email</li> : null}
                    {!validator.isEmail(this.state.email.trim()) ? <li>Please enter a valid email</li> : null}
                    {this.state.password === '' ? <li>Please enter a password</li> : null}
                    {this.state.password !== this.state.repassword ? <li>Passwords do not match</li> : null}
                </ul>
            );
            this.setState({modalContent: errorsElement, showModal: true});
        } else {
            registerPost(
                this.state.firstName,
                this.state.lastName,
                this.state.userName,
                this.state.email,
                this.state.password,
                this.state.repassword
            ).then(data => {
                let badgeClass = '';
                let badgeMessage = '';
                switch (data) {
                    case 1:
                        badgeClass = 'alert alert-success';
                        badgeMessage = 'You registered successfully, please check your mails to verify your account!';
                        break;
                    case 2:
                        badgeClass = 'alert alert-danger';
                        badgeMessage = 'Server error, please contact the administrator!';
                        break;
                    case 3:
                        badgeClass = 'alert alert-danger';
                        badgeMessage = 'There is already a user with this email, please choose another one!';
                        break;
                    default:
                        break;
                }
                const badgeElement = (
                    <div className={badgeClass} role="alert">
                        {badgeMessage}
                    </div>
                );
                this.setState({badgeContent: badgeElement});
            }).catch(() => {
                const badgeElement = (
                    <div className="alert alert-danger" role="alert">
                        Can not send the registration data to server!
                    </div>
                );
                this.setState({badgeContent: badgeElement});
            });
        }
    };

/* ********************************************************* RENDER ********************************************************* */
    render() {
        // change border-color of inputs to danger
        const errors = this.validate(
            this.state.firstName,
            this.state.lastName,
            this.state.userName,
            this.state.email,
            this.state.password,
            this.state.repassword
        );
        // show error message
        const touched = this.state.touched
        function markError(field) {
            const hasError = errors[field];
            const showError = touched[field];
            return hasError ? showError : false;
        }
        // enable login-button
        const isEnabled = !Object.keys(errors).some(x => errors[x]);

/* ********************************************************* RETURN ********************************************************* */
        return (
            <Fragment>
                <PopUpModal
                    className="bg-danger"
                    title="Entry Error"                
                    show={this.state.showModal}
                    close={() => this.setState({showModal: false})}
                >
                    {this.state.modalContent}
                </PopUpModal>
                <Container className="pt-5 mt-5">
                    <h1 className="text-trans mb-4">Registration</h1>
                    <p className="text-trans mb-4">You are still one step away from your smart garden. Register and you can enter it.</p>
                    <Form className="pb-md-0 pb-5">
                        <div className="col-lg-12 col-md-12">{this.state.badgeContent}</div>
                        <Row xs="1" sm="2">
                            <Col>
                                <FormGroup className="text-left mb-1">
                                    <Label className="w-100 h5 text-trans mb-2 ml-2">First Name:</Label>
                                    <Input
                                        className={"badge-pill bg-transparent " + (markError('firstName') ? "error" : "")}
                                        type="text"
                                        placeholder="Enter your first name"
                                        value={this.state.firstName}
                                        onChange={e => this.setState({firstName: e.target.value})}
                                        onBlur={this.handleBlur('firstName')}
                                        required
                                    />
                                </FormGroup>
                                <p className="error mb-1 ml-2">&nbsp;{markError('firstName') ? "Please enter your first name." : ""}</p>
                            </Col>
                            <Col>
                                <FormGroup className="text-left mb-1">
                                    <Label className="w-100 h5 text-trans mb-2 ml-2">Last Name:</Label>
                                    <Input
                                        className={"badge-pill bg-transparent " + (markError('lastName') ? "error" : "")}
                                        type="text"
                                        placeholder="Enter your last name"
                                        value={this.state.lastName}
                                        onChange={e => this.setState({lastName: e.target.value})}
                                        onBlur={this.handleBlur('lastName')}
                                        required
                                    />
                                </FormGroup>
                                <p className="error mb-1 ml-2">&nbsp;{markError('lastName') ? "Please enter your last name." : ""}</p>
                            </Col>
                            <Col>
                                <FormGroup className="text-left mb-1">
                                    <Label className="w-100 h5 text-trans mb-2 ml-2">Email:</Label>
                                    <Input
                                        className={"badge-pill bg-transparent " + (markError('email') ? "error" : "")}
                                        type="email"
                                        placeholder="Enter your email"
                                        value={this.state.email}
                                        onChange={e => this.setState({email: e.target.value})}
                                        onBlur={this.handleBlur('email')}
                                        required
                                    />
                                </FormGroup>
                                <p className="error mb-1 ml-2">&nbsp;{markError('email') ? "Please enter your email." : ""}</p>
                            </Col>
                            <Col>
                                <FormGroup className="text-left mb-1">
                                    <Label className="w-100 h5 text-trans mb-2 ml-2">User Name:</Label>
                                    <Input
                                        className={"badge-pill bg-transparent " + (markError('userName') ? "error" : "")}
                                        type="text"
                                        placeholder="Enter an user name"
                                        value={this.state.userName}
                                        onChange={e => this.setState({userName: e.target.value})}
                                        onBlur={this.handleBlur('userName')}
                                        required
                                    />
                                </FormGroup>
                                <p className="error mb-1 ml-2">&nbsp;{markError('userName') ? "Please enter a user name." : ""}</p>
                            </Col>
                            <Col>
                                <FormGroup className="text-left mb-1">
                                    <Label className="w-100 h5 text-trans mb-2 ml-2">Password:</Label>
                                    <Input
                                        className={"badge-pill bg-transparent " + (markError('password') ? "error" : "")}
                                        type="password"
                                        placeholder="Enter a password"
                                        value={this.state.password}
                                        onChange={e => this.setState({password: e.target.value})}
                                        onBlur={this.handleBlur('password')}
                                        required
                                    />
                                </FormGroup>
                                <p className="error mb-1 ml-2">&nbsp;{markError('password') ? "Please enter a password." : ""}</p>
                            </Col>
                            <Col>
                                <FormGroup className="text-left mb-1">
                                    <Label className="w-100 h5 text-trans mb-2 ml-2">Repeat Password:</Label>
                                    <Input
                                        className={"badge-pill bg-transparent " + (markError('repassword') ? "error" : "")}
                                        type="password"
                                        placeholder="Repeat your password"
                                        value={this.state.repassword}
                                        onChange={e => this.setState({repassword: e.target.value})}
                                        onBlur={this.handleBlur('repassword')}
                                        required
                                    />
                                </FormGroup>
                                <p className="error mb-1 ml-2">&nbsp;{markError('repassword') ? "Please repeat the password." : ""}</p>
                            </Col>
                            <Col>
                                <h5 className="text-trans mt-2">
                                    Already registered?&nbsp;
                                    <Link to="/login">Login</Link>
                                </h5>
                            </Col>
                        </Row>
                        <Col className="text-center">
                            <Button className="badge-pill btn-outline-light bg-transparent my-4" onClick={this.onRegisterBtnClick} disabled={!isEnabled}>
                                Register
                            </Button>
                        </Col>
                    </Form>
                </Container>
            </Fragment>
        );
    }
};

/* ********************************************************* EXPORT ********************************************************* */
export default connect(null, {setBackgroundImageAction, setBackgroundColor1Action, setBackgroundColor5Action})(Register);
