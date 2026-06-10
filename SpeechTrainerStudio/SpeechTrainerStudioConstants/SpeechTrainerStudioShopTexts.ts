import {ShopFilterId, ShopText} from '../SpeechTrainerStudioTypes/SpeechTrainerStudioShop/SpeechTrainerStudioShop/SpeechTrainerStudioShop';
import {countWords} from '../../SpeechTrainerStudioUtils/SpeechTrainerStudioFormatting/SpeechTrainerStudioWordCount/SpeechTrainerStudioWordCount';

function shopText(
  categoryId: ShopText['categoryId'],
  id: string,
  title: string,
  description: string,
  body: string,
  price: number,
): ShopText {
  return {id, categoryId, title, description, body, wordCount: countWords(body), price};
}

export const SHOP_TEXTS: ShopText[] = [
  shopText(
    'public-speaking',
    'shop-ps-1',
    'Speaking Without Notes',
    'Advanced techniques for authentic off-script delivery.',
    `The day I stopped using notes was the day I truly became a speaker. Until that point, I was a presenter reading words from a page. The audience could feel the distance between me and my message. When I finally committed to speaking by heart with conviction, everything changed.
The secret is not learning every word by rote. It is knowing your structure so deeply that you can move through it naturally. Start with three clear points. Anchor each point with a story or example you know well. Practice out loud until the transitions feel effortless. Record yourself and notice where you hesitate — those are the moments that need more rehearsal.
Authentic delivery comes from preparation, not perfection. When you trust your material, your body language opens up. Your voice finds its natural rhythm. Eye contact becomes genuine instead of performative. The audience senses confidence and connects with you as a person, not a script reader.
Every great speaker you admire has stood where you stand now — nervous, uncertain, tempted to hide behind notes. The difference is they chose connection over comfort. You can make that same choice. Start small. Speak without notes for thirty seconds, then a minute, then five. Each success builds the muscle recall of genuine presence.`,
    5,
  ),
  shopText(
    'articulation',
    'shop-ar-1',
    'Rhythm and Cadence',
    'Learn the musical patterns behind compelling spoken delivery.',
    `Great speakers understand that words are music. Rhythm and cadence transform ordinary sentences into lasting performances. The pause before an important point creates anticipation. The acceleration through a list builds momentum. The deliberate slowdown at the end signals authority and closure.
Listen to a masterful storyteller and notice the patterns. Short sentences create urgency. Long, rhythmic phrases draw the listener into reflection. Variation prevents monotony and keeps attention locked on the speaker. Monotone delivery is the enemy of engagement — your voice should rise and fall like a melody.
Practice by reading poetry aloud. Feel how the meter guides your breathing and pacing. Then apply those same principles to prose. Mark your scripts with symbols for pause, emphasis, and speed changes. Record yourself and listen for flat sections that need more dynamic range.
Cadence also lives in repetition and parallel structure. Three-part lists, rhetorical questions, and callback phrases create satisfying rhythmic anchors. When your audience can anticipate the pattern, they lean in. When you break the pattern unexpectedly, you surprise and delight them. Master rhythm and cadence, and your words will linger long after you finish speaking.`,
    4,
  ),
  shopText(
    'storytelling',
    'shop-st-1',
    'The Emotional Arc',
    'Build stories with peaks and valleys that keep audiences riveted.',
    `Every unforgettable story follows an emotional arc. It begins in ordinary life, encounters tension or conflict, reaches a turning point, and resolves with transformation. Without this structure, even the most interesting facts fall flat. With it, a simple anecdote becomes a journey the audience travels alongside you.
Start by establishing what was normal before the change. Help listeners see themselves in your starting point. Then introduce the complication — the obstacle, the surprise, the moment everything shifted. This is where tension builds. Resist the urge to rush. Let the audience feel the stakes.
The climax should deliver the emotional peak. Whether it is triumph, loss, revelation, or reconciliation, this moment must earn its impact through everything that came before. Finally, the resolution shows what changed — in you, in the situation, in the lesson learned. End with a clear takeaway that connects back to your audience's own lives.
Practice mapping your stories on paper before you speak. Identify the emotional low points and high points. Adjust pacing so valleys feel reflective and peaks feel electric. The best speakers make audiences laugh, gasp, and reflect within the same narrative. Your emotional arc is the roadmap that makes that possible.`,
    6,
  ),
  shopText(
    'public-speaking',
    'shop-ps-2',
    'Executive Presence',
    'Command boardrooms and keynote stages with elite-level authority.',
    `Executive presence is the intangible quality that makes people listen when you enter a room. It is not about volume or dominance. It is about calm confidence, clarity of thought, and the ability to make others feel that important matters are in capable hands.
Presence begins with how you occupy space. Stand with grounded posture. Move deliberately rather than nervously. Make eye contact with individuals across the room, not just the front row. Your physical stillness communicates that you are comfortable with attention and responsibility.
Your voice carries equal weight. Speak at a measured pace. Lower your pitch slightly at the end of key statements to signal certainty. Eliminate filler words that undermine authority. When you pause before answering a difficult question, you demonstrate thoughtfulness rather than uncertainty.
Finally, executive presence requires substance. Know your material deeply enough to adapt in real time. Acknowledge challenges honestly while projecting confidence in solutions. Speakers who combine preparation with poise inspire trust. Practice these elements consistently, and your presence will command respect in any room.`,
    8,
  ),
  shopText(
    'storytelling',
    'shop-st-2',
    'Comedy and Wit in Speaking',
    'The science and craft of being genuinely funny on stage.',
    `Humor is one of the most powerful tools in a speaker's arsenal, but it cannot be forced. Genuine wit comes from observation, timing, and the courage to be slightly vulnerable. The best comedic moments feel spontaneous even when they are carefully prepared.
Start by studying your audience and your material for natural incongruities. The gap between expectation and reality is where laughter lives. Self-deprecating humor works when it is light and relatable, not when it undermines your credibility. A well-placed observation about a shared experience creates instant connection.
Timing is everything. Deliver the setup, pause, then land the punchline. Rushing destroys comedy. If a joke does not land, move on gracefully without apologizing. Confidence in recovery is often funnier than the original joke.
Practice wit in low-stakes conversations before bringing it to the stage. Notice what makes people smile in everyday exchanges. Build a small collection of tested lines and stories that fit your authentic voice. Comedy and wit are crafts that reward preparation — the speaker who appears effortlessly funny has usually worked harder than anyone realizes.`,
    5,
  ),
];

