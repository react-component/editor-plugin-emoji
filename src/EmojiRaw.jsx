import React from 'react';
import { EditorState, Entity, SelectionState } from 'draft-js';
import emojiList from './emojis-list';
import { createEntity, replaceEntity, exportEntity } from './util';
import { decode } from 'draft-js/lib/DraftOffsetKey';

const emojiMap = {};

emojiList.forEach(emoji => {
  const { shortCut } = emoji;
  emojiMap[shortCut] = emoji;
});

class EmojiRaw extends React.Component {
  componentDidMount() {
    const { decoratedText, callbacks, offsetKey } = this.props;
    const { getEditorState, setEditorState } = callbacks;
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    const { blockKey, decoratorKey, leafKey } = decode(offsetKey);
    const leaf = editorState.getBlockTree(blockKey).getIn([decoratorKey, 'leaves', leafKey]);
    if (!leaf) {
      return false;
    }
    const startKey = leaf.get('start');
    const endKey = leaf.get('end');
    console.log('EmojiRaw', startKey, endKey);
    const selection = SelectionState.createEmpty();
    const updatedSelection = selection.merge({
      anchorKey: blockKey,
      anchorOffset: startKey,
      focusKey: blockKey,
      focusOffset: endKey,
    });
    if (emojiMap.hasOwnProperty(decoratedText)) {
      const newEditorState = replaceEntity(
        editorState,
        updatedSelection,
        ' ',
        createEntity('emoji', { emoji: emojiMap[decoratedText], export: exportEntity }),
      );

      setEditorState(
        EditorState.moveFocusToEnd(newEditorState)
      );
    }
    // if (emojiMap.hasOwnProperty(decoratedText)) {
    //   Entity.replaceData(entityKey, emojiMap[decoratedText]);
    // }

  }
  render() {
    return <span style={{backgroundColor: 'red'}}>{this.props.children}</span>
  }
}

export default EmojiRaw;