export type DataT = {
    education?: string;
    employment_type?: string;
    experience?: string;
    search?: string;
    lang?: string;
}

type Categories = {
    experience: string;
    education: string;
    employment_type: string;
}

export type VacancyCardT = {
    name: string;
    categories: Categories;
    desc: string;
}