export type ShopCategoryOption = {
  id: ShopFilterId;
  label: string;
};

export function getShopFilterCategories(): ShopCategoryOption[] {
  const countByCategory = (id: ShopFilterId) =>
    id === 'all'
      ? SHOP_TEXTS.length
      : SHOP_TEXTS.filter(t => t.categoryId === id).length;

  return [
    {id: 'all', label: `All (${countByCategory('all')})`},
    {id: 'public-speaking', label: `🎤 ${countByCategory('public-speaking')}`},
    {id: 'articulation', label: `🗣️ ${countByCategory('articulation')}`},
    {id: 'storytelling', label: `🎭 ${countByCategory('storytelling')}`},
  ];
}

export function getShopTextById(id: string): ShopText | undefined {
  return SHOP_TEXTS.find(t => t.id === id);
}

export function getUnlockedShopTexts(unlockedIds: string[]): ShopText[] {
  const set = new Set(unlockedIds);
  return SHOP_TEXTS.filter(t => set.has(t.id));
}

export function getTextPreview(body: string, maxLength = 100): string {
  const trimmed = body.replace(/\s+/g, ' ').trim();
  if (trimmed.length <= maxLength) {
    return `"${trimmed}"`;
  }
  return `"${trimmed.slice(0, maxLength).trimEnd()}..."`;
}
