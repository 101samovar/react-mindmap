import css from "./chartelement.module.css";

function ChartElement(props) {
    const WIDTH = 80;
    const HEIGHT = 20;
    const isLeftSide = (props.phi > Math.PI / 2) && (props.phi < 3 * Math.PI / 2);
    let x = props.x;
    let textOffset = 6;
    let textAlignment = css.right;
    if (isLeftSide) {
        x -= WIDTH;
        textOffset = -6;
        textAlignment = css.left;
    }
    if (!props.level) {
        textOffset = 0;
        textAlignment = css.middle;
    }
    let className = css.container;
    if (props.isSelected) {
        className += ' ' + css.selected;
    }
    const root = <circle className={className} cx={props.x} cy={props.y} r="40" fill="none" stroke="black" />;
    const child = <rect className={className}
        rx="3" ry="3"
        x={x} y={props.y - HEIGHT / 2}
        width={WIDTH} height={HEIGHT} fill="none" stroke="black" />;
    const grandChild = <circle cx={props.x} cy={props.y} r="3" className={className} />
    let element;
    switch(props.level) {
        case 0:
            element = root;
            break;
        case 1:
            element = child;
            break;
        default:
            element = grandChild;
            break;
    }
    
    return (
        <g onClick={() => props.onClick(props.id)}>
            {element}
            <text className={css.text + ' ' + textAlignment} 
            x={props.x + textOffset} y={props.y}>{props.name}</text>
        </g>
    );
}

export default ChartElement;
