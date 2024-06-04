import axios from 'axios'

const strapi = axios.create({
    baseURL: import.meta.env.VITE_STRAPI_API_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`
    }
})

export const getStrapiObject = (singularApiId: string, relations?: string[]) => {
    return new Promise((resolve, reject) => {
        let mediaPopulateQuery = ''
        if (relations && relations?.length > 0) {
            mediaPopulateQuery = relations?.map(relation => `populate[${relation}][populate]=*`).join('&')
        }
        strapi.get(`/api/${singularApiId}?${mediaPopulateQuery}`)
            .then((response) => {
                resolve(response.data.data.attributes)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getImgUrl = (imageData: any) => {
    return import.meta.env.VITE_STRAPI_API_URL + imageData?.data?.attributes?.url;
}
