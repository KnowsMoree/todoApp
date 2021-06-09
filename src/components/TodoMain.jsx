import React, { Component } from "react";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";
import { Form, Button, Modal, Container } from "react-bootstrap";
import "../style/index.css";
import axios from "axios";

export const ListComponent = (props) => {
    return (
        <div className="list-comp">
            <div className="text-container">{props.events.desc}</div>
            <div className="action-btn">
                <div className="edit">
                    <a
                        href="#"
                        onClick={() => {
                            props.getEvent(props.events._id);
                        }}
                    >
                        <MdModeEdit id="edit-btn" />
                    </a>
                </div>
                <div className="delete">
                    <a href="#!">
                        <MdDeleteForever
                            id="delete-btn"
                            onClick={() => {
                                props.deleteEvent(props.events._id);
                            }}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default class TodoMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            desc: "",
            show: false,
        };

        this.getEvent = this.getEvent.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/events/")
            .then((response) => {
                this.setState({
                    events: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleShow() {
        this.setState({
            show: true,
        });
    }

    handleClose() {
        this.setState({
            show: false,
        });
    }

    getEvent(id) {
        axios
            .get("http://localhost:5000/events/" + id)
            .then((response) => {
                this.setState({
                    desc: response.data.desc,
                });
            })

            .catch(function (error) {
                console.log(error);
            });

        window.testId = id;

        this.handleShow();
    }

    onChangeDesc(e) {
        this.setState({
            desc: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const event = {
            desc: this.state.desc,
        };

        axios
            .post("http://localhost:5000/events/update/" + window.testId, event)
            .then((res) => console.log(res.data));

        window.location = "/";
    }

    deleteEvent(id) {
        axios.delete("http://localhost:5000/events/" + id).then((res) => {
            console.log(res.data);
        });

        this.setState({
            events: this.state.events.filter((el) => el._id !== id),
        });
    }

    eventList() {
        return this.state.events.map((currentEvent) => {
            return (
                <ListComponent
                    events={currentEvent}
                    getEvent={this.getEvent}
                    deleteEvent={this.deleteEvent}
                    key={currentEvent._id}
                />
            );
        });
    }

    render() {
        return (
            <Container>
                <div className="popup">
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Form onSubmit={this.onSubmit} className="form-update">
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicText"
                            >
                                <Form.Label>Desc :</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    className="desc-fill"
                                    value={this.state.desc}
                                    onChange={this.onChangeDesc}
                                />
                            </Form.Group>

                            <div className="btn-sub-cls">
                                <div className="up-btn">
                                    <Button variant="primary" className="sub" type="submit">
                                        <RiAddFill />
                                    </Button>
                                </div>
                                <div className="up-btn">
                                    <Button
                                        variant="danger"
                                        className="cls"
                                        onClick={this.handleClose}
                                    >
                                        <ImCancelCircle />  
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Modal>
                </div>
                <div className="d-flex justify-content-center ListSection">
                    <div className="ListContainer">{this.eventList()}</div>
                </div>
            </Container>
        );
    }
}
