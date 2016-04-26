import React = require("react");
import { range } from "./core";

export interface IProps {
    width: number;
    height: number;
    cards: number;
    key: string;
    startingIndex: number;
    renderCard: (index: number) => JSX.Element;
}


export default (props: IProps) => {
    return (
        <div key={"row"} style={{ width: props.width, height:props.height, display:"flex", justifyContent:"space-between" }}>
            {
                range(props.startingIndex, props.startingIndex + props.cards)
                    .map(i => props.renderCard(i))
            }
        </div>);
}
