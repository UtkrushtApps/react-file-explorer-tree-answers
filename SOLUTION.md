# Solution Steps

1. Define the mock file tree data in src/mockTreeData.js as a nested JS object using folders and files.

2. Create a custom hook src/useTreeExpansion.js to manage expansion/collapse state for each folder node using a key-path.

3. Implement TreeNode component in src/TreeNode.js:

4.  - Accepts a node, recursion level, and its parent path.

5.  - Computes a unique string path to identify the node for expansion state.

6.  - Uses the useTreeExpansion hook for folders to track expansion/collapse state individually.

7.  - Renders the node: shows an expand/collapse arrow, folder/file icon, and label.

8.  - If folder has children, and is expanded, recursively renders TreeNode for each child node (in a container with increased indentation).

9.  - Supports keyboard accessibility (Enter/Space/Arrows to expand/collapse) for folders.

10.  - Uses React.memo and useCallback for optimal rendering.

11. Implement the FileExplorer component (src/FileExplorer.js):

12.  - Renders the root of the tree using TreeNode with top-level mock data.

13. Set up the root App component (src/App.js):

14.  - Place FileExplorer within a styled wrapper for a minimal workspace demo.

15. Export and connect all components as needed.

16. Test rendering: expanding/collapsing any folder, at any level, is independent and works as expected.

