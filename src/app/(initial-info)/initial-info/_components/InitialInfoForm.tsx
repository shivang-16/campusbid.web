'use client'

import { TiTick } from 'react-icons/ti';
import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import EnterPhoneno from "../../../../../public/assets/images/EnterPhoneno.png";
import institute from "../../../../../public/assets/images/institute.jpg"
import classselection from "../../../../../public/assets/images/class.png"
import Examselection from "../../../../../public/assets/images/exam selection.png"
import Scheduleselection from "../../../../../public/assets/images/scheduleSelecton.png"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { StaticImageData } from 'next/image';
import { studentPersonalInfo } from '@/actions/user_actions';
import { useRouter } from 'next/navigation';
import { getCollegeNames, getCityNames, getStateNames } from '@/actions/data_actions';
import { modeChanger } from '@/actions/user_actions';
import InitialLoader from '@/components/ui/initialLoader';
import { useEffect } from 'react';

interface Institution {
  _id: string;
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


const stepImages: Record<number, StepImage> = {
  1: { src: EnterPhoneno, width: 400, height: 400 },
  2: { src: institute, width: 435, height: 435 },
  3: { src: classselection, width: 435, height: 435 },
  4: { src: Examselection, width: 435, height: 435 },
  5: { src: Scheduleselection, width: 435, height: 435 }
}


export default function InitialInfoForm() {
  const router = useRouter();
  const [step, setStep] = useState(1)
  const [error, setError] = useState('');

  const [load, setload] = useState(false);
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  const [city, setcity] = useState<City>();
  const [state, setstate] = useState<State>();
  const [institution, setinstitution] = useState<Institution>();
  const [formData, setFormData] = useState({
    phone: '',
    schoolOrCollegeName: {},
    city: {},
    state: {},
    role: '',
    mode: '',
    username: ''
  })

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [institutionName, setInstitutionName] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
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
      const response = await getCityNames(query, state?.isoCode || "");
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleInstitutionSearch = (value: string) => {
    setInstitutionName(value)
    if (value) fetchColleges(value);
    else setInstitutions([]);
  };

  const handleStateSearch = (value: string) => {
    setStateName(value)
    if (value) fetchStates(value);
    else setStates([]);
  };

  const handleCitySearch = (value: string) => {
    setCityName(value)
    if (value) fetchCities(value);
    else setCities([]);
  };

  const handleSelect = (item: object, type: string) => {
    setFormData((prev) => ({ ...prev, [type]: item }));
    if (type === "schoolOrCollegeName") setInstitutions([]);
    if (type === "state") setStates([]);
    if (type === "city") setCities([]);
  };

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
    console.log(formData)
    setStep(prev => Math.min(prev + 1, 6))
  }

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  useEffect(() => {
    if (formData.mode) {
      saveMode();
    }
    router.replace("/")
  }, [formData.mode]);


