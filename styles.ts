import * as React from "react";

export default {
    toolbarStyle: <React.CSSProperties>{
        backgroundColor: "transparent",
        height: 35,
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 5,
        marginBottom: 5,
        alignItems: "center",
        display: "flex",
    } as React.CSSProperties,
    toolbarBreadcrumb: <React.CSSProperties>{
        flex: "1 1 auto",
        margin: 0,
        marginLeft: 0,
        padding: 0,
        fontSize: 14,
        backgroundColor: "transparent",
    } as React.CSSProperties,
    toolbarButton: <React.CSSProperties>{
        display: "inline-block",
        marginLeft: 10,
    } as React.CSSProperties,
    /** Used for buttons with icons */
    glyphIcon: {
        marginRight: 5,
        cursor: "pointer",
    } as React.CSSProperties,
    ellipsis: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    } as React.CSSProperties,
} ;

