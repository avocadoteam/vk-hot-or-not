import { R_Structure } from 'src/router/types';

export enum ViewTypes {
  Main = 'main',
  Welcome = 'welcome',
}
export enum MainPanels {
  Home = 'home',
}
export enum WelcomePanels {
  Question = 'question',
}

export const structure: R_Structure = [
  {
    id: ViewTypes.Main,
    hash: 'main',
    panels: [
      {
        id: MainPanels.Home,
        hash: '/home',
      },
     
    ],
  },
  {
    id: ViewTypes.Welcome,
    panels: [
      {
        id: WelcomePanels.Question,
        hash: '/w-q',
      },
    ],
  },
];
