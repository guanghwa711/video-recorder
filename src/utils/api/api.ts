import { Axios, type AxiosResponse } from 'axios';
import HTTP from '../http/http';
import type { ICandidateFilterObj } from '../common/types';

const API = {
    handleUserLoginSignUp: (userData: any) => {
        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.post('/users', userData)
                .then((response) => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
    getCandidates: (params?: ICandidateFilterObj) => {
        let parsedParams: any = {}

        if (params) {
            parsedParams.seeking_field = params.seeking_field.join(",");
            parsedParams.seeking_rate = params.seeking_rate.join(",");
            parsedParams.seeking_contract_type = params.seeking_contract_type.join(",");
        }

        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.get('/candidates', {
                params: parsedParams
            })
            .then(response => resolve(response))
            .catch(error => (
                reject(error)
            ))
        })
    },
    getCandidacies: (params?: any) => {

        if (params.status) {
            params.status = params.status.join(",");
        }

        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.get('/recruiters/candidacies', {
                params: params
            })
            .then(response => resolve(response))
            .catch(error => (
                reject(error)
            ))
        })
    },
    createVideoResume: (videoData: any) => {
        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.post('/video-resumes', videoData)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getVideoResumesByUserId: (userId: number) => {
        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.get('/video-resumes', {
                params: { user_id: userId }
            })
            .then(response => resolve(response))
            .catch(error => (
                reject(error)
            ))
        })
    },
    updateVideoResume: (videoId: string, data: any) => {
        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.put('/video-resumes/', { id: videoId, ...data })
            .then(response => resolve(response))
            .catch(error => (
                reject(error)
            ))
        })
    },
    makeVideoResumeLive: (videoId: number, userId: string) => {
        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.post('/video-resumes/makelive', { id: videoId, user_id: userId })
            .then(response => resolve(response))
            .catch(error => (
                reject(error)
            ))
        })
    },
    updateCandidacies: (candidacyData: any) => {
        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.post('/recruiters/candidacies/update', candidacyData)
            .then(response => resolve(response))
            .catch(error => (
                reject(error)
            ))
        })
    },
    deleteVideoResume: (id: number) => {
        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.post('/video-resumes/delete', {id})
            .then(response => resolve(response))
            .catch(error => (
                reject(error)
            ))
        })
    },
    getUserById: (userId: number) => {
        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.get(`/users/${userId}`)
            .then(response => resolve(response))
            .catch(error => (
                reject(error)
            ))
        })
    },
    updateUserById: (userId: number, data: any) => {
        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.post( `/users/update/${userId}`, data)
            .then(response => resolve(response))
            .catch(error => (
                reject(error)
            ))
        })
    },
    updateVideoResumeStatus: (id: number, status: string) => {
        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.post('/video-resumes/status', {id, status})
            .then(response => resolve(response))
            .catch(error => (
                reject(error)
            ))
        })
    }
}

export default API;