import css from './leftmenu.module.css';
import router from './router';
import Toolbar from './Toolbar';

function LeftMenu(props) {
    const list = [
        { name: 'home', onClick: () => router.setRoute('home') },
        { name: 'help', onClick: () => router.setRoute('help') }
    ];

    let className = css.container;
    if (props.isMenuVisible) {
        className += ' ' + css.visible;
    }

    return (<div className={className} onMouseLeave={props.onMouseLeave}>
        <Toolbar list={list} type="primary" location={['vertical']} />
    </div>);
}

export default LeftMenu;
