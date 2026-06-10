import {PrompterCategory, PrompterText} from '../SpeechTrainerStudioTypes/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter';
import {countWords} from '../../SpeechTrainerStudioUtils/SpeechTrainerStudioFormatting/SpeechTrainerStudioWordCount/SpeechTrainerStudioWordCount';

function text(
  categoryId: PrompterText['categoryId'],
  id: string,
  title: string,
  description: string,
  body: string,
): PrompterText {
  return {id, categoryId, title, description, body, wordCount: countWords(body)};
}

const PUBLIC_SPEAKING_TEXTS: PrompterText[] = [
  text(
    'public-speaking',
    'ps-1',
    'The Power of Small Steps',
    'Success rarely arrives in a single moment. It is usually the result of many small actions repeated consistently over time.',
    `Success rarely arrives in a single moment. It is usually the result of many small actions repeated consistently over time. Every skill begins with a first attempt, every achievement starts with a simple decision. When people focus only on the final result, they often become discouraged because progress seems slower than expected. However, those who concentrate on daily improvement create lasting success and build strong habits.
Small steps may seem insignificant today, but over weeks, months, and years they become the foundation of remarkable accomplishments. Great athletes, successful entrepreneurs, and respected mentors all started with simple actions that were repeated every day. The key is to remain patient and trust the process. Even when results are not immediately visible, progress is taking place. Continue moving forward, stay committed to your goals, and remember that consistency often matters more than speed.`,
  ),
  text(
    'public-speaking',
    'ps-2',
    'Guiding Through Example',
    'Guidance is not about titles, positions, or authority. True guidance is demonstrated through actions, attitudes, and decisions.',
    `Guidance is not about titles, positions, or authority. True guidance is demonstrated through actions, attitudes, and decisions. People naturally follow individuals who show responsibility, honesty, and commitment. A good guide inspires confidence by remaining calm during challenges and supportive during difficult situations.
Strong teams are built when guides listen carefully, communicate clearly, and encourage others to contribute their ideas. Effective guides understand that success is achieved together rather than individually. They celebrate victories with their teams and accept responsibility when problems arise. By guiding through example, they create an environment where trust, cooperation, and motivation can grow. Guidance is not about being the loudest person in the room; it is about helping others perform at their best.`,
  ),
  text(
    'public-speaking',
    'ps-3',
    'Embracing Change',
    'Change is an unavoidable part of life. Every person experiences new situations, unexpected challenges, and opportunities that require adaptation.',
    `Change is an unavoidable part of life. Every person experiences new situations, unexpected challenges, and opportunities that require adaptation. While change can sometimes feel uncomfortable, it often creates possibilities for personal and professional growth. Many of the greatest achievements in history happened because individuals were willing to embrace something new.
When we resist change, we may miss valuable opportunities to learn and improve. However, when we accept change with an open mind, we become more flexible, resilient, and confident. Every new experience teaches us something valuable about ourselves and the world around us. Instead of fearing uncertainty, we can choose to see it as a chance to develop new skills, meet new people, and discover new paths toward success.`,
  ),
  text(
    'public-speaking',
    'ps-4',
    'Building Confidence',
    'Confidence is not something people are born with. It is a skill that develops through preparation, experience, and practice.',
    `Confidence is not something people are born with. It is a skill that develops through preparation, experience, and practice. Every challenge completed successfully increases self-belief and strengthens personal confidence. Even small achievements can have a significant impact when they are repeated consistently over time.
Mistakes should not be viewed as failures. Instead, they should be seen as opportunities to learn and improve. Every successful speaker, athlete, or professional has faced setbacks and obstacles. What separates confident individuals from others is their willingness to continue despite difficulties. The more experience we gain, the more comfortable we become in unfamiliar situations. Confidence grows when we focus on progress rather than perfection and continue moving forward regardless of temporary setbacks.`,
  ),
  text(
    'public-speaking',
    'ps-5',
    'The Value of Communication',
    'Communication is one of the most important skills a person can develop. It allows people to share ideas, build relationships, solve problems, and work together effectively.',
    `Communication is one of the most important skills a person can develop. It allows people to share ideas, build relationships, solve problems, and work together effectively. Clear communication reduces misunderstandings and helps create trust between individuals and groups.
Effective communication involves more than speaking well. It also requires active listening, empathy, and understanding. Great communicators pay attention to both words and emotions. They adapt their message to their audience and ensure that important information is delivered clearly and respectfully. Whether in business, education, or personal relationships, strong communication skills can create opportunities, strengthen connections, and improve overall success. Developing this ability is one of the most valuable investments a person can make.`,
  ),
];

