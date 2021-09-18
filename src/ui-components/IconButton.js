import Icon from "./Icon";
import css from "./iconbutton.module.css";

function IconButton(props) {
    let className = css.container;
    className += ' ' + css[props.type];
    return (
        <div className={className} onClick={props.onClick}>
            <Icon type={props.type} name={props.name} />
        </div>
    );
}

export default IconButton;