  const saveMode = async () => {
    try {
      const data = await modeChanger(formData);
      console.log(data);
    } catch (error) {
      console.error("Error saving mode:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setload(true);
    const userinfo = await studentPersonalInfo(formData);
    console.log(userinfo);
    setTimeout(() => {
      setload(false);
    }, 3000);
    setStep(prev => Math.min(prev + 1, 6));
  };


  const changeUsername = (e: any) => {
    setFormData({ ...formData, username: e.target.value })
  }

  const { src, width, height } = stepImages[step] || { src: '', width: 400, height: 400 }

  return (
    <>
      {!load ?
        <div className='h-screen'>
          <div className="flex items-center mb-2 mt-2">
            {step != 1 && step != 5 ? <Button
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

                          {/* Institution Input */}
                          <div className="relative w-full max-w-md text-base">
                            <p className={`${institution?.College_Name ? "bg-green-200 text-green-600" : "bg-yellow-200 text-yellow-600"} mb-1 flex items-center p-2 rounded-lg shadow`}>
                              {institution?.College_Name && (
                                <TiTick className="h-5 w-5 text-green-600 mr-2" />
                              )}
                              {institution?.College_Name || "Empty"}
                            </p>
                            <input
                              type="text"
                              name="institution"
                              placeholder="Select your Institution..."
                              className="w-full p-3 border-gray-200 border rounded-lg shadow-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                              value={institutionName}
                              onChange={(e) => handleInstitutionSearch(e.target.value)}
                              onFocus={() => handleFocus("schoolOrCollegeName")}
                              onBlur={() => {
                                handleBlur("schoolOrCollegeName");
                                if (!institution?._id) {
                                  setInstitutionName('');  // Clear the input on blur if empty
                                }
                              }}
                              required
                            />
                            {isInstitutionFocused && institutions.length > 0 && (
                              <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {institutions.map((institution) => (
                                  <div
                                    key={institution._id}
                                    className="p-3 hover:bg-blue-100 cursor-pointer"
                                    onMouseDown={() => {
                                      handleSelect(institution, "schoolOrCollegeName");
                                      setinstitution(institution);
                                      setInstitutionName(institution.College_Name); // Update institutionName with selected value
                                    }}
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

                          {/* State Input */}
                          <div className='flex items-center gap-3 text-base'>
                            <div className="relative w-full max-w-md">
                              <p className={`${state?.name ? "bg-green-200 text-green-600" : "bg-yellow-200 text-yellow-600"} mb-1 flex items-center p-2 rounded-lg shadow`}>
                                {state?.name && (
                                  <TiTick className="h-5 w-5 text-green-600 mr-2" />
                                )}
                                {state?.name || "Empty"}
                              </p>
                              <input
                                type="text"
                                name="state"
                                placeholder="Select your State..."
                                className="w-full p-3 border-gray-200 border rounded-lg shadow-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                value={stateName}
                                onChange={(e) => handleStateSearch(e.target.value)}
                                onFocus={() => handleFocus("state")}
                                onBlur={() => {
                                  handleBlur("state");
                                  if (!stateName) setStateName(''); // Clear the input on blur if empty
                                }}
                                required
                              />
                              {isStateFocused && states.length > 0 && (
                                <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                  {states.map((state) => (
                                    <div
                                      key={state._id}
                                      className="p-3 hover:bg-blue-100 cursor-pointer"
                                      onMouseDown={() => {
                                        setstate(state);
                                        handleSelect(state, "state"); // Update stateName with selected value
                                        setStateName(state.name)
                                      }}
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

                            {/* City Input */}
                            <div className="relative w-full max-w-md text-base">
                              <p className={`${city?.name ? "bg-green-200 text-green-600" : "bg-yellow-200 text-yellow-600"} mb-1 flex items-center p-2 rounded-lg shadow`}>
                                {city?.name && (
                                  <TiTick className="h-5 w-5 text-green-600 mr-2" />
                                )}
                                {city?.name || "Empty"}
                              </p>
                              <input
                                type="text"
                                name="city"
                                placeholder="Select your City..."
                                className="w-full p-3 border-gray-200 border rounded-lg shadow-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                value={cityName}
                                onChange={(e) => handleCitySearch(e.target.value)}
                                onFocus={() => handleFocus("city")}
                                onBlur={() => {
                                  handleBlur("city");
                                  if (!cityName) setCityName(''); // Clear the input on blur if empty
                                }}
                                disabled={!state?.isoCode} // Disable input if no state is selected
                              />
                              {isCityFocused && cities.length > 0 && (
                                <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                  {cities.map((city) => (
                                    <div
                                      key={city._id}
                                      className="p-3 hover:bg-blue-100 cursor-pointer"
                                      onMouseDown={() => {
                                        handleSelect(city, "city");
                                        setcity(city);
                                        setCityName(city.name); // Update cityName with selected value
                                      }}
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

                          {error && (
                            <p className="text-red-500 text-sm mb-4">{error}</p>
                          )}
                          <Button
                            onClick={() => {
                              if (!formData.schoolOrCollegeName) {
                                setError('Institution name is required');
                              } else if (!formData.city) {
                                setError('City is required');
                              } else if (!formData.state) {
                                setError('State is required');
                              } else {
                                setError('');
                                handleNext();
                              }
                            }}
                            disabled={!formData.schoolOrCollegeName || !formData.city || !formData.state || !cityName || !stateName || !institutionName}
                            className={`${!formData.schoolOrCollegeName || !formData.city || !formData.state || !cityName || !stateName || !institutionName
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-teal-500 hover:bg-teal-600'
                              } text-white px-6 py-3`}
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
                              <span className="capitalize text-base lg:text-xl" onClick={() => { setFormData({ ...formData, role: "provider" }) }}>Freelancer</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData
                                handleNext();
                              }}
                              className={`flex flex-col justify-center text-lg items-center p-4 border-2 rounded-lg hover:border-teal-500 bg-gray-50`}
                              style={{ width: '140px', height: '140px' }}
                            >
                              <span className="capitalize text-base lg:text-xl" onClick={() => { setFormData({ ...formData, role: "client" }) }}>Client</span>
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
                            onChange={(e) => { changeUsername(e) }}
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
                  {step === 5 && formData.role === 'client' && (
                    <div className="space-y-4 flex flex-col items-center justify-center">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-4">"At CampusBid, I prefer to be..."</h2>
                      <div className="flex flex-col items-center">
                        <div className="flex gap-[50px] space-x-4 mb-4">
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, mode: "public" });
                            }}
                            className={`flex flex-col justify-center text-lg items-center p-4 border-2 rounded-lg hover:border-teal-500 bg-gray-50`}
                            style={{ width: '140px', height: '140px' }}
                          >
                            <span className="capitalize text-base lg:text-xl">Open</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, mode: "anonymous" });
                            }}
                            className={`flex flex-col justify-center text-lg items-center p-4 border-2 rounded-lg hover:border-teal-500 bg-gray-50`}
                            style={{ width: '140px', height: '140px' }}
                          >
                            <span className="capitalize text-base lg:text-xl">Anonymous</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div> : <InitialLoader />}
    </>
  )
}