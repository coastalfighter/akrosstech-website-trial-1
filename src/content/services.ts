import type { IconName } from "@/components/ui/Icon";

export interface Feature {
  title: string;
  description: string;
  icon: IconName;
}

export interface Benefit {
  title: string;
  /** Optional detail — some benefits on the original site are title-only. */
  description?: string;
  icon: IconName;
}

export interface OutsourcingService {
  slug: string;
  /** Title used in navigation and headings. */
  title: string;
  /** Short title for tight spaces (bento tiles, marquee). */
  shortTitle: string;
  /** Card title + summary on the home page (verbatim from the current site). */
  cardTitle: string;
  cardSummary: string;
  /** Services-page summary (verbatim). */
  summary: string;
  icon: IconName;
  seo: { title: string; description: string };
  intro: string[];
  why: {
    eyebrow: string;
    heading: string;
    body: string[];
    benefits: Benefit[];
  };
  capabilities: {
    eyebrow: string;
    heading: string;
    body: string;
    items: Feature[];
  };
}

/**
 * The four existing outsourcing services. All copy is carried over from
 * akrosstech.com unchanged (see docs/CONTENT_INVENTORY.md).
 */
export const outsourcingServices: OutsourcingService[] = [
  {
    slug: "recruitment-process-outsourcing",
    title: "Recruitment Process Outsourcing",
    shortTitle: "Recruitment (RPO)",
    cardTitle: "Recruitment Support",
    cardSummary:
      "From sourcing to onboarding, we handle the entire hiring cycle for startups, staffing agencies, and enterprise clients.",
    summary:
      "We help you build top-tier teams by managing your hiring end-to-end. From sourcing and screening to onboarding, our recruiters plug into your operations to reduce cost-per-hire and time-to-fill—without compromising quality.",
    icon: "users",
    seo: {
      title: "Recruitment Process Outsourcing (RPO) Services",
      description:
        "End-to-end Recruitment Process Outsourcing for U.S. businesses — sourcing, screening and onboarding that reduce cost-per-hire and time-to-fill without compromising quality.",
    },
    intro: [
      "Recruitment Process Outsourcing (RPO) is more than just hiring help—it’s a long-term strategic partnership where Akrostech becomes an extension of your talent acquisition team. We take full ownership or partial responsibility of your recruitment process, depending on your business needs.",
      "Whether you’re building a new team or scaling rapidly, our RPO services help you hire faster, smarter, and more cost-effectively—without compromising on quality.",
    ],
    why: {
      eyebrow: "Why Companies",
      heading: "Trust Akrostech",
      body: [
        "Companies across the United States choose Akrostech because we combine global talent efficiency with a deep understanding of local hiring dynamics.",
        "Our U.S.-aligned Work Force work in real-time with your team, ensuring speed, transparency, and cultural compatibility.",
        "From startups to large enterprises, clients trust us to deliver qualified candidates, reduce hiring costs, and scale their teams quickly—without the overhead of managing internal recruitment.",
        "With a flexible, performance-driven model and a proven track record across industries, Akrostech is the go-to Outsourcing partner for businesses that value results.",
      ],
      benefits: [
        { title: "Significant Cost Savings", icon: "coins" },
        { title: "U.S. Time Zone Alignment", icon: "clock" },
        { title: "Domain-Specific Expertise", icon: "award" },
        { title: "Scalability on Demand", icon: "trending" },
        { title: "Performance Transparency", icon: "eye" },
        { title: "Performance Analytics & Reporting", icon: "chart" },
      ],
    },
    capabilities: {
      eyebrow: "Industries",
      heading: "We Recruit For",
      body: "We specialize in recruitment across a wide range of U.S. industries, including Healthcare, IT, BFSI, Manufacturing, Sales, Customer Service, Construction, E-commerce, Education, and Administration. Whether you’re hiring niche professionals or high-volume roles, our domain-focused recruiters deliver top-tier talent tailored to your business needs.",
      items: [
        {
          title: "Technology & IT",
          icon: "code",
          description:
            "We connect businesses with top-tier tech talent—including software developers, cloud engineers, DevOps experts, and IT support—who drive digital innovation and operational efficiency. Whether you're building products or managing infrastructure, we find the right fit fast.",
        },
        {
          title: "Healthcare & Life Sciences",
          icon: "heartPulse",
          description:
            "We specialize in recruiting medical professionals, caregivers, clinical staff, and sales reps for healthcare providers, hospitals, and life sciences companies. Our talent solutions support both frontline care and behind-the-scenes operations across the U.S.",
        },
        {
          title: "Banking, Finance & Accounting",
          icon: "landmark",
          description:
            "We recruit skilled accountants, financial analysts, bookkeepers, tax preparers, and banking professionals who bring accuracy, compliance, and financial insight to your organization. Our talent supports everything from daily bookkeeping to complex financial strategy.",
        },
        {
          title: "Engineering & Manufacturing",
          icon: "factory",
          description:
            "We source experienced engineers, project managers, technicians, and skilled tradespeople for both field and factory roles. From product design to production, our talent helps you build smarter, safer, and more efficiently.",
        },
        {
          title: "Corporate & Administrative",
          icon: "building",
          description:
            "We provide reliable executive assistants, office managers, HR professionals, and administrative staff who keep your business operations organized, efficient, and professional. Ideal support for day-to-day workflows and strategic execution.",
        },
        {
          title: "Sales & Customer Service",
          icon: "headset",
          description:
            "We recruit dynamic sales professionals and customer support agents who drive revenue and build strong client relationships. From inside sales to tech support, our candidates are trained to perform and represent your brand with excellence.",
        },
      ],
    },
  },
  {
    slug: "virtual-assistance",
    title: "Virtual Assistance",
    shortTitle: "Virtual Assistance",
    cardTitle: "Virtual Assistance",
    cardSummary:
      "Delegate your daily tasks to skilled remote assistants who work like an extension of your in-house team.",
    summary:
      "Our trained virtual assistants handle your daily tasks with precision—from calendar management to client follow-ups—so you can focus on high-impact work. Flexible plans, 100% reliable support, and real-time collaboration.",
    icon: "headset",
    seo: {
      title: "Virtual Assistant Services for U.S. Businesses",
      description:
        "Dedicated, college-educated virtual assistants aligned to U.S. time zones — admin, customer support, social media, content and data entry at up to 70% lower cost.",
    },
    intro: [
      "At Akrostech Consulting, we provide highly skilled Virtual Assistants (VAs) to U.S.-based businesses looking to reduce costs and increase operational efficiency. Whether you’re a startup founder juggling tasks or a growing enterprise in need of process support, our India-based VAs become your extended team—delivering professionalism, productivity, and reliability.",
    ],
    why: {
      eyebrow: "Why U.S. Companies",
      heading: "Choose Our VAs",
      body: [
        "Akrostech Consulting offers dedicated Virtual Assistants (VAs) to support your U.S.-based business with day-to-day operations. Our India-based VAs are professionally trained, cost-effective, and available across U.S. time zones. From handling your inbox to managing your digital presence, we make scaling your business simple and seamless.",
      ],
      benefits: [
        {
          title: "Time Zone Alignment",
          description: "Work in your hours, EST, CST, MST, PST- no problem.",
          icon: "clock",
        },
        {
          title: "Cost Savings",
          description: "Up to 70% lower cost than U.S.-based employees.",
          icon: "coins",
        },
        {
          title: "Dedicated Resources",
          description: "Not shared. Your VA works only for you.",
          icon: "userCheck",
        },
        { title: "Quick Onboarding", description: "Start in as little as 48 hours.", icon: "zap" },
        {
          title: "Highly Vetted Talent",
          description: "English-speaking, tech-savvy, and college-educated.",
          icon: "award",
        },
        {
          title: "Scalable Support",
          description: "Start with one VA, scale as you grow.",
          icon: "trending",
        },
      ],
    },
    capabilities: {
      eyebrow: "What Our Virtual Assistants",
      heading: "Can Do for You",
      body: "Our Virtual Assistants are skilled professionals trained to support a wide range of business needs. Whether you’re looking to streamline operations or free up your time, our team is equipped to handle it all with precision and efficiency.",
      items: [
        {
          title: "Administrative Tasks",
          icon: "calendar",
          description:
            "Calendar management, appointment scheduling, document handling, and task tracking to keep your operations organized and efficient.",
        },
        {
          title: "Customer Support",
          icon: "message",
          description:
            "Live chat, phone, and email support that speaks your brand’s voice—ensuring every customer gets quick, professional assistance.",
        },
        {
          title: "Social Media Management",
          icon: "share",
          description:
            "Post scheduling, comment moderation, engagement tracking, and insights reporting across all major platforms.",
        },
        {
          title: "Content Creation",
          icon: "pen",
          description:
            "Blog drafts, email newsletters, product descriptions, captions, and other marketing copy created with clarity and consistency.",
        },
        {
          title: "Data Entry & Management",
          icon: "database",
          description:
            "Accurate and timely entry, formatting, and management of business data, CRM updates, spreadsheets, and databases.",
        },
        {
          title: "Personal Assistance",
          icon: "heart",
          description:
            "Handle personal to-do’s, errands, reservations, reminders, and more—so you can focus on what truly matters.",
        },
      ],
    },
  },
  {
    slug: "accounting-assistance",
    title: "Accounting Assistance",
    shortTitle: "Accounting",
    cardTitle: "Accounting Support",
    cardSummary:
      "Access qualified accountants and bookkeepers to manage your numbers with accuracy and compliance.",
    summary:
      "From invoicing and expense tracking to monthly reconciliations and reporting, we offer expert accounting support tailored for your business. Compliance-ready, error-free, and always on time.",
    icon: "calculator",
    seo: {
      title: "Outsourced Accounting & Bookkeeping Services",
      description:
        "Outsourced payroll, taxation support, AR/AP and invoicing for U.S. businesses — experienced with QuickBooks, Xero and Zoho Books, compliance-ready and always on time.",
    },
    intro: [
      "Akrostech Consulting provides reliable and scalable outsourced accounting services for U.S.-based businesses. Our India-based accountants and finance professionals offer end-to-end support in payroll, taxation, AR/AP, and invoicing—helping you maintain financial accuracy, improve compliance, and reduce overhead costs.",
    ],
    why: {
      eyebrow: "Why Businesses",
      heading: "Trust Akrostech for Accounting",
      body: [
        "U.S. businesses choose Akrostech for our accuracy, confidentiality, and familiarity with U.S. accounting systems and compliance standards. Our India-based team is experienced with QuickBooks, Xero, Zoho Books, and other major accounting platforms—delivering work that meets the expectations of your CPA or internal finance team.",
      ],
      benefits: [
        { title: "U.S. Accounting Standards Compliance", icon: "clipboardCheck" },
        { title: "Expertise in Leading Tools", icon: "fileSpreadsheet" },
        { title: "Significant Cost Savings", icon: "coins" },
        { title: "Data Security & Confidentiality", icon: "lock" },
        { title: "Dedicated & Scalable Support", icon: "trending" },
        { title: "Timely & Accurate Reporting", icon: "chart" },
      ],
    },
    capabilities: {
      eyebrow: "What Our Accounting Experts",
      heading: "Can Do for You",
      body: "Our finance team works as an extension of your business, ensuring your books are accurate, up-to-date, and audit-ready. Whether you’re a small business owner or a large enterprise, we bring precision and professionalism to every transaction.",
      items: [
        {
          title: "Payroll Processing",
          icon: "wallet",
          description:
            "Timely payroll runs, tax deductions, direct deposit setup, and payroll reporting—fully compliant with U.S. payroll standards.",
        },
        {
          title: "Taxation Support",
          icon: "receipt",
          description:
            "Support with tax filing preparation, 1099 processing, sales tax reconciliation, and coordination with your CPA or tax advisor.",
        },
        {
          title: "Accounts Receivable (AR)",
          icon: "banknote",
          description:
            "Invoice generation, payment tracking, aging reports, and client follow-ups to accelerate your cash flow.",
        },
        {
          title: "Accounts Payable (AP)",
          icon: "creditCard",
          description:
            "Vendor bill processing, due date tracking, and timely payments to maintain strong supplier relationships.",
        },
        {
          title: "Invoicing & Billing",
          icon: "fileText",
          description:
            "Custom invoice creation, recurring billing setup, and error-free entries aligned with your accounting software.",
        },
      ],
    },
  },
  {
    slug: "legal-process-outsourcing",
    title: "Legal Process Outsourcing",
    shortTitle: "Legal (LPO)",
    cardTitle: "Legal Assistance",
    cardSummary:
      "Streamline your legal workflows with trained professionals who handle documentation, research, and compliance with precision.",
    summary:
      "Our team delivers accurate and confidential legal back-office support—from document review and contract management to legal research. Designed for law firms, startups, and legal departments that want to scale efficiently.",
    icon: "scale",
    seo: {
      title: "Legal Process Outsourcing (LPO) Services",
      description:
        "Confidential Legal Process Outsourcing for U.S. law firms — document management, research and case support trained on U.S. legal standards at up to 60–70% lower cost.",
    },
    intro: [
      "Akrostech Consulting offers reliable and confidential Legal Process Outsourcing (LPO) services to law firms and legal departments across the United States. Our India-based legal professionals are trained to work with U.S. legal systems, helping your firm reduce overhead, improve turnaround time, and focus on core legal strategies—while we take care of the rest.",
    ],
    why: {
      eyebrow: "Why Law Firms",
      heading: "Trust Akrostech for LPO",
      body: [
        "U.S. law firms rely on Akrostech for our deep understanding of American legal standards, strict confidentiality protocols, and cost-efficient delivery. Our India-based legal professionals seamlessly integrate with your team, providing accurate, timely, and secure support that helps you stay focused on high-value legal work.",
      ],
      benefits: [
        {
          title: "U.S. Legal Standards",
          description: "We understand U.S. legal terminology, compliance, and protocols",
          icon: "gavel",
        },
        {
          title: "Cost-Effective",
          description: "Up to 60–70% lower cost than in-house legal support",
          icon: "coins",
        },
        {
          title: "Confidential & Secure",
          description:
            "Strong NDAs, secure data systems, and full compliance with ethical standards",
          icon: "lock",
        },
        {
          title: "24/7 Availability",
          description: "Get support even outside your local business hours",
          icon: "clock",
        },
        {
          title: "Scalable Model",
          description: "Project-based or long-term dedicated legal assistants",
          icon: "trending",
        },
      ],
    },
    capabilities: {
      eyebrow: "What Our Legal Assistants",
      heading: "Can Do for You",
      body: "Our LPO team acts as an extension of your in-house legal staff, supporting your daily operations with accuracy, discretion, and efficiency. Whether it’s managing documents or conducting in-depth research, we deliver the support you need—on time and on budget.",
      items: [
        {
          title: "Family Law",
          icon: "users",
          description: "Case documentation, scheduling, and client communication.",
        },
        {
          title: "Personal Injury & Medical Law",
          icon: "heartPulse",
          description:
            "Intake support, billing disputes, insurance coordination, medical record retrieval, and demand letter drafting.",
        },
        {
          title: "Criminal & Civil Litigation",
          icon: "gavel",
          description: "Calendar coordination, discovery support, and case filing.",
        },
        {
          title: "Immigration Law",
          icon: "plane",
          description: "Form preparation, case tracking, and document verification",
        },
        {
          title: "Bankruptcy & Insolvency",
          icon: "scroll",
          description: "Petition prep, file organization, and compliance checks.",
        },
        {
          title: "Real Estate Law",
          icon: "house",
          description: "Title reviews, contract prep, and document management.",
        },
      ],
    },
  },
];

export function getOutsourcingService(slug: string): OutsourcingService | undefined {
  return outsourcingServices.find((service) => service.slug === slug);
}

/** Summary of the new Website Development service for cards/bento tiles. */
export const websiteDevelopmentCard = {
  slug: "website-development",
  title: "Website Development",
  shortTitle: "Website Development",
  cardTitle: "Website Development",
  cardSummary:
    "Custom websites, e-commerce stores and web applications—designed to convert, engineered to perform, and supported long after launch.",
  summary:
    "From high-converting landing pages to full-scale web applications, our designers and developers build fast, secure, SEO-friendly websites on modern stacks like React, Next.js, WordPress and Shopify—delivered by a U.S.-aligned team at offshore cost.",
  icon: "code" as IconName,
};

/** Every service in display order (new service first). */
export const allServiceCards = [
  websiteDevelopmentCard,
  ...outsourcingServices.map(
    ({ slug, title, shortTitle, cardTitle, cardSummary, summary, icon }) => ({
      slug,
      title,
      shortTitle,
      cardTitle,
      cardSummary,
      summary,
      icon,
    }),
  ),
];
