import React from 'react';
import classname from 'classnames';
import { Entity } from 'draft-js';

const iconStyle = {
  letterSpacing: 32,
  width: 32,
  fontSize: 32,
  height: 32,
  display: 'inline-block',
  backgroundSize: '100%',
};

export default function(props) {
  const { entityKey } = props;
  const data = Entity.get(entityKey).getData();
  const { emoji } = data;
  const className = classname({
    ['emoji']: true,
    [`emoji-${emoji.shortCut}`]: true
  });
  const emojiStyle = {...iconStyle, backgroundImage: `url('${emoji.url}')`};

  return <span style={emojiStyle} className={className}>{props.children}</span>;
}
