// Common colors for charts
export const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

// Base interface for exam pattern data
export interface ExamPatternData {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  officialWebsite: string;
  color: string;
  eligibilityCriteria: string[];
  examPattern: {
    stages: string[];
    pattern: string[];
  };
  importantDates: {
    notification: string;
    applicationStart?: string;
    applicationEnd?: string;
    examDate?: string;
    prelimsExam?: string;
    mainsExam?: string;
    resultDate?: string;
  };
  topicDistribution: {
    topic: string;
    percentage: number;
    fill: string;
  }[];
  yearlyTrends: {
    year: number;
    [subject: string]: number;
  }[];
  frequentQuestions: {
    id: number;
    question: string;
    frequency: string;
    lastAsked: string;
    priority: string;
    category: string;
  }[];
  recommendedTopics: {
    id: number;
    title: string;
    description: string;
    importance: string;
    recommendedTime: string;
  }[];
}

// UPSC Civil Services Exam Data
export const upscData: ExamPatternData = {
  id: "upsc-cse",
  name: "UPSC Civil Services",
  description: "Understand question patterns from previous years to focus your preparation effectively. Our AI has analyzed past exam data to identify trends, topics, and question frequencies for UPSC CSE.",
  coverImage: "/images/exams/upsc-cse.jpg",
  officialWebsite: "https://www.upsc.gov.in/",
  color: COLORS[0],
  eligibilityCriteria: [
    "Candidate must be a citizen of India",
    "Age between 21-32 years (relaxation as per government norms)",
    "Bachelor's degree from recognized university",
    "Candidates appearing in final year of qualifying exam can also apply",
    "Maximum 6 attempts for General category (relaxation for reserved categories)"
  ],
  examPattern: {
    stages: ["Preliminary Examination", "Main Examination", "Interview/Personality Test"],
    pattern: [
      "Prelims: Objective-type questions (2 papers - General Studies and CSAT)",
      "Mains: Written descriptive papers (9 papers including 2 qualifying papers)",
      "Interview: Personality test worth 275 marks",
      "Total marks: 2025 (Written 1750 + Interview 275)"
    ]
  },
  importantDates: {
    notification: "February (typically)",
    applicationStart: "February-March",
    applicationEnd: "March-April",
    prelimsExam: "May-June",
    mainsExam: "September-October",
    resultDate: "April-May (Final)"
  },
  topicDistribution: [
    { topic: 'Indian History', percentage: 20, fill: '#8884d8' },
    { topic: 'Geography', percentage: 15, fill: '#83a6ed' },
    { topic: 'Indian Polity', percentage: 18, fill: '#8dd1e1' },
    { topic: 'Economy', percentage: 12, fill: '#82ca9d' },
    { topic: 'Science & Technology', percentage: 10, fill: '#a4de6c' },
    { topic: 'Environment', percentage: 8, fill: '#d0ed57' },
    { topic: 'Current Affairs', percentage: 17, fill: '#ffc658' }
  ],
  yearlyTrends: [
    { year: 2018, history: 24, polity: 20, geography: 16, economy: 14, science: 10, environment: 6, current: 10 },
    { year: 2019, history: 22, polity: 18, geography: 17, economy: 15, science: 11, environment: 7, current: 10 },
    { year: 2020, history: 20, polity: 19, geography: 15, economy: 14, science: 12, environment: 8, current: 12 },
    { year: 2021, history: 18, polity: 20, geography: 16, economy: 13, science: 12, environment: 9, current: 12 },
    { year: 2022, history: 17, polity: 19, geography: 15, economy: 14, science: 13, environment: 8, current: 14 },
    { year: 2023, history: 15, polity: 18, geography: 14, economy: 13, science: 13, environment: 10, current: 17 }
  ],
  frequentQuestions: [
    { 
      id: 1, 
      question: 'Constitutional Development in India during British Rule',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Indian Polity'
    },
    { 
      id: 2, 
      question: 'Environmental Conservation and Sustainable Development',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Environment'
    },
    { 
      id: 3, 
      question: 'Indian Freedom Movement and Its Leaders',
      frequency: 'Very High',
      lastAsked: '2022',
      priority: 'High',
      category: 'Indian History'
    },
    { 
      id: 4, 
      question: 'Economic Reforms in India since 1991',
      frequency: 'Medium',
      lastAsked: '2022',
      priority: 'Medium',
      category: 'Economy'
    },
    { 
      id: 5, 
      question: 'Science & Technology Developments in India',
      frequency: 'Medium',
      lastAsked: '2023',
      priority: 'Medium',
      category: 'Science & Technology'
    }
  ],
  recommendedTopics: [
    {
      id: 1,
      title: 'Indian Polity: Constitutional Amendments',
      description: 'Focus on major amendments and their impact on governance structure',
      importance: 'Critical',
      recommendedTime: '15 hours'
    },
    {
      id: 2,
      title: 'Modern Indian History: National Movement',
      description: 'Emphasize on different phases of freedom struggle and key personalities',
      importance: 'High',
      recommendedTime: '20 hours'
    },
    {
      id: 3,
      title: 'Economy: Recent Policies and Programs',
      description: 'Study recent government initiatives, budget highlights and economic surveys',
      importance: 'High',
      recommendedTime: '12 hours'
    },
    {
      id: 4,
      title: 'Geography: Climate and Natural Resources',
      description: 'Focus on Indian climate patterns, river systems and resource distribution',
      importance: 'Medium',
      recommendedTime: '10 hours'
    }
  ]
};

