export enum JourneyStage {
  LANDING = 0,
  WELCOME = 1,
  TIMELINE = 2,
  GALLERY = 3,
  BIRTHDAY_GIRL = 4,
  CAKE = 5,
  LETTER = 6,
  PROMISES = 7,
  FINALE = 8,
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PromiseCardData {
  id: number;
  emoji: string;
  promiseText: string;
  backDetail: string;
}
