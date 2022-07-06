import InputAdapter from '../../components/InputAdapter';
import { STATES } from '../../static/data/constants';
import SelectAdapter from '../../components/SelectAdapter';

export const fields = [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'Name',
    adapter: InputAdapter,
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Email',
    adapter: InputAdapter,
    type: 'text',
  },
  {
    label: 'Phone',
    name: 'phone',
    placeholder: 'Phone',
    adapter: InputAdapter,
    type: 'text',
  },
  {
    label: 'State',
    name: 'state',
    placeholder: 'State',
    options: STATES,
    adapter: SelectAdapter,
    type: 'select',
  },
];

export const resourceCardData = [
  {
    icon: '/static/images/resources/calculator.svg',
    title: 'Calculator',
    route: '/calculator',
    type: 'calculator',
  },
  {
    icon: '/static/images/resources/video.svg',
    title: 'Videos',
    route: '/videos',
    type: 'videos',
  },
  {
    icon: '/static/images/resources/file.svg',
    title: "Tips & How To's",
    route: '/resource',
    type: 'resources-file',
  },
  {
    icon: '/static/images/resources/home.svg',
    title: 'Builder Directory',
    route: '/directory',
    type: 'builder',
  },
  {
    icon: '/static/images/resources/user.svg',
    title:'Agent Directory',
    route:'/directory',
    type:'agent',
  },
  {
    icon: '/static/images/resources/loanofficers.svg',
    title: 'Loan Officers',
    route: '/directory',
    type: 'loan_officer',
  },
];

export const directoryTypes = {
  loanOfficer: 'loan_officer',
  agent: 'agent',
}
