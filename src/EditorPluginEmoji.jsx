import React from 'react';
import classnames from 'classnames';
import { EditorState, Entity, Modifier, convertToRaw } from 'draft-js';
import EmojiButton from './EmojiButton';
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

  const InsertSpaceContent = Modifier.insertText(
    insertContent,
    insertContent.getSelectionAfter(),
    ' ',
  );

  const newEditorState = EditorState.push(editorState, InsertSpaceContent, 'insert-entity');
  return EditorState.forceSelection(newEditorState, InsertSpaceContent.getSelectionAfter());
}

function exportEntity(entityData) {
  console.log('> exportEneity', entityData);
  return `${entityData.emoji.shortCut}`;
}

const Emoji = {
  constructor(config = {}) {
    const callbacks = {
      getEditorState: noop,
      setEditorState: noop,
    }
    function pickEmoji(emoji) {
      const editorState = callbacks.getEditorState();
      callbacks.setEditorState(insertEntity(editorState, 'emoji', { emoji, export: exportEntity }));
    }
    return {
      name: 'emoji',
      callbacks,
      decorators: [{
        strategy: findEntities('emoji'),
        component: EmojiIcon
      }],
      component: (props) => <EmojiButton onChange={pickEmoji.bind(this)}/>
    };
  },
  config: {},
};

export default Emoji;
