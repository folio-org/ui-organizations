import {
  interactor,
  isVisible,
} from '@bigtest/interactor';

import Metadata from '../Metadata';

import { ORGANIZATION_SECTIONS } from '../../../../src/Organizations/constants';
import Button from '../Button';

class SummarySection {
  static defaultScope = `#${ORGANIZATION_SECTIONS.summarySection}`;
  metadata = new Metadata();
  headerButton = new Button(`#accordion-toggle-button-${ORGANIZATION_SECTIONS.summarySection}`);
  isExpanded = isVisible('[class^=content-region]');
}

export default interactor(SummarySection);
