export type RouterState = {
  popout: any;
  modal: any;
  activeView: string;
  activePanel: string;
  hash: string;
};

export type R_Panel = {
  id: string;
  hash?: string;
};

export type R_View = {
  id: string;
  hash?: string;
  panels: R_Panel[];
};

export type R_Structure = R_View[];
