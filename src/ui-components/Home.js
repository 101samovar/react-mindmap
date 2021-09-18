import React from "react";
import repository from "../repository";
import Toolbar from "./Toolbar";
import css from "./home.module.css";
import Card from "./Card";
import router from "./router";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: repository.getList({level: 0})
        }
    }

    add() {
        repository.save({
            name: 'Bright Idea!',
            level: 0,
            parentId: null
        });
        this.setState({list: repository.getList({level: 0})});
    }

    actionMenu = [
        { name: 'add', onClick: () => this.add() },
        { name: 'delete', onClick: () => this.delete(this.state.id) }
    ];

    setSelected(id) {
        this.setState({ id });
    }

    delete(id) {
        repository.delete(id);
        this.setState({ list: repository.getList({ level: 0 }) });
    }

    getMap(id) {
        router.setRoute('map', id);
    }

    render() {
        return (
            <>
                <h1>Home</h1>
                <Toolbar list={this.actionMenu} type="alert" location={['vertical', 'right', 'bottom']} />
                <div className={css.list}>
                    {
                        this.state.list.map(item => (
                            <div className={css.item}
                                onDoubleClick={() => this.getMap(item.id)}
                                key={item.id}>
                                <Card id={item.id}
                                    onClick={() => this.setSelected(item.id)}
                                    isSelected={item.id === this.state.id}
                                    name={item.name} comment={item.comment} />
                            </div>
                        ))
                    }
                </div>
            </>
        );
    }
}

export default Home;
