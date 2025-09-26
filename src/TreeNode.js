import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import useTreeExpansion from './useTreeExpansion';

const folderIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path fill="#FAAD14" d="M2 6v7.25A1.75 1.75 0 003.75 15h10.5A1.75 1.75 0 0016 13.25v-6.5A1.75 1.75 0 0014.25 5H8.74L7.85 3.82A1.5 1.5 0 006.64 3H3.75A1.75 1.75 0 002 4.75V6z"/></svg>
);
const fileIcon = (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect width="12" height="14" x="2" y="1" fill="#B3B3B3" rx="2"/><rect width="8" height="2" x="4" y="4" fill="#fff" rx="1"/><rect width="6" height="2" x="4" y="8" fill="#fff" rx="1"/><rect width="6" height="2" x="4" y="11" fill="#fff" rx="1"/></svg>
);

function getNodePath(node, parentPath) {
  // Computes a unique key-path for a node
  return parentPath ? `${parentPath}/${node.name}` : node.name;
}

const TreeNode = React.memo(function TreeNode({ node, level, parentPath }) {
  const nodePath = useMemo(() => getNodePath(node, parentPath), [node, parentPath]);
  const { isExpanded, toggleNode } = useTreeExpansion(nodePath, node.type === 'folder');

  // For accessibility: folder node needs button, file is just a span
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;

  const handleExpandCollapse = useCallback(
    (e) => {
      e.stopPropagation();
      toggleNode();
    },
    [toggleNode]
  );

  return (
    <div role={level === 0 ? "tree" : undefined} style={{ marginLeft: level * 18 }}>
      <div
        style={{
          display: 'flex', alignItems: 'center', cursor: node.type === 'folder' ? 'pointer' : 'default',
          userSelect: 'none',
          padding: '2px 0',
          borderRadius: 4,
          outline: 'none',
        }}
        tabIndex={0}
        aria-level={level + 1}
        aria-setsize={undefined}
        aria-posinset={undefined}
        aria-expanded={node.type === 'folder' ? isExpanded : undefined}
        role={node.type === 'folder' ? 'treeitem' : 'none'}
        onKeyDown={node.type === 'folder' ? (e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            handleExpandCollapse(e);
          }
        } : undefined}
        onClick={node.type === 'folder' ? handleExpandCollapse : undefined}
      >
        {/* Expand/collapse arrow for folders with children */}
        {node.type === 'folder' ? (
          <span style={{width: 18, display: 'inline-flex', justifyContent: 'center'}} aria-hidden="true">
            {hasChildren ? (
              <svg
                width={12} height={12} style={{marginRight: 2, transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s'}}
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M4 2.5L8 6L4 9.5" stroke="#888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : null}
          </span>
        ) : <span style={{width: 18, display:'inline-block'}}></span>}
        <span style={{marginRight: 6, flexShrink: 0}}>
          {node.type === 'folder' ? folderIcon : fileIcon}
        </span>
        <span style={{fontWeight: node.type === 'folder' ? 500 : 400}}>{node.name}</span>
        {/* Example extensibility: action menu slot here for future context menu/actions */}
      </div>
      {node.type === 'folder' && hasChildren && isExpanded && (
        <div role="group">
          {node.children.map((child) => (
            <TreeNode key={getNodePath(child, nodePath)} node={child} level={level + 1} parentPath={nodePath} />
          ))}
        </div>
      )}
    </div>
  );
});

TreeNode.propTypes = {
  node: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['folder','file']).isRequired,
    children: PropTypes.array,
  }).isRequired,
  level: PropTypes.number,
  parentPath: PropTypes.string,
};

TreeNode.defaultProps = {
  level: 0,
  parentPath: '',
};

export default TreeNode;
