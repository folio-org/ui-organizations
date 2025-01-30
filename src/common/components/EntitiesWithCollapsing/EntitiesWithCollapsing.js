import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Button, Icon } from '@folio/stripes/components';

import css from './EntitiesWithCollapsing.css';

const defaultShowMoreLabel = <FormattedMessage id="ui-organizations.showMore" />;

const EntitiesWithCollapsing = ({
  entities = [],
  renderEntity,
  showMoreLabel = defaultShowMoreLabel,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      {renderEntity(entities[0])}
      {
        !isCollapsed && entities.slice(1).map(renderEntity)
      }
      {
        entities.length > 1 && isCollapsed && (
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            buttonClass={css.entitiesWithCollapsingBtn}
          >
            <Icon icon="arrow-down" />
            {showMoreLabel}
            (
            {entities.length - 1}
            )
          </Button>
        )
      }
    </div>
  );
};

EntitiesWithCollapsing.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.object),
  renderEntity: PropTypes.func.isRequired,
  showMoreLabel: PropTypes.node,
};

export default EntitiesWithCollapsing;
