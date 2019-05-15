import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';

import { InterfacesPaneInteractor } from '../interactors';

describe('View interface', () => {
  setupApplication();

  const viewInterface = new InterfacesPaneInteractor();
  let orgInterface;

  beforeEach(function () {
    orgInterface = this.server.create('interface');

    return this.visit(`/organizations/interface/${orgInterface.id}/view`, () => {
      expect(viewInterface.$root).to.exist;
    });
  });

  describe('actions', () => {
    it('should be present', () => {
      expect(viewInterface.actions.isPresent).to.be.true;
    });

    describe('click unassign button', () => {
      beforeEach(async function () {
        await viewInterface.paneHeaderCenterButton.click();
        await viewInterface.unassignButton.click();
      });

      it('confirmation modal for unassign should be presented', () => {
        expect(viewInterface.unassignConfirmation.isPresent).to.be.true;
      });

      describe('click confirm unassign button', () => {
        beforeEach(async function () {
          await viewInterface.unassignConfirmation.confirmButton.click();
        });

        it('confirmation modal for unassign should disappear', () => {
          expect(viewInterface.unassignConfirmation.isPresent).to.be.false;
        });
      });
    });

    describe('click delete button', () => {
      beforeEach(async function () {
        await viewInterface.paneHeaderCenterButton.click();
        await viewInterface.deleteButton.click();
      });

      it('confirmation modal for delete should be presented', () => {
        expect(viewInterface.deleteConfirmation.isPresent).to.be.true;
      });

      describe('click confirm delete button', () => {
        beforeEach(async function () {
          await viewInterface.deleteConfirmation.confirmButton.click();
        });

        it('confirmation modal for delete should disappear', () => {
          expect(viewInterface.deleteConfirmation.isPresent).to.be.false;
        });
      });

      describe('click cancel delete button', () => {
        beforeEach(async function () {
          await viewInterface.deleteConfirmation.cancelButton.click();
        });

        it('confirmation modal for delete should disappear', () => {
          expect(viewInterface.deleteConfirmation.isPresent).to.be.false;
        });
      });
    });
  });

  describe('interface section', () => {
    it('should be present', () => {
      expect(viewInterface.orgInterface.isPresent).to.be.true;
    });
  });
});
