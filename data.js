/**
 * All page content lives here. Add a resource, re-order a module, or edit
 * copy by changing this file only — index.html, styles.css and app.js never
 * need to change for a content update.
 */
window.QA_PREP_DATA = {
  meta: {
    eyebrow: "QA / SDET Prep",
    title: "The Free Self-Study Path",
    subtitle: "Everything below is free. Work top to bottom, check things off as you go, and build the capstone project last — it's what actually proves you can do the job."
  },

  modules: [
    {
      num: "01",
      title: "Programming Basics",
      goal: "Get comfortable writing and reading code before you automate anything.",
      resources: [
        {
          title: "Java Programming MOOC — University of Helsinki",
          url: "https://java-programming.mooc.fi/",
          note: "Free, structured, exercise-heavy. Good if your team's stack is Java/Selenium."
        },
        {
          title: "Official Python Tutorial — python.org",
          url: "https://docs.python.org/3/tutorial/",
          note: "Pick Java or Python based on what your target company uses — don't learn both at once."
        }
      ]
    },
    {
      num: "02",
      title: "Testing Fundamentals",
      goal: "Vocabulary and concepts — what interviewers actually probe for.",
      resources: [
        {
          title: "Test Automation University (Applitools)",
          url: "https://testautomationu.applitools.com/",
          note: "Free courses on testing, automation, and frameworks."
        },
        {
          title: "ISTQB Foundation Syllabus",
          url: "https://www.istqb.org/",
          note: "Free PDF. Read it for the concepts and terminology — skip the certification exam unless a job specifically asks for it."
        }
      ]
    },
    {
      num: "03",
      title: "UI Automation",
      goal: "Learn one tool deeply rather than skimming three.",
      resources: [
        {
          title: "Selenium — official documentation",
          url: "https://www.selenium.dev/documentation/"
        },
        {
          title: "Playwright — official documentation",
          url: "https://playwright.dev/docs/intro",
          note: "One of the best tool docs out there — a strong default choice in 2026."
        },
        {
          links: [
            { text: "SauceDemo", url: "https://www.saucedemo.com/" },
            { text: "The Internet", url: "https://the-internet.herokuapp.com/" },
            { text: "Automation Exercise", url: "https://automationexercise.com/" }
          ],
          note: "Practice sites built specifically for automating against."
        }
      ]
    },
    {
      num: "04",
      title: "API Testing",
      goal: "Most real-world test suites are API-heavy — don't skip this for UI automation alone.",
      resources: [
        {
          title: "Postman Academy",
          url: "https://academy.postman.com/"
        },
        {
          links: [
            { text: "Restful Booker", url: "https://restful-booker.herokuapp.com/apidoc/index.html" },
            { text: "ReqRes", url: "https://reqres.in/" },
            { text: "JSONPlaceholder", url: "https://jsonplaceholder.typicode.com/" }
          ],
          note: "Free practice APIs — build real request/response test cases against these."
        }
      ]
    },
    {
      num: "05",
      title: "SQL for Testers",
      goal: "You will be asked to verify data in a database. Get fluent.",
      resources: [
        {
          title: "SQLBolt",
          url: "https://sqlbolt.com/",
          note: "Interactive basics."
        },
        {
          title: "LeetCode SQL 50",
          url: "https://leetcode.com/studyplan/top-sql-50/",
          note: "Practice set once the basics are solid."
        }
      ]
    },
    {
      num: "06",
      title: "CI/CD",
      goal: "A test suite nobody runs automatically doesn't count.",
      resources: [
        {
          title: "GitHub Skills",
          url: "https://skills.github.com/",
          note: "Hands-on Git and GitHub Actions courses, free."
        },
        {
          title: "GitHub Actions — official documentation",
          url: "https://docs.github.com/en/actions"
        }
      ]
    }
  ],

  capstone: {
    num: "07",
    title: "Capstone: Put It All Together",
    goal: "This single project will do more for your interviews than any certificate on this page.",
    steps: [
      "Pick one practice site from Module 3.",
      "Build a framework with page objects and a config layer.",
      "Add API tests against one of the practice APIs from Module 4.",
      "Wire it up to run on GitHub Actions on every push.",
      "Write a README that explains every decision you made and why."
    ]
  },

  footer: {
    lead: "The honest part.",
    body: "These resources teach you what to learn. They won't look at your gaps, tell you why your interview answers sound weak, or keep you accountable when you want to quit. Treat this page as the syllabus — pair it with real mock interviews and code review from someone further along."
  }
};
