# AI Wallet Assistant - Frontend UI Refinement Guide

## 🎨 Design System

### Color Palette

#### Primary Colors
- **Blue 600**: `#2563eb` - Primary actions, highlights
- **Purple 600**: `#9333ea` - Accents, secondary highlights
- **Gradient**: Blue → Purple for branding

#### Status Colors
- **Green 600**: `#16a34a` - Success, LOW risk
- **Yellow 600**: `#ca8a04` - Warning, MEDIUM risk
- **Red 600**: `#dc2626` - Danger, HIGH risk
- **Gray**: Various shades for neutral elements

#### Dark Mode
- **Background**: `#111827` (gray-950)
- **Surface**: `#1f2937` (gray-800)
- **Border**: `#374151` (gray-700)
- **Text**: `#f3f4f6` (gray-100)

### Typography

```
Headings:
- H1: 36px, Bold, Letter-spacing -0.02em
- H2: 24px, Bold
- H3: 20px, Semibold
- H4: 16px, Semibold

Body:
- Large: 16px, Regular
- Regular: 14px, Regular
- Small: 12px, Regular
- Tiny: 11px, Regular

Mono (code):
- 12px, Consolas/Monaco/Courier New
```

### Spacing Scale

```
0, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
```

### Border Radius

```
sm: 4px    (small components)
md: 8px    (cards, buttons)
lg: 12px   (modals, large cards)
xl: 16px   (major sections)
full: 9999px (pills, badges)
```

---

## 📱 Page Components

### 1. **Home Page** (`/`)
Features:
- Hero section with value proposition
- Feature showcase cards
- Call-to-action buttons
- Testimonials carousel
- FAQ section
- Newsletter signup

### 2. **Transaction Analyzer** (`/analyze`)
Features:
- JSON input textarea with syntax highlighting
- Real-time validation
- Sample transaction templates
- Risk indicator with gauge chart
- Flag details with severity badges
- Recommendation list
- Export analysis button
- Save to history option

### 3. **History Page** (`/history`)
Features:
- Filterable transaction table
- Date range picker
- Risk level filter
- Search functionality
- Pagination
- Delete/archive buttons
- Export to CSV/JSON/PDF
- Statistics summary

### 4. **Chat Interface** (`/chat`)
Features:
- Conversation history display
- Auto-scroll to latest message
- Suggested question cards
- Message timestamps
- Source links in responses
- Typing indicators
- Dark mode support

### 5. **Learn Hub** (`/learn`)
Features:
- Interactive tutorials
- Glossary with search
- Video embedding
- Progress tracking
- Quiz mode
- Bookmarks/favorites
- Mobile-responsive layout

### 6. **Dashboard** (`/dashboard`)
Features:
- User profile section
- Statistics cards
- Charts and graphs
- Recent activity timeline
- Settings quick links
- Usage metrics

---

## 🧩 Component Specifications

### TransactionAnalyzer Component

**Props:**
```typescript
interface TransactionAnalyzerProps {
  onAnalyze?: (result: AnalysisResult) => void;
  defaultData?: TransactionData;
  darkMode?: boolean;
}
```

**Features:**
- ✅ JSON input with validation
- ✅ Real-time error messages
- ✅ Sample transaction templates
- ✅ Risk visualization (gauge)
- ✅ Flag/recommendation display
- ✅ Copy to clipboard buttons
- ✅ Export analysis
- ✅ Save to history

### ChatInterface Component

**Props:**
```typescript
interface ChatInterfaceProps {
  onMessageSent?: (message: string) => void;
  transactionContext?: TransactionData;
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
  language?: string;
}
```

**Features:**
- ✅ Real-time messaging
- ✅ Suggested questions
- ✅ Source attribution
- ✅ Typing indicators
- ✅ Message history
- ✅ Dark mode support

### RiskIndicator Component

