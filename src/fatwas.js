// src/fatwas.js

// IMPORTANT:
// These are example entries with *short, paraphrased* content.
// For real use, YOU will paste the full fatwā text from IslamWeb / AskImam / etc.
// and keep the sourceName + sourceUrl accurate.

export const fatwas = [
  {
    id: 1,
    tags: ["five pillars", "pillars of islam", "arkan al islam", "islam basics"],
    question: "What are the five pillars of Islam?",
    answer: `
The scholars mention that Islam is built upon five foundational pillars:

1. Shahādah – bearing witness that there is no god worthy of worship except Allah and that Muhammad ﷺ is His Messenger.
2. Ṣalāh – performing the five daily prayers.
3. Zakāh – giving the obligatory charity to eligible recipients.
4. Ṣawm – fasting the month of Ramaḍān.
5. Ḥajj – performing the pilgrimage to Makkah once in a lifetime for those who are able.

These pillars are the basic outward acts that uphold a Muslim’s practice of the religion.
    `.trim(),
    sourceName: "IslamWeb (example)",
    sourceUrl: "https://www.islamweb.net/en/fatwa/88054/the-pillars-of-islam"
  },

  {
    id: 2,
    tags: ["six pillars", "pillars of faith", "iman", "arkan al iman"],
    question: "What are the six pillars of faith (īmān)?",
    answer: `
The pillars of īmān (faith) are six:

1. Belief in Allah.
2. Belief in His angels.
3. Belief in His revealed books.
4. Belief in His messengers.
5. Belief in the Last Day.
6. Belief in divine decree (al-qadr), its good and its apparent evil.

These are mentioned in the famous ḥadīth of Jibrīl where the Prophet ﷺ explained the meaning of īmān.
    `.trim(),
    sourceName: "IslamWeb (example)",
    sourceUrl: "https://www.islamweb.net/en/fatwa/65847/the-pillars-of-faith"
  },

  // Add more entries here as you build your library
];