// SSC CGL Exam Data
export const sscCglData: ExamPatternData = {
  id: "ssc-cgl",
  name: "SSC CGL",
  description: "Understand the SSC CGL exam pattern analysis to boost your preparation. Our AI-powered analysis reveals key trends and focus areas for success.",
  coverImage: "/images/exams/ssc-cgl.jpg",
  officialWebsite: "https://ssc.gov.in/",
  color: COLORS[1],
  eligibilityCriteria: [
    "Candidate must be a citizen of India",
    "Age between 18-32 years (relaxation as per government norms)",
    "Bachelor's degree from recognized university",
    "Age relaxation for reserved categories as per government rules"
  ],
  examPattern: {
    stages: ["Tier I (Computer Based)", "Tier II (Computer Based)", "Tier III (Descriptive Paper)", "Tier IV (Skill Test/Computer Proficiency)"],
    pattern: [
      "Tier I: Objective MCQs on General Intelligence, English Language, Quantitative Aptitude, General Awareness",
      "Tier II: Objective MCQs (Paper I - Quantitative Abilities, Paper II - English Language, Paper III - Statistics, Paper IV - General Studies)",
      "Tier III: Descriptive paper in English/Hindi (Essay, Letter/Application writing)",
      "Tier IV: Data Entry Skill Test (DEST)/Computer Proficiency Test (CPT)"
    ]
  },
  importantDates: {
    notification: "December-January",
    applicationStart: "December-January",
    applicationEnd: "January-February",
    examDate: "February-May (Tier I)",
    resultDate: "October-November (Final)"
  },
  topicDistribution: [
    { topic: 'Quantitative Aptitude', percentage: 25, fill: '#8884d8' },
    { topic: 'English Language', percentage: 25, fill: '#83a6ed' },
    { topic: 'General Intelligence & Reasoning', percentage: 25, fill: '#8dd1e1' },
    { topic: 'General Awareness', percentage: 25, fill: '#82ca9d' }
  ],
  yearlyTrends: [
    { year: 2018, quantitative: 25, english: 25, reasoning: 25, awareness: 25 },
    { year: 2019, quantitative: 25, english: 25, reasoning: 25, awareness: 25 },
    { year: 2020, quantitative: 25, english: 25, reasoning: 25, awareness: 25 },
    { year: 2021, quantitative: 25, english: 25, reasoning: 25, awareness: 25 },
    { year: 2022, quantitative: 25, english: 25, reasoning: 25, awareness: 25 },
    { year: 2023, quantitative: 25, english: 25, reasoning: 25, awareness: 25 }
  ],
  frequentQuestions: [
    { 
      id: 1, 
      question: 'Data Interpretation & Analysis',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Quantitative Aptitude'
    },
    { 
      id: 2, 
      question: 'Reading Comprehension',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'English Language'
    },
    { 
      id: 3, 
      question: 'Logical Reasoning & Analytical Ability',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'General Intelligence'
    },
    { 
      id: 4, 
      question: 'Current Affairs & Static GK',
      frequency: 'Medium',
      lastAsked: '2023',
      priority: 'Medium',
      category: 'General Awareness'
    },
    { 
      id: 5, 
      question: 'Mathematical Problem Solving',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Quantitative Aptitude'
    }
  ],
  recommendedTopics: [
    {
      id: 1,
      title: 'Quantitative Aptitude: Data Interpretation',
      description: 'Practice charts, tables, graphs and case-based analytical problems',
      importance: 'Critical',
      recommendedTime: '20 hours'
    },
    {
      id: 2,
      title: 'English: Comprehension & Grammar',
      description: 'Focus on reading passages, error spotting, and sentence improvement',
      importance: 'High',
      recommendedTime: '15 hours'
    },
    {
      id: 3,
      title: 'Reasoning: Logical Deduction & Puzzles',
      description: 'Master seating arrangements, coding-decoding, and syllogisms',
      importance: 'High',
      recommendedTime: '20 hours'
    },
    {
      id: 4,
      title: 'General Awareness: Current Affairs',
      description: 'Stay updated with last 6 months of national and international developments',
      importance: 'Medium',
      recommendedTime: '10 hours'
    }
  ]
};

