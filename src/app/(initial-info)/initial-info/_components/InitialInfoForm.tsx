'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import EnterPhoneno from "../../../../../public/assets/images/EnterPhoneno.png";
// import Lock from "../../../../../public/assets/images/lock.png"
import institute from "../../../../../public/assets/images/institute.jpg"
import classselection from "../../../../../public/assets/images/class.png"
import Examselection from "../../../../../public/assets/images/exam selection.png"
import Scheduleselection from "../../../../../public/assets/images/scheduleSelecton.png"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ArrowLeft } from 'lucide-react'
// import OtpInput from '@/components/shared/OtpInput';
import Elevenclass from "../../../../../public/assets/images/11thclass.png"
import twelveclass from "../../../../../public/assets/images/12thclass.png"
import Dropperlass from "../../../../../public/assets/images/Dropper.png"
import jeeone from "../../../../../public/assets/images/jeeone.png"
import jeetwo from "../../../../../public/assets/images/jeetwo.png"
import neetone from "../../../../../public/assets/images/neetone.png"
import neettwo from "../../../../../public/assets/images/neettwo.png"
import neetthree from "../../../../../public/assets/images/neetthree.png"
// import { ChevronLeft } from 'lucide-react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { StaticImageData } from 'next/image';
import { studentPersonalInfo } from '@/actions/user_actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getCollegeNames, getCityNames, getStateNames } from '@/actions/data_actions';


interface Institution {
  _id: string; // Use string to represent ObjectId
  College_Name: string;
  State: string;
  Stream: string;
  stateCode: string;

}

interface State {
  _id: string;
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string
}

interface City {
  _id: string;
  name: string;
  stateCode: string;
  latitude: string;
  longitude: string
}

type StepImage = {
  src: StaticImageData;
  width: number;
  height: number;
};

type GenderImages = {
  Female: StaticImageData;
  Male: StaticImageData;
  Other: StaticImageData;
}

type ClassImage = {
  Eleven: StaticImageData;
  Twelve: StaticImageData;
  Dropper: StaticImageData;
}
type ExamImages = {
  jee: {
    topRight: StaticImageData;
    bottomLeft: StaticImageData;
  };
  neet: {
    topRight: StaticImageData;
    bottomLeft: StaticImageData;
    middleRight: StaticImageData;
  };
}

const stepImages: Record<number, StepImage> = {
  1: { src: EnterPhoneno, width: 400, height: 400 }, // Image for step 1
  2: { src: institute, width: 435, height: 435 }, // Image for step 3
  3: { src: classselection, width: 435, height: 435 },  // Image for step 4
  4: { src: Examselection, width: 435, height: 435 }
}

const classImage: ClassImage = {
  Eleven: Elevenclass,
  Twelve: twelveclass,
  Dropper: Dropperlass
};

const examImages: ExamImages = {
  jee: {
    topRight: jeeone,
    bottomLeft: jeetwo,
  },
  neet: {
    topRight: neetthree,
    bottomLeft: neettwo,
    middleRight: neetone,
  },
};

