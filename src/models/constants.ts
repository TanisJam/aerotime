// Main constants
export const TITLE = 'AeroTime';

// Keycap constants
export const DEBUG = false;
export const AUDIO_URL = './key-press.mp3';
export const TIRULIC_URL = './tirulic.mp3';
export const MUSIC_URL = './walking-through-dream.mp3';
export const KEYCAPS_TO_SHOW = 7;
export const LETTERS = [
  'W',
  'A',
  'S',
  'D',
  'E',
  'Q',
  'R',
  'T',
  'O',
  'I',
  'M',
  'L',
  'B',
];

// Keycap store
export const WORD = Array.from(TITLE.toLowerCase());
export const INTERACTIONS_MESSAGES = [
  'Keep going!',
  'Almost there!',
  'You can do it!',
  'Just a little more!',
  'You got this!',
  'You did it!',
];
export const INTERACTIONS_NEEDED = 6;
export const TIME_BETWEEN_INTERACTIONS = 2000;
