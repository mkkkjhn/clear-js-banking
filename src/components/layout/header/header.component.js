import ChildComponent from '@/core/component/child.component'
import renderService from "@/core/services/render.service"

import template from './header.template.html'
import styles from './header.module.scss'
import { LogoutButton } from './logout-button/logout-button.component'
import { Logo } from './logo/logo.component'
import { Search } from './search/search.component'
import { Store } from '@/core/store/store'
import { $M } from '@/core/mquery/mquery.lib'
import { UserItem } from '@/components/ui/user-item/user-item.component'

export class Header extends ChildComponent {
    constructor({router}) {
        super()

        this.store = Store.getInstance()
        this.store.addObserver(this)

        this.router = router

        this.UserItem = new UserItem({
            avatarPath: '/',
            name: 'Mema'
        })
    }

    update(){
        this.user = this.store.state.user

        const authSideElement = $M(this.element).find('#auth-side')

        if (this.user) {
            authSideElement.show()
            this.UserItem.update(this.user)
            this.router.navigate('/')
        } else {
            authSideElement.hide()
        }
    }

    render() {
        this.element = renderService.htmlToElement(template, [
            Logo, 
            new LogoutButton({
                router: this.router
            }), 
            Search,
            this.UserItem
        ], styles)

        this.update()
        
        return this.element
    }
}