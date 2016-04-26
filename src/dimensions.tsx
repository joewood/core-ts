import React = require('react');
import ReactDOM = require('react-dom');

const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    padding: 0,
    border: 0
}


const flexstyle: React.CSSProperties = {
    flex: '1',
    padding: 0,
    border: 0
}



/**
 * Wraps a react component and adds properties `containerHeight` and
 * `containerWidth`. Useful for responsive design. Properties update on
 * window resize. **Note** that the parent element must have a height, or else
 * nothing will be rendered.
 *
 * Can be used as an [ES7 class decorator](https://github.com/wycats/javascript-decorators) or a
 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
 * (see examples)
 *
 * @param  {function} [options.getHeight] `getHeight(element)` should return element
 * height, where element is the wrapper div. Defaults to `element.clientHeight`
 * @param  {function} [options.getWidth]  `getWidth(element)` should return element
 * width, where element is the wrapper div. Defaults to `element.clientWidth`
 * @return {function}                   Returns a decorator that can be used to
 * enhance a react component `Enhance(MyComponent)`
 * @example
 * import Dimensions from 'react-dimensions'
 *
 * class MyComponent {
 *   render() (
 *     <div>
 *       {`containerWidth=${this.props.containerWidth},`}
 *       {`containerHeight=${$this.props.containerHeight}`}
 *     </div>
 *   )
 * }
 *
 * export default Dimensions()(MyComponent) // Enhanced component
 */
function getWidth(element) {
    return element.clientWidth
}

function getHeight(element) {
    return element.clientHeight
}


interface Props {
}

export interface State {
    containerWidth?: number;
    containerHeight?: number;
}

function X(P: any, parentstyle: React.CSSProperties) {
    return class Child extends React.Component<Props, State> {
        public state: State = {};
        private rqf: number = 0;

        public constructor(p: Props) {
            super(p);
            this.state = {};
            this.onResize = this.onResize.bind(this);
        }

        public updateDimensions() {
            const container = ReactDOM.findDOMNode(this.refs["container"])
            if (!container) {
                throw new Error('Cannot find container div')
            }
            this.setState({
                containerWidth: getWidth(container),
                containerHeight: getHeight(container)
            })
        }

        private onResize() {
            if (this.rqf) return
            this.rqf = window.requestAnimationFrame(() => {
                this.rqf = null
                this.updateDimensions()
            })
        }

        public componentDidMount() {
            this.updateDimensions()
            window.addEventListener('resize', this.onResize, false)
        }

        public componentWillUnmount() {
            window.removeEventListener('resize', this.onResize)
        }

        public render() {
            return (
                <div style={parentstyle} ref='container'>
                    {!this.state.containerHeight ? <div>Error</div>
                        : !!P ? (this.state.containerHeight && React.createElement(P, Object.assign({}, this.state, this.props)))
                            : <div>Must supply parameter</div> }
                </div>
            )
        }
    }
}

export function Dimensions(ComposedComponent: any): any {
    return X(ComposedComponent, style);
}

export default function() { return Dimensions; }


export function FlexWrap(): any {
    return (ComposedComponent: any) => {
        return X(ComposedComponent, flexstyle);
    };
}