import * as React from "react";

export let TableHead = ( props: { columns:string[] }) => (
        <thead><tr>{ props.columns.map( c => <th key={c}>{c}</th> )}</tr></thead>);

