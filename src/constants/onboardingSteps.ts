import {ImageSourcePropType} from 'react-native';

import {onboardingImages} from '../data/assets';

export type OnboardingStep = {
  label: string;
  labelColor: string;
  title: string;
  body: string;
  image: ImageSourcePropType;
  dotColor: string;
  gradient: [string, string, string];
  buttonText?: string;
  showSkip?: boolean;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    label: 'Your Voice Transformation Starts Here',
    labelColor: '#8b5cf6',
    title: "Welcome. I'm Coach Marcus.",
    body: "I've spent 15 years helping executives, entrepreneurs, and everyday people unlock the power of their voice. Whether you're speaking to one person or ten thousand, what you'll learn here will change the way you communicate — forever.",
    image: onboardingImages.step1,
    dotColor: '#8b5cf6',
    gradient: ['#1a0845', '#2d1070', '#1a0845'],
  },
  {
    label: 'Train Like the Pros Do',
    labelColor: '#a78bfa',
    title: 'Master the Teleprompter',
    body: "The world's best speakers use teleprompters — but more importantly, they train without them. In my Teleprompter Training sessions, you'll practice rich, handcrafted texts across three categories: Public Speaking, Articulation, and Storytelling.",
    image: onboardingImages.step2,
    dotColor: '#a78bfa',
    gradient: ['#0f062a', '#23104e', '#0f062a'],
  },
  {
    label: 'Science-Backed Diction Training',
    labelColor: '#c4b5fd',
    title: 'Improve Your Speech',
    body: 'Great diction is not a gift — it is a skill. In this app, you will find breathing exercises used by professional actors, articulation drills from classical oratory, and confidence techniques backed by neuroscience.',
    image: onboardingImages.step3,
    dotColor: '#c4b5fd',
    gradient: ['#12082e', '#271258', '#12082e'],
  },
  {
    label: 'Practice What Matters to You',
    labelColor: '#9d80f8',
    title: 'Create Your Own Texts',
    body: 'The best practice is personal. In the Text Workshop, you can create your own teleprompter texts — your speech drafts, your presentations, your script ideas. Write it, refine it, then read it through the teleprompter until it feels completely natural.',
    image: onboardingImages.step4,
    dotColor: '#9d80f8',
    gradient: ['#0a0422', '#1e0d4a', '#0a0422'],
  },
  {
    label: 'Challenges, Tips, and Rewards',
    labelColor: '#f59e0b',
    title: 'Practice Makes Perfect',
    body: 'Every day, I challenge you. Take the Mini Game — you will get a shuffled topic and sixty seconds to write a mini-speech. Earn Microphone coins for great performance, then spend them in the Text Shop to unlock advanced practice materials.',
    image: onboardingImages.step5,
    dotColor: '#f59e0b',
    gradient: ['#150838', '#2b1468', '#150838'],
    buttonText: 'Start Training 🎤',
    showSkip: false,
  },
];
