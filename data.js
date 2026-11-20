window.EP_DATA = {
  personas: [
    { id: "aspiring", label: "Aspiring entrepreneur", hint: "Pre-launch, testing an idea" },
    { id: "early", label: "Early-stage founder", hint: "MVP built, chasing first customers" },
    { id: "growth", label: "Growth-stage owner", hint: "Revenue, now scaling team and systems" },
    { id: "social", label: "Social entrepreneur", hint: "Impact first, sustainable second" },
    { id: "intrapreneur", label: "Intrapreneur", hint: "Building inside an organisation" }
  ],
  stages: [
    { id: "prelaunch", label: "Pre-launch", hint: "Idea or prototype, no paying customers" },
    { id: "early", label: "Early revenue", hint: "Some customers, not yet repeatable" },
    { id: "growth", label: "Scaling", hint: "Repeatable sales, hiring and systems" }
  ],
  regions: [
    { id: "na", label: "North America" },
    { id: "eu", label: "Europe" },
    { id: "uk", label: "United Kingdom" },
    { id: "in", label: "India / South Asia" },
    { id: "af", label: "Africa" },
    { id: "latam", label: "Latin America" },
    { id: "mena", label: "Middle East / North Africa" },
    { id: "apac", label: "East Asia / Pacific" },
    { id: "other", label: "Somewhere else" }
  ],
  industries: [
    { id: "tech", label: "Software / tech" },
    { id: "retail", label: "Retail / e-commerce" },
    { id: "services", label: "Services / agency" },
    { id: "manufacturing", label: "Manufacturing / physical" },
    { id: "creator", label: "Creator / media" },
    { id: "other", label: "Other" }
  ],
  capitals: [
    { id: "none", label: "Under $5k", hint: "Bootstrapping from savings" },
    { id: "family", label: "$5k–$50k", hint: "Friends, family or a small grant" },
    { id: "preseed", label: "$50k–$500k", hint: "Pre-seed or angel money" },
    { id: "revenue", label: "Revenue-funded", hint: "Customers pay the bills" }
  ],
  times: [
    { id: "low", label: "Under 5 hrs / week", hint: "Alongside a job" },
    { id: "mid", label: "5–15 hrs / week", hint: "Evenings and weekends" },
    { id: "full", label: "Full-time", hint: "This is the main thing" }
  ],

  paths: {
    prelaunch: ["idea", "market", "bmc", "legal", "customers", "cash", "pricing", "marketing", "funding", "pitch", "crisis"],
    early: ["customers", "bmc", "pricing", "cash", "marketing", "market", "idea", "pitch", "funding", "legal", "crisis"],
    growth: ["cash", "pricing", "marketing", "customers", "pitch", "funding", "bmc", "legal", "crisis", "market", "idea"],
    social: ["idea", "market", "bmc", "funding", "customers", "pricing", "marketing", "cash", "legal", "pitch", "crisis"],
    intrapreneur: ["idea", "market", "bmc", "customers", "pricing", "pitch", "cash", "marketing", "funding", "legal", "crisis"]
  },

  modules: [
    {
      id: "idea",
      title: "Idea Validation Sprint",
      track: "Validate",
      stages: ["prelaunch"],
      minutes: 35,
      summary: "Turn a belief into a test you can run this week, with a number that tells you to stop.",
      move: "Book five 20-minute problem interviews. Ask what they did last time, never what they would do.",
      lessons: [
        {
          title: "Name the assumption that would kill the idea",
          body: [
            "An idea is a bundle of beliefs: that people have this problem, that they will pay, that you can reach them, and that you can deliver it profitably. First-time founders usually test the easiest belief — whether the thing can be built — instead of the most dangerous one. Write all four down, then ask which one, if false, ends the venture. Pre-launch, that is almost always demand, not build quality.",
            "Evidence beats opinion. Decide in advance what result would make you stop, pause or change direction. For example: eight of twelve target customers describe the problem without prompting, and three will prepay or sign a paid pilot. Put the number and the date in writing before you recruit anyone. A pre-committed kill criterion is not pessimism — it is what stops you from spending a year on a polite no."
          ]
        },
        {
          title: "Run problem interviews, not pitches",
          body: [
            "Ask about the past, not the future. 'Would you use this?' produces encouragement. 'Walk me through the last time this happened — what did you do, and what did it cost you?' produces evidence. Keep the conversation on their behaviour: how often it happens, what tools they use, who else is involved, what they tried and abandoned.",
            "Recruit ten to twelve people who match your buyer, not friends. Do not describe your solution until the very end, and then ask who else you should speak to. Write down exact phrases. The words customers use become your landing page copy and your sales script.",
            "After ten interviews, count how many described the problem without being prompted. Fewer than three is a signal to change the segment or the problem — not to polish the product."
          ]
        }
      ],
      quiz: [
        {
          q: "You have one week and no budget. What is the strongest test of demand?",
          options: [
            "A polished landing page with a waitlist",
            "Ten problem interviews plus three requests to prepay",
            "A survey sent to 500 strangers",
            "A detailed competitor analysis"
          ],
          a: 1,
          why: "Behaviour beats opinions. Interviews reveal the problem; asking for money reveals willingness to pay."
        },
        {
          q: "A friend says the idea is brilliant. How much does that tell you?",
          options: [
            "Strong validation of the idea",
            "Little: friends are not buyers, and praise is free",
            "Enough to start building immediately",
            "It depends only on their job title"
          ],
          a: 1,
          why: "Encouragement costs nothing. Look for people who spend money or time on the problem today."
        },
        {
          q: "What belongs in a kill criterion?",
          options: [
            "A general hope that things work out",
            "A specific result, number and date that would make you stop or pivot",
            "A list of every competitor",
            "A funding target"
          ],
          a: 1,
          why: "A test you cannot fail is not a test. Fix the threshold before you are emotionally invested in the result."
        }
      ]
    },
    {
      id: "market",
      title: "Market Research on One Page",
      track: "Validate",
      stages: ["prelaunch", "early"],
      minutes: 30,
      summary: "Size a market from the bottom up, read competitors like a buyer, and learn from the people who said no.",
      move: "Write the bottom-up market size for your segment: number of buyers × realistic annual spend.",
      lessons: [
        {
          title: "Size it from the bottom up",
          body: [
            "Top-down numbers ('this is a $50 billion market') are useful for context and useless for decisions. Bottom-up sizing starts from buyers you can actually name: how many clinics in your region, how many agencies of this size, how many people with this job. Multiply by a realistic annual spend, then apply the share you could plausibly win in three years.",
            "Example: 900 independent clinics in the region × $4,800 average annual software spend = $4.3M serviceable market. If you need 150 customers at that price to reach your goal, you now know whether the market can hold your plan — and whether you need a bigger segment or a higher price."
          ]
        },
        {
          title: "Read three competitors like a buyer",
          body: [
            "Ignore the homepage. Go through the pricing page, start a trial, read the onboarding emails, and read the negative reviews of people who churned. You are looking for the gap between what the market is sold and what it actually gets: missing integrations, slow support, pricing that punishes small teams, a workflow that only works for enterprises.",
            "Then talk to people who chose a substitute — a spreadsheet, an intern, or nothing at all. Their reason is the real switching cost you must beat. 'Doing nothing' is your most common competitor and the hardest to displace, because it is free and familiar."
          ]
        }
      ],
      quiz: [
        {
          q: "Which market estimate is most defensible to an investor?",
          options: [
            "A $50B global figure from a research report",
            "900 clinics × $4,800 average annual spend = $4.3M serviceable",
            "One percent of a huge market",
            "The valuation of the market leader"
          ],
          a: 1,
          why: "Bottom-up maths can be checked and argued with. Top-down percentages are assumptions wearing a suit."
        },
        {
          q: "Where do the most useful competitor insights come from?",
          options: [
            "Their homepage headline",
            "Their pricing page, trial flow and negative reviews",
            "Their CEO's conference talks",
            "Their share price"
          ],
          a: 1,
          why: "Pricing and churn complaints reveal what buyers actually experience and where the gap is."
        },
        {
          q: "Why talk to people who chose a substitute instead of your category?",
          options: [
            "To convince them they are wrong",
            "Their reason shows the real switching cost you must beat",
            "To copy their process",
            "Because they are easier to reach"
          ],
          a: 1,
          why: "Non-customers tell you what 'good enough' looks like today, which is what you are actually competing with."
        }
      ]
    },
    {
      id: "bmc",
      title: "Business Model Canvas in 45 Minutes",
      track: "Model",
      stages: ["prelaunch", "early", "growth", "social", "intrapreneur"],
      minutes: 40,
      summary: "Fill nine blocks fast, then find the one assumption that decides whether the model works.",
      move: "Fill one canvas for your venture, then circle the block you have never tested with a real buyer.",
      lessons: [
        {
          title: "Nine blocks, one page",
          body: [
            "The canvas covers customer segments, value proposition, channels, customer relationships, revenue streams, key resources, key activities, key partners and cost structure. Its value is not completeness — it is that the whole model fits on one page where contradictions are visible.",
            "Write in the present tense and in specifics. Not 'small businesses' but 'independent dental clinics with two to five chairs'. Not 'subscription' but '$149 per location per month, annual prepay'. If you cannot name a number, write a question mark: that mark is your work for the week."
          ]
        },
        {
          title: "Where the canvas usually lies",
          body: [
            "Two blocks carry most of the risk: revenue streams (who pays, how much, how often, and why now) and channels (how the buyer actually finds and buys). Founders happily write 'direct sales' as a channel without costing a single sales hour. A canvas that ignores acquisition cost is a wish, not a model.",
            "Pick the block with the least evidence and design a one-week test for it. Too few buyers? Run outreach. Unsure about price? Quote three prices and count objections. Unsure about delivery cost? Do the work manually for two customers and time it. Update the canvas with what you learned, including the parts you had to cross out."
          ]
        }
      ],
      quiz: [
        {
          q: "Which canvas block most often hides the assumption that kills early ventures?",
          options: [
            "Key partners",
            "Revenue streams — who pays, how much, how often",
            "Key activities",
            "Customer relationships"
          ],
          a: 1,
          why: "A model can be elegant and still have nobody willing to pay enough, often enough, to cover delivery."
        },
        {
          q: "What makes a canvas useful?",
          options: [
            "Every box filled neatly",
            "Naming the riskiest assumption and testing it this week",
            "Getting it approved by a mentor",
            "Making it look good in a deck"
          ],
          a: 1,
          why: "The canvas is a thinking tool, not a deliverable. Its output is the next experiment."
        },
        {
          q: "A strong customer segment description includes…",
          options: [
            "'Everyone who needs this'",
            "A specific group with a shared trigger, budget and current workaround",
            "A broad demographic age range",
            "Any company with an email address"
          ],
          a: 1,
          why: "Shared trigger and budget are what make a segment reachable and buyable."
        }
      ]
    },
    {
      id: "customers",
      title: "Your First Twenty Customers",
      track: "Sell",
      stages: ["early", "growth"],
      minutes: 30,
      summary: "Founder-led selling, one channel at a time, and a referral habit that compounds.",
      move: "Send 20 personal messages to people who match your buyer. Offer a 15-minute call, not a demo.",
      lessons: [
        {
          title: "Do things that do not scale",
          body: [
            "Your first twenty customers should be won by hand. Founder-led outreach, manual onboarding, a shared Slack channel, a phone call when they get stuck. This is not a temporary embarrassment; it is how you learn which parts of the product and pitch actually matter.",
            "Twenty is a useful number because it is big enough to show a pattern and small enough to do personally. Track each one: where they came from, what they asked, what almost stopped them, what they pay. That spreadsheet becomes your sales playbook."
          ]
        },
        {
          title: "One channel, one message, one week",
          body: [
            "Pick the single place your buyers already pay attention: a professional community, a directory, a trade event, a search term, a partner's audience. Write one message for one buyer and run it for a week. Measure replies or bookings, not impressions.",
            "Running five channels at once feels productive and teaches nothing. If a channel produces no signal in a week at small volume, either the list is wrong or the message is wrong. Fix one variable at a time, and only add a second channel when the first produces repeatable conversations."
          ]
        },
        {
          title: "Turn delivery into referrals",
          body: [
            "Ask for a referral at the moment a customer gets a clear result, not at signup. Be specific: 'Do you know two other clinic managers who struggle with the same no-show problem?' A specific ask is easy to answer; 'know anyone who might be interested?' is easy to ignore.",
            "Then close the loop: tell the referrer what happened. Referrals compound when people can see that their introduction was useful, and that is also the cheapest customer acquisition you will ever have."
          ]
        }
      ],
      quiz: [
        {
          q: "Best use of founder time for the first 20 customers?",
          options: [
            "Paid advertising across three platforms",
            "Direct outreach and manual onboarding",
            "A rebrand and a new website",
            "Hiring an agency on commission"
          ],
          a: 1,
          why: "Hand-won customers produce learning and revenue at the same time. Ads scale a message you do not have yet."
        },
        {
          q: "You tried three channels in one week and none worked. What is the likely mistake?",
          options: [
            "The budget was too small",
            "Too little signal per channel; test one channel at a time",
            "The product is finished",
            "You need a bigger team"
          ],
          a: 1,
          why: "Split attention and split data. One channel, one message, one week gives you something to learn from."
        },
        {
          q: "Best moment to ask for a referral?",
          options: [
            "Immediately at signup",
            "Right after the customer gets a clear result",
            "In a quarterly newsletter",
            "When they cancel"
          ],
          a: 1,
          why: "Goodwill and evidence are highest right after a win, and the ask is concrete."
        }
      ]
    },
    {
      id: "cash",
      title: "Cash, Burn and Runway",
      track: "Money",
      stages: ["early", "growth", "social"],
      minutes: 25,
      summary: "Know your real monthly burn, your runway, and the order in which to pull the levers.",
      move: "Open the runway tool and enter last month's actual cash in, cash out and balance.",
      lessons: [
        {
          title: "Gross burn, net burn, runway",
          body: [
            "Gross burn is what leaves the account each month: payroll, rent, software, marketing, everything. Net burn is gross burn minus what customers pay you. Runway is cash divided by net burn. A business with $180k in the bank, $45k of monthly spend and $15k of monthly collections has a $30k net burn and six months of runway.",
            "Use the bank balance, not the profit-and-loss statement. Revenue you have invoiced but not collected is not cash. Add a line for money already committed — annual software, a lease, a tax bill — so the runway number is honest rather than optimistic."
          ]
        },
        {
          title: "The eighteen-month rule and the levers",
          body: [
            "Raising takes longer than founders expect, so the common rule is to start when you have nine to twelve months left and to aim for eighteen months of runway after the round. Waiting until you are nearly out gives the other side all the leverage.",
            "Pull the cheapest levers first: collect overdue invoices, pause non-selling spend, renegotiate annual contracts, delay a hire, then price. Layoffs are fast and painful and they damage the team that has to deliver the recovery. Decide the order in advance, while you are calm, so the decision is not made in a panic."
          ]
        }
      ],
      quiz: [
        {
          q: "You have $180k cash, spend $45k a month and collect $15k. What is your runway?",
          options: ["Four months", "Six months", "Nine months", "Twelve months"],
          a: 1,
          why: "Net burn is $30k, so $180k ÷ $30k = six months."
        },
        {
          q: "Which figure is net burn?",
          options: [
            "Total monthly spend",
            "Monthly spend minus cash collected",
            "Payroll only",
            "The bank balance"
          ],
          a: 1,
          why: "Net burn is what the business actually consumes once customer cash arrives."
        },
        {
          q: "Which lever should you pull first when runway shortens?",
          options: [
            "Lay off the team immediately",
            "Collect overdue invoices and cut non-selling spend",
            "Raise at any valuation",
            "Stop answering customers"
          ],
          a: 1,
          why: "Cheapest and fastest first: cash you already earned, then costs that do not create revenue."
        }
      ]
    },
    {
      id: "pricing",
      title: "Pricing Without Guessing",
      track: "Money",
      stages: ["early", "growth", "social"],
      minutes: 30,
      summary: "Anchor to value, structure three tiers, and test increases without betting the base.",
      move: "Write the cost of the problem for one customer in money or hours, then set a price against it.",
      lessons: [
        {
          title: "Price on value, not cost",
          body: [
            "Cost-plus pricing asks what it costs you to deliver, then adds a margin. It is safe, common, and it systematically undercharges when the outcome is worth far more than the cost. Start from the alternative: what does the customer spend today in money, time or risk to solve this badly?",
            "If your tool saves a clinic ten hours of admin a month at $40 an hour, the value is about $400 a month. A $29 price anchored to your server bill leaves most of that on the table. Charge a share of the value you create, and prove the value with a number the customer recognises."
          ]
        },
        {
          title: "Three tiers and a decoy",
          body: [
            "A good, better, best structure does two jobs: it lets buyers self-select and it gives the middle option a reference point. The top tier is often bought by a small share of customers but makes the middle look reasonable. Keep the differences tied to outcomes, not to arbitrary feature counts.",
            "Annual prepay is the cheapest financing you will ever get. Offer a real discount for it, and be explicit about what happens at renewal. When you raise prices, grandfather existing customers for a defined period and apply the new price to new buyers first, so you can compare conversion and revenue per visitor without betting your base."
          ]
        }
      ],
      quiz: [
        {
          q: "Your tool saves a customer $400 a month in admin time. What should anchor the price?",
          options: [
            "Your server cost plus 30 percent",
            "The value created and the cost of the current alternative",
            "The cheapest competitor plan",
            "What the first customer offered to pay"
          ],
          a: 1,
          why: "Value-based pricing captures a share of the outcome; cost-plus caps you at your own efficiency."
        },
        {
          q: "Why does a three-tier page usually work?",
          options: [
            "More choices are always better",
            "A high anchor makes the middle option look reasonable",
            "It hides the real price",
            "It removes the need for a sales team"
          ],
          a: 1,
          why: "Buyers evaluate relative to a reference. The top tier supplies that reference."
        },
        {
          q: "Safest way to test a price increase?",
          options: [
            "Raise it for every customer on the same day",
            "Apply it to new customers first and compare conversion and revenue per visitor",
            "Announce it and hope",
            "Keep prices and cut costs instead"
          ],
          a: 1,
          why: "New buyers give you a clean comparison without putting existing revenue at risk."
        }
      ]
    },
    {
      id: "pitch",
      title: "A Deck That Survives Diligence",
      track: "Raise",
      stages: ["early", "growth"],
      minutes: 35,
      summary: "Ten slides, one argument, and a traction slide that shows a slope rather than a total.",
      move: "Rewrite your traction slide around retention or payback, not cumulative signups.",
      lessons: [
        {
          title: "Ten slides, one argument",
          body: [
            "The deck is a sequence, not a brochure: problem, insight, product, traction, market, model, competition, team, ask, appendix. Each slide should advance one claim. If a slide does not change what the reader believes, cut it.",
            "The strongest decks make a single argument — this team has found a specific problem, a repeatable way to reach buyers, and evidence that the economics improve with scale. Everything else is supporting material. Put the details investors will ask for in the appendix and keep the main deck readable in five minutes."
          ]
        },
        {
          title: "Traction: show the slope",
          body: [
            "A total of 50,000 signups says little. A twelve-month cohort curve that flattens at 60 percent retention says a great deal. Show the trend, the denominator and the time period, and be the first to name the weak spot: investors will find it anyway, and naming it builds trust.",
            "Useful traction evidence includes revenue growth by month, retention by cohort, payback period on acquisition, and a named pipeline of customers who have said yes in writing. Pick the three that best prove repeatability for your model."
          ]
        },
        {
          title: "The ask and use of funds",
          body: [
            "State the amount, the milestones it buys, and what those milestones unlock. 'Raising $750k to reach $80k MRR and twelve-month payback, which puts us in range for a seed round in Q4' is an argument. 'Raising $750k for hiring and marketing' is a wish.",
            "Include what happens if the round does not close: the leaner plan. Investors respect a founder who has already thought about the downside, and it protects you from taking bad terms out of desperation."
          ]
        }
      ],
      quiz: [
        {
          q: "Which traction slide is most convincing?",
          options: [
            "50,000 cumulative signups",
            "Twelve-month cohort retention and payback curve",
            "A wall of customer logos",
            "A large market-size chart"
          ],
          a: 1,
          why: "Cohorts show whether value persists. Totals can hide a leaking bucket."
        },
        {
          q: "What should the ask slide contain?",
          options: [
            "A number and the milestones it buys",
            "'Whatever you think is fair'",
            "Only a valuation",
            "A list of every possible expense"
          ],
          a: 0,
          why: "The ask is a plan, not a number. Milestones tell the investor what their money changes."
        },
        {
          q: "Best answer to 'who is your competition?'",
          options: [
            "'We have none'",
            "Name the alternatives, including spreadsheets and doing nothing, and why you win for a specific buyer",
            "List every company in the category",
            "Say the market is too early for competitors"
          ],
          a: 1,
          why: "Every buyer has a current solution. Showing you understand it is more credible than claiming a vacuum."
        }
      ]
    },
    {
      id: "legal",
      title: "Legal Structure Without the Fog",
      track: "Launch",
      stages: ["prelaunch", "early", "growth", "social", "intrapreneur"],
      minutes: 25,
      summary: "Pick an entity, handle the registrations, and make sure the company owns its work.",
      move: "List the registration steps and annual costs for your jurisdiction, then confirm one with a local adviser.",
      lessons: [
        {
          title: "Entities in plain terms",
          body: [
            "A sole proprietorship is the simplest and cheapest, and it puts your personal assets on the line. A limited liability company (LLC, Ltd, GmbH and similar) separates the business from you, which matters as soon as you sign a lease, hire someone or take investment. A corporation (C-Corp in the US, PLC, BV and similar) is the usual shape for venture funding, because it issues shares and supports option pools.",
            "Choose for the next two years, not forever. If you intend to raise equity, incorporate in a form investors recognise. If you are testing a local service business, the simplest structure that limits liability may be enough. Converting later is possible but costs time and can trigger tax."
          ]
        },
        {
          title: "Registrations, contracts and IP",
          body: [
            "Most jurisdictions require business registration, a tax number and, depending on activity, a licence or permit. Costs and steps vary enormously — check the official portal for your jurisdiction rather than a blog post, and budget for annual filings, not just the first registration.",
            "The quiet killer is ownership of work. Have every founder, employee and contractor sign an IP assignment so the company owns the code, designs and content. Use written contracts with customers and suppliers, keep personal and business money separate, and publish a basic privacy policy if you collect personal data. This is general education, not legal advice: confirm anything material with a local professional."
          ]
        }
      ],
      quiz: [
        {
          q: "Which structure generally suits a venture planning to raise equity?",
          options: [
            "Sole proprietorship",
            "A limited company or corporation that can issue shares",
            "An informal partnership",
            "No structure until revenue"
          ],
          a: 1,
          why: "Investors buy shares. A share-issuing entity also supports option pools and clean cap-table records."
        },
        {
          q: "Why do founders sign IP assignment agreements?",
          options: [
            "It is bureaucratic paperwork",
            "So the company owns the work product that investors and buyers will diligence",
            "To reduce income tax",
            "Because contractors insist on it"
          ],
          a: 1,
          why: "Without assignment, the person who wrote the code may still own it — a deal-stopper in diligence."
        },
        {
          q: "What varies most between jurisdictions?",
          options: [
            "The need to make a profit",
            "Registration steps, tax and licence requirements",
            "The definition of a customer",
            "Whether contracts exist"
          ],
          a: 1,
          why: "Entity forms and filings are local. Always check the official source for your jurisdiction."
        }
      ]
    },
    {
      id: "funding",
      title: "The Funding Ladder",
      track: "Raise",
      stages: ["early", "growth"],
      minutes: 30,
      summary: "Match the money to the stage, understand what investors buy, and do the dilution maths.",
      move: "Write the next 12 months of milestones and the cheapest source that could fund them.",
      lessons: [
        {
          title: "Sources, by stage",
          body: [
            "Customer revenue is the best funding: it is non-dilutive and it proves demand. Next come grants and competitions, which are slow but cheap, then friends and family, then angels and pre-seed funds, then institutional seed and Series A. Revenue-based financing and venture debt fit businesses with predictable recurring revenue, not pre-revenue ideas.",
            "Match the source to the evidence you have. A pre-revenue idea rarely raises institutional money; it raises from people who know the founder or from customers who prepay. Raising too early at a high price creates expectations you cannot meet and makes the next round harder."
          ]
        },
        {
          title: "What investors actually buy",
          body: [
            "Not the idea — the evidence that demand is repeatable and the team can execute. That means a clear buyer, a working channel, retention, and unit economics that improve with scale. The pitch is the wrapper around that evidence.",
            "Use of funds should map to one milestone that de-risks the company: reaching a revenue level, proving payback, or completing a regulatory step. If you cannot say what the money buys, you are not ready to raise it."
          ]
        },
        {
          title: "Dilution in one page",
          body: [
            "If you raise $500k at a $2M pre-money valuation, the post-money is $2.5M and the investor owns 20 percent ($500k ÷ $2.5M). A $2M pre with a $500k raise is not the same as a $2.5M pre. Always ask which number is being quoted, and model the option pool, because it usually comes out of the founders' share.",
            "Understand the difference between a SAFE or convertible note and priced equity: convertibles delay valuation but can convert at a discount, and stacked notes can produce a surprise at the next round. Keep the cap table simple and readable. Take the investor who helps you win customers over the one who only offers a better price."
          ]
        }
      ],
      quiz: [
        {
          q: "You raise $500k at a $2M pre-money valuation. What share does the investor own?",
          options: ["10 percent", "20 percent", "25 percent", "33 percent"],
          a: 1,
          why: "Post-money is $2.5M, so $500k ÷ $2.5M = 20 percent."
        },
        {
          q: "Best time to raise?",
          options: [
            "When cash is nearly zero",
            "When metrics show a repeatable motion and you still have 9–12 months of runway",
            "Before talking to a single customer",
            "Immediately after launching a website"
          ],
          a: 1,
          why: "Scarcity gives away leverage. Raise from evidence, not from panic."
        },
        {
          q: "Which source fits a capital-light business with paying customers?",
          options: [
            "Venture debt",
            "Customer revenue and revenue-based financing",
            "A Series A",
            "A bank loan secured on personal assets"
          ],
          a: 1,
          why: "Predictable revenue can support non-dilutive finance without the growth expectations of equity."
        }
      ]
    },
    {
      id: "marketing",
      title: "Marketing on a Small Budget",
      track: "Sell",
      stages: ["early", "growth"],
      minutes: 25,
      summary: "One buyer, one promise, one channel — then measure payback instead of clicks.",
      move: "Write your promise in one sentence a buyer would repeat, then test it in ten outreach messages.",
      lessons: [
        {
          title: "One buyer, one promise",
          body: [
            "A small budget punishes vagueness. Name one buyer, one problem and one outcome, then say it in the buyer's words. 'We cut clinic no-shows by 30 percent in six weeks' is testable. 'We empower businesses to unlock their potential' cannot be disproved, which is why it sells nothing.",
            "Put the promise where the buyer already is: a directory, a community, a search term, a partner's list. Ten personal messages that get three replies teach you more than a thousand impressions."
          ]
        },
        {
          title: "Measure payback, not clicks",
          body: [
            "Customer acquisition cost is total sales and marketing spend divided by new customers. Payback is CAC divided by monthly gross margin per customer. If you spend $600 to win a customer who pays $50 a month at 80 percent margin, payback is 15 months — and if the average customer stays eight months, you lose money on every sale.",
            "Fix retention or price before you scale spend. Then build one content asset a week that answers a real buyer question, and distribute it where those buyers read. Compounding comes from consistency and usefulness, not from posting on five platforms every day."
          ]
        }
      ],
      quiz: [
        {
          q: "CAC payback is 15 months and the average customer stays 8 months. What does that mean?",
          options: [
            "Excellent unit economics",
            "You lose money on each customer; fix retention or price before scaling",
            "You should spend more on ads",
            "Nothing without more data"
          ],
          a: 1,
          why: "If payback exceeds lifetime, growth destroys cash. Scale only after the math works."
        },
        {
          q: "Best first channel for a $2,000 B2B product?",
          options: [
            "Broad display advertising",
            "Direct outreach to a named list of 100 matching buyers",
            "A viral TikTok trend",
            "A billboard"
          ],
          a: 1,
          why: "A named list gives fast, interpretable signal at low cost for a high-consideration sale."
        },
        {
          q: "What makes content compound?",
          options: [
            "Posting daily on five platforms",
            "One useful asset a week, distributed where buyers already read",
            "Buying followers",
            "Long posts with no examples"
          ],
          a: 1,
          why: "Useful assets accumulate search traffic and trust. Volume without usefulness is noise."
        }
      ]
    },
    {
      id: "crisis",
      title: "Crisis Simulation: The Cash Crunch",
      track: "Operate",
      stages: ["early", "growth", "social"],
      minutes: 40,
      summary: "Run a five-move cash crisis. Every choice changes cash, burn and revenue. Survive with room.",
      move: "Run the simulation, then write the three cuts you would make first in a real crunch.",
      lessons: [
        {
          title: "How cash crises actually start",
          body: [
            "Rarely one catastrophe. Usually three small things at once: a large customer pays 45 days late, a renewal is downgraded, and a hire started a month before the revenue that justified them. The bank balance looks fine until the week payroll and the tax bill land together.",
            "The founders who survive are the ones who look at a thirteen-week cash forecast every Monday, not the annual plan. They know which outflows protect revenue and which are habit."
          ]
        },
        {
          title: "The ninety-minute triage",
          body: [
            "First, snapshot: cash today, money arriving in the next thirty days with confidence levels, and every committed outflow. Second, rank spending into 'protects revenue', 'required', and 'nice to have'. Third, choose three actions you can do this week and tell the people affected before they hear it elsewhere.",
            "Protect the thing that generates cash: delivery, support, and the sales conversation already in progress. Cut travel, tools, events and anything a customer will not notice. Then communicate once, clearly, with what changes and what does not."
          ]
        }
      ],
      quiz: [],
      sim: {
        intro: "You run a 14-person software company. Cash is $150,000. Monthly spend is $45,000. Customers pay $20,000 a month. It is Monday, and payroll is in eleven days.",
        start: { cash: 150000, burn: 45000, mrr: 20000 },
        turns: [
          {
            title: "The 28 percent customer wants a discount",
            text: "Your largest customer — 28 percent of revenue — says the renewal needs a 20 percent discount or they will leave. Their payment is also the one that slipped last month.",
            choices: [
              { label: "Give the discount", detail: "Keep the logo and the cash, at a lower price.", fx: { mrr: -1120, cash: -2000 }, outcome: "They stay. Revenue drops by about $1.1k a month and you have taught the account that renewal is a negotiation." },
              { label: "Hold price, offer a longer contract", detail: "Trade a 24-month commitment for no discount.", fx: { mrr: 0, cash: 0 }, outcome: "They sign for two years. Cash is flat, and the account is now safer than it was." },
              { label: "Let them walk", detail: "Refocus on the two smaller accounts that are growing.", fx: { mrr: -5600, burn: -3000 }, outcome: "Revenue falls sharply. You cut the support contractor who mostly served them, which softens the blow." }
            ]
          },
          {
            title: "Collections slipped 45 days",
            text: "Two invoices worth $38,000 are stuck in a client's approval process. Payroll, rent and the tax instalment all land in the same week. The bank balance covers payroll but not the tax bill.",
            choices: [
              { label: "Skip founder salaries this month", detail: "You and your co-founder take nothing.", fx: { burn: -9000, cash: 0 }, outcome: "Cash is preserved and the team keeps its trust. Both founders lose a month of income." },
              { label: "Cut a contractor and a tool", detail: "Reduce capacity slightly to protect the balance.", fx: { burn: -5000, mrr: -1500 }, outcome: "Spending falls. One project slows down and a small account notices." },
              { label: "Take a short bridge loan", detail: "Expensive, fast, and it buys time.", fx: { cash: 40000, burn: 1500 }, outcome: "The tax bill is paid. You now have debt and a monthly interest cost." }
            ]
          },
          {
            title: "An enterprise prospect wants SSO",
            text: "A 300-seat prospect will prepay a year — $72,000 — if you ship single sign-on in six weeks. It would take two engineers off the roadmap.",
            choices: [
              { label: "Build it", detail: "Take the cash and the deadline.", fx: { cash: 72000, burn: 8000, mrr: 6000 }, outcome: "You ship late but they pay. Two engineers spend six weeks on one customer's requirement." },
              { label: "Offer a paid pilot instead", detail: "Smaller cheque, less scope.", fx: { cash: 18000, mrr: 1500 }, outcome: "They agree to a pilot without SSO. Less cash now, roadmap intact." },
              { label: "Decline and stay focused", detail: "Protect the product plan.", fx: { cash: 0, mrr: 0 }, outcome: "The prospect goes elsewhere. Your roadmap ships on time and the team stays focused." }
            ]
          },
          {
            title: "Two engineers are unhappy",
            text: "Two of your best engineers have offers elsewhere. Replacing them would cost roughly $30,000 in recruiting and months of lost velocity. They want more money and a clearer plan.",
            choices: [
              { label: "Raise their pay", detail: "Market rate plus a retention bonus.", fx: { burn: 6000, cash: -10000 }, outcome: "Both stay. Burn rises by $6k a month and the bonus hits cash immediately." },
              { label: "Give equity instead of cash", detail: "More ownership, no salary increase.", fx: { burn: 0, cash: 0 }, outcome: "They stay for now, though one is openly sceptical about the valuation." },
              { label: "Let one go", detail: "Consolidate and protect the runway.", fx: { burn: -9000, mrr: -3000 }, outcome: "One leaves. Costs fall, velocity drops, and a feature slips a quarter." }
            ]
          },
          {
            title: "A bridge offer, at a lower valuation",
            text: "An existing investor offers $150,000 as a bridge, at a valuation 30 percent below the last round. There are ten weeks of cash left.",
            choices: [
              { label: "Take the bridge", detail: "Cash now, dilution and a down round on record.", fx: { cash: 150000, burn: 0 }, outcome: "The runway extends and the down round is public at the next raise. The team is relieved." },
              { label: "Cut to break-even instead", detail: "No new money; shrink to survive.", fx: { burn: -18000, mrr: -4000, cash: -15000 }, outcome: "You reach near break-even with a smaller team. Growth slows sharply." },
              { label: "Sell the company", detail: "Take the offer on the table and end the game.", fx: { cash: 0, burn: 0, mrr: 0, sold: true }, outcome: "You accept an acquisition offer. The venture ends here, with the team employed and investors whole." }
            ]
          }
        ]
      }
    }
  ],

  resources: [
    { title: "Y Combinator Startup Library", type: "video", tags: ["general", "funding"], url: "https://www.ycombinator.com/library", note: "Talks and essays on validation, growth and fundraising from people who built companies." },
    { title: "Paul Graham essays", type: "article", tags: ["general", "funding"], url: "https://paulgraham.com/articles.html", note: "Long-form essays on starting and growing a company, including 'Do Things That Don't Scale'." },
    { title: "Strategyzer Business Model Canvas", type: "template", tags: ["model"], url: "https://www.strategyzer.com/library/the-business-model-canvas", note: "The original canvas, with a printable version and worked examples." },
    { title: "Stripe Atlas guides", type: "article", tags: ["legal", "funding"], url: "https://stripe.com/atlas/guides", note: "Plain-language guides to incorporation, fundraising and international expansion." },
    { title: "US Small Business Administration", type: "article", tags: ["legal", "general"], url: "https://www.sba.gov/business-guide", note: "Official US guide to registering, hiring, taxes and local support." },
    { title: "SBA local assistance", type: "tool", tags: ["general"], url: "https://www.sba.gov/local-assistance", note: "Find free advising, mentoring and small-business development centres near you (US)." },
    { title: "UK: set up a business", type: "article", tags: ["legal"], url: "https://www.gov.uk/set-up-business", note: "Official UK registration, tax and structure guidance." },
    { title: "Startup India", type: "tool", tags: ["funding", "legal"], url: "https://www.startupindia.gov.in", note: "Indian registration, tax benefits and grant programmes for startups." },
    { title: "Sequoia: writing a business plan", type: "template", tags: ["pitch"], url: "https://www.sequoiacap.com/article/writing-a-business-plan/", note: "A widely used outline for the plan behind the deck." },
    { title: "First Round Review", type: "article", tags: ["growth", "hiring"], url: "https://review.firstround.com", note: "Practical operating essays from founders and executives." },
    { title: "Indie Hackers", type: "community", tags: ["general", "marketing"], url: "https://www.indiehackers.com", note: "Bootstrapped founders sharing revenue numbers and acquisition tactics." },
    { title: "OpenStax Entrepreneurship", type: "article", tags: ["general"], url: "https://openstax.org/details/books/entrepreneurship", note: "A free, peer-reviewed textbook covering the full startup lifecycle." }
  ],

  templates: [
    {
      id: "canvas",
      title: "Business Model Canvas",
      desc: "A CSV you can open in Sheets or Excel, with a prompt for each of the nine blocks.",
      file: "business-model-canvas.csv",
      content: "Block,Prompt,Your answer\nCustomer segments,Who exactly has this problem and what do they share?,\nValue proposition,What outcome do they get and why is it better than the alternative?,\nChannels,How do they find out about you and buy?,\nCustomer relationships,How do you win, keep and grow them?,\nRevenue streams,Who pays, how much, how often, and why now?,\nKey resources,What must you own or control to deliver?,\nKey activities,What must you be excellent at?,\nKey partners,Who do you depend on and what do they get?,\nCost structure,What are the fixed and variable costs per customer?\n"
    },
    {
      id: "interview",
      title: "Customer interview script",
      desc: "Twelve questions that produce evidence instead of compliments.",
      file: "customer-interview-script.txt",
      content: "CUSTOMER INTERVIEW SCRIPT\n\nRules: ask about the past. Do not pitch. Write exact quotes.\n\n1. What is your role, and what does a normal week look like?\n2. Walk me through the last time [problem] happened.\n3. What did you do about it? What did you try first?\n4. How often does it happen? When was the worst time?\n5. What did it cost you in money, time or risk?\n6. What tools or people are involved today?\n7. What have you tried and stopped using? Why?\n8. Who else cares about this problem in your organisation?\n9. What would have to be true for you to change how you do it?\n10. Have you paid for anything to solve this? What and how much?\n11. If I could show you something, what would make it worth a second conversation?\n12. Who else should I speak to?\n\nAfterwards: did they describe the problem without being prompted? Y / N\nWould they prepay or sign a pilot? Y / N\n"
    },
    {
      id: "runway",
      title: "13-week cash tracker",
      desc: "The Monday-morning view that catches a crunch before payroll does.",
      file: "13-week-cash-tracker.csv",
      content: "Week,Opening cash,Cash in,Confidence (high/med/low),Cash out,Fixed costs,Payroll,Tax,Closing cash,Runway (months)\n1,,,,,,,,\n2,,,,,,,,\n3,,,,,,,,\n4,,,,,,,,\n5,,,,,,,,\n6,,,,,,,,\n7,,,,,,,,\n8,,,,,,,,\n9,,,,,,,,\n10,,,,,,,,\n11,,,,,,,,\n12,,,,,,,,\n13,,,,,,,,\n"
    },
    {
      id: "deck",
      title: "Ten-slide pitch outline",
      desc: "The claim each slide must prove, and what belongs in the appendix.",
      file: "pitch-outline.txt",
      content: "TEN-SLIDE PITCH OUTLINE\n\n1. Problem - one buyer, one costly problem, with evidence.\n2. Insight - what you know that others miss.\n3. Product - what it does, in one demo screenshot.\n4. Traction - slope, not total: revenue, retention or payback.\n5. Market - bottom-up size of the segment you can serve.\n6. Model - who pays, how much, gross margin, payback.\n7. Competition - the real alternatives, including doing nothing.\n8. Team - why this team wins this problem.\n9. Ask - amount, milestones it buys, what that unlocks.\n10. Appendix - cohorts, pipeline, unit economics, cap table.\n\nTest: every slide should change one belief. Cut the rest.\n"
    }
  ],

  posts: [
    { tag: "Validate", title: "Twelve interviews, zero prepay — what now?", body: "I spoke to twelve operations managers at small clinics. Everyone agreed the problem is real, but nobody would prepay for a pilot. I am treating that as a pricing problem, not a demand problem. Has anyone converted 'sounds useful' into a paid pilot?", author: "Sample post · early-stage founder" },
    { tag: "Funding", title: "Bridge at a down round or cut to break-even?", body: "Ten weeks of cash, an offer of $150k at 30 percent below the last round, and a team I do not want to lose. My instinct is to cut and keep control, but that slows the only channel that is working. Curious how others weighed this.", author: "Sample post · growth-stage owner" },
    { tag: "Legal", title: "Contractor wrote our first version — do we own it?", body: "No IP assignment was signed. The contractor is friendly and still invoices us monthly. We are about to raise and diligence will ask. Planning to sign a retroactive assignment for a small fee. Anyone been through this?", author: "Sample post · pre-launch" },
    { tag: "Sell", title: "One channel worked for four months, then stopped", body: "Cold email to a niche list produced our first 30 customers. Reply rates fell from 8 percent to under 1 percent. We changed nothing, which is probably the problem. What did you change first: list, offer or sender?", author: "Sample post · early-stage founder" }
  ]
};
