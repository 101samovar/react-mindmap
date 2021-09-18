import css from './leftmenu.module.css';
import router from './router';
import Toolbar from './Toolbar';

function LeftMenu() {
    const list = [
        { name: 'home', onClick: () => router.setRoute('home') },
        { name: 'help', onClick: () => router.setRoute('help') }
    ];

    return (<div className={css.container}>
        <Toolbar list={list} type="primary" location={['vertical']} />
    </div>);
}

export default LeftMenu;
