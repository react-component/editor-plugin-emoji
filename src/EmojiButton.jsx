import React from 'react';
import classnames from 'classnames';
import EmojiPicker from './EmojiPicker';

class EmojiButton extends React.Component {
  eventHandler = null;
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }
  toggleEmojiPicker = (ev) => {
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
    this.setState({
      visible: !this.state.visible,
    });
  }
  hideEmojiPicker = (e) => {
    this.setState({
      visible: false,
    });
  }
  componentDidMount() {
    this.eventHandler = document.addEventListener('click', this.hideEmojiPicker);
  }
  componentWillUmount() {
    document.removeEventListener('click', this.hideEmojiPicker);
  }
  onChange(emoji) {
    this.setState({
      visible: false,
    });
    this.props.onChange(emoji);
  }
  render() {
    const { visible } = this.state;
    const classNames = classnames({
      ['editor-icon']: true,
      ['editor-icon-emoji']: true,
      active: visible,
    });
    return (<div className="editor-icon-emoji-wrap">
      <span className={classNames} onClick={this.toggleEmojiPicker} />
      {visible ? <EmojiPicker onChange={this.onChange.bind(this)} visible={visible} /> : null}
    </div>);
  }
}

export default EmojiButton;