import PlotterName from './PlotterName';
import optionsForPlotter from '../utils/optionsForPlotter';
import defaultsForPlotter from '../utils/defaultsForPlotter';

export default {
  displayName: 'Seno Proof of Space',
  options: optionsForPlotter(PlotterName.SENOPOS),
  defaults: defaultsForPlotter(PlotterName.SENOPOS),
  installInfo: { installed: true },
};
