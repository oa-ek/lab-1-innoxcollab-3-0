import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/User';
import { Event, EventFormValues } from '../models/Event';
import { EventBlock } from '../models/EventBlock';
import { Profile } from '../models/Profile';
import { PaginatedResult } from '../models/Pagination';
import { Tag } from '../models/Tag';
import { Type } from '../models/Type';
import { Company } from '../models/Company';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = `http://localhost:5000/api`;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found')
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat()
            }
            else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized')
            break;
        case 403:
            toast.error('Action is forbidden')
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error')
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Events = {
    list: (params: URLSearchParams) =>
        axios.get<PaginatedResult<Event[]>>('/events', { params }).then(responseBody),
    details: (id: string) => requests.get<Event>(`/events/${id}`),
    create: (event: EventFormValues) => requests.post<void>(`/events`, event),
    update: (event: EventFormValues) => requests.put<void>(`/events/${event.id}`, event),
    delete: (id: string) => requests.del<void>(`/events/${id}`),
    cancel: (id: string) => requests.post<void>(`/events/${id}/cancel`, {}),
    addEventBlock: (id: string, eventBlock: EventBlock) => requests.post<void>(`/events/${id}/`, eventBlock),
    search: (searchTerm: string) => requests.get<Event[]>(`/events/search?searchTerm=${searchTerm}`)
}

const Account = {
    current: () => requests.get<User>('/account/current'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Profiles = {
    list: () => requests.get<Profile[]>(`/profiles`),
    details: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    create: (user: Partial<Profile>) => requests.post<void>(`/profiles`, user),
    delete: (username: string) => requests.del<void>(`/profiles/${username}`),
    edit: (id: string, user: Partial<Profile>) => requests.put<void>(`/profiles/${id}`, user)
}

const Tags = {
    list: () => requests.get<Tag[]>(`/tags`),
    details: (id: string) => requests.get<Tag>(`/tags/${id}`),
    create: (tag: Tag) => requests.post<void>(`/tags`, tag),
    edit: (id: string, tag: Tag) => requests.put<void>(`/tags/${id}`, tag),
    delete: (id: string) => requests.del<void>(`/tags/${id}`)
}

const Types = {
    list: () => requests.get<Type[]>(`/types`),
    create: (type: Type) => requests.post<void>(`/types`, type),
    edit: (id: string, type: Type) => requests.put<void>(`/types/${id}`, type),
    delete: (id: string) => requests.del<void>(`/types/${id}`)
}

const Companies = {
    list: () => requests.get<Company[]>(`/companies`),
    details: (id: string) => requests.get<Company>(`/comanies/${id}`),
    create: (company: Company) => requests.post<void>(`/companies/`, company),
    edit: (id: string, company: Company) => requests.put(`/companies/${id}`, company),
    delete: (id: string) => requests.del(`/companies/${id}`)
}

const agent = {
    Events,
    Account,
    Profiles,
    Tags,
    Types,
    Companies
}

export default agent;