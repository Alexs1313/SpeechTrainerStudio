import {WorkshopText} from '../SpeechTrainerStudioTypes/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop';
import {countWords} from '../../SpeechTrainerStudioUtils/SpeechTrainerStudioFormatting/SpeechTrainerStudioWordCount/SpeechTrainerStudioWordCount';

function seed(
  id: string,
  categoryId: WorkshopText['categoryId'],
  title: string,
  description: string,
  body: string,
  createdAt: number,
): WorkshopText {
  return {
    id,
    categoryId,
    title,
    description,
    body,
    wordCount: countWords(body),
    createdAt,
    updatedAt: createdAt,
  };
}

const body = (paragraphs: string[]) => paragraphs.join('\n\n');

export const WORKSHOP_SEED_TEXTS: WorkshopText[] = [
  seed(
    'ws-1',
    'public-speaking',
    'The Power of Presence',
    'Master the art of commanding a room with calm authority.',
    body([
      'Presence is not about being the loudest person in the room. It is about being fully there — grounded, attentive, and intentional.',
      'When you speak with presence, your audience feels that you are speaking to them, not at them. Your posture, pace, and eye contact all reinforce your message.',
      'Practice standing still when you make your most important points. Let silence do some of the work. A pause before a key idea signals confidence and gives listeners time to absorb what you have said.',
      'Great speakers do not rush to fill every moment. They trust their material and trust themselves. That trust is what the audience reads as authority.',
    ]),
    1,
  ),
  seed(
    'ws-2',
    'public-speaking',
    'Opening Strong',
    'Craft unforgettable opening lines that hook your audience instantly.',
    body([
      'Your opening thirty seconds determine whether the audience leans in or checks out. Start with something unexpected — a question, a bold claim, or a vivid image.',
      'Avoid apologizing or warming up slowly. You do not need to explain who you are before you have earned attention. Lead with value.',
      'A strong opening promises the audience that their time will be well spent. Make that promise explicit: tell them what they will learn, feel, or be able to do by the end.',
      'Rehearse your opening until it feels natural, not scripted. The goal is conviction, not perfection.',
    ]),
    2,
  ),
  seed(
    'ws-3',
    'public-speaking',
    'The Art of Persuasion',
    "Aristotle's timeless principles applied to modern speaking.",
    body([
      'Persuasion rests on three pillars: ethos, pathos, and logos. Credibility, emotion, and logic — in balance.',
      'Ethos is built before you speak. Your reputation, preparation, and authenticity all contribute. Pathos connects your message to what your audience already cares about.',
      'Logos is your evidence: data, examples, and clear reasoning. Without it, emotion feels manipulative. Without emotion, logic feels cold.',
      'The most persuasive speakers weave all three throughout their talk, not in separate blocks.',
    ]),
    3,
  ),
  seed(
    'ws-4',
    'public-speaking',
    'Speaking Without Notes',
    'Advanced techniques for authentic off-script delivery.',
    body([
      'Speaking without notes is not about learning every word by rote. It is about internalizing structure so you can improvise within a clear framework.',
      'Break your talk into three to five beats. Know your transitions. If you lose your place, return to the nearest beat and continue.',
      'Practice out loud, not just in your head. Your mouth needs to know the rhythm of the sentences as much as your mind knows the ideas.',
      'Authenticity comes from preparation, not from winging it. The best off-script speakers have rehearsed more than anyone in the room.',
    ]),
    4,
  ),
  seed(
    'ws-5',
    'articulation',
    'The Tongue Twister Challenge',
    'Classic articulation drills used by professional broadcasters.',
    body([
      'Peter Piper picked a peck of pickled peppers. Say it slowly, then faster, focusing on crisp consonants at every speed.',
      'Unique New York, unique New York, you know you need unique New York. Stretch each vowel before you accelerate.',
      'Red leather, yellow leather. Repeat until your tongue finds the pattern without stumbling.',
      'Broadcasters use these drills daily. Five minutes before a recording session can transform clarity.',
    ]),
    5,
  ),
  seed(
    'ws-6',
    'articulation',
    'Vowel Mastery',
    'Train your vowel sounds for crystal-clear speech.',
    body([
      'Vowels carry emotion and melody in speech. Mumbled vowels make even brilliant content hard to follow.',
      'Practice open vowels: ah, eh, ee, oh, oo. Exaggerate them in isolation, then in short phrases.',
      'Record yourself reading a paragraph. Listen for vowels that collapse or sound identical. Those are your practice targets.',
      'Clear vowels project confidence. They signal that you are not rushing and that you want to be understood.',
    ]),
    6,
  ),
  seed(
    'ws-7',
    'articulation',
    'Consonant Clarity',
    'Sharpen your consonants for professional-grade diction.',
    body([
      'Consonants give speech its shape. Soft consonants blur words together; crisp consonants create rhythm and punch.',
      'Focus on final consonants — the endings of words that speakers often swallow. "Important" becomes "importan" without that final t.',
      'Practice plosives: p, b, t, d, k, g. Over-articulate them in drills, then dial back to natural speech.',
      'Clarity is a habit. Daily two-minute drills compound into noticeable improvement within weeks.',
    ]),
    7,
  ),
  seed(
    'ws-8',
    'articulation',
    'Pacing and Breath',
    'Control your breath to control your pace and power.',
    body([
      'Breath is the engine of speech. Shallow breathing leads to rushed, thin delivery.',
      'Breathe from your diaphragm. Place a hand on your stomach and feel it expand as you inhale before a long phrase.',
      'Mark your script with breath points. Pausing to breathe is not a failure — it is a tool for emphasis.',
      'Powerful speakers use breath to build suspense. Inhale before a key line. The audience will lean in.',
    ]),
    8,
  ),
  seed(
    'ws-9',
    'storytelling',
    'The Hero Journey',
    'Structure any talk as a compelling narrative arc.',
    body([
      'Every great story has a protagonist who wants something, faces obstacles, and is changed by the journey.',
      'Your audience is the hero of your talk, not you. You are the guide who gives them a map and tools.',
      'Set the scene quickly. One sentence of context is enough. Then introduce the challenge that creates tension.',
      'End with transformation: what is different now? What can the listener do tomorrow that they could not do yesterday?',
    ]),
    9,
  ),
  seed(
    'ws-10',
    'storytelling',
    'Moments That Matter',
    'Use vivid scenes instead of abstract claims.',
    body([
      'Abstract: "Communication is important." Vivid: "Last Tuesday, I watched a manager lose her team in thirty seconds with one careless phrase."',
      'Scenes have characters, setting, and action. They put the audience inside the experience.',
      'One well-chosen moment beats five generalizations. Find the single scene that embodies your entire message.',
      'After you describe the scene, pause. Let the image land before you explain what it means.',
    ]),
    10,
  ),
  seed(
    'ws-11',
    'storytelling',
    'Emotional Resonance',
    'Connect your message to feelings your audience already has.',
    body([
      'Facts inform. Feelings motivate. The best talks do both.',
      'Name the emotion you want your audience to feel: hope, urgency, pride, curiosity. Then choose language that evokes it.',
      'Personal stories work because they are specific. "I was nervous" is weak. "My hands shook so badly I dropped my notes" is striking.',
      'Vulnerability, used sparingly, builds trust faster than any credential.',
    ]),
    11,
  ),
  seed(
    'ws-12',
    'storytelling',
    'The Callback Close',
    'End by returning to your opening for a satisfying finish.',
    body([
      'A callback close ties your ending to your beginning, creating a sense of completeness.',
      'If you opened with a question, answer it. If you opened with an image, return to that image with new meaning.',
      'The audience feels the circle close. It signals that you planned the journey and delivered on the promise.',
      'Write your last line after you know your first line. The best closings are designed backward from the opening.',
    ]),
    12,
  ),
];
