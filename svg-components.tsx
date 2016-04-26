import React = require("react");
// import {Group, Surface, Text, Shape, Transform, LinearGradient, ClippingRectangle } from "react-art";
import {wrapText} from "./string-functions";


/** An attempt to create a text wrapped component for React Art.
 *  Text will written in the middle of the specified rectangle.
 */
export const WrappedSvgText = (props: {
    text: string,
    /** Left coordinate */
    x: number,
    /** Top coordinate */
    y: number,
    /** Width of rectangle to write text */
    width: number,
    /** Height of rectangle to write text */
    height: number,
    /** Line-height to write text (for multiple lines) */
    lineHeight: number,
    /** Average width of font */
    fontWidth: number
    textColor?:string;
}) => {
    // return <Text key="DD" x={props.x} y={props.y} width={props.width} height={props.height}/>;
    const {text, height, width, x, y, lineHeight, fontWidth} = props;
    const texts = wrapText(text, Math.round(width / fontWidth * 1.7));
    const adjustedLineHeight = Math.min(lineHeight, height / texts.length);
    const yLine1 = height / 2 - (texts.length / 2 * adjustedLineHeight);
    const textColor = props.textColor || "black";
    console.log("COLOR " + textColor);
    return (
        <g>
            <defs>
                <clipPath key={"rect"} id={"clip"+text}>
                <rect
                    y={y}
                    x={x}
                    width={width}
                    height={height}/>
                </clipPath>
            </defs>
            {
        texts.map((str, i) => (
            <text key={"text" + i}
                y={y + yLine1 + adjustedLineHeight * i}
                x={x + 4}
                textAnchor="start"
                alignmentBaseline="hanging"
                width={width - 8}
                height={adjustedLineHeight}
                font={{ fontSize: fontWidth, fontFamily: "Arial", fontWeight: "600" }}
                fill={textColor}
                clipPath={"url(#clip" + text + ")"}
                strokeWidth={0}>{str}</text>))
    }
        </g >);
};
