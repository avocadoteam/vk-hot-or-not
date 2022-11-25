import { R_Structure } from 'src/router/types';

export enum ViewTypes {
  Main = 'main',
}
export enum MainPanels {
  Home = 'home',
  Settings = 'settings',
  AllRatings = 'allratings',
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
      {
        id: MainPanels.Settings,
        hash: '/settings',
      },
      {
        id: MainPanels.AllRatings,
        hash: '/all-ratings',
      },
    ],
  },
];

export enum Modals {
  Welcome = 'welcome',
  Report = 'report',
  FileUpload = 'fileupload',
  UserProfile = 'userprofile',
  UserСlosedProfile = 'userclosedprofile',
}
