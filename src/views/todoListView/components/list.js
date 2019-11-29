import React from 'react';
import { inject, observer } from 'mobx-react';

class List extends React.Component {
    constructor(props) {
        super(props);
        console.log('item', this.props.item);
        this.state = {
            viewRef: React.createRef(),
            inputRef: React.createRef(),
            isFocused: false
        };
    }

    componentDidMount() {}
    componentWillUnmount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('prevProps', prevProps);
        console.log('prevState', prevState);
        console.log('snapshot', snapshot);
        // if(prevState.)
        this.state.inputRef.current.focus();
    }

    isFocused = () => {
        this.setState({
            isFocused: !this.state.isFocused
        });

        // this.state.inputRef.current.addEventListener('blur', this.isBulr);
    };
    isBulr = () => {
        console.log('blur');
    };

    checkboxClick = () => {
        // console.log('checkbox toggle');
        this.props.store.todoStore.toggleCheckbox(this.props.item._id);
    };
    removeButtonClick = () => {
        this.props.store.todoStore.removeTodo(this.props.item._id);
    };

    render() {
        return (
            <div className={'container-List'}>
                <div className={['checkbox'].join(' ')} onClick={this.checkboxClick}>
                    {(() => {
                        if (this.props.item.isSolved != 0) {
                            return 'X';
                        }
                    })()}
                </div>
                <input ref={this.state.inputRef} className={[this.state.isFocused ? 'show' : '', 'content', this.props.item.isSolved != 0 ? 'checked' : ''].join(' ')} />
                <div ref={this.state.viewRef} onClick={this.isFocused} className={[this.state.isFocused ? '' : 'show', 'content', this.props.item.isSolved != 0 ? 'checked' : ''].join(' ')}>
                    {this.props.item.content}
                </div>
                <button className={'delete-button'} onClick={this.removeButtonClick}>
                    삭제
                </button>
            </div>
        );
    }
}

export default inject('store')(observer(List));
