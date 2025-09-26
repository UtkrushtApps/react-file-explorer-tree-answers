import { useState, useCallback, useRef } from 'react';

// Stores tree expansion state per node in a global ref to persist as components mount/unmount
const globalExpansionMap = {};

export default function useTreeExpansion(nodePath, isFolder) {
  // Only folders are controllable
  const isFirst = useRef(!Object.prototype.hasOwnProperty.call(globalExpansionMap, nodePath));
  const [isExpanded, setExpanded] = useState(
    isFolder ? (globalExpansionMap[nodePath] ?? false) : false
  );
  // On first use, track expanded state globally so sibling expansions are kept
  if (isFirst.current && isFolder) {
    globalExpansionMap[nodePath] = isExpanded;
    isFirst.current = false;
  }

  const toggleNode = useCallback(() => {
    if (!isFolder) return;
    setExpanded(prev => {
      globalExpansionMap[nodePath] = !prev;
      return !prev;
    });
  }, [nodePath, isFolder]);

  return { isExpanded, toggleNode };
}
