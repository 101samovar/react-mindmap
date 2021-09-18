import css from "./connection.module.css";

function Connection(props) {
    const getElement = (element) => {
        if (element.level === 0) {
            return null;
        }
        const DX = element.isLeftSide ? -40 : 40;
        const dx = element.x - element.px;
        const dy = element.y - element.py;
        const d = `M ${element.px} ${element.py} c ${DX} 0, ${dx-DX} ${dy}, ${dx} ${dy}`;
        return (
            <path key={element.id} d={d} className={css.connection} />
        );
    };
    return (
        props.list.map(element => getElement(element))
    );
}

export default Connection;
