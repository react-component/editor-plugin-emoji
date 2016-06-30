import { EditorState, Modifier, Entity } from 'draft-js';

export function replaceEntity(editorState, selection, text, entity) {
  const content = editorState.getCurrentContent();
  const insertContent = Modifier.replaceText(
    content,
    selection,
    text,
    {},
    entity
  );

  const InsertSpaceContent = Modifier.insertText(
    insertContent,
    insertContent.getSelectionAfter(),
    '',
  );
  return EditorState.push(editorState, InsertSpaceContent, 'replace-entity');
}

export function createEntity(entityType, data, entityMode = 'IMMUTABLE') {
  return Entity.create(entityType, entityMode, data || {});
}

export function insertEntity(editorState, entityType, data, entityMode = 'IMMUTABLE') {
  const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();
  const entityKey = createEntity(entityType, data, entityMode);
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
    '',
  );

  const newEditorState = EditorState.push(editorState, InsertSpaceContent, 'insert-entity');
  return EditorState.forceSelection(newEditorState, InsertSpaceContent.getSelectionAfter());
}

export function exportEntity(entityData) {
  console.log('> exportEneity', entityData);
  return `${entityData.emoji.shortCut}`;
}
