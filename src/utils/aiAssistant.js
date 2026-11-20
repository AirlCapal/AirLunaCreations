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
  "What is your design & tech stack?",
  "Tell me about Celestial Esports rebrand",
  "How can I hire you or get a quote?",
  "Show me UI/UX & Web projects",
  "Where are you located & contact info?"
];

export function processUserQuery(input, { onSelectImage, onNavigate, onToggleTheme }) {
  const query = input.trim().toLowerCase();

  // 1. Theme toggle
  if (query.includes('dark mode') || query.includes('light mode') || query.includes('toggle theme') || query.includes('change theme')) {
    if (onToggleTheme) onToggleTheme();
    return {
      text: "I've toggled the portfolio appearance theme for you! 🌗 Let me know if you prefer dark obsidian or light studio mode.",
      actions: []
    };
  }

  // 2. Navigation intents
  if (query.includes('go to') || query.includes('jump to') || query.includes('scroll to') || query.includes('section')) {
    if (query.includes('hero') || query.includes('top') || query.includes('home')) {
      scrollToSection('#hero');
      return { text: "Navigated you straight to the top overview.", actions: [] };
    }
    if (query.includes('logomark') || query.includes('logo')) {
      scrollToSection('#logomarks');
      return { text: "Navigated you to Chapter 02: Logomarks & Contrast Canvas.", actions: [] };
    }
    if (query.includes('celestial') || query.includes('rebrand') || query.includes('case study')) {
      scrollToSection('#rebrand');
      return { text: "Navigated you to the Celestial Esports Rebranding Case Study.", actions: [] };
    }
    if (query.includes('print') || query.includes('poster') || query.includes('social') || query.includes('merch')) {
      scrollToSection('#prints');
      return { text: "Navigated to Chapter 04: Print, Editorial & Social Collateral.", actions: [] };
    }
    if (query.includes('web') || query.includes('digital') || query.includes('front-end') || query.includes('ui')) {
      scrollToSection('#digital');
      return { text: "Navigated to Chapter 05: Front-End Craft & UI Architecture.", actions: [] };
    }
    if (query.includes('about') || query.includes('experience') || query.includes('career') || query.includes('profile')) {
      scrollToSection('#profile');
      return { text: "Navigated to Chapter 06: Career Path & Endorsements.", actions: [] };
    }
    if (query.includes('archive') || query.includes('all works') || query.includes('repository')) {
      scrollToSection('#archive');
      return { text: "Navigated to Chapter 07: Complete Work Archive (Filterable gallery).", actions: [] };
    }
    if (query.includes('contact') || query.includes('hire')) {
      scrollToSection('#contact');
      return { text: "Navigated to the Contact & Hire Me section.", actions: [] };
    }
  }

  // 3. Contact & Hiring
  if (query.includes('hire') || query.includes('contact') || query.includes('email') || query.includes('rate') || query.includes('pricing') || query.includes('quote') || query.includes('phone') || query.includes('reach')) {
    scrollToSection('#contact');
    return {
      text: `Airl is currently open for freelance projects, brand identity commissions, and front-end development roles!\n\n• **Email**: [${profile.contacts.email}](mailto:${profile.contacts.email})\n• **Phone / WhatsApp**: ${profile.contacts.phone}\n• **Location**: ${profile.contacts.location}\n• **LinkedIn**: [Profile](${profile.contacts.linkedin})\n• **Instagram**: [@airluna.creations](${profile.contacts.instagram})\n\nI've also scrolled down to the direct contact form for you!`,
      actions: [
        { label: "Open Contact Form", onClick: () => scrollToSection('#contact') },
        { label: "Send Email", href: `mailto:${profile.contacts.email}` }
      ]
    };
  }

  // 4. Skills & Tech Stack
  if (query.includes('skill') || query.includes('tool') || query.includes('software') || query.includes('tech stack') || query.includes('photoshop') || query.includes('figma') || query.includes('code') || query.includes('react')) {
    return {
      text: `Airl bridges visual artistry with frontend engineering:\n\n**Design Disciplines:**\n${profile.skills.map(s => `• ${s}`).join('\n')}\n\n**Software & Tech Stack:**\n${profile.tools.map(t => `• ${t}`).join('\n')}`,
      actions: [
        { label: "View Web & UI Projects", onClick: () => scrollToSection('#digital') }
      ]
    };
  }

  // 5. Celestial Esports Rebrand
  if (query.includes('celestial') || query.includes('esports') || query.includes('rebrand') && !query.includes('logo')) {
    scrollToSection('#rebrand');
    return {
      text: `As Creative Director for **Celestial Esports (2024–2025)**, Airl led a total visual transformation:\n\n• Reconstructed brand marks with mythical geometry & astronomical motifs\n• Designed official competitive esports jerseys, apparel mockups, and merchandise\n• Created social media tournament graphics, stream overlays, and banners\n\nI've navigated you to the interactive Celestial Case Study section.`,
      actions: [
        { label: "Jump to Case Study", onClick: () => scrollToSection('#rebrand') }
      ]
    };
  }

  // 6. Experience & Education
  if (query.includes('experience') || query.includes('background') || query.includes('work') || query.includes('career') || query.includes('education') || query.includes('degree') || query.includes('college')) {
    const expText = profile.experiences.map(e => `• **${e.role}** at *${e.company}* (${e.period}) — ${e.type}`).join('\n');
    const eduText = profile.education.map(ed => `• **${ed.degree}** — *${ed.institution}* (${ed.period})`).join('\n');
    return {
      text: `Here is a summary of Airl's background:\n\n**Key Roles:**\n${expText}\n\n**Education:**\n${eduText}`,
      actions: [
        { label: "View Endorsements", onClick: () => scrollToSection('#profile') }
      ]
    };
  }

  // 7. Specific Work Searches / Logo / Posters / Web
  if (query.includes('logo') || query.includes('brand mark') || query.includes('icon')) {
    const logos = allWorks.filter(w => w.categoryId === 'logos');
    const preview = logos.slice(0, 3);
    scrollToSection('#logomarks');
    return {
      text: `Here are brand marks and logo designs by Airl. There are ${logos.length} curated marks in the collection (including vector marks, monograms, and emblems). Click any thumbnail below to inspect it in full screen!`,
      items: preview,
      actions: [
        { label: "Explore Logomarks Canvas", onClick: () => scrollToSection('#logomarks') }
      ]
    };
  }

  if (query.includes('web') || query.includes('ui') || query.includes('front-end') || query.includes('frontend') || query.includes('website')) {
    const web = allWorks.filter(w => w.categoryId === 'web_ui');
    scrollToSection('#digital');
    return {
      text: `Airl designs and builds intuitive user interfaces using React, Tailwind CSS, and modern web architectures. Here are samples from recent web apps and dashboards:`,
      items: web.slice(0, 3),
      actions: [
        { label: "View Interactive Showcase", onClick: () => scrollToSection('#digital') }
      ]
    };
  }

  if (query.includes('poster') || query.includes('print') || query.includes('brochure') || query.includes('pubmat') || query.includes('publication')) {
    const posters = allWorks.filter(w => w.categoryId === 'posters_flyers' || w.categoryId === 'social_media');
    scrollToSection('#prints');
    return {
      text: `Airl has produced dozens of event publication materials, editorial posters, and high-converting marketing pubmats:`,
      items: posters.slice(0, 3),
      actions: [
        { label: "View Editorial Canvas", onClick: () => scrollToSection('#prints') }
      ]
    };
  }

  if (query.includes('lumiere') || query.includes('lumière') || query.includes('guide')) {
    const guides = allWorks.filter(w => w.categoryId === 'brand_identity');
    return {
      text: `Here is the Lumière Brand Identity System and curated visual guidelines boards:`,
      items: guides.slice(0, 4),
      actions: [
        { label: "View in Archive", onClick: () => scrollToSection('#archive') }
      ]
    };
  }

  // 8. General search across titles and categories
  const matches = allWorks.filter(w => 
    w.title.toLowerCase().includes(query) || 
    w.categoryName.toLowerCase().includes(query)
  );

  if (matches.length > 0) {
    return {
      text: `Found ${matches.length} matching piece${matches.length > 1 ? 's' : ''} for "${input}". Click on any work to view in high resolution:`,
      items: matches.slice(0, 4),
      actions: [
        { label: "Browse Full Archive", onClick: () => scrollToSection('#archive') }
      ]
    };
  }

  // 9. Friendly conversational fallback
  return {
    text: `I'm Luna, Airl's AI Assistant! ✦\n\nI can help you navigate through Airl's work, inspect high-res designs, review skills and tech stacks, check experience and testimonials, or book a project.\n\nTry clicking one of the suggested prompts or ask me anything!`,
    actions: [
      { label: "View All Works", onClick: () => scrollToSection('#archive') },
      { label: "Get in Touch", onClick: () => scrollToSection('#contact') }
    ]
  };
}

function scrollToSection(selector) {
  try {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (e) {
    console.error('Scroll error:', e);
  }
}
