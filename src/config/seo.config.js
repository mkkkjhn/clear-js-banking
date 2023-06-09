const SITE_NAME = 'MEMA Bank - Pure JS'

export const getTitle = (title) => {
    return title ? `${title} | ${SITE_NAME}` : SITE_NAME
}