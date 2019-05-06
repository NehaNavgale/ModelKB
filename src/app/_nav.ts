interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Models',
    icon: 'fa fa-book-reader'  ,
  },
  // {
  //   name: 'Upload Model',
  //   url: '/theme/colors',
  //   icon: 'fa fa-upload'
  // },
  {
    name: 'Search Models',
    url: '/theme/search',
    icon: 'fa fa-search'
  },
  {
    name: ' Models',
    url: '/theme/usermodelmenu',
    icon: 'fa fa-folder'
  }
];
