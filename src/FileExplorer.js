import React from 'react';
import { fileTreeData } from './mockTreeData';
import TreeNode from './TreeNode';

function FileExplorer() {
  return (
    <div style={{ width: 360, border: '1px solid #e0e0e0', borderRadius: 8, padding: 12, background: '#fafbfc' }}>
      <h2 style={{ fontSize: 18, margin: '0 0 12px 0', paddingLeft: 4 }}>File Explorer</h2>
      <TreeNode node={fileTreeData} level={0} parentPath="" />
    </div>
  );
}

export default FileExplorer;
