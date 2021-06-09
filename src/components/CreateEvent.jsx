import React, { Component, useState } from "react";
import { RiAddFill } from "react-icons/ri";
import { Form, Button, Modal, Container } from "react-bootstrap";
import axios from "axios";
import "../style/index.css";

export const FormAdd = (props) => {
    return (
        <Container>
            <div className="form-create">
                <Form onSubmit={props.onSubmit}>
                    <Form.Label>Add Event :</Form.Label>
                    <div className="input-x">
                        <div className="left">
                            <Form.Group
                                className="mb-3 text-input"
                                controlId="formBasicText"
                            >
                                <Form.Control
                                    type="text"
                                    className="text-fill"
                                    required
                                    value={props.value}
                                    onChange={props.onChange}
                                />
                            </Form.Group>
                        </div>
                        <div className="right">
                            <Button
                                variant="primary"
                                className="sub-btn"
                                type="submit"
                            >
                                <RiAddFill className="submit-btn" />
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
            {/* </Modal> */}
        </Container>
    );
};

export default class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            desc: "",
        };

        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
            .post("http://localhost:5000/events/add", event)
            .then((res) => console.log(res.data));

        window.location = "/";
    }

    render() {
        return (
            <div>
                <FormAdd
                    onSubmit={this.onSubmit}
                    onChange={this.onChangeDesc}
                    value={this.state.desc}
                />
            </div>
        );
    }
}
