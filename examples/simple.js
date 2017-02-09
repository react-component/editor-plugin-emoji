// use jsx to render html, do not modify simple.html

import '@alipay/rc-editor-plugin-emoji/assets/index.less';
import EditorPluginEmoji from '@alipay/rc-editor-plugin-emoji';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<EditorPluginEmoji />, document.getElementById('__react-content'));
