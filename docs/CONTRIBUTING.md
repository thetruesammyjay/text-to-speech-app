# Contributing to Text-to-Speech App

Thank you for your interest in contributing to the Text-to-Speech App! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Community](#community)

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socioeconomic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at [your-email@example.com]. All complaints will be reviewed and investigated promptly and fairly.

## Getting Started

### Prerequisites

Before you begin contributing, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- A **GitHub account**
- Basic knowledge of **React** and **JavaScript**

### First Time Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/thetruesammyjay/text-to-speech-app.git
   cd text-to-speech-app
   ```

3. **Add the original repository as upstream:**
   ```bash
   git remote add upstream https://github.com/thetruesammyjay/text-to-speech-app.git
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Create a `.env` file:**
   ```bash
   cp .env.example .env
   ```

6. **Start the development server:**
   ```bash
   npm start
   ```

## Development Setup

### Branch Strategy

- **`main`**: Production-ready code
- **`develop`**: Integration branch for features
- **`feature/*`**: New features
- **`bugfix/*`**: Bug fixes
- **`hotfix/*`**: Critical fixes for production

### Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test them thoroughly

3. **Commit your changes** with descriptive messages:
   ```bash
   git commit -m "feat: add speech rate control slider"
   ```

4. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

#### 🐛 Bug Reports
- Use the bug report template
- Include steps to reproduce
- Provide system information
- Add screenshots if applicable

#### ✨ Feature Requests
- Use the feature request template
- Explain the problem you're solving
- Describe your proposed solution
- Consider alternative solutions

#### 📝 Documentation
- Fix typos and grammar
- Improve existing documentation
- Add missing documentation
- Create tutorials and examples

#### 🔧 Code Contributions
- Bug fixes
- New features
- Performance improvements
- Code refactoring
- Test improvements

### Good First Issues

Look for issues labeled with:
- `good first issue`: Perfect for newcomers
- `help wanted`: Community help needed
- `documentation`: Documentation improvements
- `bug`: Bug fixes needed

## Pull Request Process

### Before Submitting

1. **Check existing issues** and PRs to avoid duplicates
2. **Test your changes** thoroughly
3. **Run the test suite**: `npm test`
4. **Run linting**: `npm run lint`
5. **Format your code**: `npm run format`
6. **Update documentation** if needed

### PR Requirements

Your pull request must:

- ✅ **Pass all tests** and linting checks
- ✅ **Include appropriate tests** for new features
- ✅ **Follow coding standards** (see below)
- ✅ **Have a clear description** of changes
- ✅ **Reference related issues** (e.g., "Fixes #123")
- ✅ **Be focused** (one feature/fix per PR)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### Review Process

1. **Automated checks** run on all PRs
2. **Maintainer review** within 48 hours
3. **Address feedback** promptly
4. **Approval** from at least one maintainer
5. **Merge** by maintainers

## Coding Standards

### JavaScript/React Guidelines

#### Code Style
- Use **ES6+** features
- Prefer **functional components** with hooks
- Use **arrow functions** for callbacks
- Employ **destructuring** where appropriate
- Follow **camelCase** naming convention

#### Component Structure
```javascript
// Good component structure
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependency]);

  const handleEvent = (event) => {
    // Event handling
  };

  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};

ComponentName.defaultProps = {
  prop2: 0
};

export default ComponentName;
```

#### Hooks Guidelines
- Use **custom hooks** for reusable logic
- Keep hooks **focused** and **single-purpose**
- Follow **rules of hooks** (only call at top level)
- Use **useCallback** and **useMemo** for optimization

### CSS Guidelines

#### Methodology
- Use **BEM** methodology for class names
- Implement **CSS variables** for theming
- Follow **mobile-first** responsive design
- Ensure **accessibility** standards

#### Example
```css
/* Block */
.speech-controls {
  display: flex;
  gap: var(--spacing-md);
}

/* Element */
.speech-controls__button {
  padding: var(--spacing-sm);
  border: none;
  border-radius: var(--border-radius);
}

/* Modifier */
.speech-controls__button--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}
```

### File Naming

- **Components**: PascalCase (`SpeechControls.jsx`)
- **Hooks**: camelCase with "use" prefix (`useSpeechSynthesis.js`)
- **Utilities**: camelCase (`speechUtils.js`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.js`)
- **Styles**: Match component name (`SpeechControls.css`)

### Comments and Documentation

```javascript
/**
 * Synthesizes speech from text using Web Speech API
 * @param {string} text - The text to be spoken
 * @param {Object} options - Speech synthesis options
 * @param {number} options.rate - Speech rate (0.1-10)
 * @param {number} options.pitch - Speech pitch (0-2)
 * @param {SpeechSynthesisVoice} options.voice - Voice to use
 * @returns {Promise<void>} Promise that resolves when speech starts
 */
const speak = async (text, options = {}) => {
  // Implementation
};
```

## Testing Guidelines

### Testing Philosophy
- Write tests **before** or **alongside** code
- Aim for **high coverage** but focus on **critical paths**
- Test **behavior**, not implementation details
- Use **descriptive test names**

### Test Structure
```javascript
// Component testing example
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpeechControls from './SpeechControls';

describe('SpeechControls', () => {
  const mockProps = {
    onSpeak: jest.fn(),
    onPause: jest.fn(),
    onStop: jest.fn(),
    isPlaying: false,
    isPaused: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render play button when not playing', () => {
    render(<SpeechControls {...mockProps} />);
    
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('should call onSpeak when play button is clicked', async () => {
    const user = userEvent.setup();
    render(<SpeechControls {...mockProps} />);
    
    const playButton = screen.getByRole('button', { name: /play/i });
    await user.click(playButton);
    
    expect(mockProps.onSpeak).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Categories

#### Unit Tests
- Test individual **functions** and **components**
- Mock external dependencies
- Focus on **edge cases** and **error conditions**

#### Integration Tests
- Test **component interactions**
- Test **hook combinations**
- Test **service integrations**

#### End-to-End Tests (Optional)
- Test **complete user workflows**
- Test **critical user paths**
- Use tools like **Cypress** or **Playwright**

### Test Coverage

Maintain minimum coverage thresholds:
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

Run coverage report:
```bash
npm run test:coverage
```

## Documentation

### Code Documentation
- Use **JSDoc** for function documentation
- Include **parameter types** and **return values**
- Document **complex logic** with inline comments
- Keep comments **up-to-date** with code changes

### README Updates
- Update **installation** instructions if needed
- Add **usage examples** for new features
- Document **breaking changes**
- Update **feature list**

### API Documentation
- Document **new services** and **methods**
- Include **usage examples**
- Document **error handling**
- Update **API.md** file

## Issue Reporting

### Bug Reports

Use the bug report template and include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, app version
6. **Screenshots**: If applicable
7. **Additional Context**: Any other relevant information

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- Browser: [e.g., Chrome 91]
- OS: [e.g., Windows 10]
- App Version: [e.g., 1.0.0]

**Screenshots**
If applicable, add screenshots.

**Additional Context**
Any other context about the problem.
```

## Feature Requests

### Guidelines
- **Search existing** feature requests first
- **Describe the problem** you're trying to solve
- **Explain your solution** in detail
- **Consider alternatives** and trade-offs
- **Provide examples** or mockups if helpful

### Feature Request Template
```markdown
**Problem Description**
What problem does this feature solve?

**Proposed Solution**
Describe your proposed solution.

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Screenshots, mockups, or examples.
```

## Community

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General discussions and questions
- **Pull Requests**: Code contributions and reviews

### Getting Help
- Check the **README** and **documentation** first
- Search **existing issues** and discussions
- Ask questions in **GitHub Discussions**
- Be **patient** and **respectful** in communications

### Recognition
Contributors are recognized through:
- **GitHub contributor** statistics
- **Release notes** mentions
- **Community highlights**

## Development Tips

### Useful Commands
```bash
# Development
npm start                    # Start development server
npm test                     # Run tests
npm run test:watch          # Run tests in watch mode
npm run build               # Build for production

# Code Quality
npm run lint                # Run ESLint
npm run lint:fix           # Fix linting issues
npm run format             # Format code with Prettier
npm run type-check         # Run TypeScript checks

# Testing
npm run test:coverage      # Run tests with coverage
npm run test:ci           # Run tests in CI mode

# Deployment
npm run deploy            # Deploy to GitHub Pages
npm run deploy:vercel     # Deploy to Vercel
```

### IDE Setup

#### VS Code Extensions
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

#### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

### Debugging
- Use **React Developer Tools** browser extension
- Enable **source maps** in development
- Use **console.log** sparingly; prefer **debugger** statements
- Test in **multiple browsers**

## Release Process

### Versioning
We follow **Semantic Versioning** (semver):
- **MAJOR**: Incompatible API changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps
1. **Update version** in `package.json`
2. **Update CHANGELOG.md**
3. **Create release tag**
4. **Deploy to production**
5. **Announce release**

## Legal

### Licensing
By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

### Copyright
- Contributors retain copyright of their contributions
- Code is licensed to the project under MIT License
- All contributions must be your own work or properly attributed

---

## Thank You! 🙏

Your contributions make this project better for everyone. Whether you're fixing bugs, adding features, improving documentation, or helping others, every contribution matters.

**Happy coding!** 🚀

---

*This contributing guide is a living document. Feel free to suggest improvements!*