import React = require("react");
import ReactDOM = require("react-dom");
import {Col, Row, Input, Button, Glyphicon, ButtonInput, OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import Moment = require("moment");
import styles from "./styles";

export function getInputControl(obj: any, field: string, label: string, type: string = "text"): JSX.Element {
    return (
        <Input
            key={field}
            name={field}
            type={type}
            label={label}
            labelClassName="col-md-4"
            wrapperClassName="col-md-8"
            defaultValue={obj[field]}/>);
}

export function getValueFromForm(evt: React.FormEvent): any {
    evt.preventDefault();
    let formValue = (Object.keys(evt.target)).reduce((p, c) => {
        let e = evt.target[c];
        if (!!e && e.name) {
            if (e.type === "checkbox") {
                p[e.name] = (e.checked);
            } else {
                p[e.name] = e.value;
            }
        }
        return p;
    }, {});
    return formValue;
}

export interface IField {
    name: string;
    label: string;
    labelLength?: number;
    fieldLength?: number;
    type?: "string" | "date" | "number";
    defaultValue: any;
    readOnly?: boolean;
    value?: any;
}

export let FormRow = ({justifyContent = "stretch", className = null, formGroup = false, children = []}) => {
    return (<div style={{
        marginLeft: formGroup ? -30 : -15,
        marginRight: formGroup ? -30 : -15,
        marginBottom: 15,
        marginTop: 0,
        display: "flex",
        justifyContent: justifyContent,
    }}
        className={className}>
        {children}
    </div>);
};


/** A typical Bootstrap based form field */
export let Field = (props: {
    /** Form name (used to get values) */
    name: string;
    /** Label to use for the Form */
    label: string;
    /** Label length in columns (1-12). Defaults to 4 */
    labelLength?: number;
    /** Field length in columns (1-12). Defaults to 8 */
    fieldLength?: number;
    /** Data type for the form entry */
    type?: "string" | "date" | "number";
    /** Initial value */
    defaultValue?: any;
    /** lock the input control */
    readOnly?: boolean;
    /** Input component to used, defaults to the DOM <input> */
    inputComponent?: JSX.Element;
    onChange?: (newVal: any) => void;
    // SECOND FIELD SUPPORT 
    /** Form name (used to get values) */
    name2?: string;
    /** Label to use for the Form */
    label2?: string;
    /** Data type for the form entry */
    type2?: "string" | "date" | "number";
    /** Initial value */
    defaultValue2?: any;
    /** lock the input control */
    readOnly2?: boolean;
    /** Input component to used, defaults to the DOM <input> */
    inputComponent2?: JSX.Element;
    onChange2?: (newVal: any) => void;

    children?: JSX.Element[];

}) => {
    let defaultValue = props.defaultValue;
    if (props.type && props.type === "date") {
        if (props.defaultValue) {
            defaultValue = Moment(new Date(props.defaultValue)).format("YYYY-MM-DD");
        } else {
            defaultValue = null;
        }
    }
    let fieldLength = props.fieldLength || 8;
    let labelLength = props.labelLength || 4;
    let length = fieldLength + labelLength;
    const inputComponent = props.inputComponent || (
        <input key={props.name}
            name={props.name}
            onChange={!!props.onChange ? (evt: React.FormEvent) => props.onChange((evt.target as any).value) : null}
            readOnly={props.readOnly}
            type={props.type || "text"}
            className={`form-control`}
            defaultValue={defaultValue}/>
    );
    let inputComponent2 = null as JSX.Element;
    if (props.name2) {
        length = length * 2;
        inputComponent2 = props.inputComponent2 || (
            <input key={props.name2}
                name={props.name2}
                onChange={!!props.onChange2 ? (evt: React.FormEvent) => props.onChange2((evt.target as any).value) : null}
                readOnly={props.readOnly}
                type={props.type2 || "text"}
                className={`form-control`}
                defaultValue={props.defaultValue2}/>);
    }
    return (
        <FormRow formGroup>
            <label className={"control-label"}
                style={{ flex: `${labelLength} ${labelLength} ${labelLength / length * 100}%`, paddingLeft: 15, paddingRight: 15 }}>
                {props.label}
            </label>
            <div style={{ flex: `${fieldLength} ${labelLength} ${fieldLength / length * 100}%`, paddingLeft: 15, paddingRight: 15 }}>
                {inputComponent}
            </div>
            {!!inputComponent2
                ? [<label className={"control-label"}
                    style={{ flex: `${labelLength} ${labelLength} ${labelLength / length * 100}%`, paddingLeft: 15, paddingRight: 15 }}>
                    {props.label2}
                </label>,
                    <div style={{ flex: `${fieldLength} ${labelLength} ${fieldLength / length * 100}%`, paddingLeft: 15, paddingRight: 15 }}>
                        {inputComponent2}
                    </div>,]
                : null}
            {props.children }
        </FormRow>);
};

/** A Wrapper around Field that defaults the label and defaultValue fields based on the state of an object */
export let ObjectField = (props: {
    obj: any,
    fieldName: string,
    labelLength?: number,
    fieldLength?: number,
    labelOverride?: string,
    type?: "string" | "date" | "number",
    readOnly?: boolean,
    inputComponent?: JSX.Element,
    onChange?: (newVal: any) => void,

    fieldName2?: string,
    labelLength2?: number,
    fieldLength2?: number,
    labelOverride2?: string,
    type2?: "string" | "date" | "number",
    readOnly2?: boolean,
    inputComponent2?: JSX.Element,
    onChange2?: (newVal: any) => void

    children?: JSX.Element[],
}) => {
    let defaultValue = props.obj[props.fieldName];
    let label = (props.labelOverride || props.fieldName).replace(/_/g, " ").split(" ").map(s => s[0].toUpperCase() + s.slice(1)).join(" ");
    let defaultValue2 = null;
    let label2 = null;
    if (!!props.fieldName2) {
        defaultValue2 = props.obj[props.fieldName2];
        label2 = (props.labelOverride2 || props.fieldName2).replace(/_/g, " ").split(" ").map(s => s[0].toUpperCase() + s.slice(1)).join(" ");
    }
    const labelLength = props.labelLength || 2;
    const fieldLength = props.fieldLength || (12 - labelLength);
    return <Field
        name={props.fieldName}
        label={label}
        labelLength={labelLength}
        fieldLength={fieldLength }
        type={props.type}
        defaultValue={defaultValue}
        inputComponent={props.inputComponent}
        onChange={props.onChange}

        name2={props.fieldName2}
        label2={label2}
        type2={props.type2}
        defaultValue2={defaultValue2}
        inputComponent2={props.inputComponent2}
        onChange2={props.onChange2}

        readOnly={props.readOnly}>{props.children}</Field>;
};

export let DateObjectField = (props: {
    obj: any,
    fieldName: string,
    labelLength?: number,
    fieldLength?: number,
    readOnly?: boolean
}) => (
        <ObjectField
            obj={props.obj}
            fieldName={props.fieldName}
            labelLength={props.labelLength}
            fieldLength={props.fieldLength}
            type="date"
            readOnly={props.readOnly} />);


/* TODO - Change these to stateless Components */
export function getField(field: IField): JSX.Element {
    let defaultValue = field.defaultValue;
    let value = field.value;
    if (field.type && field.type === "date") {
        if (field.defaultValue) {
            defaultValue = Moment(new Date(field.defaultValue)).utc().format("YYYY-MM-DD");
        } else {
            defaultValue = null;
        }
    }
    return (
        <Input key={field.name} label={field.label} bsSize="small" labelClassName={`col-md-${field.labelLength || 4}`}>
            <Col md={field.fieldLength || 8}>
                <input ref={field.name}
                    name={field.name}
                    readOnly={field.readOnly}
                    type={field.type || "text"}
                    className="form-control"
                    defaultValue={defaultValue}
                    />
            </Col>
        </Input>);
}

export let CancelSave = (props: { onCancel: () => void }) => (
    <FormRow justifyContent="flex-end" formGroup>
        <div key="save"
            style={{ flex: "1", maxWidth: 100, paddingLeft: 5, paddingRight: 5, margin: 0 }}>
            <button className="btn-block btn btn-sm btn-default"
                bsSize="small"
                type="submit">Save</button>
        </div>
        <div key="cancel"
            style={{ flex: "1", maxWidth: 100, paddingLeft: 5, margin: 0, paddingRight: 15 }}>
            <button className="btn-block btn btn-sm btn-default"
                type="reset"
                onClick={() => props.onCancel() }>Cancel</button>
        </div>
    </FormRow>);

export function getTwoFields(field1: IField, field2: IField): JSX.Element {
    return (<Row>{[getField(field1), getField(field2)]}</Row>);
}

/** A glyph based toolbar button with a label */
export let ToolbarButton = ({
    glyphicon = "plus" as "plus" | "pencil" | "remove" | "send" | "search" | "import" | "exclamation-sign" | "refresh",
    label = null as string,
    disabled = false,
    tooltip = null as string,
    onClick = () => { 0; },
}) => {
    const button = <Button onClick={(evt: React.FormEvent) => { evt.preventDefault(); onClick(); } }
        key={label}
        bsSize="xsmall"
        bsStyle={(glyphicon === "remove") ? "danger" : null}
        disabled={disabled}
        style={styles.toolbarButton}>
        <Glyphicon style={styles.glyphIcon} glyph={glyphicon}/>{label}
    </Button>;
    if (tooltip) {
        return (
            <OverlayTrigger key={label} delay={200}  overlay={<Tooltip id={label}>{tooltip}</Tooltip>} placement="left">
                {button}
            </OverlayTrigger>);
    } else {
        return button;
    }
};


export let ModalDialog = ({
    key = "unset",
    contents = null as () => JSX.Element,
    header = null as () => (JSX.Element | string),
    showModal = false,
    hideModal = null as () => void,
}) => <Modal key={key} enforceFocus={true} show={!!showModal} onHide={hideModal} >
        <Modal.Header>
            <div>{showModal ? header() : "INVISIBLE"}</div>
        </Modal.Header>
        <Modal.Body>{ !showModal ? <div>Hidden</div> : contents() }</Modal.Body>
    </Modal>;

export let ConfirmDialog = ({
    key = "unset",
    header = "Confirm",
    contents = null as () => (JSX.Element | string),
    showModal = false,
    onHide = null as () => void,
    onConfirm = null as () => void,
    confirmLabel = "Delete",
}) => <Modal key={key } enforceFocus={ true} show={ showModal } onHide={ onHide }>
        <Modal.Header>
            <div>{header}</div>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={12}>{ showModal ? contents() : "Hidden" }</Col>
            </Row>
            <FormRow justifyContent="flex-end" formGroup>
                <div key="doit"
                    style={{ flex: "1", maxWidth: 100, paddingLeft: 5, paddingRight: 5, margin: 0 }}>
                    <button className="btn-block btn btn-sm btn-danger"
                        bsSize="small"
                        onClick={onConfirm}>{confirmLabel}</button>
                </div>
                <div key="cancel"
                    style={{ flex: "1", maxWidth: 100, paddingLeft: 5, margin: 0, paddingRight: 15 }}>
                    <button className="btn-block btn btn-sm btn-default"
                        onClick={onHide}>Cancel</button>
                </div>
            </FormRow>
        </Modal.Body>
    </Modal>;




var _styles = {
    cancelButton: {
        leftMargin: 10,
    } as React.CSSProperties,
};