// IBPS PO Exam Data
export const ibpsPOData: ExamPatternData = {
  id: "ibps-po",
  name: "IBPS PO",
  description: "Strategic analysis of IBPS PO exam patterns to maximize your banking career preparation. Our detailed breakdown helps identify key focus areas.",
  coverImage: "/images/exams/ibps-po.jpg",
  officialWebsite: "https://www.ibps.in/",
  color: COLORS[2],
  eligibilityCriteria: [
    "Candidate must be a citizen of India",
    "Age between 20-30 years (relaxation as per government norms)",
    "Bachelor's degree from recognized university with min. 60% marks (55% for SC/ST/OBC/PwD)",
    "Proficiency in local language of the state applying for",
    "Computer literacy is mandatory"
  ],
  examPattern: {
    stages: ["Preliminary Examination", "Main Examination", "Interview"],
    pattern: [
      "Prelims: Objective MCQs (English Language, Quantitative Aptitude, Reasoning Ability)",
      "Mains: Objective MCQs + Descriptive Test (Reasoning & Computer Aptitude, Data Analysis & Interpretation, General/Economy/Banking Awareness, English Language)",
      "Interview: Personal Interview and Document Verification",
      "Final Selection: Combined scores of Mains and Interview (80:20 ratio)"
    ]
  },
  importantDates: {
    notification: "August",
    applicationStart: "August",
    applicationEnd: "September",
    prelimsExam: "October",
    mainsExam: "November",
    resultDate: "January-February (Final)"
  },
  topicDistribution: [
    { topic: 'Reasoning Ability', percentage: 35, fill: '#8884d8' },
    { topic: 'Quantitative Aptitude', percentage: 35, fill: '#83a6ed' },
    { topic: 'English Language', percentage: 30, fill: '#8dd1e1' }
  ],
  yearlyTrends: [
    { year: 2018, reasoning: 35, quantitative: 35, english: 30 },
    { year: 2019, reasoning: 35, quantitative: 35, english: 30 },
    { year: 2020, reasoning: 35, quantitative: 35, english: 30 },
    { year: 2021, reasoning: 35, quantitative: 35, english: 30 },
    { year: 2022, reasoning: 35, quantitative: 35, english: 30 },
    { year: 2023, reasoning: 35, quantitative: 35, english: 30 }
  ],
  frequentQuestions: [
    { 
      id: 1, 
      question: 'Puzzle & Seating Arrangement',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Reasoning Ability'
    },
    { 
      id: 2, 
      question: 'Data Interpretation',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Quantitative Aptitude'
    },
    { 
      id: 3, 
      question: 'Reading Comprehension',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'English Language'
    },
    { 
      id: 4, 
      question: 'Banking Awareness',
      frequency: 'Medium',
      lastAsked: '2023',
      priority: 'Medium',
      category: 'General Awareness (Mains)'
    },
    { 
      id: 5, 
      question: 'Computer Knowledge',
      frequency: 'Medium',
      lastAsked: '2023',
      priority: 'Medium',
      category: 'Computer Aptitude (Mains)'
    }
  ],
  recommendedTopics: [
    {
      id: 1,
      title: 'Reasoning: Puzzle Solving',
      description: 'Focus on complex puzzles, blood relations, and direction sense problems',
      importance: 'Critical',
      recommendedTime: '25 hours'
    },
    {
      id: 2,
      title: 'Quantitative: Data Interpretation',
      description: 'Practice calculations on tabular data, bar graphs, pie charts and caselets',
      importance: 'High',
      recommendedTime: '20 hours'
    },
    {
      id: 3,
      title: 'English: Comprehension & Vocabulary',
      description: 'Improve reading speed and accuracy, expand banking-related vocabulary',
      importance: 'High',
      recommendedTime: '15 hours'
    },
    {
      id: 4,
      title: 'Banking & Economy Awareness',
      description: 'Study banking terms, financial institutions, and recent economic developments',
      importance: 'Medium',
      recommendedTime: '10 hours'
    }
  ]
};

