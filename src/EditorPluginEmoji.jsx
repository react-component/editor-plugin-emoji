import React from 'react';
import classnames from 'classnames';
import { EditorState, Entity, Modifier, convertToRaw } from '@alipay/draft-js';
import { insertEntity, exportEntity } from './util';
import EmojiButton from './EmojiButton';
import EmojiIcon from './EmojiIcon';
import EmojiRaw from './EmojiRaw';

function noop() {};

const emojiRex = /\[([\u4e00-\u9fa5])+\]/g;

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

function findEntities(entityType) {
  return function findEntitiesFunc(contentBlock, callback) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          Entity.get(entityKey).getType() === entityType
        );
      },
      callback
    );
  }
}



const Emoji = {
  constructor(config = {}) {
    const callbacks = {
      getEditorState: noop,
      setEditorState: noop,
      focus: noop,
    }
    function pickEmoji(emoji) {
      const editorState = callbacks.getEditorState();
      callbacks.setEditorState(insertEntity(editorState, 'emoji', { emoji, export: exportEntity }), true);
    }
    return {
      name: 'emoji',
      callbacks,
      decorators: [{
        strategy: findEntities('emoji'),
        component: EmojiIcon
      }, {
        strategy: (contentBlock, callback) => findWithRegex(emojiRex, contentBlock, callback),
        component: (props) => <EmojiRaw callbacks={callbacks} {...props}/>
      }],
      component: (props) => <EmojiButton onChange={pickEmoji.bind(this)}/>
    };
  },
  config: {},
};

export default Emoji;
