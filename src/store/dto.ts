export interface School {
    id: number;
    recordStatus: number;
    name: string;
    code: string;
    institutionId: number;
    institution: Institution;
    institutionTypeId: number;
    institutionType: InstitutionType;
    cityId: number;
    city: City;
    countyId: number;
    county: {
      id: number;
      recordStatus: number;
      name: string;
      code: string;
      cityId: number;
      city: City;
    };
  }
  
  export interface Institution {
    id: number;
    recordStatus: number;
    name: string;
    code: string;
  }
  
  export interface InstitutionType {
    id: number;
    recordStatus: number;
    name: string;
    code: string;
  }
  
  export interface City {
    id: number;
    recordStatus: number;
    name: string;
    code: string;
  }
  
  export interface Country {
    id: number;
    recordStatus: number;
    name: string;
    code: string;
    cityId: number;
    city: City;
  }