// RBI Grade B Exam Data
export const rbiGradeBData: ExamPatternData = {
  id: "rbi-grade-b",
  name: "RBI Grade B",
  description: "Prepare for the RBI Grade B Officer examination with our detailed pattern analysis. Master key sections and topics for a successful banking career.",
  coverImage: "/images/exams/rbi-grade-b.jpg",
  officialWebsite: "https://www.rbi.org.in/",
  color: COLORS[3],
  eligibilityCriteria: [
    "Candidate must be a citizen of India",
    "Age between 21-30 years (relaxation as per norms)",
    "Minimum 60% marks in Bachelor's degree (55% for SC/ST/PwD)",
    "Knowledge of regional language of the state applying for",
    "Specialized degrees required for certain posts (e.g., Economics, Finance for DR-Economic Stream)"
  ],
  examPattern: {
    stages: ["Phase I (Preliminary Examination)", "Phase II (Main Examination)", "Interview"],
    pattern: [
      "Phase I: Online objective test with General Awareness, English Language, Quantitative Aptitude, and Reasoning",
      "Phase II: Paper I - Economic & Social Issues, Paper II - English (Writing Skills), Paper III - Finance & Management (Domain paper)",
      "Interview: Personal Interview for final selection",
      "Final Selection: Combined scores of Phase II and Interview"
    ]
  },
  importantDates: {
    notification: "February-March",
    applicationStart: "February-March",
    applicationEnd: "March-April",
    prelimsExam: "April-May",
    mainsExam: "May-June",
    resultDate: "August-September (Final)"
  },
  topicDistribution: [
    { topic: 'Economic & Social Issues', percentage: 30, fill: '#8884d8' },
    { topic: 'Finance & Management', percentage: 30, fill: '#83a6ed' },
    { topic: 'English', percentage: 20, fill: '#8dd1e1' },
    { topic: 'General Awareness', percentage: 20, fill: '#82ca9d' }
  ],
  yearlyTrends: [
    { year: 2018, economics: 30, finance: 30, english: 20, awareness: 20 },
    { year: 2019, economics: 30, finance: 30, english: 20, awareness: 20 },
    { year: 2020, economics: 30, finance: 30, english: 20, awareness: 20 },
    { year: 2021, economics: 35, finance: 35, english: 15, awareness: 15 },
    { year: 2022, economics: 35, finance: 35, english: 15, awareness: 15 },
    { year: 2023, economics: 35, finance: 35, english: 15, awareness: 15 }
  ],
  frequentQuestions: [
    { 
      id: 1, 
      question: 'Indian Financial System & Markets',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Finance & Management'
    },
    { 
      id: 2, 
      question: 'Monetary Policy & Banking Regulations',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Economic & Social Issues'
    },
    { 
      id: 3, 
      question: 'Current Economic Developments',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Economic & Social Issues'
    },
    { 
      id: 4, 
      question: 'Banking Industry Current Affairs',
      frequency: 'Medium',
      lastAsked: '2023',
      priority: 'Medium',
      category: 'General Awareness'
    },
    { 
      id: 5, 
      question: 'Financial Risk Management',
      frequency: 'Medium',
      lastAsked: '2023',
      priority: 'Medium',
      category: 'Finance & Management'
    }
  ],
  recommendedTopics: [
    {
      id: 1,
      title: 'Financial Markets: Structure & Functions',
      description: 'Study primary and secondary markets, instruments, and participants',
      importance: 'Critical',
      recommendedTime: '20 hours'
    },
    {
      id: 2,
      title: 'Monetary Policy Framework',
      description: 'Focus on RBI\'s role, tools, and current policy stance',
      importance: 'High',
      recommendedTime: '15 hours'
    },
    {
      id: 3,
      title: 'Banking Regulations & Basel Norms',
      description: 'Learn about capital adequacy, risk management, and regulatory framework',
      importance: 'High',
      recommendedTime: '18 hours'
    },
    {
      id: 4,
      title: 'Economic Survey & Union Budget',
      description: 'Analyze key components and recent economic developments',
      importance: 'Medium',
      recommendedTime: '12 hours'
    }
  ]
};

