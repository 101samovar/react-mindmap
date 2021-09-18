import css from './breadcrumbs.module.css';
import router from './router';

function Breadcrumbs(props) {
    return (
        <div className={css.container}>
            {
                props.list.map(item => (
                    <span key={item}>
                        <span 
                        onClick={() => router.setRoute(item)}
                        className={css.item}>{item}</span>/
                    </span>
                ))
            }
        </div>);
}

export default Breadcrumbs;
