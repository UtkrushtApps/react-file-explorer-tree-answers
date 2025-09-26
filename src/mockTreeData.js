export const fileTreeData = {
  name: 'root',
  type: 'folder',
  children: [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'index.js', type: 'file' },
        { name: 'App.js', type: 'file' },
        {
          name: 'components',
          type: 'folder',
          children: [
            { name: 'Header.js', type: 'file' },
            { name: 'Footer.js', type: 'file' },
            {
              name: 'Navigation',
              type: 'folder',
              children: [
                { name: 'NavBar.js', type: 'file' },
                { name: 'NavItem.js', type: 'file' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'public',
      type: 'folder',
      children: [
        { name: 'index.html', type: 'file' },
        { name: 'favicon.ico', type: 'file' },
      ],
    },
    { name: 'README.md', type: 'file' },
    { name: '.gitignore', type: 'file' },
  ],
};
