import React = require("react");

var shallowCompare = require("react-addons-shallow-compare");

/**
 * Tells if a component should update given it"s next props
 * and state.
 *
 * @param object nextProps Next props.
 * @param object nextState Next state.
 */
function shouldComponentUpdate(nextProps, nextState) {
    // let sho = shallowCompare(this, nextProps, nextState);
    return shallowCompare(this, nextProps, nextState);
}

/**
 * Makes the given component "pure".
 *
 * @param object component Component.
 */
export default function pureRenderDecorator() {
    return function(target: Function) {
        target.prototype.shouldComponentUpdate = shouldComponentUpdate;
    };
}

