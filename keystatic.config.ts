import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? { kind: 'github', repo: 'AndyWinkler/web-3choa' }
    : { kind: 'local' },

  ui: {
    brand: { name: '3c HOA CMS' },
  },

  singletons: {
    home: singleton({
      label: 'Homepage',
      path: 'src/content/home',
      format: { data: 'yaml' },
      schema: {
        heroHeadline: fields.text({ label: 'Hero headline', defaultValue: 'Community · Care · Connect' }),
        heroSubline: fields.text({ label: 'Hero subline', multiline: true, defaultValue: 'We provide customized property management services to elevate the value and efficiency of your community.' }),
        heroCta: fields.text({ label: 'Hero CTA button', defaultValue: 'Get Started' }),
        heroPortalLabel: fields.text({ label: 'Hero portal button', defaultValue: 'Homeowner Portal' }),
        whyHeadline: fields.text({ label: 'Why 3c — headline', defaultValue: 'Why 3c HOA Management?' }),
        whyBody: fields.text({ label: 'Why 3c — body', multiline: true, defaultValue: 'With over 10 years of community association management experience, we combine industry expertise with genuine care for every community we serve.' }),
        whyBullets: fields.array(
          fields.text({ label: 'Bullet point' }),
          { label: 'Why 3c — bullet points', itemLabel: (props) => props.value || 'Bullet' }
        ),
        ctaHeadline: fields.text({ label: 'CTA headline', defaultValue: 'Ready to elevate your community?' }),
        ctaSubline: fields.text({ label: 'CTA subline', multiline: true, defaultValue: "Let's talk about your community's unique needs." }),
      },
    }),

    about: singleton({
      label: 'About page',
      path: 'src/content/about',
      format: { data: 'yaml' },
      schema: {
        heroHeadline: fields.text({ label: 'Hero headline', defaultValue: 'About 3c HOA Management' }),
        heroSubline: fields.text({ label: 'Hero subline', multiline: true, defaultValue: 'We believe every community deserves professional management built on integrity, care, and connection.' }),
        missionHeadline: fields.text({ label: 'Mission headline', defaultValue: 'Our Mission' }),
        missionBody: fields.text({ label: 'Mission body', multiline: true, defaultValue: "To provide transparent and effective management that puts our clients' interests first — building communities where everyone feels at home." }),
        teamHeadline: fields.text({ label: 'Team headline', defaultValue: 'Meet Our Team' }),
        carissaTitle: fields.text({ label: 'Carissa — title', defaultValue: 'Co-Founder & CEO' }),
        carissaBio: fields.text({ label: 'Carissa — bio', multiline: true, defaultValue: 'With over 20 years in real estate and 10+ years in community association management and owner representation, Carissa brings deep expertise and genuine care to every community she serves.' }),
        valuesHeadline: fields.text({ label: 'Values headline', defaultValue: 'Our Values' }),
      },
    }),

    services: singleton({
      label: 'Services page',
      path: 'src/content/services',
      format: { data: 'yaml' },
      schema: {
        heroHeadline: fields.text({ label: 'Hero headline', defaultValue: 'Our Services' }),
        heroSubline: fields.text({ label: 'Hero subline', multiline: true, defaultValue: "Comprehensive HOA management solutions tailored to your community's unique needs." }),
        pmHeadline: fields.text({ label: 'Property Management — headline', defaultValue: 'Property Management' }),
        pmBody: fields.text({ label: 'Property Management — body', multiline: true, defaultValue: 'We handle the full scope of community operations so your board can focus on big-picture goals.' }),
        pmBullets: fields.array(fields.text({ label: 'Bullet' }), { label: 'Property Management bullets', itemLabel: (p) => p.value || 'Bullet' }),
        acctHeadline: fields.text({ label: 'Accounting — headline', defaultValue: 'Accounting' }),
        acctBody: fields.text({ label: 'Accounting — body', multiline: true, defaultValue: 'Sound financial management is the backbone of a healthy HOA.' }),
        acctBullets: fields.array(fields.text({ label: 'Bullet' }), { label: 'Accounting bullets', itemLabel: (p) => p.value || 'Bullet' }),
        ownersRepHeadline: fields.text({ label: "Owner's Rep — headline", defaultValue: "Owner's Representative" }),
        ownersRepBody: fields.text({ label: "Owner's Rep — body", multiline: true, defaultValue: 'When your community undertakes capital reserve projects, you need an experienced advocate in your corner.' }),
        ownersRepBullets: fields.array(fields.text({ label: 'Bullet' }), { label: "Owner's Rep bullets", itemLabel: (p) => p.value || 'Bullet' }),
        insuranceHeadline: fields.text({ label: 'Insurance — headline', defaultValue: 'Insurance Claims Assistance' }),
        insuranceBody: fields.text({ label: 'Insurance — body', multiline: true, defaultValue: 'Navigating insurance claims is complex. We guide your community through every step.' }),
        insuranceBullets: fields.array(fields.text({ label: 'Bullet' }), { label: 'Insurance bullets', itemLabel: (p) => p.value || 'Bullet' }),
      },
    }),

    faqPage: singleton({
      label: 'FAQ page',
      path: 'src/content/faq-page',
      format: { data: 'yaml' },
      schema: {
        heroHeadline: fields.text({ label: 'Hero headline', defaultValue: 'Frequently asked questions' }),
        heroSubline: fields.text({ label: 'Hero subline', multiline: true, defaultValue: 'Common questions about HOA management, our services, and working with 3c HOA Management.' }),
        questions: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'Questions', itemLabel: (props) => props.fields.question.value || 'Question' }
        ),
        stillQuestionsHeading: fields.text({ label: '"Still have questions?" heading', defaultValue: 'Still have questions?' }),
        stillQuestionsBody: fields.text({ label: '"Still have questions?" body', multiline: true, defaultValue: "We're happy to talk through your specific situation." }),
      },
    }),

    site: singleton({
      label: 'Site settings',
      path: 'src/content/site',
      format: { data: 'yaml' },
      schema: {
        footerTagline: fields.text({ label: 'Footer tagline', multiline: true, defaultValue: 'Providing customized HOA management services that elevate the value and efficiency of your community.' }),
        contactHeroHeadline: fields.text({ label: 'Contact page — headline', defaultValue: "Let's talk." }),
        contactHeroSubline: fields.text({ label: 'Contact page — subline', multiline: true, defaultValue: "Questions about your community, our services, or getting started? Send us a note and we'll respond within one business day." }),
        contactSuccessHeading: fields.text({ label: 'Contact — success heading', defaultValue: 'Message received' }),
        contactSuccessBody: fields.text({ label: 'Contact — success body', multiline: true, defaultValue: "We'll be in touch within one business day. Thank you!" }),
      },
    }),
  },
});
