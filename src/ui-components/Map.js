import React from "react";
import repository from "../repository";
import Details from "./Details";
import router from "./router";
import css from "./map.module.css";
import Toolbar from "./Toolbar";
import TableView from "./TableView";
import Chart from "./Chart";

class Map extends React.Component {
    DEFAULT_WIDTH = 400;
    DEFAULT_HEIGHT = 200;
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        const rootId = Number(router.getParams());
        const list = repository.getList({ rootId });
        const item = list[0];
        this.state = {
            id: item.id,
            name: item.name,
            level: item.level,
            comment: item.comment,
            rootId,
            list,
            zoom: 1,
            moveMode: false,
            x: 0,
            y: 0,
            width: this.DEFAULT_WIDTH,
            height: this.DEFAULT_HEIGHT
        }
    }

    onResize = () => {
        const width = this.wrapper.current.clientWidth;
        const height = this.wrapper.current.clientHeight;
        this.setState({width, height});
    };

    componentDidMount() {
        this.onResize();
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    toggleMoveMode = () => {
        const moveMode = !this.state.moveMode;
        this.setState({moveMode});
    };

    ZOOM_FACTOR = 1.1;

    zoomIn = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const zoom = this.state.zoom * this.ZOOM_FACTOR;
        this.setState({zoom});
    };

    zoomOut = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const zoom = this.state.zoom / this.ZOOM_FACTOR;
        this.setState({zoom});
    };

    setSelected = (id) => {
        const item = repository.getItem(id);
        this.setState({
            id: item.id,
            level: item.level,
            name: item.name,
            comment: item.comment
        });
    };

    changeName = (e) => {
        const name = e.target.value;
        const item = { id: this.state.id, name };
        repository.save(item);
        const list = repository.getList({ rootId: this.state.rootId });
        this.setState({ name, list });
    }

    setSelected = (id) => {
        const item = repository.getItem(id);
        this.setState({
            id: item.id,
            name: item.name,
            level: item.level,
            comment: item.comment
        });
    };

    changeComment = (e) => {
        const comment = e.target.value;
        const item = { id: this.state.id, comment };
        repository.save(item);
        this.setState({ comment });
    }

    actionList = [
        { name: 'add', onClick: () => this.add() },
        { name: 'delete', onClick: () => this.delete() }
    ];

    add() {
        const item = repository.save({
            name: 'New item',
            level: this.state.level + 1,
            rootId: this.state.rootId,
            parentId: this.state.id,
            comment: ''
        });
        const list = repository.getList({ rootId: this.state.rootId });
        this.setState({
            id: item.id,
            name: item.name,
            level: item.level,
            comment: item.comment,
            list
        });
    }

    onMouseDown = (e) => {
        if (!this.state.moveMode) {
            return;
        }
        this.isDragging = true;
        this.startX = this.state.x * this.state.zoom + e.clientX;
        this.startY = this.state.y * this.state.zoom + e.clientY;
    };

    onMouseMove = (e) => {
        if (!this.isDragging) {
            return;
        }
        e.preventDefault();
        const x = (this.startX - e.clientX) * this.state.zoom;
        const y = (this.startY - e.clientY) * this.state.zoom;
        this.setState({x, y});
    };

    onMouseUp = () => {
        this.isDragging = false;
    };

    delete = () => {
        repository.delete(this.state.id);
        const list = repository.getList({ rootId: this.state.rootId });
        if (!list.length) {
            router.setRoute('home');
            return;
        }
        const item = list[0];
        this.setState({
            id: item.id,
            name: item.id,
            level: item.level,
            comment: item.comment,
            list
        });
    };

    viewMenu = [
        { name: 'viewList', onClick: () => this.setState({ view: 'table' }) },
        { name: 'hive', onClick: () => this.setState({ view: 'chart' }) }
    ];

    render() {
        let view;
        if (this.state.view === 'table') {
            view = <TableView
                id={this.state.id}
                onClick={this.setSelected}
                list={this.state.list} />
        } else {
            view = <Chart
                id={this.state.id}
                zoom={this.state.zoom}
                onZoomIn={this.zoomIn}
                onZoomOut={this.zoomOut}
                onToggleMoveMode={this.toggleMoveMode}
                x={this.state.x}
                y={this.state.y}
                width={this.state.width}
                height={this.state.height}
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
                onClick={this.setSelected}
                list={this.state.list} />
        }
        return (
            <>
                <h1>Map</h1>
                <div className={css.container} ref={this.wrapper}>
                    {view}
                    <Toolbar
                        type="alert"
                        location={['right', 'bottom', 'vertical']}
                        list={this.actionList}
                    />
                </div>
                <Toolbar list={this.viewMenu} type="default" location={['vertical', 'left', 'bottom']} />
                <Details id={this.state.id}
                    level={this.state.level}
                    name={this.state.name}
                    onChangeName={this.changeName}
                    onChangeComment={this.changeComment}
                    comment={this.state.comment} />
            </>
        );
    }
}

export default Map;
