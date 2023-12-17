import { makeAutoObservable, runInAction } from "mobx";
import { Company } from "../models/Company";
import agent from "../api/agent";
import { store } from "./store";

export default class CompanyStore {
    companies: Company[] = [];
    selectedCompany: Company | null = null;
    loading: boolean = false;
    loadingButton: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedCompany = (company: Company | null) => {
        this.selectedCompany = company;
    }

    loadCompanies = async () => {
        this.loading = true;
        try {
            const companies = await agent.Companies.list();
            runInAction(() => {
                this.companies = companies;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadCompany = async (id: string) => {
        this.loading = true;
        try {
            const company = await agent.Companies.details(id);
            runInAction(() => {
                this.selectedCompany = company;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    createCompany = async (company: Company) => {
        this.loadingButton = true;
        try {
            await agent.Companies.create(company);
            runInAction(() => {
                this.loadCompanies();
                this.loading = false;
                store.modalStore.handleOpen();
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingButton = false);
        }
    }

    editCompany = async (id: string, company: Company) => {
        this.loadingButton = true;
        try {
            await agent.Companies.edit(id, company);
            runInAction(() => {
                this.loadCompanies();
                this.loadingButton = false;
                store.modalStore.handleOpen();
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingButton = false);
        }
    }

    deleteCompany = async (id: string) => {
        this.loadingButton = true;
        try {
            await agent.Companies.delete(id);
            runInAction(() => {
                this.companies = this.companies.filter(x => x.id != id);
                this.loadingButton = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingButton = false);
        }
    }
}