const ARTICULATION_TEXTS: PrompterText[] = [
  text(
    'articulation',
    'ar-1',
    'The Precise Presenter',
    'Peter proudly prepared a presentation packed with practical proposals and persuasive points.',
    `Peter proudly prepared a presentation packed with practical proposals and persuasive points. Before presenting, he practiced every paragraph repeatedly to improve pronunciation and precision. Proper preparation prevented poor performance and helped him project confidence.
As Peter progressed through his practice sessions, he paid particular attention to difficult phrases and complex combinations of sounds. He focused on speaking clearly rather than quickly. By repeating challenging words several times, he gradually improved his articulation and became more comfortable with public speaking. When presentation day finally arrived, Peter delivered his message smoothly and professionally, proving that preparation and persistence produce positive results.`,
  ),
  text(
    'articulation',
    'ar-2',
    'Crisp and Clear Communication',
    'Clear communication creates confidence, cooperation, and connection.',
    `Clear communication creates confidence, cooperation, and connection. When speakers concentrate on crisp consonants and carefully controlled pronunciation, listeners can understand every sentence more easily. Consistent practice helps develop stronger speaking habits and improves overall clarity.
Consider how often conversations become confusing because words are rushed or poorly pronounced. A speaker who takes the time to articulate each phrase accurately demonstrates professionalism and respect for the audience. Through daily exercises and focused repetition, anyone can strengthen their diction. Consistency is the key. Small improvements made regularly can produce noticeable results over time, making communication more effective and enjoyable.`,
  ),
  text(
    'articulation',
    'ar-3',
    'The Thirty Thoughtful Thinkers',
    'Thirty thoughtful thinkers gathered together to discuss theories, traditions, and technological trends.',
    `Thirty thoughtful thinkers gathered together to discuss theories, traditions, and technological trends. Throughout their conversation, they carefully considered different perspectives and thoughtfully shared their observations. Their discussion remained respectful, productive, and engaging.
As the meeting continued, participants practiced expressing complex ideas using clear language and well-structured sentences. They focused on speaking deliberately and maintaining steady pacing. This approach allowed everyone to contribute effectively and ensured that important points were understood. Thoughtful communication requires patience, attention, and practice, but it greatly improves both speaking and listening skills.`,
  ),
  text(
    'articulation',
    'ar-4',
    'Bright Breezes Beneath Blue Bridges',
    'Bright breezes blew beneath blue bridges beside a beautiful bay.',
    `Bright breezes blew beneath blue bridges beside a beautiful bay. Birds balanced briefly on branches before boldly beginning their morning flights. The peaceful scene provided a perfect opportunity to practice careful pronunciation and breath control.
While describing the landscape, speakers should focus on producing each sound clearly and naturally. Repeating similar words helps train the mouth, tongue, and lips to work together more efficiently. Exercises that emphasize repeated consonants can significantly improve articulation and speaking accuracy. Over time, regular practice strengthens pronunciation and makes speech sound smoother and more polished.`,
  ),
  text(
    'articulation',
    'ar-5',
    'The Remarkable Railway Reporter',
    'A remarkable railway reporter traveled across regions researching routes, reviewing stations, and recording interesting stories.',
    `A remarkable railway reporter traveled across regions researching routes, reviewing stations, and recording interesting stories. During every interview, the reporter remained respectful, responsive, and ready to ask relevant questions. Clear speech helped establish trust with every person encountered.
As the journey continued, the reporter practiced speaking with confidence and precision. Difficult names, unfamiliar locations, and technical terminology required extra attention. Through repetition and careful pronunciation, the reporter improved communication skills and delivered accurate reports. This experience demonstrated how practice, preparation, and persistence contribute to effective public speaking and professional communication.`,
  ),
];