**Props:**
```typescript
interface RiskIndicatorProps {
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  score: number; // 0-100
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

**Variants:**
- Circular gauge with percentage
- Linear progress bar
- Badge variant
- Full card with details

---

## 🎬 Animations & Transitions

### Standard Transitions
```css
/* Default transition */
transition: all 0.2s ease-in-out;

/* Quick transitions (hover effects) */
transition: background-color 0.15s ease-out;

/* Slower transitions (page changes) */
transition: opacity 0.3s ease-in-out;
```

### Keyframe Animations

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Slide Up:**
```css
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Pulse:**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 📐 Responsive Breakpoints

```typescript
Mobile:   0px to 640px   (sm)
Tablet:   640px to 1024px (md)
Desktop:  1024px to 1280px (lg)
Wide:     1280px+ (xl)
```

### Mobile-First Grid

```typescript
// Single column on mobile, multi-column on desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
```

---

## 🔐 Accessibility Features

### WCAG 2.1 AA Compliance

- ✅ Semantic HTML (`<button>`, `<nav>`, `<main>`)
- ✅ ARIA labels for icon buttons
- ✅ Color contrast ratios ≥ 4.5:1
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus indicators visible
- ✅ Alt text for images
- ✅ Form labels with descriptions
- ✅ Error messages linked to inputs
- ✅ Skip to content link
- ✅ Reduced motion support

### Keyboard Navigation

```
Tab         → Next interactive element
Shift+Tab   → Previous interactive element
Enter/Space → Activate button
Escape      → Close modal/menu
Arrow Keys  → Navigate menu items
```

---

## 🌓 Dark Mode Implementation

### System Preference Detection

```typescript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

### Manual Toggle Storage

```typescript
localStorage.setItem('theme', 'dark'); // or 'light'
```

### CSS Approach

```css
/* Light mode (default) */
.bg-white { background: white; }

