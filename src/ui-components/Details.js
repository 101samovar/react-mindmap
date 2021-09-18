import css from "./details.module.css";

function Details(props) {
    return (
        <div className={css.container}>
            <h2>Details ID{props.id}</h2>
            <form>
                <fieldset>
                    <label>ID</label>
                    <input className={css.input} value={props.id} disabled type="text" />
                </fieldset>
                <fieldset>
                    <label>Level</label>
                    <input className={css.input} value={props.level} disabled type="text" />
                </fieldset>
                <fieldset>
                    <label>Name</label>
                    <input className={css.input}
                        onChange={props.onChangeName}
                        value={props.name} type="text" />
                </fieldset>
                <fieldset>
                    <label>Comment</label>
                    <textarea rows="10"
                        onChange={props.onChangeComment}
                        value={props.comment} className={css.textarea}></textarea>
                </fieldset>
            </form>
        </div>
    );
}

export default Details;
