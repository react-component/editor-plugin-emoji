import { EditorState, Modifier, Entity } from 'draft-js';

export function replaceEntity(currentContent, selection, text, entity) {
  const insertContent = Modifier.replaceText(
    currentContent,
    selection,
    text,
    {},
    entity
  );

  const insertSpaceContent = Modifier.insertText(
    insertContent,
    insertContent.getSelectionAfter(),
    ' ',
  );
  return insertSpaceContent;
}

export function createEntity(contentState, entityType, data, entityMode = 'IMMUTABLE') {
  return contentState.createEntity(entityType, entityMode, data || {});
}

export function insertEntity(editorState, entityType, data, entityMode = 'IMMUTABLE') {
  const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();
  const contentStateWithEntity = createEntity(content, entityType, data, entityMode);
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const insertContent = Modifier.insertText(
    contentStateWithEntity,
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

export function exportEntity(entityData) {
  console.log('> exportEneity', entityData);
  return `${entityData.emoji.shortCut}`;
}