/* Dark mode */
.dark .bg-white { background: #1f2937; }
```

### Class Toggling

```typescript
document.documentElement.classList.toggle('dark', isDarkMode);
```

---

## 📊 Data Visualization

### Risk Score Chart

- **Gauge Chart**: 0-100 arc with color zones
  - 0-30: Green (LOW)
  - 31-70: Yellow (MEDIUM)
  - 71-100: Red (HIGH)

### History Chart

- **Line Chart**: Risk score trends over time
- **Bar Chart**: Transaction count by day
- **Pie Chart**: Risk distribution

### Performance Chart

- **Web Vitals**: LCP, FID, CLS
- **Response Times**: API latency
- **Cache Hit Rate**: Cache effectiveness

---

## 🎯 Form Components

### Input Fields

**Features:**
- Error state styling
- Success state styling
- Help text below input
- Character count (if max length)
- Placeholder text
- Disabled state
- Focus ring (blue-500)

### Select/Dropdown

**Features:**
- Multi-select support
- Searchable options
- Grouped options
- Custom rendering
- Accessible focus management

### Textarea

**Features:**
- Auto-expand height
- Character counter
- Validation indicators
- Placeholder
- Copy button

### Checkbox/Radio

**Features:**
- Styled custom controls
- Label clickable
- Mixed state support
- Grouped options
- Aria labels

---

## 🔔 Notification System

### Toast Notifications

```typescript
// Position: top-right, top-left, bottom-right, bottom-left
toast.success('Transaction analyzed!', { duration: 3000 });
toast.error('Analysis failed', { duration: 5000 });
toast.info('New update available', { action: 'Refresh' });
```

### Banner Alerts

- Page-level notifications
- Dismissible
- Action buttons
- Icon and color coding

### Modal Dialogs

- Centered overlay
- Title and description
- Action buttons
- Close button
- Backdrop click to close

---

## 🚀 Performance Optimizations

### Code Splitting

```typescript
// Lazy load heavy components
const ChatInterface = dynamic(() => import('./ChatInterface'), {
  loading: () => <LoadingSpinner />,
});
```

### Image Optimization

```typescript
// Next.js Image component
<Image
  src="/logo.png"
  width={100}
  height={100}
  alt="Logo"
  priority // For LCP images
/>
```

### CSS Optimization

- Tailwind CSS for minimal CSS
- Tree shaking unused styles
- CSS-in-JS for dynamic styles
- Critical CSS inlined

---

## 📦 Component Organization

```
components/
├── layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   └── PageLayout.tsx
├── analysis/
│   ├── TransactionAnalyzer.tsx
│   ├── RiskIndicator.tsx
│   ├── FlagsList.tsx
│   └── RecommendationCard.tsx
├── chat/
│   ├── ChatInterface.tsx
│   ├── MessageBubble.tsx
│   └── SuggestedQuestions.tsx
├── common/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Alert.tsx
│   ├── Badge.tsx
│   ├── Modal.tsx
│   └── Tooltip.tsx
├── forms/
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Checkbox.tsx
│   └── Form.tsx
└── charts/
    ├── RiskGauge.tsx
    ├── LineChart.tsx
    └── BarChart.tsx
```

---

## 🧪 Frontend Testing

### Component Testing

```typescript
// Using React Testing Library
import { render, screen } from '@testing-library/react';

test('renders transaction analyzer', () => {
  render(<TransactionAnalyzer />);
  expect(screen.getByText('Transaction Data')).toBeInTheDocument();
});
```

### User Interaction Testing

```typescript
// Simulate user input
fireEvent.change(input, { target: { value: '{...}' } });
fireEvent.click(analyzeButton);
```

### Snapshot Testing

```typescript
// Capture component output
expect(container).toMatchSnapshot();
```

---

## 🎬 User Experience Flow

### Transaction Analysis Flow

1. **Input** → User pastes transaction data
2. **Validation** → Client-side JSON validation
3. **Loading** → Show spinner while API processes
4. **Results** → Display risk level, flags, recommendations
5. **Actions** → Save, export, chat about it

### Chat Flow

1. **Suggestions** → Show common questions if no history
2. **Input** → User types question
3. **Thinking** → Show typing indicator
4. **Response** → Display AI answer with sources
5. **Follow-up** → Offer related questions

---

## 📈 Metrics & Analytics

### Tracked Events

- **Transaction Analyzed** – Parameters: risk_level, score
- **Question Asked** – Parameters: category, topic
- **Feature Used** – Parameters: feature_name, duration
- **Error Occurred** – Parameters: error_type, message
- **Page Visited** – Parameters: page_name, referrer

### Performance Metrics

- **FCP** (First Contentful Paint): Target < 1.5s
- **LCP** (Largest Contentful Paint): Target < 2.5s
- **CLS** (Cumulative Layout Shift): Target < 0.1
- **API Response**: Target < 500ms
- **Component Load**: Target < 200ms

---

## 🔒 Security Features

- ✅ Content Security Policy headers
- ✅ XSS protection (no innerHTML)
- ✅ CSRF token for forms
- ✅ Secure cookie flags
- ✅ API call validation
- ✅ Input sanitization
- ✅ No private keys in frontend

---

## 📝 Component Storybook

Create stories for component library:

```typescript
// Button.stories.tsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = () => <Button variant="primary">Click me</Button>;
export const Loading = () => <Button isLoading>Loading</Button>;
```

---

## ✅ UI Checklist

- [ ] Responsive on all screen sizes
- [ ] Dark mode working
- [ ] Keyboard navigation working
- [ ] WCAG AA compliance verified
- [ ] Touch-friendly (min 44px tap targets)
- [ ] Loading states implemented
- [ ] Error states clear
- [ ] Success feedback provided
- [ ] Animations smooth (60fps)
- [ ] Bundle size optimized
- [ ] Components tested
- [ ] Documentation complete

---

**Last Updated:** January 18, 2024  
**Version:** 2.0.0-frontend
