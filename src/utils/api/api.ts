import type { AxiosResponse } from 'axios';
import HTTP from '../http/http';
import type { ICandidateFilterObj } from '../common/types';

const API = {
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
        let parsedParams: any = {}

        if (params) {
            parsedParams.status = params.status.join(",");
        }

        return new Promise<AxiosResponse>((resolve, reject) => {
            HTTP.get('/recruiters/candidacies', {
                params: parsedParams
            })
            .then(response => resolve(response))
            .catch(error => (
                reject(error)
            ))
        })
    }
}

export default API;