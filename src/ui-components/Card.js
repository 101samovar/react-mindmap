import css from "./card.module.css";

function Card(props) {
    let className = css.container;
    if (props.isSelected) {
        className += ' ' + css.selected;
    }
    return (
        <div className={className}
            onClick={props.onClick}>
            <div className={css.title}>{props.name}</div>
            <div className={css.comment}>{props.comment}</div>
        </div>
    );
}

export default Card;