// GATE Exam Data
export const gateData: ExamPatternData = {
  id: "gate",
  name: "GATE",
  description: "Master the Graduate Aptitude Test in Engineering (GATE) with our comprehensive pattern analysis designed for engineering and technology aspirants.",
  coverImage: "/images/exams/gate.jpg",
  officialWebsite: "https://gate.iitk.ac.in/",
  color: COLORS[4],
  eligibilityCriteria: [
    "Bachelor's degree in Engineering/Technology (4 years after 10+2 or 3 years after Diploma)",
    "Master's degree in any branch of Science/Mathematics/Statistics/Computer Applications",
    "Candidates in final year of qualifying degree can also apply",
    "No age limit for appearing in the GATE exam"
  ],
  examPattern: {
    stages: ["Single Computer-Based Test (CBT)"],
    pattern: [
      "3-hour computer-based test with 65 questions (MCQs and Numerical Answer Type)",
      "Total marks: 100 (General Aptitude: 15 marks, Subject specific: 85 marks)",
      "Negative marking for wrong answers in MCQs",
      "Engineering Mathematics is a common section for all papers",
      "Different papers for different engineering disciplines (CS, EE, ME, CE, etc.)"
    ]
  },
  importantDates: {
    notification: "August-September",
    applicationStart: "September",
    applicationEnd: "October",
    examDate: "February (spread across multiple sessions)",
    resultDate: "March"
  },
  topicDistribution: [
    { topic: 'Engineering Mathematics', percentage: 15, fill: '#8884d8' },
    { topic: 'Core Engineering Subjects', percentage: 70, fill: '#83a6ed' },
    { topic: 'General Aptitude', percentage: 15, fill: '#8dd1e1' }
  ],
  yearlyTrends: [
    { year: 2018, mathematics: 15, core: 70, aptitude: 15 },
    { year: 2019, mathematics: 15, core: 70, aptitude: 15 },
    { year: 2020, mathematics: 15, core: 70, aptitude: 15 },
    { year: 2021, mathematics: 13, core: 72, aptitude: 15 },
    { year: 2022, mathematics: 13, core: 72, aptitude: 15 },
    { year: 2023, mathematics: 13, core: 72, aptitude: 15 }
  ],
  frequentQuestions: [
    { 
      id: 1, 
      question: 'Calculus and Differential Equations',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Engineering Mathematics'
    },
    { 
      id: 2, 
      question: 'Data Structures and Algorithms',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Computer Science (CS)'
    },
    { 
      id: 3, 
      question: 'Electric Circuits and Fields',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Electrical Engineering (EE)'
    },
    { 
      id: 4, 
      question: 'Numerical Ability',
      frequency: 'Medium',
      lastAsked: '2023',
      priority: 'Medium',
      category: 'General Aptitude'
    },
    { 
      id: 5, 
      question: 'Verbal Ability',
      frequency: 'Medium',
      lastAsked: '2023',
      priority: 'Medium',
      category: 'General Aptitude'
    }
  ],
  recommendedTopics: [
    {
      id: 1,
      title: 'Engineering Mathematics Fundamentals',
      description: 'Master linear algebra, calculus, probability, and statistics',
      importance: 'Critical',
      recommendedTime: '30 hours'
    },
    {
      id: 2,
      title: 'Core Subject Specialization',
      description: 'Focus on in-depth understanding of your engineering discipline',
      importance: 'High',
      recommendedTime: '100 hours'
    },
    {
      id: 3,
      title: 'Numerical Ability Practice',
      description: 'Improve speed and accuracy in solving mathematical problems',
      importance: 'High',
      recommendedTime: '20 hours'
    },
    {
      id: 4,
      title: 'Verbal Ability & Reasoning',
      description: 'Enhance English comprehension and logical reasoning skills',
      importance: 'Medium',
      recommendedTime: '15 hours'
    }
  ]
};

