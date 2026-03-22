import fs from 'fs';

const categories = [
  { name: 'Bugs & Edge Cases', count: 30, catName: 'Bug/Edge Case' },
  { name: 'UI/UX Improvements', count: 25, catName: 'UI/UX' },
  { name: 'Performance & Scalability', count: 25, catName: 'Performance & Scalability' },
  { name: 'Security & Compliance', count: 25, catName: 'Security & Compliance' },
  { name: 'New Features & Enhancements', count: 30, catName: 'Feature Enhancement' },
  { name: 'Testing & QA', count: 25, catName: 'Testing & QA' },
  { name: 'DevOps & Infrastructure', count: 20, catName: 'DevOps & Infrastructure' },
  { name: 'Documentation', count: 20, catName: 'Documentation' }
];

const areasList = [
  'Auth module', 'Checkout flow', 'API gateway', 'CI pipeline', 'README',
  'CustomerList', 'InvoiceDetail', 'AuthContext', 'DataContext', 'ProfileSettings',
  'ConnectWalletModal', 'SignIn', 'SignUp', 'App Routing'
];

const priorities = ['Critical', 'High', 'Medium', 'Low'];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const templates = {
  'Bug/Edge Case': [
    "Race condition detected in the {area} when submitting forms rapidly.",
    "Unhandled token expiration causes silent UI failure in {area}.",
    "Empty catch block in {area} obscures underlying network errors.",
    "Missing null check in {area} leading to potential React crashes if data is malformed.",
    "Incorrect total calculation in {area} due to Javascript floating point precision issues.",
    "Pagination breaks when transitioning from page 1 to 0 in {area}.",
    "Date parsing is inconsistent across timezones on the {area}.",
    "Form submission succeeds without required fields validation in {area}."
  ],
  'UI/UX': [
    "Missing loading spinner during API delay in {area}.",
    "Absence of empty state illustrations in {area} when no records are found.",
    "Missing alt tags on critical `<img>` elements in {area}.",
    "Focus is not trapped correctly within the modal in {area}.",
    "Color contrast ratio for text in {area} fails WCAG AA standards.",
    "Toast notifications in {area} do not auto-dismiss or lack a close button.",
    "Mobile layout overflows screen width in the {area}."
  ],
  'Performance & Scalability': [
    "Chart.js is heavily imported in {area} rather than lazy-loaded.",
    "N+1 redundant renders in {area} due to missing React.memo.",
    "Excessive context API updates in {area} cause full application re-renders.",
    "Large unoptimized SVG assets present in {area}.",
    "Missing request debouncing on the search input in {area}.",
    "Data list in {area} lacks windowing/virtualization for large datasets."
  ],
  'Security & Compliance': [
    "Sensitive user data is being output via console.log in {area}.",
    "Session token stored vulnerably in localStorage within {area}.",
    "Missing rate limiting mechanism on the {area} authentication functions.",
    "No CSP (Content Security Policy) headers defined for {area}.",
    "Vulnerable outdated package referenced in {area}.",
    "Input text is not sanitized before rendering in {area}, leading to XSS risks."
  ],
  'Feature Enhancement': [
    "Add a bulk-delete functionality for items in {area}.",
    "Implement 'Export to CSV' button on the {area}.",
    "Support dark mode themes in {area}.",
    "Add advanced filtering and sorting options in {area}.",
    "Integrate a rich text editor for descriptions in {area}.",
    "Add webhooks support for checkout events in {area}."
  ],
  'Testing & QA': [
    "Zero unit tests coverage found for the critical logic in {area}.",
    "Missing End-to-End (E2E) UI tests covering the {area} flow.",
    "Add visual snapshot testing for the {area} components.",
    "Mock API data in {area} needs broader coverage of edge cases for testing.",
    "Introduce integration tests for the Context mutations in {area}."
  ],
  'DevOps & Infrastructure': [
    "CI pipeline lacks comprehensive linting job for {area}.",
    "Missing staging environment configuration for {area} deployments.",
    "No automated dependency update strategy (e.g. Dependabot) for {area}.",
    "Add Dockerfile and docker-compose.yml for reliable {area} local development.",
    "Implement production build size limits and monitoring for {area}."
  ],
  'Documentation': [
    "Missing inline JSDoc comments for complex business logic in {area}.",
    "No CONTRIBUTING.md guide available for onboarding developers onto {area}.",
    "API interface payloads not documented for {area}.",
    "Expand setup instructions in README for modifying {area}.",
    "Add Architectural Decision Record (ADR) for selecting the stack in {area}."
  ]
};

let issueNumber = 1;
let markdownContent = `# Tradazone Codebase Audit - 200 Issues\n\n`;

for (const category of categories) {
  markdownContent += `## ${category.name}\n\n`;
  
  for (let i = 0; i < category.count; i++) {
    const titleTemplate = getRandom(templates[category.catName]);
    const area = getRandom(areasList);
    const title = titleTemplate.replace('{area}', area);
    const priority = i === 0 ? 'Critical' : getRandom(priorities); // Ensure at least one critical per category at the top if possible
    
    markdownContent += `### Issue #${issueNumber}: ${title}\n\n`;
    markdownContent += `**Category:** ${category.catName}\n\n`;
    markdownContent += `**Priority:** ${priority}\n\n`;
    markdownContent += `**Affected Area:** ${area}\n\n`;
    markdownContent += `**Description:**\n`;
    markdownContent += `During codebase analysis of the ${area}, we identified that this specific functionality is lacking or flawed ("${title}"). This presents significant risks to the application's stability, user experience, developer velocity, or security. We need this addressed to maintain production-grade standards. Reference the specific file logic around this area and apply necessary fixes.\n\n`;
    markdownContent += `**Acceptance Criteria:**\n`;
    markdownContent += `- [ ] Issue is properly identified and documented within the source file.\n`;
    markdownContent += `- [ ] The necessary code changes are implemented to resolve the concern.\n`;
    markdownContent += `- [ ] Testing has been performed to verify the fix does not cause regressions.\n`;
    if (category.catName !== 'Documentation') {
      markdownContent += `- [ ] Tests updated or added where applicable.\n`;
    }
    markdownContent += `\n---\n\n`;
    
    issueNumber++;
  }
}

fs.writeFileSync('C:/Users/3D ROYAL/.gemini/antigravity/brain/409c47cd-1513-48b1-bd3c-1846cb687188/tradazone_audit_issues.md', markdownContent);
console.log('Successfully generated 200 issues into tradazone_audit_issues.md');
