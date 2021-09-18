import css from './content.module.css';

function Content(props) {
    return (<div className={css.container}>
        {props.component}
    </div>);
}

export default Content;