// NEET Exam Data
export const neetData: ExamPatternData = {
  id: "neet",
  name: "NEET",
  description: "Strategize your National Eligibility cum Entrance Test (NEET) preparation with our detailed pattern analysis for aspiring medical professionals.",
  coverImage: "/images/exams/neet.jpg",
  officialWebsite: "https://neet.nta.nic.in/",
  color: COLORS[5],
  eligibilityCriteria: [
    "Candidate must be at least 17 years old as of December 31st of the admission year",
    "12th standard with Physics, Chemistry, Biology/Biotechnology with minimum 50% marks (40% for SC/ST/OBC)",
    "Maximum of 3 attempts allowed",
    "Upper age limit removed as per Supreme Court order"
  ],
  examPattern: {
    stages: ["Single Stage Computer-Based Test"],
    pattern: [
      "3-hour objective test with 200 MCQs (180 to be attempted)",
      "Physics: 45 questions, Chemistry: 45 questions, Biology (Botany + Zoology): 90 questions",
      "Total marks: 720 (4 marks for each correct answer, -1 for incorrect answer)",
      "Language options: English, Hindi, and several regional languages"
    ]
  },
  importantDates: {
    notification: "December-January",
    applicationStart: "January-February",
    applicationEnd: "March",
    examDate: "May",
    resultDate: "June"
  },
  topicDistribution: [
    { topic: 'Biology', percentage: 50, fill: '#8884d8' },
    { topic: 'Physics', percentage: 25, fill: '#83a6ed' },
    { topic: 'Chemistry', percentage: 25, fill: '#8dd1e1' }
  ],
  yearlyTrends: [
    { year: 2018, biology: 50, physics: 25, chemistry: 25 },
    { year: 2019, biology: 50, physics: 25, chemistry: 25 },
    { year: 2020, biology: 50, physics: 25, chemistry: 25 },
    { year: 2021, biology: 50, physics: 25, chemistry: 25 },
    { year: 2022, biology: 50, physics: 25, chemistry: 25 },
    { year: 2023, biology: 50, physics: 25, chemistry: 25 }
  ],
  frequentQuestions: [
    { 
      id: 1, 
      question: 'Human Physiology & Anatomy',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Biology'
    },
    { 
      id: 2, 
      question: 'Genetics & Molecular Biology',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Biology'
    },
    { 
      id: 3, 
      question: 'Mechanics & Thermodynamics',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Physics'
    },
    { 
      id: 4, 
      question: 'Organic Chemistry & Biomolecules',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Chemistry'
    },
    { 
      id: 5, 
      question: 'Cell Biology & Biotechnology',
      frequency: 'Medium',
      lastAsked: '2023',
      priority: 'Medium',
      category: 'Biology'
    }
  ],
  recommendedTopics: [
    {
      id: 1,
      title: 'Human Physiology & Systems',
      description: 'Study circulatory, respiratory, nervous, and endocrine systems in detail',
      importance: 'Critical',
      recommendedTime: '40 hours'
    },
    {
      id: 2,
      title: 'Genetics & Molecular Biology',
      description: 'Focus on DNA replication, protein synthesis, and inheritance patterns',
      importance: 'High',
      recommendedTime: '35 hours'
    },
    {
      id: 3,
      title: 'Organic Chemistry Reactions',
      description: 'Master reaction mechanisms, nomenclature, and functional groups',
      importance: 'High',
      recommendedTime: '30 hours'
    },
    {
      id: 4,
      title: 'Physics Numerical Problem Solving',
      description: 'Practice mechanics, electromagnetism, and modern physics problems',
      importance: 'Medium',
      recommendedTime: '25 hours'
    }
  ]
};

