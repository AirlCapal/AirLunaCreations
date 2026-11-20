// AI Assistant knowledge base & intelligent NLP intent matcher for AirLuna Creations (ALC)
import portfolioData from '../data/portfolioData.json';

const { profile, categories } = portfolioData;

// Flatten all items with rich metadata for rapid search
const allWorks = categories.flatMap(cat => 
  (cat.items || []).map(item => ({
    ...item,
    categoryName: cat.label,
    categoryId: cat.id
  }))
);

export const SUGGESTED_PROMPTS = [
  "Show me your logo designs",
  "Tell me about Celestial Esports rebrand",
  "What is your tech & design stack?",
  "How can I hire you or get a quote?",
  "Show me UI/UX & Web projects",
  "Where are you located & contact info?",
  "Who is Airl? Tell me your story",
  "What client testimonials do you have?"
];

// Reliable section scroller with header offset compensation
export function scrollToSection(selector) {
  try {
    const el = document.querySelector(selector);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      return true;
    }
  } catch (e) {
    console.error('Scroll error:', e);
  }
  return false;
}

export function processUserQuery(input, { onSelectImage, onToggleTheme }) {
  const query = input.trim().toLowerCase();

  // 1. Theme toggle
  if (query.includes('dark mode') || query.includes('light mode') || query.includes('toggle theme') || query.includes('change theme') || query.includes('switch theme')) {
    if (onToggleTheme) onToggleTheme();
    return {
      text: "I've toggled the portfolio appearance theme for you! 🌗 You can switch anytime between Obsidian Dark and Studio Light.",
      actions: [
        { label: "Toggle Theme Again", target: "action", actionKey: "toggleTheme" }
      ]
    };
  }

  // 2. Who is Airl / Story / Bio / About (Personal background)
  if (query.includes('who are you') || query.includes('who is airl') || query.includes('tell me about yourself') || query.includes('bio') || query.includes('about airl') || query.includes('about yourself')) {
    return {
      text: `**Hey, I'm Airl** — graphic designer, brand strategist, and front-end developer based in Metro Manila.\n\n${profile.bio}\n\n• **Experience**: Nearly 6 years crafting identity systems, typography, esports branding, and intuitive front-end digital web interfaces.\n• **Creative Studio**: Founder & Lead Designer at **AirLuna Creations (ALC)**.`,
      actions: [
        { label: "View Career Path", target: "#chronicle" },
        { label: "View Genesis Story", target: "#prologue" },
        { label: "Explore Works", target: "#archive" }
      ]
    };
  }

  // 3. Navigation intents
  if (query.includes('go to') || query.includes('jump to') || query.includes('scroll to') || query.includes('navigate') || query.includes('section')) {
    if (query.includes('hero') || query.includes('top') || query.includes('home') || query.includes('prologue')) {
      scrollToSection('#prologue');
      return { text: "Navigated you straight to the top Genesis section.", actions: [{ label: "Back to Showcase", target: "#showcase" }] };
    }
    if (query.includes('logomark') || query.includes('logo') || query.includes('marks')) {
      scrollToSection('#marks');
      return { text: "Navigated you to Chapter 02: Logomarks & Contrast Canvas.", actions: [{ label: "View Marks", target: "#marks" }] };
    }
    if (query.includes('celestial') || query.includes('esports') || query.includes('rebrand') || query.includes('case study')) {
      scrollToSection('#celestial');
      return { text: "Navigated you to Chapter 03: Celestial Esports Complete Rebrand.", actions: [{ label: "Inspect Case Study", target: "#celestial" }] };
    }
    if (query.includes('print') || query.includes('poster') || query.includes('social') || query.includes('merch') || query.includes('apparel')) {
      scrollToSection('#print');
      return { text: "Navigated to Chapter 04: Print, Editorial & Social Collateral.", actions: [{ label: "View Prints", target: "#print" }] };
    }
    if (query.includes('web') || query.includes('digital') || query.includes('front-end') || query.includes('ui') || query.includes('ux')) {
      scrollToSection('#digital');
      return { text: "Navigated to Chapter 05: Front-End Craft & UI Architecture.", actions: [{ label: "View Digital UI", target: "#digital" }] };
    }
    if (query.includes('experience') || query.includes('career') || query.includes('chronicle') || query.includes('endorsements') || query.includes('review')) {
      scrollToSection('#chronicle');
      return { text: "Navigated to Chapter 06: Career Path & Endorsements.", actions: [{ label: "View Career Path", target: "#chronicle" }] };
    }
    if (query.includes('archive') || query.includes('all works') || query.includes('gallery') || query.includes('repository')) {
      scrollToSection('#archive');
      return { text: "Navigated to Chapter 07: Complete Work Archive (Filterable gallery).", actions: [{ label: "Browse Archive", target: "#archive" }] };
    }
    if (query.includes('contact') || query.includes('hire') || query.includes('touch') || query.includes('email')) {
      scrollToSection('#contact');
      return { text: "Navigated to the Contact & Project Inquiry section.", actions: [{ label: "Send Message", target: "#contact" }] };
    }
  }

  // 4. Contact & Hiring & Rates
  if (query.includes('hire') || query.includes('contact') || query.includes('email') || query.includes('rate') || query.includes('pricing') || query.includes('quote') || query.includes('phone') || query.includes('reach') || query.includes('cost') || query.includes('price')) {
    scrollToSection('#contact');
    return {
      text: `Airl is currently open for freelance projects, brand identity commissions, UI/UX design, and frontend development!\n\n• **Email**: [${profile.contacts.email}](mailto:${profile.contacts.email})\n• **Phone / WhatsApp**: ${profile.contacts.phone}\n• **Location**: ${profile.contacts.location}\n• **LinkedIn**: [Connect on LinkedIn](${profile.contacts.linkedin})\n• **Instagram**: [@airluna.creations](${profile.contacts.instagram})\n\nFill out the quick inquiry form below or shoot an email directly for customized scope & estimates!`,
      actions: [
        { label: "Go to Contact Form", target: "#contact" },
        { label: "Send Email", href: `mailto:${profile.contacts.email}` }
      ]
    };
  }

  // 5. Skills & Tech Stack
  if (query.includes('skill') || query.includes('tool') || query.includes('software') || query.includes('tech stack') || query.includes('photoshop') || query.includes('figma') || query.includes('code') || query.includes('react') || query.includes('stack')) {
    return {
      text: `Airl combines visual branding artistry with frontend engineering:\n\n**Core Design Disciplines:**\n${profile.skills.map(s => `• ${s}`).join('\n')}\n\n**Design & Tech Stack:**\n${profile.tools.map(t => `• ${t}`).join('\n')}`,
      actions: [
        { label: "View Web & UI Projects", target: "#digital" },
        { label: "View Logomarks", target: "#marks" }
      ]
    };
  }

  // 6. Celestial Esports Rebranding Case Study
  if (query.includes('celestial') || query.includes('esports') || query.includes('rebrand') || query.includes('phoenix') || query.includes('all-seeing eye') || query.includes('eye')) {
    scrollToSection('#celestial');
    return {
      text: `### Celestial Esports — Logo Rebranding & Identity System ✦\n\nWhen Airl took the helm as Creative Director for **Celestial Esports (2024–2025)**, the goal was a total visual evolution:\n\n• **Problem with Old Logo**: Overcomplicated crest with fine globe outlines and busy silhouette layers that blurred on small phone screens and jersey embroidery.\n• **The Solution**: A modern, aerodynamic geometric phoenix mark with razor-sharp vector balance.\n• **Symbology**:\n  - **The Phoenix**: Resilience, rebirth, and rising from tournament losses to claim championship victory.\n  - **The All-Seeing Eye**: Omniscience, clarity, and relentless focus on the competitive objective.\n• **Team Palette**: Obsidian Noir (\`#000000\`), Celestial Forest (\`#1A5A43\`), Jade Mint (\`#2563eb\`), and Citron Gold (\`#38bdf8\`).\n• **Full Collateral System**: Official team jerseys, matchday posters, roster announcements, broadcast lower-thirds, and social victory cards.\n\nI've scrolled directly to Chapter 03 where you can view the Master Rebrand Board, Old vs. New comparison, and color swatches!`,
      actions: [
        { label: "Inspect Rebrand Board", target: "#celestial" },
        { label: "View Team Jersey & Apparel", target: "#print" }
      ]
    };
  }

  // 7. Testimonials & Client Reviews
  if (query.includes('testimonial') || query.includes('review') || query.includes('feedback') || query.includes('client') || query.includes('endorsement')) {
    scrollToSection('#chronicle');
    const quotes = profile.testimonials.map(t => `• *" ${t.quote} "* — **${t.name}** (${t.role})`).join('\n\n');
    return {
      text: `Here is what clients and collaborators say about working with Airl:\n\n${quotes}`,
      actions: [
        { label: "View in Career Section", target: "#chronicle" },
        { label: "Work with Airl", target: "#contact" }
      ]
    };
  }

  // 8. Experience & Background
  if (query.includes('experience') || query.includes('background') || query.includes('work') || query.includes('career') || query.includes('education') || query.includes('degree') || query.includes('college') || query.includes('university') || query.includes('resume')) {
    scrollToSection('#chronicle');
    const expText = profile.experiences.map(e => `• **${e.role}** at *${e.company}* (${e.period}) — ${e.type}`).join('\n');
    const eduText = profile.education.map(ed => `• **${ed.degree}** — *${ed.institution}* (${ed.period})`).join('\n');
    return {
      text: `Here is Airl's professional timeline:\n\n**Key Positions:**\n${expText}\n\n**Education:**\n${eduText}`,
      actions: [
        { label: "View Career Chronicle", target: "#chronicle" }
      ]
    };
  }

  // 9. Logos & Brand Marks
  if (query.includes('logo') || query.includes('brand mark') || query.includes('icon') || query.includes('symbol') || query.includes('monogram')) {
    const logos = allWorks.filter(w => w.categoryId === 'logos');
    const preview = logos.slice(0, 4);
    scrollToSection('#marks');
    return {
      text: `Here are brand marks and logo designs created by Airl. The collection features ${logos.length} curated marks spanning minimalist monograms, esports crests, and corporate identity symbols.\n\nClick any thumbnail below to inspect it in full screen!`,
      items: preview,
      actions: [
        { label: "Explore Logomarks Canvas", target: "#marks" },
        { label: "Browse Full Archive", target: "#archive" }
      ]
    };
  }

  // 10. Web & UI/UX Design
  if (query.includes('web') || query.includes('ui') || query.includes('ux') || query.includes('frontend') || query.includes('front-end') || query.includes('app') || query.includes('dashboard') || query.includes('interface')) {
    const web = allWorks.filter(w => w.categoryId === 'web_ui');
    scrollToSection('#digital');
    return {
      text: `Airl designs clean, high-performance web experiences using React, Tailwind CSS, and Figma. Here are recent interface design works:`,
      items: web.slice(0, 4),
      actions: [
        { label: "View Digital UI Canvas", target: "#digital" }
      ]
    };
  }

  // 11. Posters, Pubmats & Social Media
  if (query.includes('poster') || query.includes('print') || query.includes('brochure') || query.includes('pubmat') || query.includes('publication') || query.includes('social') || query.includes('banner') || query.includes('flyer')) {
    const prints = allWorks.filter(w => w.categoryId === 'posters_flyers' || w.categoryId === 'social_media');
    scrollToSection('#print');
    return {
      text: `Airl has produced dozens of event publication materials, editorial posters, and high-converting social collateral:`,
      items: prints.slice(0, 4),
      actions: [
        { label: "View Editorial Canvas", target: "#print" }
      ]
    };
  }

  // 12. Lumière Brand Guide
  if (query.includes('lumiere') || query.includes('lumière') || query.includes('guide') || query.includes('branding')) {
    const guides = allWorks.filter(w => w.categoryId === 'brand_identity');
    return {
      text: `Here is the Lumière Brand Guidelines System — comprehensive brand strategy, typography scales, color harmonies, and stationery collateral boards:`,
      items: guides.slice(0, 4),
      actions: [
        { label: "Browse in Archive", target: "#archive" }
      ]
    };
  }

  // 13. General search across titles and categories
  const matches = allWorks.filter(w => 
    w.title.toLowerCase().includes(query) || 
    w.categoryName.toLowerCase().includes(query)
  );

  if (matches.length > 0) {
    return {
      text: `Found ${matches.length} matching piece${matches.length > 1 ? 's' : ''} for "${input}". Click on any work below to inspect in high-resolution:`,
      items: matches.slice(0, 4),
      actions: [
        { label: "Browse Full Archive", target: "#archive" }
      ]
    };
  }

  // 14. Friendly conversational fallback
  return {
    text: `I'm Luna, Airl's AI Concierge! ✦\n\nI can answer anything about Airl's work, background, and tech stack. Here are a few things you can ask me:\n\n• *"Show me your logo designs"*\n• *"Tell me about the Celestial Esports rebrand"*\n• *"What software & tools do you use?"*\n• *"How much does a brand package cost?"*\n• *"Scroll to career path or testimonials"*`,
    actions: [
      { label: "Explore All Works", target: "#archive" },
      { label: "Get in Touch", target: "#contact" }
    ]
  };
}
