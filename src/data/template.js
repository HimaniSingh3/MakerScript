export const categories = [
  'All',
  'Automation',
  'Creative',
  'Productivity',
  'Game',
  'Data',
  'Web'
];

export const scriptTemplates = [
  {
    id: 'quick-automation',
    title: 'Quick Automation Bot',
    category: 'Automation',
    difficulty: 'Beginner',
    duration: '10 min',
    accent: 'amber',
    description: 'Create a browser-friendly task runner for repeated everyday actions.',
    features: ['Task queue', 'Progress logs', 'Safe error handling'],
    starter: `const tasks = [
  'Collect inputs',
  'Validate data',
  'Generate output'
];

tasks.forEach((task, index) => {
  console.log(\`Step ${index + 1}: ${task}\`);
});`
  },
  {
    id: 'idea-mixer',
    title: 'Idea Mixer Studio',
    category: 'Creative',
    difficulty: 'Beginner',
    duration: '8 min',
    accent: 'pink',
    description: 'Blend words, moods, and themes into fresh project ideas.',
    features: ['Random prompts', 'Creative combinations', 'Exportable output'],
    starter: `const moods = ['bold', 'calm', 'futuristic'];
const tools = ['dashboard', 'planner', 'studio'];

const pick = (items) => items[Math.floor(Math.random() * items.length)];
console.log(\`Build a ${pick(moods)} ${pick(tools)}.\`);`
  },
  {
    id: 'focus-board',
    title: 'Focus Board',
    category: 'Productivity',
    difficulty: 'Intermediate',
    duration: '15 min',
    accent: 'blue',
    description: 'Generate a small Kanban-style workflow script for planning tasks.',
    features: ['Task cards', 'Priorities', 'Local persistence'],
    starter: `const board = {
  todo: ['Sketch layout'],
  doing: ['Write JavaScript'],
  done: ['Choose colors']
};

console.table(board);`
  },
  {
    id: 'mini-game-kit',
    title: 'Mini Game Kit',
    category: 'Game',
    difficulty: 'Intermediate',
    duration: '20 min',
    accent: 'green',
    description: 'Start a simple score-based game loop with clean state updates.',
    features: ['Game state', 'Scoring', 'Replay logic'],
    starter: `let score = 0;
let lives = 3;

function collectGem() {
  score += 10;
  console.log(\`Score: ${score}\`);
}

collectGem();`
  },
  {
    id: 'data-cleaner',
    title: 'Data Cleaner',
    category: 'Data',
    difficulty: 'Intermediate',
    duration: '18 min',
    accent: 'purple',
    description: 'Transform messy arrays into clean, sorted, useful data.',
    features: ['Filtering', 'Mapping', 'Summary stats'],
    starter: `const rawScores = [91, null, 72, undefined, 88, 100];
const cleanScores = rawScores.filter(Number.isFinite);
const average = cleanScores.reduce((sum, item) => sum + item, 0) / cleanScores.length;

console.log({ cleanScores, average });`
  },
  {
    id: 'web-widget',
    title: 'Web Widget Builder',
    category: 'Web',
    difficulty: 'Advanced',
    duration: '25 min',
    accent: 'cyan',
    description: 'Create a reusable widget pattern for browser interfaces.',
    features: ['DOM rendering', 'State update', 'Reusable functions'],
    starter: `function createBadge(label, value) {
  const badge = document.createElement('span');
  badge.textContent = \`${label}: ${value}\`;
  badge.className = 'badge';
  return badge;
}

document.body.append(createBadge('MakerScript', 'Ready'));`
  }
];

export const featureOptions = [
  'Responsive UI helpers',
  'Local storage support',
  'Copy to clipboard',
  'Download generated file',
  'Input validation',
  'Keyboard shortcuts',
  'Animated feedback',
  'Search and filters'
];

export const projectTypes = [
  'Automation Script',
  'Creative Tool',
  'Productivity App',
  'Mini Game',
  'Data Utility',
  'Web Widget'
];
