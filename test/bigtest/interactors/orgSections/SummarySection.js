import {
  interactor,
  isVisible,
} from '@bigtest/interactor';

import { SECTIONS } from '../../../../src/common/constants';
import Button from '../Button';

class SummarySection {
  static defaultScope = `#${SECTIONS.summarySection}`;
  headerButton = new Button(`#accordion-toggle-button-${SECTIONS.summarySection}`);
  isExpanded = isVisible('[class*=content---]');
}

export default interactor(SummarySection);
