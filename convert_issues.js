import fs from 'fs';

const content = fs.readFileSync('tradazone_audit_issues.md', 'utf-8');
const blocks = content.split('---').filter(b => b.trim().includes('### Issue #'));

console.log(`Found ${blocks.length} issues to parse.`);

const categoryToLabel = {
  'Bug/Edge Case': 'bug',
  'UI/UX': 'enhancement',
  'Performance & Scalability': 'performance',
  'Security & Compliance': 'security',
  'Feature Enhancement': 'enhancement',
  'Testing & QA': 'testing',
  'DevOps & Infrastructure': 'devops',
  'Documentation': 'documentation'
};

const issues = [];

for (let i = 0; i < blocks.length; i++) {
  const block = blocks[i];
  
  const titleMatch = block.match(/### Issue #\d+: (.+)/);
  if (!titleMatch) continue;
  
  let title = titleMatch[1].trim();
  let body = block.replace(/### Issue #\d+: (.+)\n+/, '').trim();
  
  const catMatch = block.match(/\*\*Category:\*\* (.+)/);
  let categoryLabel = 'task';
  if (catMatch) {
    const rawCat = catMatch[1].trim();
    categoryLabel = categoryToLabel[rawCat] || 'task';
  }
  
  const priorityMatch = block.match(/\*\*Priority:\*\* (.+)/);
  let priorityLabel = priorityMatch ? `Priority: ${priorityMatch[1].trim()}` : null;
  
  const areaMatch = block.match(/\*\*Affected Area:\*\* (.+)/);
  let areaLabel = areaMatch ? `Area: ${areaMatch[1].trim()}` : null;
  
  const labels = [categoryLabel];
  if (priorityLabel) labels.push(priorityLabel);
  if (areaLabel) labels.push(areaLabel);
  
  // Add universal label requested by user
  labels.push("Stellar wave");
  
  issues.push({
    title,
    body,
    labels
  });
}

fs.writeFileSync('issues.json', JSON.stringify(issues, null, 2));
console.log(`Successfully generated issues.json with ${issues.length} issues.`);
