export type UserDataProps = {
    name: string;
    email: string;
    username:string;
    category: 'basic' | 'pro' | 'premium' | 'free';
    phone: {
      personal?: number | null;
      other?: number | null;
    };
    address: {
      country?: string | null;
      addressLine?: string | null;
      pincode?: number | null;
    };
    role: "freelancer" | "client";
    mode: "anonymous" | "public"
    academic: {
      branch?: string | null;
      standard?: number | null;
      schoolOrCollegeName: {
        College_Name: string;
        State: string;
        Stream: string;
      };
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
    documents: {
      name: string,
      url: string,
      key: string,
    }[],
    resetPasswordToken?: string | null;
    resetTokenExpiry?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
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
  user: string; 
  amount: number;
  message?: string;
  bidDate?: Date;
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
  assignedBid: string
  postedBy: string; // Reference to the User who created the project
  bids: Bids[]; // Array of bids
  category: 'writing' | 'design' | 'development' | 'data-entry' | 'marketing';
  skillsRequired: string[];
  supportingDocs: ISupportingDoc[]; // Array of supporting documents
  college: ICollege,
  location: {
    city: ICity,
    state: IState
  }
  createdAt: Date;
  updatedAt: Date;
}