import React from 'react';
import classname from 'classnames';
import emoticons from './emoticons';

const iconStyle = {
  letterSpacing: 32,
  width: 32,
  fontSize: 32,
  height: 32,
  display: 'inline-block',
}
export default function(props) {
  const { entityKey } = props;
  const data = Entity.get(entityKey).getData();
  const { emoji } = data;
  const className = classname({
    ['emoji']: true,
    ['emoji-emoticons']: emoticons.indexOf(emoji) !== -1,
    [`emoji-${emoji}`]: true
  });

  return <span style={iconStyle} className={className}>{props.children}</span>;
}
