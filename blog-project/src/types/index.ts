export type Unit = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  language: string;
  name: string;
  description: string;
  level: string;
  coverImage: Media;
};

export type Lesson = {
  name: string;
  type: string;
  _id: string;
  description: string;
  journeyUnitId: string;
  data: Slide[];
};

export type Slide = {
  content: string;
  type: string;
  title: string;
  file: Media;
  answerA: { text: string; value: boolean };
  answerB: { text: string; value: boolean };
  answerC: { text: string; value: boolean };
  answerD: { text: string; value: boolean };
};

export type Media = {
  url: string;
  etag: string;
  name: string;
};
