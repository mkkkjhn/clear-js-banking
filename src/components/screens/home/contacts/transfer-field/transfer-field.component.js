import ChildComponent from '@/core/component/child.component'
import renderService from "@/core/services/render.service"

import template from './transfer-field.template.html'
import styles from './transfer-field.module.scss'
import { Store } from '@/core/store/store'
import { CardService } from '@/api/card.service'
import { NotificationService } from '@/core/services/notification.service'
import { $M } from '@/core/mquery/mquery.lib'
import validationService from '@/core/services/validation.service'
import { BALANCE_UPDATED, TRANSACTION_COMPLETED } from '@/constants/event.constants'
import { Field } from '@/components/ui/field/field.component'
import { Button } from '@/components/ui/button/button.component'

export const TRANSFER_FIELD_SELECTOR = '[name="card-number"]'

export class TransferField extends ChildComponent {
    constructor() {
        super()

        this.store = Store.getInstance().state
        this.cardService = new CardService()
        this.notificationService = new NotificationService()
    }

    handleTransfer = event => {
        event.preventDefault()

        if (!this.store.user) {
            this.notificationService.show('error', 'You need authorization!')
        }

        $M(event.target).text('Sending...').attr('disabled', true)

        const inputElement = $M(this.element).find('input')
        const toCardNumber = inputElement.value().replaceAll('-', '')

        const reset = () => {
            $M(event.target).removeAttr('disabled').text('Send')
        }

        if (!toCardNumber) {
            validationService.showError($M(this.element).find('label'))
            reset()
            return
        }

        let amount = prompt('Transfer amount 👇')

		this.cardService.transfer({ amount, toCardNumber }, () => {
			inputElement.value('')
			amount = ''

			document.dispatchEvent(new Event(TRANSACTION_COMPLETED))
			document.dispatchEvent(new Event(BALANCE_UPDATED))
		})

		reset()
    }

    render() {
        this.element = renderService.htmlToElement(
            template,
			[
				new Field({
					name: 'card-number',
					placeholder: 'xxxx-xxxx-xxxx-xxxx',
					variant: 'credit-card'
				}),
				new Button({
					children: 'Send',
					variant: 'purple',
					onClick: this.handleTransfer
				})
			],
			styles
        )
        
        return this.element
    }
}