import { BaseScreen } from "@/core/component/base-screen.component"
import renderService from "@/core/services/render.service"

import template from './home.template.html'
import styles from './home.module.scss'
import {$M} from '@/core/mquery/mquery.lib'

export class Home extends BaseScreen {
    constructor() {
        super({ title: 'Home' })
    }

    render() {
        const element = renderService.htmlToElement(template, [], styles)

        $M(element).find('h1').css('color', 'pink')

        return element
    }
}