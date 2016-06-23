// use jsx to render html, do not modify simple.html

import 'rc-editor-plugin-emoji/assets/index.less';
import EditorPluginEmoji from 'rc-editor-plugin-emoji';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<EditorPluginEmoji />, document.getElementById('__react-content'));
