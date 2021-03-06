import React from 'react';
import classname from 'classnames';
import { Entity } from 'draft-js';
const emojiRex = /\[([\u4e00-\u9fa5])+\]/g;

const iconStyle = {
  letterSpacing: 32,
  width: 32,
  fontSize: 32,
  height: 32,
  display: 'inline-block',
  backgroundSize: '100%',
  overflow: 'hidden',
};

export default function(props) {
  const { entityKey, contentState } = props;
  const data = contentState.getEntity(entityKey).getData();
  const { emoji } = data;
  const className = classname({
    ['emoji']: true,
    [`emoji-${emoji.shortCut}`]: true
  });
  const emojiStyle = {...iconStyle, backgroundImage: `url('${emoji.url}')`};
  return <span style={emojiStyle} contentEditable={false} className={className}>{props.children}</span>;
}