// UPSC CDS Exam Data
export const upscCdsData: ExamPatternData = {
  id: "upsc-cds",
  name: "UPSC CDS",
  description: "Prepare for the Combined Defence Services Examination with our detailed pattern analysis. Understand the requirements for joining the Indian Military, Naval, and Air Force Academies.",
  coverImage: "/images/exams/upsc-cds.jpg",
  officialWebsite: "https://www.upsc.gov.in/",
  color: COLORS[6],
  eligibilityCriteria: [
    "Unmarried/Widower/Divorcee Indian citizens",
    "Age: 19-24 years for IMA/INA/IAF, 19-22 years for OTA (relaxation for reserved categories)",
    "Educational Qualification: Graduate for IMA/INA/IAF, Graduate/Final year for OTA",
    "Physical Standards: As per military requirements",
    "No criminal record or ongoing cases"
  ],
  examPattern: {
    stages: ["Written Examination", "SSB Interview (Intelligence and Personality Test)"],
    pattern: [
      "Written Exam: English (100 marks), General Knowledge (100 marks), Elementary Mathematics (100 marks)",
      "For OTA: Only English and General Knowledge papers",
      "SSB Interview: Stage I (Officer Intelligence Rating) and Stage II (Psychological Test, Group Tests, Conference)",
      "Final Selection: Written exam + SSB Interview + Medical Examination"
    ]
  },
  importantDates: {
    notification: "June (CDS-II) / October (CDS-I)",
    applicationStart: "June/October",
    applicationEnd: "July/November",
    examDate: "November (CDS-II) / February (CDS-I)",
    resultDate: "December/March (Written), March/July (Final)"
  },
  topicDistribution: [
    { topic: 'English', percentage: 33, fill: '#8884d8' },
    { topic: 'General Knowledge', percentage: 34, fill: '#83a6ed' },
    { topic: 'Elementary Mathematics', percentage: 33, fill: '#8dd1e1' }
  ],
  yearlyTrends: [
    { year: 2018, english: 33, gk: 34, mathematics: 33 },
    { year: 2019, english: 33, gk: 34, mathematics: 33 },
    { year: 2020, english: 33, gk: 34, mathematics: 33 },
    { year: 2021, english: 33, gk: 34, mathematics: 33 },
    { year: 2022, english: 33, gk: 34, mathematics: 33 },
    { year: 2023, english: 33, gk: 34, mathematics: 33 }
  ],
  frequentQuestions: [
    { 
      id: 1, 
      question: 'Reading Comprehension & Vocabulary',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'English'
    },
    { 
      id: 2, 
      question: 'Current Affairs & International Relations',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'General Knowledge'
    },
    { 
      id: 3, 
      question: 'Indian History & Freedom Movement',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'General Knowledge'
    },
    { 
      id: 4, 
      question: 'Algebra & Trigonometry',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Elementary Mathematics'
    },
    { 
      id: 5, 
      question: 'Indian Constitution & Polity',
      frequency: 'Medium',
      lastAsked: '2023',
      priority: 'Medium',
      category: 'General Knowledge'
    }
  ],
  recommendedTopics: [
    {
      id: 1,
      title: 'English Grammar & Comprehension',
      description: 'Focus on grammar rules, vocabulary, and reading comprehension skills',
      importance: 'Critical',
      recommendedTime: '25 hours'
    },
    {
      id: 2,
      title: 'Current Affairs & Defense News',
      description: 'Stay updated with national, international events and defense-related news',
      importance: 'High',
      recommendedTime: '20 hours'
    },
    {
      id: 3,
      title: 'Elementary Mathematics',
      description: 'Master arithmetic, algebra, geometry, trigonometry, and statistics',
      importance: 'High',
      recommendedTime: '30 hours'
    },
    {
      id: 4,
      title: 'Indian History & Geography',
      description: 'Study ancient, medieval, modern history and physical/political geography',
      importance: 'Medium',
      recommendedTime: '15 hours'
    }
  ]
};

