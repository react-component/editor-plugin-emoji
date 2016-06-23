import React from 'react';
import classnames from 'classnames';
import { EditorState, Entity, Modifier } from 'draft-js';
import EmojiPicker from './EmojiPicker';
import EmojiIcon from './EmojiIcon';

function noop() {};

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

function insertEntity(editorState, entityType, data, entityMode = 'IMMUTABLE') {
  const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();
  const entityKey = Entity.create(entityType, entityMode, data || {});
  console.log('>> entityKey', entityKey);
  const insertContent = Modifier.insertText(
    content,
    selection,
    ' ',
    {},
    entityKey
  );
  return EditorState.push(editorState, insertContent, 'insert-entity');
}

const Emoji = {
  constructor(config = {}) {
    const callbacks = {
      getEditorState: noop,
      setEditorState: noop,
    }
    function pickEmoji(emoji) {
      const editorState = callbacks.getEditorState();
      callbacks.setEditorState(insertEntity(editorState, 'emoji', { emoji }));
    }
    return {
      name: 'emoji',
      callbacks,
      decorators: [{
        strategy: findEntities('emoji'),
        component: EmojiIcon
      }],
      component: (props) => {
        const classNames = classnames({
          ['editor-icon']: true,
          ['editor-icon-emoji']: true,
        });
        return (<div className="editor-icon-emoji-wrap">
          <span className={classNames} />
          <EmojiPicker onChange={pickEmoji.bind(this)} />
        </div>);
      }
    }
  },
  config: {},
};

export default Emoji;
