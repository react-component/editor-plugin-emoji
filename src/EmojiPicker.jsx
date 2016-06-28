import React from 'react';
import EmojisList from './emojis-list';
import classnames from 'classnames';

const emojisPerPage = 50;

export default class EmojiPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 0,
      totalPage: Math.floor(EmojisList.length / emojisPerPage),
    };
  }
  pickEmoji(emoji) {
    if (this.props.onChange) {
      this.props.onChange(emoji);
    }
  }
  render() {
    const { currentPage, totalPage} = this.state;
    const emojis = EmojisList.slice(currentPage * emojisPerPage, (currentPage + 1) * emojisPerPage).map(emoji => {
      const className = classnames({
        ['emoji']: true,
        [`emoji-${emoji.shortCut}`]: true
      });
      return <span className={className} onMouseDown={this.pickEmoji.bind(this, emoji)}>
        <img src={`/assets/icons/${emoji.emotionId}`} alt=""/>
      </span>;
    });
    const paginations = [];
    for (let i = 0; i < totalPage; i++) {
      const className = classnames({
        ['emoji-paginationIcon']: true,
        ['active']: i === currentPage,
      });
      paginations.push(<span className={className} onClick={() => this.setState({currentPage: i})} />)
    }
    return <div className="emoji-picker-wrapper" onClick={(ev) => { ev.stopPropagation(); ev.nativeEvent.stopImmediatePropagation();}} >
      {emojis}
      <div className="pagination-wrap">{paginations}</div>
    </div>
  }
}