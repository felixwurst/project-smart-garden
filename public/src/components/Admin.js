// react
import React, {Fragment, useState, useEffect} from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Table,
    ButtonGroup,
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap";
import PopUpModal from "./PopUpModal";
import {Link} from "react-router-dom";
import {
    getAllUsers,
    changeVerificationPost,
    deleteUserPost,
    changeUserRolePost,
} from "../services/api";
import ConfirmModal from "./ConfirmModal";

import {connect} from "react-redux";

const Admin = (props) => {
    const initialState = {
        users: [],
        lastName: "",
        userName: "",
        City: "",
        password: "",
        repassword: "",
        confirmModalShow: false,
        confirmModalContent: null,
        confirmModalDelete: null,

        dropdownOpen: false,
        errorComponent: null,
        showErrorModal: false,
        resultElement: null,
    };

    const [myState, setMyState] = useState(initialState);

    useEffect(() => {
        getAllUsers()
            .then((data) => {
                setMyState({
                    ...myState,
                    users: data,
                });
            })
            .catch((err) => {
                console.log(err);
            });

        // eslint-disable-next-line
    }, []);

    /* ********************************************************* Change User Verification ********************************************************* */

    const onVerifiedBtnClick = (e, userID, email, verified) => {
        e.preventDefault();
        changeVerificationPost(userID, email, verified)
            .then((data) => {
                // changing user array in the component state
                let newUsers = myState.users.map((user) => {
                    if (user.id === userID) {
                        user.verified = !user.verified;
                    }
                    return user;
                });
                setMyState({
                    ...myState,
                    users: newUsers,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    /* ********************************************************* DELETE User ********************************************************* */

    const onDeleteBtnClick = (e, userID, idx) => {
        e.preventDefault();
        const deleteUser = (userID) => {
            deleteUserPost(userID)
                .then((data) => {
                    if (data === 1) {
                        myState.users.splice(idx, 1);
                        // changing user array in the component state
                        setMyState({
                            ...myState,
                            users: myState.users,
                            confirmModalShow: false,
                        });
                    } else {
                        alert("Server error!");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        setMyState({
            ...myState,
            confirmModalShow: true,
            confirmModalContent: (
                <p>
                    Are you sure you want to delete this Users?
                    <br />
                    You can not get it back after deleting.
                </p>
            ),
            confirmModalDelete: () => deleteUser(userID),
        });
    };

    /* ********************************************************* Role Dropdown Button ********************************************************* */

    const changeUserRole = (e, role, userID, idx) => {
        e.preventDefault();
        changeUserRolePost(userID, role)
            .then((data) => {
                // changing user array in the component state
                let newUsers = myState.users.map((user) => {
                    if (user.id === userID) {
                        user.role = role;
                    }
                    return user;
                });
                setMyState({
                    ...myState,
                    users: newUsers,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    /* ********************************************************* PopupModal ********************************************************* */

    const closeModal = () => {
        setMyState({
            ...myState,
            showErrorModal: false,
        });
    };

    /* ********************************************************* start Rendering ********************************************************* */

    return (
        <Fragment>
            {/* ********************************************************* ConfirmModal ********************************************************* */}
            <ConfirmModal
                className="bg-danger"
                title="Confirm Deletion"
                show={myState.confirmModalShow}
                delete={myState.confirmModalDelete}
                close={() =>
                    setMyState({ ...myState, confirmModalShow: false })
                }
            >
                {myState.confirmModalContent}
            </ConfirmModal>
            {/* ********************************************************* ConfirmModal ********************************************************* */}

            <PopUpModal
                show={myState.showErrorModal}
                close={closeModal}
                className="bg-danger"
                title="Entries Error"
            >
                {myState.errorComponent}
            </PopUpModal>
            <Container>
                {/* ********************************************************* Breadcrumb ********************************************************* */}
                <Row>
                    <Col lg="5"></Col>
                    <Col>
                        <Row>
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to="/">Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to="/user">UserProfile</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    AdminPanel
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </Row>
                    </Col>
                    <br />
                </Row>{" "}
                <br />
                {/* ********************************************************* End ********************************************************* */}
                <Row>
                    <Col xs={6} md={9}>
                        <br />
                        <h1 className="text-trans mb-4">
                            {/* Hello Admin: {props.user.firstName + " " + props.user.lastName} */}
                        </h1>
                        <h3 className="text-trans mb-4">
                            {" "}
                            Welcome In Your Page
                        </h3>
                        <br />
                        <p className="text-trans mb-4">
                            Here you can easily edit your Profile
                        </p>
                    </Col>
                </Row>
                <br />
                <br />
                <br />
                <Row>
                    <Table hover dark responsive>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Verified</th>
                                <th>Role</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myState.users.map((user, idx) => {
                                let userRole = null;
                                if (myState.users[idx].role === "admin") {
                                    userRole = (
                                        <Button
                                            outline
                                            color="warning"
                                            disabled
                                        >
                                            {"  '  "} Administrator {"  ' "}
                                        </Button>
                                    );
                                } else {
                                    userRole = (
                                        <ButtonGroup>
                                            <Button
                                                outline={
                                                    myState.users[idx].role ===
                                                    "user"
                                                        ? false
                                                        : true
                                                }
                                                color={
                                                    myState.users[idx].role ===
                                                    "user"
                                                        ? "info"
                                                        : "secondary"
                                                }
                                                onClick={(e) =>
                                                    changeUserRole(
                                                        e,
                                                        "user",
                                                        user.id,
                                                        idx
                                                    )
                                                }
                                                active={
                                                    myState.users[idx].role ===
                                                    "user"
                                                        ? true
                                                        : false
                                                }
                                            >
                                                User
                                            </Button>
                                            <Button
                                                outline={
                                                    myState.users[idx].role ===
                                                    "subadmin"
                                                        ? false
                                                        : true
                                                }
                                                color={
                                                    myState.users[idx].role ===
                                                    "subadmin"
                                                        ? "info"
                                                        : "secondary"
                                                }
                                                onClick={(e) =>
                                                    changeUserRole(
                                                        e,
                                                        "subadmin",
                                                        user.id,
                                                        idx
                                                    )
                                                }
                                                active={
                                                    myState.users[idx].role ===
                                                    "subadmin"
                                                        ? true
                                                        : false
                                                }
                                            >
                                                SAdmin
                                            </Button>
                                        </ButtonGroup>
                                        /* <p>Selected: {myState.users[idx].role}</p> */
                                    );
                                }
                                return (
                                    <tr key={user.id}>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Button
                                                outline={
                                                    user.verified ? false : true
                                                }
                                                color={
                                                    user.verified
                                                        ? "info"
                                                        : "secondary"
                                                }
                                                disabled={
                                                    user.role === "admin"
                                                        ? true
                                                        : false
                                                }
                                                onClick={(e) =>
                                                    onVerifiedBtnClick(
                                                        e,
                                                        user.id,
                                                        user.email,
                                                        user.verified
                                                    )
                                                }
                                            >
                                                {user.verified ? "Yes" : "No"}
                                            </Button>
                                        </td>
                                        <td>{userRole}</td>
                                        <td>
                                            <Button
                                                onClick={(e) =>
                                                    onDeleteBtnClick(
                                                        e,
                                                        user.id,
                                                        idx
                                                    )
                                                }
                                                outline
                                                color="danger"
                                                disabled={
                                                    user.role === "admin"
                                                        ? true
                                                        : false
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Row>
                <br />
                <br />
                <br />
            </Container>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return { user: state.user };
};

export default connect(mapStateToProps)(Admin);
