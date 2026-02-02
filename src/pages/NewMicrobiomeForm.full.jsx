import React, { useEffect, useState } from "react";
import "./NewMicrobiomeForm.full.css";
import axios from "axios";
import Select from "react-select";
import ThankYouModal from "../component/thankYouModal";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../component/ErrorModal";

// Shared styles for all React Select components
const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#dcf0ff",
    border: "none",
    borderRadius: "10px",
    padding: "0px 8px",
    minHeight: "44px",
    fontSize: "14px",
    boxShadow: "none",
    ":hover": {
      border: "none",
      boxShadow: "none",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 0",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    paddingRight: "8px",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#f5f8ff",
    borderRadius: "8px",
    border: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: "6px",
    padding: "10px 12px",
     fontSize: "14px",
    backgroundColor: state.isSelected
      ? "#19b5ff"
      : state.isFocused
        ? "#e0f4ff"
        : "white",
    cursor: "pointer",
    margin: "2px 4px",
  }),
};


//   { value: "Afghanistan", label: "Afghanistan" },
//   { value: "Albania", label: "Albania" },
//   { value: "Algeria", label: "Algeria" },
//   { value: "Andorra", label: "Andorra" },
//   { value: "Angola", label: "Angola" },
//   { value: "Argentina", label: "Argentina" },
//   { value: "Armenia", label: "Armenia" },
//   { value: "Australia", label: "Australia" },
//   { value: "Austria", label: "Austria" },
//   { value: "Azerbaijan", label: "Azerbaijan" },
//   { value: "Bahamas", label: "Bahamas" },
//   { value: "Bahrain", label: "Bahrain" },
//   { value: "Bangladesh", label: "Bangladesh" },
//   { value: "Barbados", label: "Barbados" },
//   { value: "Belarus", label: "Belarus" },
//   { value: "Belgium", label: "Belgium" },
//   { value: "Belize", label: "Belize" },
//   { value: "Benin", label: "Benin" },
//   { value: "Bhutan", label: "Bhutan" },
//   { value: "Bolivia", label: "Bolivia" },
//   { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
//   { value: "Botswana", label: "Botswana" },
//   { value: "Brazil", label: "Brazil" },
//   { value: "Brunei", label: "Brunei" },
//   { value: "Bulgaria", label: "Bulgaria" },
//   { value: "Burkina Faso", label: "Burkina Faso" },
//   { value: "Burundi", label: "Burundi" },
//   { value: "Cambodia", label: "Cambodia" },
//   { value: "Cameroon", label: "Cameroon" },
//   { value: "Canada", label: "Canada" },
//   { value: "Cape Verde", label: "Cape Verde" },
//   { value: "Central African Republic", label: "Central African Republic" },
//   { value: "Chad", label: "Chad" },
//   { value: "Chile", label: "Chile" },
//   { value: "China", label: "China" },
//   { value: "Colombia", label: "Colombia" },
//   { value: "Comoros", label: "Comoros" },
//   { value: "Congo", label: "Congo" },
//   { value: "Costa Rica", label: "Costa Rica" },
//   { value: "Croatia", label: "Croatia" },
//   { value: "Cuba", label: "Cuba" },
//   { value: "Cyprus", label: "Cyprus" },
//   { value: "Czech Republic", label: "Czech Republic" },
//   { value: "Denmark", label: "Denmark" },
//   { value: "Djibouti", label: "Djibouti" },
//   { value: "Dominica", label: "Dominica" },
//   { value: "Dominican Republic", label: "Dominican Republic" },
//   { value: "Ecuador", label: "Ecuador" },
//   { value: "Egypt", label: "Egypt" },
//   { value: "El Salvador", label: "El Salvador" },
//   { value: "Equatorial Guinea", label: "Equatorial Guinea" },
//   { value: "Eritrea", label: "Eritrea" },
//   { value: "Estonia", label: "Estonia" },
//   { value: "Ethiopia", label: "Ethiopia" },
//   { value: "Fiji", label: "Fiji" },
//   { value: "Finland", label: "Finland" },
//   { value: "France", label: "France" },
//   { value: "Gabon", label: "Gabon" },
//   { value: "Gambia", label: "Gambia" },
//   { value: "Georgia", label: "Georgia" },
//   { value: "Germany", label: "Germany" },
//   { value: "Ghana", label: "Ghana" },
//   { value: "Greece", label: "Greece" },
//   { value: "Grenada", label: "Grenada" },
//   { value: "Guatemala", label: "Guatemala" },
//   { value: "Guinea", label: "Guinea" },
//   { value: "Guinea-Bissau", label: "Guinea-Bissau" },
//   { value: "Guyana", label: "Guyana" },
//   { value: "Haiti", label: "Haiti" },
//   { value: "Honduras", label: "Honduras" },
//   { value: "Hong Kong", label: "Hong Kong" },
//   { value: "Hungary", label: "Hungary" },
//   { value: "Iceland", label: "Iceland" },
//   { value: "India", label: "India" },
//   { value: "Indonesia", label: "Indonesia" },
//   { value: "Iran", label: "Iran" },
//   { value: "Iraq", label: "Iraq" },
//   { value: "Ireland", label: "Ireland" },
//   { value: "Israel", label: "Israel" },
//   { value: "Italy", label: "Italy" },
//   { value: "Jamaica", label: "Jamaica" },
//   { value: "Japan", label: "Japan" },
//   { value: "Jordan", label: "Jordan" },
//   { value: "Kazakhstan", label: "Kazakhstan" },
//   { value: "Kenya", label: "Kenya" },
//   { value: "Kiribati", label: "Kiribati" },
//   { value: "Kuwait", label: "Kuwait" },
//   { value: "Kyrgyzstan", label: "Kyrgyzstan" },
//   { value: "Laos", label: "Laos" },
//   { value: "Latvia", label: "Latvia" },
//   { value: "Lebanon", label: "Lebanon" },
//   { value: "Lesotho", label: "Lesotho" },
//   { value: "Liberia", label: "Liberia" },
//   { value: "Libya", label: "Libya" },
//   { value: "Liechtenstein", label: "Liechtenstein" },
//   { value: "Lithuania", label: "Lithuania" },
//   { value: "Luxembourg", label: "Luxembourg" },
//   { value: "Macao", label: "Macao" },
//   { value: "Madagascar", label: "Madagascar" },
//   { value: "Malawi", label: "Malawi" },
//   { value: "Malaysia", label: "Malaysia" },
//   { value: "Maldives", label: "Maldives" },
//   { value: "Mali", label: "Mali" },
//   { value: "Malta", label: "Malta" },
//   { value: "Marshall Islands", label: "Marshall Islands" },
//   { value: "Mauritania", label: "Mauritania" },
//   { value: "Mauritius", label: "Mauritius" },
//   { value: "Mexico", label: "Mexico" },
//   { value: "Micronesia", label: "Micronesia" },
//   { value: "Moldova", label: "Moldova" },
//   { value: "Monaco", label: "Monaco" },
//   { value: "Mongolia", label: "Mongolia" },
//   { value: "Montenegro", label: "Montenegro" },
//   { value: "Morocco", label: "Morocco" },
//   { value: "Mozambique", label: "Mozambique" },
//   { value: "Myanmar", label: "Myanmar" },
//   { value: "Namibia", label: "Namibia" },
//   { value: "Nauru", label: "Nauru" },
//   { value: "Nepal", label: "Nepal" },
//   { value: "Netherlands", label: "Netherlands" },
//   { value: "New Zealand", label: "New Zealand" },
//   { value: "Nicaragua", label: "Nicaragua" },
//   { value: "Niger", label: "Niger" },
//   { value: "Nigeria", label: "Nigeria" },
//   { value: "North Korea", label: "North Korea" },
//   { value: "North Macedonia", label: "North Macedonia" },
//   { value: "Norway", label: "Norway" },
//   { value: "Oman", label: "Oman" },
//   { value: "Pakistan", label: "Pakistan" },
//   { value: "Palau", label: "Palau" },
//   { value: "Palestine", label: "Palestine" },
//   { value: "Panama", label: "Panama" },
//   { value: "Papua New Guinea", label: "Papua New Guinea" },
//   { value: "Paraguay", label: "Paraguay" },
//   { value: "Peru", label: "Peru" },
//   { value: "Philippines", label: "Philippines" },
//   { value: "Poland", label: "Poland" },
//   { value: "Portugal", label: "Portugal" },
//   { value: "Qatar", label: "Qatar" },
//   { value: "Romania", label: "Romania" },
//   { value: "Russia", label: "Russia" },
//   { value: "Rwanda", label: "Rwanda" },
//   { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
//   { value: "Saint Lucia", label: "Saint Lucia" },
//   { value: "Saint Vincent and the Grenadines", label: "Saint Vincent and the Grenadines" },
//   { value: "Samoa", label: "Samoa" },
//   { value: "San Marino", label: "San Marino" },
//   { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
//   { value: "Saudi Arabia", label: "Saudi Arabia" },
//   { value: "Senegal", label: "Senegal" },
//   { value: "Serbia", label: "Serbia" },
//   { value: "Seychelles", label: "Seychelles" },
//   { value: "Sierra Leone", label: "Sierra Leone" },
//   { value: "Singapore", label: "Singapore" },
//   { value: "Slovakia", label: "Slovakia" },
//   { value: "Slovenia", label: "Slovenia" },
//   { value: "Solomon Islands", label: "Solomon Islands" },
//   { value: "Somalia", label: "Somalia" },
//   { value: "South Africa", label: "South Africa" },
//   { value: "South Korea", label: "South Korea" },
//   { value: "South Sudan", label: "South Sudan" },
//   { value: "Spain", label: "Spain" },
//   { value: "Sri Lanka", label: "Sri Lanka" },
//   { value: "Sudan", label: "Sudan" },
//   { value: "Suriname", label: "Suriname" },
//   { value: "Sweden", label: "Sweden" },
//   { value: "Switzerland", label: "Switzerland" },
//   { value: "Syria", label: "Syria" },
//   { value: "Taiwan", label: "Taiwan" },
//   { value: "Tajikistan", label: "Tajikistan" },
//   { value: "Tanzania", label: "Tanzania" },
//   { value: "Thailand", label: "Thailand" },
//   { value: "Timor-Leste", label: "Timor-Leste" },
//   { value: "Togo", label: "Togo" },
//   { value: "Tonga", label: "Tonga" },
//   { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
//   { value: "Tunisia", label: "Tunisia" },
//   { value: "Turkey", label: "Turkey" },
//   { value: "Turkmenistan", label: "Turkmenistan" },
//   { value: "Tuvalu", label: "Tuvalu" },
//   { value: "Uganda", label: "Uganda" },
//   { value: "Ukraine", label: "Ukraine" },
//   { value: "United Arab Emirates", label: "United Arab Emirates" },
//   { value: "United Kingdom", label: "United Kingdom" },
//   { value: "United States", label: "United States" },
//   { value: "Uruguay", label: "Uruguay" },
//   { value: "Uzbekistan", label: "Uzbekistan" },
//   { value: "Vanuatu", label: "Vanuatu" },
//   { value: "Vatican City", label: "Vatican City" },
//   { value: "Venezuela", label: "Venezuela" },
//   { value: "Vietnam", label: "Vietnam" },
//   { value: "Yemen", label: "Yemen" },
//   { value: "Zambia", label: "Zambia" },
//   { value: "Zimbabwe", label: "Zimbabwe" }
// ];

