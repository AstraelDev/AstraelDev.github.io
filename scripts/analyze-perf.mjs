import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];

  // Check for too many stars
  const starCountMatch = content.match(/Array\.from\({ length: (\d+) }\)/);
  if (starCountMatch && parseInt(starCountMatch[1]) > 200) {
    issues.push(`⚠️ High number of stars (${starCountMatch[1]}). Consider reducing or using Canvas.`);
  }

  // Check for memoization
  if (content.includes('function') && !content.includes('memo(') && filePath.endsWith('.tsx')) {
    issues.push(`💡 Some components might missing React.memo() for performance.`);
  }

  // Check for will-change
  if (!content.includes('will-change')) {
    issues.push(`💡 No 'will-change' properties found. Use them for hardware acceleration on animated elements.`);
  }

  return issues;
}

console.log('🚀 Starting Performance Analysis...');
const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

files.forEach(file => {
  const issues = analyzeFile(path.join(SRC_DIR, file));
  if (issues.length > 0) {
    console.log(`\n📄 File: ${file}`);
    issues.forEach(issue => console.log(issue));
  } else {
    console.log(`\n✅ File: ${file} - Optimized!`);
  }
});

console.log('\n✨ Optimization check complete.');
