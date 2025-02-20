"use client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select";
import { useState, useEffect } from "react";

type Country = {
  name: {
    common: string;
  };
  cca2: string;
};

export default function PaymentDetails() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [cardData, setCardData] = useState<any>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [isButtonEnabled,setIsButtonEnabled] = useState<boolean>(false)

  const startYear = 2025;
  const endYear = 2030;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    };

    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-card`,{
        credentials:"include"
      });
      
      const data = await response.json();
      setCardData(data);
    };

    fetchCountries();
    fetchData();
  }, []);

  const validateForm = () => {
    const isFormValid =
    Boolean(firstName) &&
    Boolean(lastName) &&
    Boolean(cardNumber) &&
    cvc.length === 2 &&
    cardNumber.length === 16 &&
    Boolean(selectedYear)
    setIsButtonEnabled(isFormValid);
  };

  const handleSubmit = async () => {
    const formData = {
      firstName,
      lastName,
      cardNumber,
      selectedCountry,
      selectedMonth,
      selectedYear,
      cvc,
    };

<<<<<<< HEAD
    fetchData()
  }, [])
=======
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-card/update`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
      credentials:"include",
    });
    const data = await response.json();
    console.log(data); 
  };
>>>>>>> main



  return (
    <div className="w-[650px] min-h-[250px] text-black gap-1 p-[24px] flex flex-col rounded-[9px] border-[#E4E4E7] border-[1px]">
      <h1 className="font-bold text-[16px] pb-5">Payment details</h1>

     
      <div>
        <h2 className="text-[14px] font-semibold mb-2">Select country</h2>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full border-[#E4E4E7] border-[1px] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Country</SelectLabel>
              {countries.map((country: Country) => (
                <SelectItem key={country.cca2} value={country.cca2}>
                  {country.name.common}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      
      <div className="flex justify-between">
        <h2 className="text-[14px] font-semibold flex flex-col">
          First name
          <input
            value={firstName}
            onChange={(e) =>{setFirstName(e.target.value); validateForm()} }
            className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2 w-[292px]"
            type="text"
            placeholder="First name"
          />
        </h2>
        <h2 className="text-[14px] font-semibold flex flex-col">
          Last name
          <input
            value={lastName}
            onChange={(e) => { setLastName(e.target.value); validateForm(); }}
            className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2 w-[292px]"
            type="text"
            placeholder="Last name"
          />
        </h2>
      </div>

     
      <h2 className="text-[14px] font-semibold">Enter card number</h2>
      <input
        value={cardNumber}
        onChange={(e) => { setCardNumber(e.target.value); validateForm(); }}
        className={`rounded-[6px] border-[#E4E4E7] focus:outline-none border-[1px] p-2 ${cardNumber.length === 16 ? 'border-green-500' : 'border-red-500'}`}
        type="number"
        placeholder="XXXX-XXXX-XXXX-XXXX"
      />
          
      
      
      <div className="flex justify-between">
        <h2 className="text-[14px] font-semibold flex flex-col">
          Expires
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[192px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Month</SelectLabel>
                {months.map((month, index) => (
                  <SelectItem key={index} value={(index + 1).toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </h2>
        <h2 className="text-[14px] font-semibold flex flex-col">
          Year
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2 w-[192px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: endYear - startYear + 1 }).map((_, i) => {
                const year = startYear + i;
                return (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </h2>
        <h2 className="text-[14px] font-semibold flex flex-col">
          CVC
          <input
            value={cvc}
            onChange={(e) => {setCvc(e.target.value); validateForm()}}
            className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2 w-[192px]"
            type="text"
            placeholder="XXX"
          />
        </h2>
      </div>

     
      <button
         onClick={handleSubmit}
         disabled={!isButtonEnabled}
         className={`mt-4 p-2 text-white rounded ${
           isButtonEnabled ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
         }`}>
        Save changes
      </button>
    </div>
  );
}
