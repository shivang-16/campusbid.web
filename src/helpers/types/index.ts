export type UserDataProps = {
  name: string;
  username: string;
  email: string;
  role: 'client' | 'freelancer';
  mode: 'public' | 'anonymous'
  phone: {
    personal?: number | null;
    other?: number | null;
  };
  address: {
    country?: string | null;
    city: ICity,
    state: IState,
    addressLine?: string | null;
    pincode?: number | null;
  };
  academic: {
    branch?: string | null;
    standard?: number | null;
    schoolOrCollegeName: ICollege;
    schoolOrCollegeAddress?: string | null;
  };
  about: {
    dateOfBirth?: string | null;
    gender?: string | null;
  };
  password?: string | null;
  salt?: string | null;
  avatar: {
    url: string;
    key: string;
  };
  details: {
    level: {
      number: number;
    };
    points: {
      number: number;
    };
    rating: {
      number: number;
      updatedAt?: Date;
    };
  };
  badges: {
    name?: string;
    url?: string;
  }[];
  documents: ISupportingDoc[]
  resetPasswordToken?: string | null;
  resetTokenExpiry?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  access_list?: [] 
  comparePassword(candidatePassword: string): Promise<boolean>;
  getToken(): Promise<string>;
}





export interface ICity {
  name: string,
  countryCode: string,
  stateCode: string,
  latitude: string,
  longitude: string
}

export interface IState {
  name: string,
  isoCode: string,
  countryCode: string,
  latitude: string,
  longitude: string
}

export interface ICollege {
  College_Name: string,
  State: string,
  StateCode: string,
  Stream: string,
}


// Supporting Document Interface
export interface ISupportingDoc {
  fileName: string;
  fileUrl: string;
  key: string;
  fileType: string;
  fileSize: number; // in bytes
  uploadedAt: Date;
}

// Bid Interface
export interface Bids {

    _id: string; 
    projectId: string | ProjectDataProps; 
    user: string | UserDataProps;  
    amount: number;                   
    currency: string;         
    proposal: string;                        
    status: 'pending' | 'accepted' | 'rejected' | 'closed'; 
    supportingDocs: ISupportingDoc[]
    deliveredIn: {
        days: number,
        date: Date
    }
    createdAt: Date;
    updatedAt: Date;

}
export interface IOptionset {
  _id: string,
  option: string,
  type: string,
  tag: string,
  value: string
}

// Project Interface
export interface ProjectDataProps {
  _id: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  deadline: Date;
  status: 'open' | 'in_progress' | 'completed' | 'closed';
  assignedBid: any
  postedBy: string; // Reference to the User who created the project
  bids: Bids[]; // Array of bids
  category: any[] ;
  skillsRequired: any[] ;
  supportingDocs: ISupportingDoc[]; // Array of supporting documents
  college: ICollege,
  location: {
    city: ICity,
    state: IState
  }
  createdAt: Date;
  updatedAt: Date;
}