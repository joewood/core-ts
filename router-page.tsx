import React = require("react");
import ReactRouter from "react-router";

/** A base class for React Component that provides generic top-level React-router page functionality */
export class RouterPage<P, S> extends React.Component<P, S> {
    public static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };
    constructor(props: P, context) {
        super(props, context);
    }

    public get history(): ReactRouter.History {
        return (this.context as any).router as ReactRouter.History;
    }


}