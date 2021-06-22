import React, { Component } from "react";
import { RiAddFill } from "react-icons/ri";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import "../style/index.css";

export const FormAdd = (props) => {
    return (
        <Container>
            <div className="form-create">
                <h1 id="header">Todo List</h1>
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
                                <Form.Control
                                    type="file"
                                    name="file"
                                    placeholder="event img"
                                    className="text-fill img-fill"
                                    required
                                    onChange={props.onChangeFile}
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
        </Container>
    );
};

export default class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            desc: "",
            file: "",
        };

        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeDesc(e) {
        this.setState({
            desc: e.target.value,
        });
    }

    onChangeFile(e) {
        this.setState({
            file: e.target.files[0],
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("desc", this.state.desc);
        formData.append("file", this.state.file);
        const config = {
            header: {
                "content-type": "multipart/form-data",
            },
        };

        axios
            .post("http://localhost:5000/events/add", formData, config)
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
                    onChangeFile={this.onChangeFile}
                />
            </div>
        );
    }
}
