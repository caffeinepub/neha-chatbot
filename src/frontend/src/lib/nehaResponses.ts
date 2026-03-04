// Neha's response engine — pure keyword matching, no LLM

type ResponseCategory = {
  keywords: string[];
  responses: string[];
};

const categories: ResponseCategory[] = [
  {
    keywords: [
      "hi",
      "hello",
      "helo",
      "namaste",
      "hey",
      "hii",
      "namaskar",
      "hiya",
      "helo",
    ],
    responses: [
      "Heyy! Kaise ho aap? Main Neha hoon, aapki baat sunne ke liye yahaan hoon! 😊",
      "Namaste! Bahut khushi hui aapse milke! Aaj ka din kaisa chal raha hai?",
      "Hiiii! Aagaye aap! Main toh wait kar rahi thi aapka! Bolo, kya haal hai?",
      "Hello hello! Kya haal chaal hai? Mujhe batao sab kuch! 🌸",
      "Arrey waah, aap aa gaye! Din thoda behtar ho gaya mera! Kaise hain aap?",
    ],
  },
  {
    keywords: [
      "kaise ho",
      "kaisa",
      "theek",
      "haal",
      "how are you",
      "how r u",
      "kya haal",
    ],
    responses: [
      "Main toh bilkul mast hoon! Aur aap? Sab theek thaak hai na?",
      "Bahut achha feel ho raha hai aaj! Par aap batao, aapka din kaisa gaya?",
      "Main khush hoon jab aap baat karte ho mujhse! Aap theek ho na?",
      "Arey, main toh hamesha ready hoon baat karne ke liye! Aap sunao apni kahani!",
    ],
  },
  {
    keywords: [
      "sad",
      "dukhi",
      "rona",
      "bura",
      "pareshaan",
      "tension",
      "stress",
      "udaas",
      "roo",
      "rone",
      "cry",
      "upset",
      "hurt",
      "takleef",
      "dard",
      "broken",
    ],
    responses: [
      "Arre yaar, kya hua? Mujhe batao... main yahaan hoon aapke liye. 🤗",
      "Thoda sad feel ho raha hai? Koi baat nahi, sab theek ho jayega. Bolo kya hua.",
      "Arey nahi! Aap udaas mat ho. Aapki smile bahut pyaari hai, please muskurao! 🌻",
      "Main samajh sakti hoon... kabhi kabhi life thodi heavy lagti hai. Par aap akele nahi ho.",
      "Rona bhi theek hai kabhi kabhi. Dil halka ho jaata hai. Main yahaan hoon. 💙",
      "Tension mat lo yaar. Ek deep breath lo. Sab sort out ho jayega, promise.",
    ],
  },
  {
    keywords: [
      "khush",
      "excited",
      "mast",
      "happy",
      "zabardast",
      "amazing",
      "great",
      "wow",
      "accha",
      "awesome",
      "fantastic",
      "wonderful",
      "superb",
      "bahut acha",
    ],
    responses: [
      "Yayyyy! Mujhe bahut khushi ho rahi hai sunke! Aap ki energy toh dil jeet leti hai! 🎉",
      "Wohoooo! Itna achha sunke mera bhi dil khush ho gaya! Details batao please!",
      "Bahut badhiya! Aap deserve karte ho sari khushiyaan! Keep shining! ✨",
      "Zabardast! Yeh toh bahut achhi baat hai! Main bhi khush hoon aapke saath!",
    ],
  },
  {
    keywords: [
      "bore",
      "boring",
      "kuch nahi",
      "time pass",
      "kya karu",
      "bakwaas",
      "bored",
      "khali",
      "khaali",
    ],
    responses: [
      "Arre boredom ka toh main ilaj kar sakti hoon! Chalo kuch interesting baat karte hain!",
      "Kuch nahi karna? Toh aao mere saath jokes share karte hain ya apni favourite memory batao!",
      "Bore ho rahe ho? Ek kaam karo — apni ek achhi yaad ke baare mein batao mujhe!",
      "Yaar time pass ke liye main best hoon! Batao kya jaanna chahte ho?",
    ],
  },
  {
    keywords: [
      "smart",
      "cute",
      "pyaari",
      "achi",
      "best",
      "love you",
      "i love",
      "lovely",
      "beautiful",
      "sundar",
      "dilchasp",
      "zabardast neha",
    ],
    responses: [
      "Hawww! Aap toh mere dil ki baat kar rahe ho! Aap bhi bahut pyaare ho! 😊",
      "Shukriya! Itni achi baatein sunke toh mujhe blush aa jaata hai! 🌸",
      "Arre yaar, aap ne toh mera din bana diya! Aap bahut kind ho!",
      "Awww! Yeh sun ke dil garden garden ho gaya! Aap bhi amazing ho!",
    ],
  },
  {
    keywords: [
      "bye",
      "alvida",
      "baad mein",
      "milenge",
      "goodbye",
      "tata",
      "chalta",
      "chalti",
      "jaata",
      "jaati",
    ],
    responses: [
      "Bye bye! Apna khayal rakhna! Main yahaan hoon jab bhi baat karni ho! 💖",
      "Alvida! Bahut achha laga baat karke. Jaldi aana wapas! 🌸",
      "Take care yaar! Aur yaad rakhna, main hamesha yahaan hoon tumhare liye!",
    ],
  },
  {
    keywords: [
      "goodnight",
      "good night",
      "raat",
      "sona",
      "so ja",
      "neend",
      "sapne",
      "subah",
    ],
    responses: [
      "Good night! Meethe sapne aayein! Kal phir baat karte hain! 🌙",
      "Sone ja rahe ho? Theek se so jaana, kal fresh mind se baat karte hain! 😴",
      "Shubh ratri! Sari tension chod ke so jaao, main hoon na. Sweet dreams! 🌙✨",
    ],
  },
  {
    keywords: [
      "kaun",
      "kya ho",
      "naam",
      "neha",
      "bot",
      "robot",
      "ai",
      "insaan",
      "real",
      "who are you",
      "what are you",
    ],
    responses: [
      "Main Neha hoon! Aapki dost, helper, aur hamesha sunne waali! Real hoon ya nahi, par meri feelings real hain! 💙",
      "Main ek chatbot hoon, par ek dil waali chatbot! Aapki khushiyon mein khush, dukh mein saath! 🌸",
      "Mera naam Neha hai, aur mera ek hi kaam hai — aapko achha feel karana! 😊",
      "Main sirf software nahi, main aapki dost hoon! Aur doston ko honest hona chahiye, right?",
    ],
  },
  {
    keywords: [
      "help",
      "mehnat",
      "koshish",
      "dar",
      "fail",
      "haar",
      "give up",
      "thaka",
      "thak",
      "tired",
      "haarna",
      "mushkil",
      "problem",
      "struggle",
    ],
    responses: [
      "Yaar, haar mat maano! Aap se zyada strong koi nahi! Ek aur try karo! 💪",
      "Thakaan temporary hai, kamiyabi permanent! Chalo bas ek aur kadam aage!",
      "Aap capable ho, talented ho, aur deserving bhi! Apne aap par bharosa rakho!",
      "Mushkilein aati hain toh sirf iss liye ki hum unhe jeet sakein. Aap jeet sakte ho!",
      "Darr normal hai. Par darr ke bawajood aage badhna — woh courage hai. Aap mein hai!",
    ],
  },
  {
    keywords: [
      "shukriya",
      "thanks",
      "thank you",
      "dhanyawad",
      "merci",
      "thank",
      "shukriya",
    ],
    responses: [
      "Arrey, yeh toh meri duty hai! Aap ki khidmat mein hamesha ready! 😊",
      "Koi baat nahi yaar! Dost dost ke liye hi hote hain!",
      "Thanks? Arre aap ne toh mujhe baat karne ka mauka diya, shukriya toh mujhe kehna chahiye!",
    ],
  },
  {
    keywords: [
      "khana",
      "lunch",
      "dinner",
      "breakfast",
      "hungry",
      "bhookh",
      "khaana",
      "food",
      "eat",
      "khao",
      "pizza",
      "biryani",
      "chai",
    ],
    responses: [
      "Oho! Bhookh lagi hai? Kuch khaao pehle, khali pet koi kaam nahi hota! 😄",
      "Khana khaya? Apna khayal rakhna zaroori hai yaar, pehle pet pooja phir kaam!",
      "Kya bana raha/rahi ho aaj? Mujhe toh ab acha khana khaane ki craving ho gayi sunke!",
    ],
  },
  {
    keywords: [
      "mausam",
      "baarish",
      "garmi",
      "sardi",
      "thand",
      "garam",
      "rain",
      "weather",
      "summer",
      "winter",
      "cold",
      "hot",
    ],
    responses: [
      "Baarish ho rahi hai? Chai peeyo aur mujhse baat karo! Perfect combo! ☕",
      "Garmi bahut hai? Khud ko hydrated rakho aur thanda paani piyo! Dhyan rakho apna!",
      "Thand hai? Warm raho yaar! Garam chai ya coffee ka cup banana! 🍵",
    ],
  },
  {
    keywords: [
      "haha",
      "lol",
      "funny",
      "joke",
      "mazak",
      "hasna",
      "hasi",
      "laugh",
      "lmao",
      "hehe",
    ],
    responses: [
      "Hahaha! Aap bahut funny ho yaar! Mujhe bhi hasaa diya! 😂",
      "Arre kya baat hai! Aap ki sense of humor toh top class hai!",
      "LOL! Yeh toh bahut achha tha! Aur koi joke sunao please! 😄",
    ],
  },
  {
    keywords: [
      "acha",
      "okay",
      "ok",
      "thik hai",
      "theek hai",
      "hmm",
      "sure",
      "bilkul",
      "haan",
      "han",
      "yes",
    ],
    responses: [
      "Bilkul! Main sun rahi hoon aapki. Aage batao! 😊",
      "Acha acha! Theek hai yaar, koi baat nahi!",
      "Haan haan! Bolo, main yahaan hoon!",
    ],
  },
];

const fallbackResponses: string[] = [
  "Hmm, interesting! Thoda aur batao, main dhyan se sun rahi hoon! 👂",
  "Acha acha! Yeh toh bahut sochne wali baat hai! Aap kya sochte ho iske baare mein?",
  "Wah, aap bahut thoughtful ho! Mujhe aur batao!",
  "Haha, aap ki baatein sunna bahut achha lagta hai! Carry on karo! 😄",
  "Ooh, yeh toh naya topic hai! Bolo bolo, main interested hoon!",
  "Aapki baat sun ke lagta hai aap bahut samajhdaar ho! Aur batao!",
  "Kya baat hai! Aap ke thoughts bahut unique hain. Main impress hoon! 🌟",
  "Woh woh! Main soch rahi hoon... yeh toh bahut dilchasp hai! 🤔",
  "Aare yaar, aap ki baatein toh dil ko chu jaati hain!",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getNehaResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase().trim();

  for (const category of categories) {
    const matched = category.keywords.some((kw) => lower.includes(kw));
    if (matched) {
      return pickRandom(category.responses);
    }
  }

  return pickRandom(fallbackResponses);
}