// NDA Exam Data
export const ndaData: ExamPatternData = {
  id: "nda",
  name: "NDA",
  description: "Master the National Defence Academy examination pattern with our comprehensive analysis designed for aspiring military officers.",
  coverImage: "/images/exams/nda.jpg",
  officialWebsite: "https://www.upsc.gov.in/",
  color: COLORS[0],
  eligibilityCriteria: [
    "Unmarried male/female Indian citizens",
    "Age: 16.5-19.5 years",
    "Educational Qualification: 12th pass for Army wing, 12th with Physics & Math for Air Force/Navy",
    "Physical Standards: As per NDA requirements",
    "No criminal record"
  ],
  examPattern: {
    stages: ["Written Examination", "SSB Interview"],
    pattern: [
      "Written Exam: Mathematics (300 marks) and General Ability Test (600 marks)",
      "General Ability Test includes English and General Knowledge sections",
      "SSB Interview: Intelligence and personality test over 5 days",
      "Final Selection: Written exam + SSB Interview + Medical Examination"
    ]
  },
  importantDates: {
    notification: "December (NDA-I) / June (NDA-II)",
    applicationStart: "December/June",
    applicationEnd: "January/July",
    examDate: "April (NDA-I) / September (NDA-II)",
    resultDate: "June/December (Written), September/March (Final)"
  },
  topicDistribution: [
    { topic: 'Mathematics', percentage: 50, fill: '#8884d8' },
    { topic: 'General Ability Test', percentage: 50, fill: '#83a6ed' }
  ],
  yearlyTrends: [
    { year: 2018, mathematics: 50, generalAbility: 50 },
    { year: 2019, mathematics: 50, generalAbility: 50 },
    { year: 2020, mathematics: 50, generalAbility: 50 },
    { year: 2021, mathematics: 50, generalAbility: 50 },
    { year: 2022, mathematics: 50, generalAbility: 50 },
    { year: 2023, mathematics: 50, generalAbility: 50 }
  ],
  frequentQuestions: [
    { 
      id: 1, 
      question: 'Algebra & Matrices',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Mathematics'
    },
    { 
      id: 2, 
      question: 'Current Affairs & General Knowledge',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'General Ability Test'
    },
    { 
      id: 3, 
      question: 'Trigonometry & Calculus',
      frequency: 'Very High',
      lastAsked: '2023',
      priority: 'High',
      category: 'Mathematics'
    },
    { 
      id: 4, 
      question: 'English Language Comprehension',
      frequency: 'High',
      lastAsked: '2023',
      priority: 'High',
      category: 'General Ability Test'
    },
    { 
      id: 5, 
      question: 'Physics & Chemistry',
      frequency: 'Medium',
      lastAsked: '2023',
      priority: 'Medium',
      category: 'General Ability Test'
    }
  ],
  recommendedTopics: [
    {
      id: 1,
      title: 'Mathematics: Algebra & Calculus',
      description: 'Master matrices, determinants, differential and integral calculus',
      importance: 'Critical',
      recommendedTime: '40 hours'
    },
    {
      id: 2,
      title: 'Current Affairs & Defense Updates',
      description: 'Stay updated with latest national and international developments',
      importance: 'High',
      recommendedTime: '15 hours'
    },
    {
      id: 3,
      title: 'Physics & Chemistry Fundamentals',
      description: 'Focus on basic concepts and their applications in various fields',
      importance: 'High',
      recommendedTime: '20 hours'
    },
    {
      id: 4,
      title: 'English Comprehension & Grammar',
      description: 'Improve reading comprehension skills and grammar usage',
      importance: 'Medium',
      recommendedTime: '15 hours'
    }
  ]
};

// Update the allExamsData array with all exam data
export const allExamsData: ExamPatternData[] = [
  upscData,
  sscCglData,
  ibpsPOData,
  rbiGradeBData,
  gateData,
  neetData,
  upscCdsData,
  ndaData
  // More exams can be added here
];

// Make sure all exam objects have valid colors
// This will ensure no undefined colors are used
allExamsData.forEach((exam, index) => {
  if (!exam.color || typeof exam.color !== 'string') {
    exam.color = COLORS[index % COLORS.length];
  }
});

// Function to get exam data by ID
export const getExamDataById = (id: string): ExamPatternData | undefined => {
  return allExamsData.find(exam => exam.id === id);
};

// Function to get all exam IDs and names
export const getExamsList = () => {
  return allExamsData.map(exam => ({
    id: exam.id,
    name: exam.name
  }));
}; 