export default function InitialInfoForm() {
  const router = useRouter();
  const [step, setStep] = useState(1)
  const [error, setError] = useState('');
  const [errors, setErrors] = useState(false);
  const [load, setload] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    schoolOrCollegeName: '',
    city: '',
    state: '',
    role: '',
    username: ''
  })
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [collegename, setcollegename] = useState('');
  const [statename, setstatename] = useState('');
  const [cityname, setcityname] = useState('');

  // Track focus for each input individually
  const [isInstitutionFocused, setIsInstitutionFocused] = useState(false);
  const [isStateFocused, setIsStateFocused] = useState(false);
  const [isCityFocused, setIsCityFocused] = useState(false);

  const fetchColleges = async (query: string) => {
    try {
      const response = await getCollegeNames(query);
      setInstitutions(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  const fetchStates = async (query: string) => {
    try {
      const response = await getStateNames(query);
      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (query: string) => {
    try {
      const response = await getCityNames(query);
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleInstitutionSearch = (value: string) => {
    setFormData((prev) => ({ ...prev, schoolOrCollegeName: value }));
    if (value) fetchColleges(value);
    else setInstitutions([]);
  };

  const handleStateSearch = (value: string) => {
    setFormData((prev) => ({ ...prev, state: value }));
    if (value) fetchStates(value);
    else setStates([]);
  };

  const handleCitySearch = (value: string) => {
    setFormData((prev) => ({ ...prev, city: value }));
    if (value) fetchCities(value);
    else setCities([]);
  };

  const handleSelect = (item: string, type: string) => {
    setFormData((prev) => ({ ...prev, [type]: item }));
    if (type === "schoolOrCollegeName") setInstitutions([]);
    if (type === "state") setStates([]);
    if (type === "city") setCities([]);
  };

  // Toggle focus state for each input separately
  const handleFocus = (inputType: string) => {
    if (inputType === "schoolOrCollegeName") setIsInstitutionFocused(true);
    else if (inputType === "state") setIsStateFocused(true);
    else if (inputType === "city") setIsCityFocused(true);
  };

  const handleBlur = (inputType: string) => {
    if (inputType === "schoolOrCollegeName") setIsInstitutionFocused(false);
    else if (inputType === "state") setIsStateFocused(false);
    else if (inputType === "city") setIsCityFocused(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };



  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 6))
  }

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userinfo = studentPersonalInfo(formData);
    console.log(userinfo)
  };

  const changeUsername = (e:any) => {
    setFormData({...formData, username : e.target.value})
  }

  const { src, width, height } = stepImages[step] || { src: '', width: 400, height: 400 }

  return (
    <>
      <div className='h-screen'>
        <div className="flex items-center mb-2 mt-2">
          {step != 1 ? <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="mr-1"
          >
            <AiOutlineArrowLeft className="h-6 w-6" />
          </Button> : <div className='h-10 w-11'></div>}

          <div className="w-full flex justify-center items-center gap-2">
            <div className="flex items-center rounded-[5px] gap-1 sm:gap-[8px] w-[85%] sm:w-[80%] mx-auto">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex-1 flex items-center">
                  <div
                    className={`h-[4px] sm:h-[6px] md:h-[8px] ${index < step - 1 ? 'bg-teal-500' : index == step - 1 ? 'bg-blue-300' : 'bg-gray-200'} rounded-[3px] transition-colors duration-300`}
                    style={{ width: '100%' }}
                  ></div>
                  {index < 5 - 1 && <div className="w-[2px] sm:w-[3px] md:w-[4px]"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex relative top-[2%] md:top-[10%] justify-between px-4 pb-4">
          <div className="bg-white rounded-lg w-full">
            <div className="mx-8 my-4 lg:flex justify-around items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <Image
                  src={src}
                  alt="Step Image"
                  width={width}
                  height={height}
                  className="mx-auto w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[100%] xl:max-w-[70%]"
                />
              </div>
              <div className="lg:w-1/2 lg:pl-8 justify-center flex items-center">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <div className="mx-8 my-4 flex flex-col justify-center items-center">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-4 whitespace-nowrap">
                        Enter Your Phone Number?
                      </h2>

                      <p className="text-gray-600 text-center mb-6">
                        We need to register your phone number before getting started!
                      </p>

                      <div className="flex items-center mb-4 border border-input rounded-md">
                        <Select
                          value="+91"
                          onValueChange={(value: any) => handleSelectChange('countryCode', value)}
                        >
                          <SelectTrigger className="w-[70px] px-4 py-2 h-full flex items-center justify-center border-none focus:outline-none focus:ring-0">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">+91</SelectItem>
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+44">+44</SelectItem>
                          </SelectContent>
                        </Select>

                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone (Optional)"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="flex items-center px-4 py-2 h-11 bg-background w-full rounded-r-md border-none focus:outline-none focus:ring-0"
                          required
                          maxLength={10}
                          pattern="[0-9]{10}"
                        />
                      </div>

                      {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                      )}
                      <div className='flex gap-3 items-center'>
                        <Button
                          onClick={() => {
                            if (!formData.phone) {
                              setError('Phone number is required');
                            } else if (formData.phone.length !== 10) {
                              setError('Phone number must be exactly 10 digits');
                            } else {
                              setError('');
                              handleNext();
                            }
                          }}
                          className="bg-teal-600 hover:bg-teal-600 text-white px-6 py-3"
                        >
                          {step < 5 ? 'Confirm' : 'Finish'}
                        </Button>
                        <Button
                          onClick={() => {
                            handleNext();
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3"
                        >
                          Skip
                        </Button>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-4 flex flex-col items-center justify-center h-full">
                      <div className='flex flex-col justify-center items-center gap-3'>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-2">What institution are you with?</h2>

                        {/* Institution Search Input */}
                        <div className="relative w-full max-w-md">
                          <input
                            type="text"
                            name="institution"
                            placeholder="Select your Institution..."
                            className="w-full p-3 border-gray-200 border rounded-lg shadow-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            value={formData.schoolOrCollegeName}
                            onChange={(e) => handleInstitutionSearch(e.target.value)}
                            onFocus={() => handleFocus("schoolOrCollegeName")}
                            onBlur={() => handleBlur("schoolOrCollegeName")}
                            required
                          />
                          {isInstitutionFocused && institutions.length > 0 && (
                            <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              {institutions.map((institution) => (
                                <div
                                  key={institution._id}
                                  className="p-3 hover:bg-blue-100 cursor-pointer"
                                  onMouseDown={() => handleSelect(institution.College_Name, "schoolOrCollegeName")}
                                >
                                  {institution.College_Name}
                                </div>
                              ))}
                            </div>
                          )}
                          {isInstitutionFocused && institutions.length === 0 && (
                            <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg">
                              <div className="p-3 text-gray-500">No institutions found</div>
                            </div>
                          )}
                        </div>

                        {/* State Search Input */}
                        <div className='flex items-center gap-3'>
                          <div className="relative w-full max-w-md">
                            <input
                              type="text"
                              name="state"
                              placeholder="Select your State..."
                              className="w-full p-3 border-gray-200 border rounded-lg shadow-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                              value={formData.state}
                              onChange={(e) => handleStateSearch(e.target.value)}
                              onFocus={() => handleFocus("state")}
                              onBlur={() => handleBlur("state")}
                              required
                            />
                            {isStateFocused && states.length > 0 && (
                              <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {states.map((state) => (
                                  <div
                                    key={state._id}
                                    className="p-3 hover:bg-blue-100 cursor-pointer"
                                    onMouseDown={() => handleSelect(state.name, "state")}
                                  >
                                    {state.name}
                                  </div>
                                ))}
                              </div>
                            )}
                            {isStateFocused && states.length === 0 && (
                              <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg">
                                <div className="p-3 text-gray-500">No states found</div>
                              </div>
                            )}
                          </div>

                          {/* City Search Input */}
                          <div className="relative w-full max-w-md">
                            <input
                              type="text"
                              name="city"
                              placeholder="Select your City..."
                              className="w-full p-3 border-gray-200 border rounded-lg shadow-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                              value={formData.city}
                              onChange={(e) => handleCitySearch(e.target.value)}
                              onFocus={() => handleFocus("city")}
                              onBlur={() => handleBlur("city")}
                            />
                            {isCityFocused && cities.length > 0 && (
                              <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {cities.map((city) => (
                                  <div
                                    key={city._id}
                                    className="p-3 hover:bg-blue-100 cursor-pointer"
                                    onMouseDown={() => handleSelect(city.name, "city")}
                                  >
                                    {city.name}
                                  </div>
                                ))}
                              </div>
                            )}
                            {isCityFocused && cities.length === 0 && (
                              <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg">
                                <div className="p-3 text-gray-500">No cities found</div>
                              </div>
                            )}
                          </div>

                        </div>
                        <Button
                          onClick={() => {
                            if (!formData.phone) {
                              setError('Phone number is required');
                            } else if (formData.phone.length !== 10) {
                              setError('Phone number must be exactly 10 digits');
                            } else {
                              setError('');
                              handleNext();
                            }
                          }}
                          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3"
                        >
                          {step < 5 ? 'Confirm' : 'Finish'}
                        </Button>
                      </div>
                    </div>

                  )}
                  {step === 3 && (
                    <div className="space-y-4 flex flex-col items-center justify-center">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-4 whitespace-nowrap">"I wish to join CampusBid as a..."</h2>
                      <div className="flex flex-col items-center">
                        <div className="flex gap-[50px] space-x-4 mb-4">
                          <button
                            type="button"
                            onClick={() => {
                              handleNext();
                            }}
                            className={`flex flex-col justify-center text-lg items-center p-4 border-2 rounded-lg hover:border-teal-500 bg-gray-50`}
                            style={{ width: '140px', height: '140px' }}
                          >
                            <span className="capitalize text-base lg:text-xl" onClick={() => { setFormData({ ...formData, role: "provider" }) }}>Project Expert</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleNext();
                            }}
                            className={`flex flex-col justify-center text-lg items-center p-4 border-2 rounded-lg hover:border-teal-500 bg-gray-50`}
                            style={{ width: '140px', height: '140px' }}
                          >
                            <span className="capitalize text-base lg:text-xl" onClick={() => { setFormData({ ...formData, role: "client" }) }}>Support Seeker</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  )}
                  {step === 4 && (
                    <div className="space-y-4 flex flex-col items-center justify-center">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
                        Select Your Username
                      </h2>
                      <div className="flex flex-col w-full space-y-4">
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={(e)=>{changeUsername(e)}}
                          placeholder="Enter your desired username"
                          className="p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 shadow-lg focus:ring-teal-500"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded"
                      >
                        Finish
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}