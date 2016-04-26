import React = require("react");
import ReactDOM = require("react-dom");
import {Button, NavDropdown, MenuItem, Navbar, Badge, Grid, Col, Row, Nav, NavItem, PageHeader} from "react-bootstrap";


export interface FeedbackProps {
    sendCallback: (message: string) => void;
    cancelCallback?: () => void;
}

export default class FeedbackComponent extends React.Component<FeedbackProps, any> {
    public render() {
        let props = this.props;
        return <div style={{ width: "70%", margin: 30, marginLeft: "15%" }}>
            <form onSubmit={ (evt) => {
                evt.preventDefault();
                props.sendCallback(evt.target[0].value);
            } }>
                <p style={{ fontWeight: "800", fontSize: 16, margin: 10 }}>Send Feedback to the development team</p>
                <textarea spellCheck
                    name="inp" height={200}
                    style={{ padding: 5, margin: 10, marginTop: 30, border: "1px solid black", width: "100%" }}/>
                <div>
                    <button title="Cancel"
                        onClick={ () => props.cancelCallback() }
                        style={{ display: "inline-block", margin: 10 }}>Cancel</button>
                    <input type="submit" title="Send"  style={{ display: "inline-block", margin: 10 }}/>
                </div>
            </form>
        </div>;
    }
}
