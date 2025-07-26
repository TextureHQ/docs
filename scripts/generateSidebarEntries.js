const fs = require('fs');
const path = require('path');

// Read the manufacturers directory to get all manufacturer slugs
const manufacturersDir = path.join(__dirname, '..', 'docs', 'integrations', 'manufacturers');
const manufacturerFiles = fs.readdirSync(manufacturersDir)
  .filter(file => file.endsWith('.md') && file !== 'index.md')
  .map(file => file.replace('.md', ''));

// Generate sidebar entries for manufacturer pages
const sidebarEntries = manufacturerFiles.map(slug => ({
  type: "doc",
  id: `integrations/manufacturers/${slug}`,
  className: "hidden",
}));

console.log('Generated sidebar entries for manufacturers:');
console.log(JSON.stringify(sidebarEntries, null, 2));

// You can copy this output and paste it into sidebars.ts
console.log('\nTo use these entries, copy the JSON above and replace the manufacturer entries in sidebars.ts'); 