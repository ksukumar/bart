﻿/// <reference path="../../../Northwind/Supplier/SupplierDialog.ts" />

namespace Serene1.BasicSamples {

    @Serenity.Decorators.registerClass()
    export class ReadOnlyDialog extends Northwind.SupplierDialog {

        /**
         * This is the method that gets list of tool 
         * buttons to be created in a dialog.
         *
         * Here we'll remove save and close button, and
         * apply changes buttons. 
         */
        protected getToolbarButtons(): Serenity.ToolButton[] {
            let buttons = super.getToolbarButtons();

            buttons.splice(Q.indexOf(buttons, x => x.cssClass == "save-and-close-button"), 1);
            buttons.splice(Q.indexOf(buttons, x => x.cssClass == "apply-changes-button"), 1);

            // We could also remove delete button here, but for demonstration 
            // purposes we'll hide it in another method (updateInterface)
            // buttons.splice(Q.indexOf(buttons, x => x.cssClass == "delete-button"), 1);

            return buttons;
        }

        /**
         * This method is a good place to update states of
         * interface elements. It is called after dialog
         * is initialized and an entity is loaded into dialog.
         * This is also called in new item mode.
         */
        protected updateInterface(): void {

            super.updateInterface();

            // finding all editor elements and setting their readonly attribute
            // note that this helper method only works with basic inputs, 
            // some editors require widget based set readonly overload (setReadOnly)
            Serenity.EditorUtils.setReadonly(this.element.find('.editor'), true);

            // remove required asterisk (*)
            this.element.find('sup').hide();

            // here is a way to locate a button by its css class
            // note that this method is not available in 
            // getToolbarButtons() because buttons are not 
            // created there yet!
            // 
            // this.toolbar.findButton('delete-button').hide();

            // entity dialog also has reference variables to
            // its default buttons, lets use them to hide delete button
            this.deleteButton.hide();

            // we could also hide save buttons just like delete button,
            // but they are null now as we removed them in getToolbarButtons()
            // if we didn't we could write like this:
            // 
            // this.applyChangesButton.hide();
            // this.saveAndCloseButton.hide();

            // instead of hiding, we could disable a button
            // 
            // this.deleteButton.toggleClass('disabled', true);
        }

    }
}