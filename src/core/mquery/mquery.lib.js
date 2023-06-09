/**
 * Represent the MQuery class for working with DOM elements.
 */
class MQuery {
    /**
     * Create a new MQuery instance.
     * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
     */
    constructor(selector) {
        if(typeof selector === 'string') {
            this.element = document.querySelector(selector)

            if(!this.element) {
                throw new Error(`Element ${selector} not found!`)
            }
        } else if (selector instanceof HTMLElement) {
            this.element = selector
        } else {
            throw new Error('Invalid selector type')
        }
    }
    
    /**
	 * Find the first element that matches the specified selector within the selected element.
	 * @param {string} selector - A CSS selector string to search for within the selected element.
	 * @returns {MQuery} A new MQuery instance for the found element.
	 */
    find(selector) {
        const element = new MQuery(this.element.querySelector(selector))

        if(element) {
            return element
        } else {
            throw new Error(`Element ${selector} not found!`)
        }
    }

    /**
     * Append a new element as a child of the selected element.
     * @param {HTMLElement} childElement - The new child element to append.
     * @returns {MQuery} The current MQuery instance for chaining.
     */
    append(childElement) {
        this.element.appendChild(childElement)
        return this
    }

    /**
     * Insert the new element before the selected element.
     * @param {HTMLElement} newElement - The new element to insert before the selected element.
     * @returns {MQuery} The current MQuery instance for chaining.
     */
    before(newElement) {
        if(!(newElement instanceof HTMLElement)) {
            throw new Error('Element must be an HTMLElement')
        }

        const parentElement = this.element.parentElement

        if (parentElement) {
            parentElement.insertBefore(newElement, this.element)
            return this
        } else {
            throw new Error('Element does not have a parent element')
        }
    }

    /**
     * Get or set hte inner HTML of the selected element.
     * @param {string} [htmlContent] - Optional HTML content to set. If not provided, the current inner HTML will be returned.
     * @returns {MQuery|string} The current MQuery instance for chaining when setting HTML content, or the current inner HTML when getting.
     */
    html(htmlContent) {
        if (typeof htmlContent === 'undefined') {
            return this.element.innerHTML
        } else {
            this.element.innerHTML = htmlContent
            return this
        }
    }

    /**
     * Set the CSS style of the selected element.
     * @param {string} property - The CSS property to set.
     * @param {string} value - The value to set for the CSS property.
     * @returns {MQuery} - The current MQuery instance for chaining.
     */
    css(property, value) {
        if (typeof property !== 'string' || typeof value !== 'string') {
            throw new Error('Property and Value must be strings.')
        }

        this.element.style[property] = value
        return this
    }

}

/**
 * Create a new MQuery instance for the given selector.
 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement. 
 * @returns {MQuery} A new MQuery instance for the given selector.
 */
export function $M(selector) {
    return new MQuery(selector)
}