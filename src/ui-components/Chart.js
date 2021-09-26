import css from "./chart.module.css";
import ChartElement from "./ChartElement";
import Connection from "./Connection";
import Toolbar from "./Toolbar";

function Chart(props) {
    const WIDTH = props.width / props.zoom;
    const HEIGHT = props.height / props.zoom;
    const R = 90;

    const getChildren = (list, parent, elements, dPhi) => {
        const children = list.filter(item => item.parentId === parent.id);
        for (let i = 0; i < children.length; i++) {
            let item = children[i];
            let phi = i * dPhi / children.length + parent.phi;
            const isLeftSide = (phi > Math.PI / 2) && (phi < 3 * Math.PI / 2);
            const element = {
                id: item.id,
                name: item.name,
                level: item.level,
                x: parent.x + R * Math.cos(phi),
                y: parent.y + R * Math.sin(phi),
                phi,
                px: parent.x,
                py: parent.y,
                isLeftSide
            };
            elements.push(element);
            getChildren(list, element, elements, dPhi / children.length);
        }
    };

    const setElements = (list) => {
        const elements = [];
        const x0 = WIDTH / 2;
        const y0 = HEIGHT / 2;
        const root = list.find(item => item.level === 0);
        const rootElement = {
            id: root.id,
            name: root.name,
            level: root.level,
            x: x0,
            y: y0,
            phi: 0
        };
        elements.push(rootElement);
        getChildren(list, rootElement, elements, 2 * Math.PI);
        return elements;
    };

    const zoomMenu = [
        { name: 'zoomIn', onClick: (e) => props.onZoomIn(e) },
        { name: 'zoomOut', onClick: (e) => props.onZoomOut(e) },
        { name: 'panTool', onClick: props.onToggleMoveMode }
    ];

    const elements = setElements(props.list);
    return (
        <div className={css.container}>
            <Toolbar list={zoomMenu} type="default" location={['horisontal', 'right', 'top']} />
            <svg viewBox={`${props.x} ${props.y} ${WIDTH} ${HEIGHT}`}
            onMouseDown={(e) => props.onMouseDown(e)}
            onMouseMove={(e) => props.onMouseMove(e)}
            onMouseUp={() => props.onMouseUp()}>
                <Connection list={elements} />
                {
                    elements.map(element =>
                    (
                        <ChartElement
                            key={element.id}
                            onClick={props.onClick}
                            id={element.id}
                            phi={element.phi}
                            level={element.level}
                            x={element.x} y={element.y}
                            isSelected={element.id === props.id}
                            px={element.px} py={element.py}
                            name={element.name} />
                    ))
                }
            </svg>
        </div>
    );
}

export default Chart;
