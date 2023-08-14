const initialLayoutModule = (() => {

    const createHeader = () => {
        const header = document.createElement('header')
        const headerTitle = document.createElement('h1')

        header.id = 'header'

        headerTitle.textContent = "BATTLESHIP"
        header.appendChild(headerTitle)

        return header
    }

    const createContentDiv = () => {
        const contentDiv = document.createElement('div')
        contentDiv.id = 'content'

        return contentDiv
    }

    const createFooter = () => {
        const footer = document.createElement('footer')
        footer.textContent = 'Copyright © 2023 thephilosopher13'
        footer.id = 'footer'

        return footer
    }

    const createPageLayout = () => {
        const header = createHeader()
        const content = createContentDiv()
        const footer = createFooter()
        const body = document.querySelector('body')

        body.appendChild(header)
        body.append(content)
        body.appendChild(footer)
    }

    return {
        createPageLayout
    }
})();

export default initialLayoutModule