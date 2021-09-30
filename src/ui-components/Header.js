import css from './header.module.css';
import IconButton from './IconButton';

function Header(props) {
    return (
    <div className={css.container}>
        <IconButton name="menu" onClick={() => props.onMenuClick()}/>
        <div className={css.title}>MindMap</div>
    </div>);
}

export default Header;