const STORYTELLING_TEXTS: PrompterText[] = [
  text(
    'storytelling',
    'st-1',
    'The Lantern in the Forest',
    'On a cold autumn evening, a young traveler walked along a narrow path that disappeared into a dense forest.',
    `On a cold autumn evening, a young traveler walked along a narrow path that disappeared into a dense forest. The sun had already set, and the shadows between the trees seemed deeper with every passing minute. As the traveler continued forward, a faint golden light appeared in the distance.
Curious and hopeful, he followed the light through the forest. After several minutes, he discovered an old lantern hanging from a wooden post. The lantern was still burning brightly despite the strong wind. Beneath it was a small sign that read, "Every journey becomes easier when you keep moving forward."
The traveler smiled and continued his journey with renewed confidence. Although the path ahead remained unknown, the simple message reminded him that courage is often found in the smallest moments. Years later, he would still remember that lantern and the lesson it taught him about perseverance and hope.`,
  ),
  text(
    'storytelling',
    'st-2',
    "The Clockmaker's Secret",
    'In the center of a quiet town stood a small clock shop owned by an elderly clockmaker.',
    `In the center of a quiet town stood a small clock shop owned by an elderly clockmaker. The shop was filled with hundreds of clocks of different shapes and sizes. Some were large and elegant, while others were small enough to fit in a pocket. Every clock seemed to tell a story of its own.
One day, a curious boy entered the shop and asked the clockmaker why he loved repairing clocks so much. The old man smiled and replied, "Because every clock reminds me that time is precious. When a clock stops working, I have a chance to give it a second life."
The boy spent the afternoon listening to stories about the clocks and the people who owned them. When he finally left, he realized that time should never be wasted. From that day forward, he made a greater effort to appreciate every moment and every opportunity that came his way.`,
  ),
  text(
    'storytelling',
    'st-3',
    'The Mountain Above the Clouds',
    'There was once a mountain so tall that its peak disappeared into the clouds.',
    `There was once a mountain so tall that its peak disappeared into the clouds. Many people admired the mountain from a distance, but few attempted to climb it. The journey was long, steep, and often challenging.
Among those who dreamed of reaching the summit was a young woman named Clara. She spent months preparing for the climb. Every morning she trained, studied maps, and learned how to overcome obstacles. When the day finally arrived, she began her journey with determination.
The climb tested her strength and patience. There were moments when she felt exhausted and wanted to turn back. However, she reminded herself why she had started. After many days of effort, Clara reached the summit and looked out across the world below. The view was breathtaking. At that moment, she realized that the greatest reward was not reaching the top but becoming stronger throughout the journey.`,
  ),
  text(
    'storytelling',
    'st-4',
    'The Letter from Tomorrow',
    'One rainy afternoon, a young writer discovered an unusual envelope on his table.',
    `One rainy afternoon, a young writer discovered an unusual envelope on his table. His name was written on the front, but he did not recognize the handwriting. Curious, he carefully opened the envelope and unfolded the letter inside.
To his surprise, the letter appeared to be written by his future self. It described achievements he had not yet accomplished, places he had not yet visited, and lessons he had not yet learned. The message encouraged him to remain patient, continue working hard, and never give up on his dreams.
Although the writer could not explain where the letter had come from, its words inspired him deeply. He placed the letter in a drawer and returned to his work with greater determination. Years later, he would discover that many of the things described in the letter had become reality through dedication and persistence.`,
  ),
  text(
    'storytelling',
    'st-5',
    'The Last Train Home',
    'The station was nearly empty as the last train of the evening prepared to depart.',
    `The station was nearly empty as the last train of the evening prepared to depart. A few passengers sat quietly on the platform, watching the lights reflect on the wet tracks. Among them was a man returning home after many years away.
As the train began moving through the countryside, past moments flooded his mind. He recalled childhood adventures, old friendships, and the familiar streets where he had grown up. Each passing mile brought him closer to the place he once called home.
When the train finally arrived, he stepped onto the platform and took a deep breath. Much had changed, yet many things remained the same. The air felt familiar, and the distant lights brought back simpler times. Standing there, he realized that home is not merely a place on a map. It is a collection of experiences, lessons, and people who shape who we become throughout our lives.`,
  ),
];

export const PROMPTER_CATEGORIES: PrompterCategory[] = [
  {
    id: 'public-speaking',
    title: 'Public Speaking Skills',
    emoji: '🎤',
    texts: PUBLIC_SPEAKING_TEXTS,
  },
  {
    id: 'articulation',
    title: 'Articulation & Pronunciation',
    emoji: '🗣️',
    texts: ARTICULATION_TEXTS,
  },
  {
    id: 'storytelling',
    title: 'Storytelling & Expressive Reading',
    emoji: '🎭',
    texts: STORYTELLING_TEXTS,
  },
];

export const ALL_PROMPTER_TEXTS: PrompterText[] = [
  ...PUBLIC_SPEAKING_TEXTS,
  ...ARTICULATION_TEXTS,
  ...STORYTELLING_TEXTS,
];

export function getCategoryById(id: PrompterText['categoryId']) {
  return PROMPTER_CATEGORIES.find(c => c.id === id)!;
}
