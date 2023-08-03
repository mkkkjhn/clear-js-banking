import renderService from "@/core/services/render.service"
import template from './auth.template.html'
import styles from './auth.module.scss'
import { BaseScreen } from '@/core/component/base-screen.component'
import { AuthService } from '@/api/auth.service'
import { $M } from '@/core/mquery/mquery.lib'
import { Field } from '@/components/ui/field/field.component'
import { Button } from '@/components/ui/button/button.component'
import formService from '@/core/services/form.service'
import validationService from "@/core/services/validation.service"

export class Auth extends BaseScreen {
    #isTypeLogin = true

    constructor() {
        super({title: 'Auth'})
        this.authService = new AuthService()
    }

    #validateFields(formValues) {
        const emailLabel = $M(this.element).find('label:first-child')
        const passwordLabel = $M(this.element).find('label:last-child')

        if(!formValues.email) {
            validationService.showError(emailLabel)
        }

        if(!formValues.password) {
            validationService.showError(passwordLabel)
        }

        return formValues.email &&  formValues.password
    }

    #handleSubmit = event => {
        const formValues = formService.getFormValues(event.target)
        if (!this.#validateFields(formValues)) return

        const type = this.#isTypeLogin ? 'login' : 'register'
        this.authService.main(type, formValues)
    }

    #changeFormType = event => {
        event.preventDefault()

        $M(this.element)
            .find('h1')
            .text(this.#isTypeLogin ? 'Register' : 'Sing In')

        $M(event.target).text(this.#isTypeLogin ? 'Sing In' : 'Register')

        this.#isTypeLogin = !this.#isTypeLogin
    }

    render() {
        this.element = renderService.htmlToElement(
            template, 
            [
                new Button({
                    children: 'Submit'
                })
            ], 
            styles
        )

        $M(this.element)
            .find('#auth-inputs')
            .append(
                new Field({
                    placeholder: 'Enter email',
                    name: 'email',
                    type: 'email'
                }).render()
            ).append(
                new Field({
                    placeholder: 'Enter password',
                    name: 'password',
                    type: 'password'
                }).render()
            )

        $M(this.element)
            .find('#change-form-type').click(this.#changeFormType)
        
        $M(this.element).find('form').submit(this.#handleSubmit)
        
        return this.element
    }
}