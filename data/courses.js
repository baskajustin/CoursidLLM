/**
 * MockData — used while USE_MOCK=true in api.js
 * Replace with real API data by setting USE_MOCK=false
 * and configuring API_BASE_URL + API_KEY.
 */
const MockData = {

  CATEGORIES: [
    { id: 'web-dev',     label: 'Web Development',    icon: '💻', count: 1284 },
    { id: 'data-sci',    label: 'Data Science',        icon: '📊', count: 847  },
    { id: 'ai-ml',       label: 'AI & Machine Learning',icon: '🤖', count: 632 },
    { id: 'design',      label: 'UI/UX Design',        icon: '🎨', count: 521  },
    { id: 'business',    label: 'Business',            icon: '📈', count: 743  },
    { id: 'marketing',   label: 'Digital Marketing',   icon: '📣', count: 418  },
    { id: 'mobile',      label: 'Mobile Development',  icon: '📱', count: 392  },
    { id: 'devops',      label: 'DevOps & Cloud',      icon: '☁️', count: 287  },
    { id: 'cybersec',    label: 'Cybersecurity',       icon: '🔒', count: 214  },
    { id: 'photography', label: 'Photography',         icon: '📷', count: 176  },
  ],

  COURSES: [
    {
      id: 'c001',
      slug: 'complete-web-development-2024',
      title: 'The Complete Web Development Bootcamp 2024',
      subtitle: 'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps',
      description: `This is the most comprehensive and popular web development course on the platform. Whether you want to freelance as a web developer, get hired at a tech company, or just build your own web apps, this course is for you.

We'll start from the very basics of HTML, CSS, and JavaScript and work our way up to advanced concepts like React, Node.js, databases, and deployment.`,
      instructor: {
        id: 'inst001',
        name: 'Angela Yu',
        title: 'Lead Developer & Instructor',
        bio: 'Dr. Angela Yu is a developer and lead instructor at the London App Brewery. She has taught over 2 million students worldwide.',
        avatar: '',
        rating: 4.8,
        studentsCount: 1840000,
        coursesCount: 6,
      },
      category: 'web-dev',
      subcategory: 'Full-Stack',
      tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'MongoDB'],
      price: 19.99,
      originalPrice: 84.99,
      currency: 'USD',
      thumbnail: '',
      previewVideoUrl: '',
      rating: 4.8,
      ratingsCount: 342891,
      studentsCount: 1840000,
      lastUpdated: 'December 2024',
      language: 'English',
      level: 'beginner',
      bestseller: true,
      includes: {
        videoHours: 62,
        articles: 54,
        resources: 38,
        mobileAccess: true,
        lifetimeAccess: true,
        captions: true,
        certificate: true,
      },
      learningOutcomes: [
        'Build 16 web development projects for your portfolio',
        'Learn the latest technologies including Javascript ES6, Bootstrap 4, MongoDB',
        'After the course you will be able to build ANY website you want',
        'Work as a freelance web developer',
        'Master frontend development with React',
        'Master backend development with Node',
        'Learn professional developer best practices',
        'Create a blog, todo app, REST API, authentication system',
        'Deploy your web applications to the cloud',
        'Build full-stack web applications using the MERN stack',
        'Build web3 decentralised apps (DApps) on the Ethereum blockchain',
        'Use Web Design principles to create beautiful websites',
      ],
      requirements: [
        'No programming experience needed - I\'ll teach you everything you need to know',
        'A computer with access to the internet',
        'No paid software required - I\'ll teach you how to use free tools',
        'I\'ll walk you through, step-by-step how to get all the software installed and set up',
      ],
      targetAudience: [
        'If you want to learn to code through building fun and useful projects, this course is for you',
        'If you are a complete beginner with no programming experience, start here',
        'If you\'re an experienced programmer who wants to learn web development',
      ],
      sections: [
        {
          id: 's001', title: 'Introduction to Web Development', duration: '1h 10m', lectureCount: 5,
          lectures: [
            { id: 'l001', title: 'Introduction', duration: '4:32', type: 'video', isPreview: true },
            { id: 'l002', title: 'What is Web Development?', duration: '6:18', type: 'video', isPreview: true },
            { id: 'l003', title: 'How the Internet Works', duration: '12:04', type: 'video', isPreview: false },
            { id: 'l004', title: 'Setting Up Your Development Environment', duration: '18:47', type: 'video', isPreview: false },
            { id: 'l005', title: 'Course Resources', duration: '', type: 'article', isPreview: true },
          ]
        },
        {
          id: 's002', title: 'HTML — HyperText Markup Language', duration: '3h 22m', lectureCount: 12,
          lectures: [
            { id: 'l006', title: 'Introduction to HTML', duration: '8:14', type: 'video', isPreview: false },
            { id: 'l007', title: 'HTML Tags', duration: '14:36', type: 'video', isPreview: false },
            { id: 'l008', title: 'HTML Boilerplate', duration: '10:22', type: 'video', isPreview: false },
            { id: 'l009', title: 'Lists and Nesting', duration: '16:48', type: 'video', isPreview: false },
            { id: 'l010', title: 'Anchor Tags and Images', duration: '20:14', type: 'video', isPreview: false },
            { id: 'l011', title: 'HTML Forms', duration: '24:02', type: 'video', isPreview: false },
            { id: 'l012', title: 'HTML Tables', duration: '18:30', type: 'video', isPreview: false },
            { id: 'l013', title: 'HTML Project — Personal Website', duration: '28:44', type: 'video', isPreview: false },
          ]
        },
        {
          id: 's003', title: 'CSS — Cascading Style Sheets', duration: '4h 15m', lectureCount: 16,
          lectures: [
            { id: 'l020', title: 'Introduction to CSS', duration: '9:18', type: 'video', isPreview: false },
            { id: 'l021', title: 'CSS Selectors', duration: '16:42', type: 'video', isPreview: false },
            { id: 'l022', title: 'Box Model', duration: '22:14', type: 'video', isPreview: false },
            { id: 'l023', title: 'CSS Flexbox', duration: '34:52', type: 'video', isPreview: false },
            { id: 'l024', title: 'CSS Grid', duration: '38:16', type: 'video', isPreview: false },
            { id: 'l025', title: 'Responsive Design', duration: '28:44', type: 'video', isPreview: false },
            { id: 'l026', title: 'CSS Animations', duration: '20:08', type: 'video', isPreview: false },
          ]
        },
        {
          id: 's004', title: 'JavaScript — The Language of the Web', duration: '8h 48m', lectureCount: 28,
          lectures: [
            { id: 'l030', title: 'Introduction to JavaScript', duration: '11:24', type: 'video', isPreview: false },
            { id: 'l031', title: 'Variables and Data Types', duration: '18:36', type: 'video', isPreview: false },
            { id: 'l032', title: 'Functions', duration: '22:14', type: 'video', isPreview: false },
            { id: 'l033', title: 'Arrays and Objects', duration: '28:48', type: 'video', isPreview: false },
            { id: 'l034', title: 'DOM Manipulation', duration: '34:22', type: 'video', isPreview: false },
            { id: 'l035', title: 'Events', duration: '26:10', type: 'video', isPreview: false },
            { id: 'l036', title: 'ES6 Features', duration: '42:18', type: 'video', isPreview: false },
            { id: 'l037', title: 'Promises & Async/Await', duration: '36:44', type: 'video', isPreview: false },
          ]
        },
        {
          id: 's005', title: 'React — Frontend Framework', duration: '6h 30m', lectureCount: 22,
          lectures: [
            { id: 'l040', title: 'Introduction to React', duration: '14:28', type: 'video', isPreview: false },
            { id: 'l041', title: 'Components and Props', duration: '24:16', type: 'video', isPreview: false },
            { id: 'l042', title: 'State and Hooks', duration: '38:44', type: 'video', isPreview: false },
            { id: 'l043', title: 'React Router', duration: '28:32', type: 'video', isPreview: false },
            { id: 'l044', title: 'Context API', duration: '32:18', type: 'video', isPreview: false },
          ]
        },
        {
          id: 's006', title: 'Node.js & Express — Backend', duration: '5h 20m', lectureCount: 18,
          lectures: [
            { id: 'l050', title: 'Introduction to Node.js', duration: '16:42', type: 'video', isPreview: false },
            { id: 'l051', title: 'Express.js Framework', duration: '28:18', type: 'video', isPreview: false },
            { id: 'l052', title: 'REST APIs', duration: '34:24', type: 'video', isPreview: false },
            { id: 'l053', title: 'Authentication with JWT', duration: '42:16', type: 'video', isPreview: false },
          ]
        },
        {
          id: 's007', title: 'MongoDB & Databases', duration: '3h 44m', lectureCount: 14,
          lectures: [
            { id: 'l060', title: 'Introduction to Databases', duration: '12:18', type: 'video', isPreview: false },
            { id: 'l061', title: 'MongoDB CRUD Operations', duration: '28:44', type: 'video', isPreview: false },
            { id: 'l062', title: 'Mongoose ODM', duration: '36:22', type: 'video', isPreview: false },
          ]
        },
        {
          id: 's008', title: 'Deployment & Production', duration: '2h 10m', lectureCount: 8,
          lectures: [
            { id: 'l070', title: 'Deploying to Heroku', duration: '18:44', type: 'video', isPreview: false },
            { id: 'l071', title: 'Setting Up a Custom Domain', duration: '14:22', type: 'video', isPreview: false },
            { id: 'l072', title: 'SSL and HTTPS', duration: '12:08', type: 'video', isPreview: false },
          ]
        },
      ],
    },

    {
      id: 'c002',
      slug: 'python-bootcamp',
      title: 'Complete Python Bootcamp From Zero to Hero',
      subtitle: 'Learn Python like a Professional. Start from the basics and go all the way to creating your own applications and games.',
      description: 'This is the most comprehensive, yet straight-forward, course for the Python programming language on the platform!',
      instructor: { id: 'inst002', name: 'Jose Portilla', title: 'Data Science Instructor', bio: 'Jose Portilla has been working with Python for years, using it for data science and automation projects.', avatar: '', rating: 4.7, studentsCount: 1200000, coursesCount: 12 },
      category: 'web-dev',
      tags: ['Python', 'Programming', 'Machine Learning', 'Automation'],
      price: 16.99, originalPrice: 74.99, currency: 'USD', thumbnail: '',
      rating: 4.7, ratingsCount: 487213, studentsCount: 1200000,
      lastUpdated: 'November 2024', language: 'English', level: 'beginner', bestseller: true,
      includes: { videoHours: 22, articles: 20, resources: 15, mobileAccess: true, lifetimeAccess: true, captions: true, certificate: true },
      learningOutcomes: [
        'You will learn how to leverage the power of Python to solve tasks',
        'You will build games and programs that use Python libraries',
        'You will be able to use Python for your own work problems or personal projects',
        'You will create a portfolio of Python based projects you can share',
        'Learn to use Python professionally, learning both Python 2 and Python 3',
        'Understand how to use Jupyter Notebooks for your data analysis',
        'Build a complete understanding of Python from the ground up',
      ],
      requirements: ['Access to a computer with an internet connection', 'No previous programming experience needed'],
      targetAudience: ['Beginners who have never programmed before', 'Programmers switching to Python', 'Data scientists and analysts'],
      sections: [
        { id: 's101', title: 'Course Overview', duration: '0h 30m', lectureCount: 3,
          lectures: [
            { id: 'l101', title: 'Course Introduction', duration: '5:14', type: 'video', isPreview: true },
            { id: 'l102', title: 'Python Overview', duration: '8:42', type: 'video', isPreview: true },
            { id: 'l103', title: 'Setup and Installation', duration: '12:18', type: 'video', isPreview: false },
          ]
        },
        { id: 's102', title: 'Python Object and Data Structure Basics', duration: '4h 20m', lectureCount: 18,
          lectures: [
            { id: 'l110', title: 'Numbers', duration: '14:22', type: 'video', isPreview: false },
            { id: 'l111', title: 'Strings', duration: '22:44', type: 'video', isPreview: false },
            { id: 'l112', title: 'Lists', duration: '28:16', type: 'video', isPreview: false },
            { id: 'l113', title: 'Dictionaries', duration: '18:32', type: 'video', isPreview: false },
            { id: 'l114', title: 'Tuples, Sets, Booleans', duration: '20:14', type: 'video', isPreview: false },
          ]
        },
        { id: 's103', title: 'Python Statements', duration: '2h 45m', lectureCount: 10,
          lectures: [
            { id: 'l120', title: 'if, elif, else Statements', duration: '18:24', type: 'video', isPreview: false },
            { id: 'l121', title: 'for Loops', duration: '22:16', type: 'video', isPreview: false },
            { id: 'l122', title: 'while Loops', duration: '16:42', type: 'video', isPreview: false },
          ]
        },
      ],
    },

    {
      id: 'c003',
      slug: 'machine-learning-az',
      title: 'Machine Learning A-Z: AI, Python & R + ChatGPT',
      subtitle: 'Learn to create Machine Learning Algorithms in Python and R. Two top-ranked Data Science instructors.',
      description: 'Interested in the field of Machine Learning? Then this course is for you! This course has been designed by two professional Data Scientists so that we can share our knowledge and help you learn complex theory.',
      instructor: { id: 'inst003', name: 'Kirill Eremenko', title: 'Data Scientist & Forex Systems Expert', bio: 'As a Data Scientist at a Big 4 consultancy, Kirill helps clients solve complex business challenges using data-driven insights.', avatar: '', rating: 4.5, studentsCount: 890000, coursesCount: 8 },
      category: 'ai-ml',
      tags: ['Machine Learning', 'Python', 'R', 'Deep Learning', 'AI'],
      price: 18.99, originalPrice: 89.99, currency: 'USD', thumbnail: '',
      rating: 4.5, ratingsCount: 175432, studentsCount: 890000,
      lastUpdated: 'October 2024', language: 'English', level: 'intermediate', bestseller: false,
      includes: { videoHours: 44, articles: 28, resources: 12, mobileAccess: true, lifetimeAccess: true, captions: true, certificate: true },
      learningOutcomes: [
        'Master Machine Learning on Python & R',
        'Make accurate predictions and powerful analysis',
        'Use Machine Learning for personal purpose',
        'Handle specific topics like Reinforcement Learning, NLP, and Deep Learning',
        'Handle advanced techniques like Dimensionality Reduction',
        'Know which Machine Learning model to choose for each type of problem',
        'Build an army of powerful Machine Learning models and know how to combine them',
      ],
      requirements: ['High school level mathematics', 'Basic programming experience (Python or R helpful)'],
      targetAudience: ['Anyone interested in Machine Learning', 'Students who have at least high school knowledge in math and who want to start learning Machine Learning'],
      sections: [
        { id: 's201', title: 'Welcome to the Course!', duration: '0h 15m', lectureCount: 2,
          lectures: [
            { id: 'l201', title: 'Welcome to Machine Learning A-Z!', duration: '2:18', type: 'video', isPreview: true },
            { id: 'l202', title: 'Applications of Machine Learning', duration: '8:44', type: 'video', isPreview: true },
          ]
        },
        { id: 's202', title: 'Data Preprocessing', duration: '1h 30m', lectureCount: 8,
          lectures: [
            { id: 'l210', title: 'Importing the Libraries', duration: '6:22', type: 'video', isPreview: false },
            { id: 'l211', title: 'Importing the Dataset', duration: '8:14', type: 'video', isPreview: false },
            { id: 'l212', title: 'Splitting the Dataset', duration: '12:44', type: 'video', isPreview: false },
            { id: 'l213', title: 'Feature Scaling', duration: '14:32', type: 'video', isPreview: false },
          ]
        },
        { id: 's203', title: 'Regression', duration: '5h 20m', lectureCount: 22,
          lectures: [
            { id: 'l220', title: 'Simple Linear Regression', duration: '22:18', type: 'video', isPreview: false },
            { id: 'l221', title: 'Multiple Linear Regression', duration: '28:44', type: 'video', isPreview: false },
            { id: 'l222', title: 'Polynomial Regression', duration: '18:32', type: 'video', isPreview: false },
            { id: 'l223', title: 'Support Vector Regression', duration: '24:16', type: 'video', isPreview: false },
            { id: 'l224', title: 'Random Forest Regression', duration: '20:44', type: 'video', isPreview: false },
          ]
        },
      ],
    },

    {
      id: 'c004',
      slug: 'ui-ux-design-bootcamp',
      title: 'UI/UX Design Bootcamp: Figma, Prototyping & Research',
      subtitle: 'Learn UI & UX Design for both web and mobile. Figma, design systems, user research, and portfolio projects.',
      description: 'Become a professional UI/UX designer from scratch. This course covers everything you need to land your first design job.',
      instructor: { id: 'inst004', name: 'Daniel Walter Scott', title: 'Adobe Certified Instructor', bio: 'Daniel is an Adobe Certified Instructor, trainer and author.', avatar: '', rating: 4.9, studentsCount: 345000, coursesCount: 4 },
      category: 'design',
      tags: ['Figma', 'UI Design', 'UX Design', 'Prototyping', 'User Research'],
      price: 0, originalPrice: 0, currency: 'USD', thumbnail: '',
      rating: 4.9, ratingsCount: 28441, studentsCount: 345000,
      lastUpdated: 'January 2025', language: 'English', level: 'beginner', bestseller: false,
      includes: { videoHours: 28, articles: 14, resources: 42, mobileAccess: true, lifetimeAccess: true, captions: true, certificate: true },
      learningOutcomes: [
        'Design professional UI/UX for websites and apps',
        'Use Figma proficiently for design and prototyping',
        'Conduct user research and usability testing',
        'Build a complete design portfolio',
        'Create design systems and component libraries',
        'Master typography, color theory, and layout',
      ],
      requirements: ['No design experience needed', 'Free Figma account (I will show you how to sign up)'],
      targetAudience: ['Beginners with no design experience', 'Developers wanting to add design skills', 'Entrepreneurs building their own products'],
      sections: [
        { id: 's301', title: 'Getting Started with UI/UX', duration: '1h 10m', lectureCount: 6,
          lectures: [
            { id: 'l301', title: 'Welcome & Course Overview', duration: '4:22', type: 'video', isPreview: true },
            { id: 'l302', title: 'What is UI? What is UX?', duration: '12:44', type: 'video', isPreview: true },
            { id: 'l303', title: 'Setting Up Figma', duration: '8:16', type: 'video', isPreview: false },
            { id: 'l304', title: 'The Design Process', duration: '16:32', type: 'video', isPreview: false },
          ]
        },
        { id: 's302', title: 'Design Fundamentals', duration: '3h 20m', lectureCount: 14,
          lectures: [
            { id: 'l310', title: 'Typography Basics', duration: '22:14', type: 'video', isPreview: false },
            { id: 'l311', title: 'Color Theory', duration: '28:36', type: 'video', isPreview: false },
            { id: 'l312', title: 'Layout and Grid Systems', duration: '24:18', type: 'video', isPreview: false },
            { id: 'l313', title: 'Visual Hierarchy', duration: '18:44', type: 'video', isPreview: false },
          ]
        },
      ],
    },

    {
      id: 'c005',
      slug: 'aws-certified-solutions-architect',
      title: 'AWS Certified Solutions Architect — Associate 2024',
      subtitle: 'Full practice exam included! Pass the AWS Certified Solutions Architect Associate SAA-C03 Exam.',
      description: 'Pass the AWS Certified Solutions Architect — Associate (SAA-C03) exam with confidence using this comprehensive prep course.',
      instructor: { id: 'inst005', name: 'Stephane Maarek', title: 'AWS Certified Solutions Architect', bio: 'Stephane is a Solutions Architect & Software Engineer with a passion for Cloud Computing.', avatar: '', rating: 4.7, studentsCount: 780000, coursesCount: 10 },
      category: 'devops',
      tags: ['AWS', 'Cloud', 'Solutions Architect', 'DevOps'],
      price: 21.99, originalPrice: 94.99, currency: 'USD', thumbnail: '',
      rating: 4.7, ratingsCount: 142876, studentsCount: 780000,
      lastUpdated: 'December 2024', language: 'English', level: 'intermediate', bestseller: true,
      includes: { videoHours: 38, articles: 10, resources: 6, mobileAccess: true, lifetimeAccess: true, captions: true, certificate: true },
      learningOutcomes: [
        'Pass the AWS Certified Solutions Architect Associate Certification',
        'Perform Real-Time Big Data Analysis with Kinesis',
        'Secure your AWS cloud environment',
        'Design high-availability, fault-tolerant architectures',
        'Use AWS services including EC2, S3, RDS, DynamoDB, Lambda',
      ],
      requirements: ['IT experience helpful but not required', 'Passion for learning cloud computing'],
      targetAudience: ['IT professionals wanting AWS certification', 'Developers looking to expand cloud skills'],
      sections: [
        { id: 's401', title: 'Introduction', duration: '0h 30m', lectureCount: 4,
          lectures: [
            { id: 'l401', title: 'Course Introduction', duration: '5:18', type: 'video', isPreview: true },
            { id: 'l402', title: 'AWS Certification Roadmap', duration: '8:44', type: 'video', isPreview: true },
            { id: 'l403', title: 'Create your AWS Account', duration: '14:22', type: 'video', isPreview: false },
          ]
        },
        { id: 's402', title: 'IAM & AWS CLI', duration: '2h 20m', lectureCount: 12,
          lectures: [
            { id: 'l410', title: 'IAM Introduction', duration: '8:14', type: 'video', isPreview: false },
            { id: 'l411', title: 'IAM Policies', duration: '14:36', type: 'video', isPreview: false },
            { id: 'l412', title: 'IAM MFA Overview', duration: '12:22', type: 'video', isPreview: false },
          ]
        },
      ],
    },

    {
      id: 'c006',
      slug: 'react-complete-guide',
      title: 'React — The Complete Guide 2024 (incl. React Router & Redux)',
      subtitle: 'Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!',
      description: 'This course will teach you React.js in a practice-oriented way, using all the latest patterns and best practices you need.',
      instructor: { id: 'inst006', name: 'Maximilian Schwarzmüller', title: 'Professional Web Developer', bio: 'I\'m a professional web developer and instructor who has been teaching web development for over 10 years.', avatar: '', rating: 4.6, studentsCount: 920000, coursesCount: 15 },
      category: 'web-dev',
      tags: ['React', 'Redux', 'React Router', 'Hooks', 'Next.js'],
      price: 17.99, originalPrice: 79.99, currency: 'USD', thumbnail: '',
      rating: 4.6, ratingsCount: 198342, studentsCount: 920000,
      lastUpdated: 'November 2024', language: 'English', level: 'intermediate', bestseller: false,
      includes: { videoHours: 68, articles: 32, resources: 22, mobileAccess: true, lifetimeAccess: true, captions: true, certificate: true },
      learningOutcomes: [
        'Build powerful, fast, user-friendly and reactive web apps',
        'Provide amazing user experiences by leveraging the power of JavaScript with React',
        'Apply for high-paid jobs or work as a freelancer in one the most-demanded areas',
        'Use Redux, React Router, React Hooks, and other key React features',
      ],
      requirements: ['JavaScript and web development basics are required', 'NO prior React knowledge is required'],
      targetAudience: ['JavaScript developers who want to become React developers', 'Everyone who wants to dive into a modern frontend framework'],
      sections: [
        { id: 's501', title: 'Getting Started', duration: '1h 15m', lectureCount: 7,
          lectures: [
            { id: 'l501', title: 'Welcome to the Course', duration: '3:22', type: 'video', isPreview: true },
            { id: 'l502', title: 'What is React?', duration: '10:44', type: 'video', isPreview: true },
            { id: 'l503', title: 'Creating React Projects', duration: '14:18', type: 'video', isPreview: false },
            { id: 'l504', title: 'The Starting Project', duration: '12:36', type: 'video', isPreview: false },
          ]
        },
        { id: 's502', title: 'React Essentials — Components, JSX, Props, State', duration: '5h 40m', lectureCount: 24,
          lectures: [
            { id: 'l510', title: 'It\'s All About Components!', duration: '8:14', type: 'video', isPreview: false },
            { id: 'l511', title: 'JSX & React Components', duration: '16:22', type: 'video', isPreview: false },
            { id: 'l512', title: 'Props', duration: '22:44', type: 'video', isPreview: false },
            { id: 'l513', title: 'State & useState()', duration: '28:16', type: 'video', isPreview: false },
            { id: 'l514', title: 'Event Handling', duration: '18:32', type: 'video', isPreview: false },
          ]
        },
      ],
    },

    {
      id: 'c007',
      slug: 'digital-marketing-masterclass',
      title: 'The Complete Digital Marketing Masterclass 2024',
      subtitle: '23 Courses in 1! SEO, Social Media, Facebook Ads, Google Ads, Email Marketing, Copywriting & More!',
      description: 'Learn Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing, Analytics & More!',
      instructor: { id: 'inst007', name: 'Rob Percival', title: 'Digital Marketing Expert', bio: 'Rob Percival is a web developer and digital marketing expert who has taught over 500,000 students worldwide.', avatar: '', rating: 4.4, studentsCount: 315000, coursesCount: 7 },
      category: 'marketing',
      tags: ['Digital Marketing', 'SEO', 'Social Media', 'Facebook Ads', 'Google Ads'],
      price: 14.99, originalPrice: 64.99, currency: 'USD', thumbnail: '',
      rating: 4.4, ratingsCount: 84231, studentsCount: 315000,
      lastUpdated: 'October 2024', language: 'English', level: 'beginner', bestseller: false,
      includes: { videoHours: 26, articles: 16, resources: 30, mobileAccess: true, lifetimeAccess: true, captions: true, certificate: true },
      learningOutcomes: ['Master digital marketing strategy', 'Grow your business through SEO', 'Run profitable Facebook and Google Ads', 'Build an email list', 'Create viral social media content'],
      requirements: ['No marketing experience required', 'A computer with internet access'],
      targetAudience: ['Small business owners', 'Marketing professionals', 'Entrepreneurs and solopreneurs'],
      sections: [
        { id: 's601', title: 'Introduction to Digital Marketing', duration: '1h 00m', lectureCount: 5,
          lectures: [
            { id: 'l601', title: 'Welcome!', duration: '3:44', type: 'video', isPreview: true },
            { id: 'l602', title: 'What is Digital Marketing?', duration: '10:28', type: 'video', isPreview: true },
            { id: 'l603', title: 'Digital Marketing Channels Overview', duration: '18:14', type: 'video', isPreview: false },
          ]
        },
        { id: 's602', title: 'Search Engine Optimization (SEO)', duration: '4h 30m', lectureCount: 18,
          lectures: [
            { id: 'l610', title: 'SEO Introduction', duration: '12:22', type: 'video', isPreview: false },
            { id: 'l611', title: 'Keyword Research', duration: '24:44', type: 'video', isPreview: false },
            { id: 'l612', title: 'On-Page SEO', duration: '28:16', type: 'video', isPreview: false },
            { id: 'l613', title: 'Link Building', duration: '22:32', type: 'video', isPreview: false },
          ]
        },
      ],
    },

    {
      id: 'c008',
      slug: 'ios-swift-development',
      title: 'iOS & Swift — The Complete iOS App Development Bootcamp',
      subtitle: 'From beginner to iOS App Developer with just one course! Fully updated with a brand new module on SwiftUI.',
      description: 'Welcome to the Complete iOS App Development Bootcamp. With over 39,000 5 star ratings, this iOS course is the highest rated iOS course in the history of the platform!',
      instructor: { id: 'inst001', name: 'Angela Yu', title: 'Lead Developer & Instructor', bio: '', avatar: '', rating: 4.8, studentsCount: 1840000, coursesCount: 6 },
      category: 'mobile',
      tags: ['iOS', 'Swift', 'SwiftUI', 'Xcode', 'App Development'],
      price: 19.99, originalPrice: 84.99, currency: 'USD', thumbnail: '',
      rating: 4.8, ratingsCount: 39418, studentsCount: 218000,
      lastUpdated: 'December 2024', language: 'English', level: 'beginner', bestseller: false,
      includes: { videoHours: 56, articles: 18, resources: 25, mobileAccess: true, lifetimeAccess: true, captions: true, certificate: true },
      learningOutcomes: ['Build beautiful iOS apps', 'Use Swift and SwiftUI', 'Submit apps to the App Store', 'Understand Object Oriented Programming', 'Work with APIs and databases'],
      requirements: ['A Mac computer is required', 'No programming experience needed'],
      targetAudience: ['Anyone who wants to learn iOS development', 'Beginners with no programming experience'],
      sections: [
        { id: 's701', title: 'Getting Started with iOS Development', duration: '1h 20m', lectureCount: 6,
          lectures: [
            { id: 'l701', title: 'Introduction', duration: '4:18', type: 'video', isPreview: true },
            { id: 'l702', title: 'iOS App Development Landscape', duration: '10:44', type: 'video', isPreview: false },
            { id: 'l703', title: 'Setting Up Xcode', duration: '16:22', type: 'video', isPreview: false },
          ]
        },
      ],
    },
  ],
};
