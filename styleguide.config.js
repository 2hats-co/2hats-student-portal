const packageJson = require('./package.json');
const BASE_FONT_SIZE = 16;

const makeFontSizes = input => {
  const output = {};
  for (let style in input) output[style] = input[style] * BASE_FONT_SIZE;
  return output;
};

module.exports = {
  title: '2hats Student Portal Docs',
  version: packageJson.version,
  sections: [
    {
      name: 'Introduction',
      content: 'docs/intro.md',
    },
    {
      name: 'App root',
      components: [
        'src/App.js',
        'src/components/routing/**/*.js',
        'src/contexts/HistoryContext.js',
        'src/components/TagTracker.js',
        'src/components/ErrorBoundary.js',
        'src/components/LoadingScreen.js',
      ],
    },
    {
      name: 'Auth',
      sections: [
        {
          name: 'Auth root',
          components: [
            'src/containers/AuthenticationContainer.js',
            'src/containers/SpeedySignupContainer.js',
            'src/components/LogoInCard.js',
            'src/components/SnackBar.js',
            'src/components/StyledLink.js',
            'src/components/Authentication/**/*.js',
          ],
          ignore: ['src/components/Authentication/**/*View.js'],
        },
        {
          name: 'Views',
          components: ['src/components/Authentication/**/*View.js'],
        },
        {
          name: 'Input helpers',
          components: ['src/components/InputFields/**/*.js'],
        },
      ],
    },
    {
      name: 'SmartLinks',
      components: ['src/containers/SmartLinkContainer.js'],
    },
    {
      name: 'Navigation',
      components: [
        'src/components/Navigation/index.js',
        'src/components/Navigation/DesktopNavigation/index.js',
        'src/components/Navigation/DesktopNavigation/SidebarItem.js',
        'src/components/Navigation/DesktopNavigation/SidebarDivider.js',
        'src/components/Navigation/MobileNavigation/*.js',
        'src/components/Navigation/BackButton.js',
      ],
    },
    {
      name: 'Dashboard',
      sections: [
        {
          name: 'Dashboard root',
          components: [
            'src/containers/DashboardContainer.js',
            'src/components/ContainerHeader/**/*.js',
            'src/components/PaddedIcon.js',
          ],
        },
        {
          name: 'Milestones / Activity Log',
          components: [
            'src/components/Milestones/**/*.js',
            'src/components/ActivityLog/**/*.js',
          ],
        },
        {
          name: 'What’s Next',
          components: ['src/components/WhatsNext/**/*.js'],
        },
        {
          name: 'Announcements',
          components: ['src/components/Announcement/**/*.js'],
        },
      ],
    },
    {
      name: 'Cards',
      components: ['src/components/Cards/**/*.js'],
    },
    {
      name: 'Courses',
      components: [
        'src/containers/CoursesContainer.js',
        'src/containers/CourseRedirectContainer.js',
      ],
    },
    {
      name: 'Assessments',
      components: [
        'src/containers/AssessmentsContainer.js',
        'src/components/Assessment/**/*.js',
      ],
    },
    {
      name: 'Jobs',
      components: [
        'src/containers/JobsContainer.js',
        'src/components/Job/**/*.js',
      ],
    },
    {
      name: 'Detailed views',
      components: ['src/containers/DetailedViewContainer.js'],
    },
    {
      name: 'User profile',
      components: [
        'src/containers/ProfileContainer.js',
        'src/components/Profile/**/*.js',
      ],
    },
    {
      name: 'Scheduler',
      components: [
        'src/containers/SchedulerContainer.js',
        'src/components/Scheduler/**/*.js',
      ],
    },
  ],
  usageMode: 'expand',
  exampleMode: 'expand',
  theme: {
    fontFamily: {
      monospace: [
        'SF Mono',
        'Consolas',
        '"Liberation Mono"',
        'Menlo',
        'monospace',
      ],
    },
    color: {
      base: 'rgba(255, 255, 255, .60)',
      light: 'rgba(255, 255, 255, .38)',
      lightest: 'rgba(255, 255, 255, .38)',

      link: 'hsl(15, 88%, 70%)',
      linkHover: 'hsl(15, 88%, 90%)',
      focus: 'rgba(241, 90, 41, .25)',

      border: 'rgba(255, 255, 255, .12)',

      name: '#67cdcc',
      type: '#f8c555',
      error: '#cf6679',

      baseBackground: '#121212',
      codeBackground: '#1e1e1e',
      sidebarBackground: '#1e1e1e',
      // ribbonBackground: '#e90',
      // ribbonText: '#fff',

      codeBase: '#ccc',
      codeComment: '#999',
      codePunctuation: '#ccc',
      codeProperty: '#f8c555',
      codeDeleted: '#e2777a',
      codeString: '#7ec699',
      codeInserted: 'green',
      codeOperator: '#67cdcc',
      codeKeyword: '#cc99cd',
      codeFunction: '#f08d49',
      codeVariable: '#7ec699',
    },
    fontSize: makeFontSizes({
      h1: 2,
      h2: 1.5,
      h3: 1.25,
      h4: 1,
      h5: 0.875,
      h6: 0.85,
    }),
    borderRadius: 4,
  },
  styles: {
    StyleGuide: {
      '@global body': {
        backgroundColor: '#121212',
      },
    },
    SectionHeading: {
      wrapper: {
        marginBottom: 16,
        borderBottom: `1px solid rgba(255, 255, 255, .12)`,
        alignItems: 'flex-end',
      },
      toolbar: {
        marginBottom: 16,
      },
    },
    Heading: {
      heading: {
        fontWeight: 600,
        marginTop: 24,
        marginBottom: 16,
        color: 'rgba(255, 255, 255, .87)',
      },
    },
    Logo: {
      logo: { fontWeight: 600 },
    },
    ReactComponent: {
      tabButtons: { marginBottom: 16 },
    },
    Text: {
      strong: { color: 'rgba(255, 255, 255, .87)' },
    },
    Code: {
      code: {
        fontSize: '85%',
        backgroundColor: 'rgba(255, 255, 255, .067)',
        borderRadius: 3,
        margin: 0,
        padding: '.2em .4em',
        cursor: 'inherit',
      },
    },
  },
};