export default function NewMicrobiomeForm() {
  // State for all fields

  const [selected, setSelected] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [kitTypes, setKitTypes] = useState([]);
  const[countries,setCountries]=useState([]);
  const [consent, setConsent] = useState(false);
  const [response, setResponse] = useState({});
  const navigate = useNavigate()
  const [showError, setShowError] = useState(false);
  

  const fetchCountries = async () => {
        // setLoading(true);
        try {
          const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");
          const countryList = response.data.map((country) => ({
            label: country.name.common,
            value: country.name.common
          }));
          setCountries(countryList); // Set the country list in the state
        } catch (error) {
          console.error("Error fetching countries:", error);
        } finally {
          // setLoading(false);
        }
      };


const allowedKitTypes = [
  "GI Axis Microbiome",
  "GI Axis Microbial Screen",
  "GI Axis Advanced",
  "Oral Microbiome",
  "Food Sensitivity Map 130",
  "Food Sensitivity Map 270",
  "Food Sensitivity Map Advanced",
  "Food Sensitivity 95",
  "Food Sensitivity Vegan",
  "Food Sensitivity Junior",
  "CRP",
  "DNAMap Health and Nutrition",
  "DNAMap ADHD and Autism",
  "DNAMap Male Fertility",
  "DNAMap Female Fertility",
  "DNAMap Hair and Skin"
];


  const fetchKittypes = async () => {
    const response = await getkittypes();
    await setKitTypes(response.data.kitTypes);
    console.log(response.data.kitTypes);
  };
const oldkittypes = [
  'Microbiome',
  'MicrobiomePlus',
  'MicrobiomeAdvanced',
  'Parasitology Test',
  'Food Sensitivtiy 100',
  'Food Sensitivtiy 210',
     "Food Sensitivity Advanced",
        "FoodSensitivityMap CRP",
]
  useEffect(() => {
    if (showThankYou) {
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
    }
  }, [showThankYou]);

  useEffect(() => {
    fetchKittypes();
    fetchCountries();
  }, []);

  const configMaker = (method, url, params = null, body = {}) => {
    return {
      method,
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/${url}`,
      headers: {
        "Content-Type": "application/json",
        // "Access-Token": accessTokens,
        // Authorization: `Bearer ${Tokens}`,
      },
      ...(params && { params }), // only adds if not null
      data: body,
    };
  };

  const getkittypes = async (image) => {
    const portalid = "67c17d743394a458c944eec2";
    try {
      const config = configMaker("get", "getallkittypes", { portalid }, {});
      const response = await axios.request(config);
      return response;
    } catch (error) {
      console.error("Error submitting ticket:", error);
      throw error;
    }
  };

  const submitKitForm = async (data) => {
    const portalId = "67c17d743394a458c944eec2";
    const config = configMaker("post", "submitkitform", {
      portalId,
    });
    config.data = data;
    const response = await axios.request(config);
    return response;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    weight: "",
    weightUnit: "KG",
    height: "",
    heightUnit: "FT & Inch",
    heightFeet: "",
    heightInches: "",
    gender: "Male",
    country: "",
    kitType: "",
    kitId: "",
    sampleDate: "",
    health: [],
    diet: "",
    eatingHabits: [],
    antibiotics: false,
  });

  const [errors, setErrors] = useState({
    health: "",
    diet: "",
    eatingHabits: "",
    antibiotics: "",
    consent: "",
  });

  const [healthConditions, setHealthConditions] = useState([
    {
      label: "Irritable Bowel Syndrome",
      icon: "/image53.svg",
      value: "irritable_bowel_syndrome",
      selected: false,
    },
    {
      label: "Inflammatory Bowel Disease",
      icon: "/image53.svg",
      value: "inflammatory_bowel_disease",
      selected: false,
    },
    {
      label: "Bloating / Gas issues",
      icon: "/image53.svg",
      value: "bloating_gas",
      selected: false,
    },
    {
      label: "I would like to lose weight",
      icon: "/image53.svg",
      value: "lose_weight",
      selected: false,
    },
    {
      label: "I would like to gain weight",
      icon: "/image53.svg",
      value: "gain_weight",
      selected: false,
    },
    {
      label: "Thyroid Conditions",
      icon: "/image53.svg",
      value: "thyroid",
      selected: false,
    },
    {
      label: "Heart / Cardiovascular problems",
      icon: "/image53.svg",
      value: "heart_problems",
      selected: false,
    },
    {
      label: "Skin Conditions",
      icon: "/image53.svg",
      value: "skin_conditions",
      selected: false,
    },
    {
      label: "Headaches / Migraines",
      icon: "/image53.svg",
      value: "migraines",
      selected: false,
    },
    {
      label: "Food Intolerances",
      icon: "/image53.svg",
      value: "food_intolerances",
      selected: false,
    },
    {
      label: "Arthritis",
      icon: "/image53.svg",
      value: "arthritis",
      selected: false,
    },
    {
      label: "Sleep Problems",
      icon: "/image53.svg",
      value: "sleep_problems",
      selected: false,
    },
    {
      label: "Diabetes",
      icon: "/image53.svg",
      value: "diabetes",
      selected: false,
    },
    {
      label: "No health conditions or concerns",
      icon: "",
      value: "No health conditions or concerns",
      selected: false,
    },
  ]);

  const [dietType, setDietType] = useState([
    {
      label: "Omnivore",
      icon: "/image53.svg",
      value: "omnivore",
      selected: false,
    },
    {
      label: "Vegetarian",
      icon: "/image53.svg",
      value: "vegetarian",
      selected: false,
    },
    { label: "Vegan", icon: "/image53.svg", value: "vegan", selected: false },
    {
      label: "Pescetarian",
      icon: "/image53.svg",
      value: "pescatarian",
      selected: false,
    },
  ]);
  const [eatingHabits, setEatingHabits] = useState([
    {
      label: "Intermittent Fasting",
      icon: "/image53.svg",
      value: "intermittent_fasting",
      selected: false,
    },
    {
      label: "High Protein",
      icon: "/image53.svg",
      value: "high_protein",
      selected: false,
    },
    {
      label: "Low Protein",
      icon: "/image53.svg",
      value: "low_protein",
      selected: false,
    },
    {
      label: "Ketogenic",
      icon: "/image53.svg",
      value: "ketogenic",
      selected: false,
    },
    {
      label: "High Carbohydrate",
      icon: "/image53.svg",
      value: "high_carb",
      selected: false,
    },
    {
      label: "Low Carbohydrates",
      icon: "/image53.svg",
      value: "low_carb",
      selected: false,
    },
    {
      label: "No specific diet",
      // icon: "/image53.svg",
      value: "No specific diet",
      selected: false,
    },
  ]);
  const [antibioticTaken, setAntibioticTaken] = useState("yes");
  const kitTypeOptions = [
    "Microbiome",
    "Oral Microbiome",
    "Candida",
    "DNA",
    "FoodSensitivityMap",
    "PRA",
  ];
  const initialFormState = {
    name: "",
    email: "",
    dob: "",
    weight: "",
    weightUnit: "KG",
    height: "",
    heightUnit: "FT & Inch",
    heightFeet: "",
    heightInches: "",
    gender: "Male",
    country: "",
    kitType: "",
    kitId: "",
    sampleDate: "",
    health: [],
    diet: "",
    eatingHabits: [],
    antibiotics: false,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheck = (name, value) => {
    setFormData((prev) => {
      const arr = prev[name];
      return arr.includes(value)
        ? { ...prev, [name]: arr.filter((v) => v !== value) }
        : { ...prev, [name]: [...arr, value] };
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleRadio = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // const nextErrors = {
  //   //   health: form.health.length === 0 ? "Please select at least one option." : "",
  //   //   diet: form.diet ? "" : "Please select your diet type.",
  //   //   eatingHabits: form.eatingHabits.length === 0 ? "Please select at least one eating habit." : "",
  //   // };
  //   // setErrors(nextErrors);
  //   // const hasError = Object.values(nextErrors).some((m) => m);
  //   // if (hasError) return;
  //   // Log full form data to console
  //   // Using JSON stringify for easy readability
  //   // eslint-disable-next-line no-console
  //   let kitIdValue = form.kitId;
  //   if (form.kitType === "FoodSensitivityMap") {
  //     kitIdValue = `T4-${form.kitId}-YGM`;
  //   }
  //   const formToLog = { ...form, kitId: kitIdValue };
  //   console.log("Form data:", JSON.parse(JSON.stringify(formToLog)));
  //   alert("Form submitted!");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const nextErrors = {
      health:
        formData.health.length === 0
          ? "Please select at least one option."
          : "",
      diet: formData.diet ? "" : "Please select your diet type.",
      eatingHabits:
        formData.eatingHabits.length === 0
          ? "Please select at least one eating habit."
          : "",
      consent: !consent ? "You must consent to the terms and conditions to submit" : "",
    };
    
    setErrors(nextErrors);
    
    if (Object.keys(nextErrors).some(key => nextErrors[key])) {
      setIsSubmitted(false);
      const firstKey = Object.keys(nextErrors).find(key => nextErrors[key]);
      toast.error(nextErrors[firstKey]);
      return;
    }
    
    let kitIdValue = formData.kitId;
    if (formData.kitType === "FoodSensitivityMap") {
      kitIdValue = `T4-${formData.kitId}-YGM`;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      height:
        formData.heightUnit === "FT & Inch"
          ? `${formData.heightFeet}' ${formData.heightInches || 0}"`
          : formData.height,
      heightUnit: formData.heightUnit,
      weightUnit: formData.weightUnit,
      weight: formData.weight,
      country: formData.country,
      sampleDate: formData.sampleDate,
      healthConditions: formData.health,
      dietType: formData.diet ? [formData.diet] : [],
      eatingHabits: formData.eatingHabits,
      antibioticTaken,
      kitId: kitIdValue,
    };

    try {
      const response = await submitKitForm(payload);
      // console.log(payload); // ab yahan sahi value dikhegi
      
      if(response.data.status === 1){
        navigate("/registeryourkits/kitRegistered");
        // Reset form states only on success
        setHealthConditions([
        {
          label: "Irritable Bowel Syndrome",
          icon: "/image53.svg",
          value: "irritable_bowel_syndrome",
          selected: false,
        },
        {
          label: "Inflammatory Bowel Disease",
          icon: "/image53.svg",
          value: "inflammatory_bowel_disease",
          selected: false,
        },
        {
          label: "Bloating / Gas issues",
          icon: "/image53.svg",
          value: "bloating_gas",
          selected: false,
        },
        {
          label: "I would like to lose weight",
          icon: "/image53.svg",
          value: "lose_weight",
          selected: false,
        },
        {
          label: "I would like to gain weight",
          icon: "/image53.svg",
          value: "gain_weight",
          selected: false,
        },
        {
          label: "Thyroid Conditions",
          icon: "/image53.svg",
          value: "thyroid",
          selected: false,
        },
        {
          label: "Heart / Cardiovascular problems",
          icon: "/image53.svg",
          value: "heart_problems",
          selected: false,
        },
        {
          label: "Skin Conditions",
          icon: "/image53.svg",
          value: "skin_conditions",
          selected: false,
        },
        {
          label: "Headaches / Migraines",
          icon: "/image53.svg",
          value: "migraines",
          selected: false,
        },
        {
          label: "Food Intolerances",
          icon: "/image53.svg",
          value: "food_intolerances",
          selected: false,
        },
        {
          label: "Arthritis",
          icon: "/image53.svg",
          value: "arthritis",
          selected: false,
        },
        {
          label: "Sleep Problems",
          icon: "/image53.svg",
          value: "sleep_problems",
          selected: false,
        },
        {
          label: "Diabetes",
          icon: "/image53.svg",
          value: "diabetes",
          selected: false,
        },
      ]);
      setDietType([
        {
          label: "Omnivore",
          icon: "/image53.svg",
          value: "omnivore",
          selected: false,
        },
        {
          label: "Vegetarian",
          icon: "/image53.svg",
          value: "vegetarian",
          selected: false,
        },
        {
          label: "Vegan",
          icon: "/image53.svg",
          value: "vegan",
          selected: false,
        },
        {
          label: "Pescetarian",
          icon: "/image53.svg",
          value: "pescatarian",
          selected: false,
        },
      ]);
      setEatingHabits([
        {
          label: "Intermittent Fasting",
          icon: "/image53.svg",
          value: "intermittent_fasting",
          selected: false,
        },
        {
          label: "High Protein",
          icon: "/image53.svg",
          value: "high_protein",
          selected: false,
        },
        {
          label: "Low Protein",
          icon: "/image53.svg",
          value: "low_protein",
          selected: false,
        },
        {
          label: "Ketogenic",
          icon: "/image53.svg",
          value: "ketogenic",
          selected: false,
        },
        {
          label: "High Carbohydrate",
          icon: "/image53.svg",
          value: "high_carb",
          selected: false,
        },
        //Added new field
        {
          label: "Low Carbohydrates",
          icon: "/image53.svg",
          value: "low_carb",
          selected: false,
        },
        {
      label: "No specific diet",
      // icon: "/image53.svg",
      value: "No specific diet",
      selected: false,
    },
      ]);
      } else if (response.data.status === 0) {
        console.log("Showing error modal", response.data);
        setResponse(response.data);
        setShowError(true);
        setIsSubmitted(false);
      }
    } catch (err) {
      console.error("Form submit failed", err);
      setResponse({
        httpStatus: err.response?.status || 500,
        message: err.response?.data?.message || err.message || "An unexpected error occurred. Please try again later."
      });
      setShowError(true);
      setIsSubmitted(false);
    }
  };

  const PillToggle = ({ checked, onChange, children }) => (
    <button
      type="button"
      className={checked ? "pill-toggle selected" : "pill-toggle"}
      onClick={onChange}
      aria-pressed={checked}
    >
      <span className="pill-label">{children}</span>
      <span className={checked ? "switch on" : "switch"} />
    </button>
  );

  return (
    <div className="new-microbiome-form-wrapper">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="new-microbiome-form" onSubmit={handleSubmit}>
        <div className="form-header-row">
          <h2>Register your kits</h2>
          <p className="main-heading">
            GutHealth<span>Lab</span>
          </p>
          {/* <img src="/logo512.png" alt="GutMapDx" className="logo-img" /> */}
        </div>
        <div className="form-grid">
          <div className="form-group name-group">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group email-group">
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
            />
          </div>
          <div className="form-group dob-group">
            <label>Date of Birth</label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group weight-group">
            <label>Weight</label>
            <div className="row-flex">
              <Select
                value={{ label: formData.weightUnit, value: formData.weightUnit }}
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    weightUnit: selectedOption.value
                  })
                }
                options={[
                  { label: "KG", value: "KG" },
                  { label: "LB", value: "LB" }
                ]}
                styles={customSelectStyles}
                isSearchable={false}
              />
              <input
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight"
                required
              />
            </div>
          </div>
          <div className="form-group height-group">
            <label>Height</label>
            <div className="input-select-wrapper">
              <Select
                value={{ label: formData.heightUnit, value: formData.heightUnit }}
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    heightUnit: selectedOption.value,
                    height: "",
                    heightFeet: "",
                    heightInches: ""
                  })
                }
                options={[
                  { label: "FT & Inch", value: "FT & Inch" },
                  { label: "CM", value: "CM" }
                ]}
                styles={customSelectStyles}
                isSearchable={false}
              />
              {formData.heightUnit === "FT & Inch" ? (
                <div className="height-inputs-wrapper">
                  <input
                    name="heightFeet"
                    type="number"
                    value={formData.heightFeet}
                    onChange={(e) =>
                      setFormData({ ...formData, heightFeet: e.target.value })
                    }
                    placeholder="Feet"
                    required
                    className="second-row-input"
                  />
                  <input
                    name="heightInches"
                    type="number"
                    value={formData.heightInches}
                    onChange={(e) =>
                      setFormData({ ...formData, heightInches: e.target.value })
                    }
                    placeholder="Inches"
                    className="second-row-input"
                  />
                </div>
              ) : (
                <input
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                  placeholder="CM"
                  required
                  className="second-row-input"
                />
              )}
            </div>
          </div>
          <div className="form-group gender-group">
            <label>Gender at Birth</label>
            <Select
              value={{ label: formData.gender, value: formData.gender }}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  gender: selectedOption.value
                })
              }
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" }
              ]}
              styles={customSelectStyles}
              isSearchable={false}
            />
          </div>
          <div className="form-group country-group">
            <label>Country of Residence</label>
            <Select
              value={countries.find((country) => country.value === formData.country) || null}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  country: selectedOption ? selectedOption.value : ""
                })
              }
              options={countries}
              placeholder="Select Country"
              isSearchable
              required
              styles={customSelectStyles}
            />
          </div>
          <div className="form-group kittype-group">
            <label>Kit Type</label>
            <Select
              value={
                formData.kitType
                  ? { label: formData.kitType, value: formData.kitType }
                  : null
              }
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  kitType: selectedOption ? selectedOption.value : ""
                })
              }
              options={allowedKitTypes
                .filter(type => !oldkittypes.includes(type))
                .map((type) => ({ label: type, value: type }))}
              placeholder="Please Select KIT Type"
              isSearchable
              required
              styles={customSelectStyles}
            />
          </div>
          <div className="form-group kitid-group">
            <label>Kit ID</label>
            {formData.kitType === "FoodSensitivityMap" ? (
              <div className="kitid-composite">
                <span className="segment prefix">T4-</span>
                <input
                  name="kitId"
                  type="number"
                  value={formData.kitId}
                  onChange={handleChange}
                  placeholder="Kit-Code"
                  required
                  inputMode="numeric"
                />
                <span className="segment suffix">-YGM</span>
              </div>
            ) : (
              <input
                name="kitId"
                value={formData.kitId}
                onChange={handleChange}
                required
              />
            )}
          </div>
          <div className="form-group sampledate-group">
            <label>Sample Date</label>
            <input
              name="sampleDate"
              type="date"
              value={formData.sampleDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {formData.kitType !== "DNAMap Genetic Test" && (
          <>
            <div className="section">
              <label>
                Do you have any of the below health conditions or concerns?
              </label>
              <div className="checkbox-grid">
                {healthConditions.map((opt) => (
                  <PillToggle
                    key={opt.value}
                    checked={formData.health.includes(opt.value)}
                    onChange={() => handleCheck("health", opt.value)}
                  >
                    {opt.label}
                  </PillToggle>
                ))}
              </div>
              {isSubmitted && errors.health && (
                <div style={{ color: "#c62828", fontSize: "12px", marginTop: "6px" }}>{errors.health}</div>
              )}
            </div>
            <div className="section">
              <label>What best describes your diet type?</label>
              <div className="button-group">
                {dietType.map((opt) => (
                  <PillToggle
                    key={opt.value}
                    checked={formData.diet === opt.value}
                    onChange={() => handleRadio("diet", opt.value)}
                  >
                    {opt.label}
                  </PillToggle>
                ))}
              </div>
              {isSubmitted && errors.diet && (
                <div style={{ color: "#c62828", fontSize: "12px", marginTop: "6px" }}>{errors.diet}</div>
              )}
            </div>
            <div className="section">
              <label>Do you follow any of these eating habits?</label>
              <div className="button-group">
                {eatingHabits.map((opt) => (
                  <PillToggle
                    key={opt.value}
                    checked={formData.eatingHabits.includes(opt.value)}
                    onChange={() => handleCheck("eatingHabits", opt.value)}
                  >
                    {opt.label}
                  </PillToggle>
                ))}
              </div>
              {isSubmitted && errors.eatingHabits && (
                <div style={{ color: "#c62828", fontSize: "12px", marginTop: "6px" }}>{errors.eatingHabits}</div>
              )}
            </div>
            <div className="section">
              <label>Have you taken antibiotics in the last 12 months?</label>
              <div className="antibiotic-row">
                <div className="antibiotic-toggle">
                  <button
                    type="button"
                    className={
                      formData.antibiotics === true
                        ? "antibiotic-pill selected"
                        : "antibiotic-pill"
                    }
                    onClick={() => handleRadio("antibiotics", true)}
                    aria-pressed={formData.antibiotics === true}
                  >
                    <span>✅</span>
                    <span>Yes</span>
                  </button>
                  <button
                    type="button"
                    className={
                      formData.antibiotics === false
                        ? "antibiotic-pill selected no"
                        : "antibiotic-pill no"
                    }
                    onClick={() => handleRadio("antibiotics", false)}
                    aria-pressed={formData.antibiotics === false}
                  >
                    <span>❌</span>
                    <span>No</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="section full-width">
              <div className="consent-checkbox">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    className="checkinput2"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="consent-label-text">
                    I consent to the terms and conditions and understand that
                    anonymous test data is used to improve our gut health
                    solutions.
                  </span>
                </label>
              </div>
              {isSubmitted && errors.consent && (
                <div style={{ color: "#c62828", fontSize: "12px", marginTop: "6px" }}>{errors.consent}</div>
              )}
              <div style={{ marginTop: '20px' }}>
                <button type="submit" className="inline-submit" style={{ width: '100%' }}>
                  Submit
                </button>
              </div>
            </div>
          </>
        )}
        {formData.kitType === "DNAMap Genetic Test" && (
          <div
            className="submit-section full-width "
            style={{ marginTop: "60px", width: "auto" }}
          >
            <button
              type="submit"
              className="submit-btn inline-submit"
              style={{ width: "100%" }}
            >
              Submit
            </button>
          </div>
        )}
      </form>
      <ErrorModal
                isOpen={showError}
                onClose={() => setShowError(false)}
                title="Failed to Submit"
                errorCode={response?.httpStatus}
                message={
                  response?.message ||
                  "There was an issue registering your Kit. Please try again or contact support."
                }
              />
    </div>
  );
}
