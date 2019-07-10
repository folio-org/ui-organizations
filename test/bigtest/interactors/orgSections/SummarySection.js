import {
  interactor,
  isVisible,
} from '@bigtest/interactor';

import Metadata from '../Metadata';

import { SECTIONS } from '../../../../src/common/constants';
import Button from '../Button';

class SummarySection {
  static defaultScope = `#${SECTIONS.summarySection}`;
  metadata = new Metadata();
  headerButton = new Button(`#accordion-toggle-button-${SECTIONS.summarySection}`);
  isExpanded = isVisible('[class*=content---]');
}

export default interactor(SummarySection);
