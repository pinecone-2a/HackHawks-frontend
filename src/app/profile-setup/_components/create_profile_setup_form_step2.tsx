"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useEffect, useState } from "react";
import { UserInfoForm } from "../../utils/types";
type country = {
  name: {
    common: string;
  };
  cios: string;
  cca2: string;
};
export default function ProfileSetup2() {
  const [countries, setCountries] = useState<country[]>([]);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/all`);
      const data: country[] = await res.json();
      setCountries(data);
      // console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-[510px] h-[631px] flex flex-col gap-10">
      <div>
        <h1 className="text-xl font-bold">How would you like to be paid</h1>
        <p className="text-muted-foreground text-xs">
          Enter location and payment details
        </p>
      </div>
      <div className="flex flex-col gap-10">
        <div className="font-semibold ">
          <label htmlFor="countries">Select country</label>
          <select id="countries" className="w-full border p-2 rounded-md">
            {countries &&
              countries.map((country: country) => (
                <option key={country.cca2} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
          </select>
        </div>

        <div className="font-semibold flex justify-between">
          <div>
            <label htmlFor="firstname">First name</label>
            <Input
              id="firstname"
              name="firstname"
              placeholder="your first name"
            />
          </div>
          <div>
            <label htmlFor="lastname">Last name</label>
            <Input id="lastname" name="lastname" placeholder="your last name" />
          </div>
        </div>

        <div
          className="font-semibold
        "
        >
          <label htmlFor="card-number">Enter card number</label>
          <Input
            id="card-number"
            name="card"
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
        </div>
        <div className="font-semibold flex justify-between gap-2">
          <div>
            <label htmlFor="date">Expires</label>
            <select
              name="date"
              id="date"
              className="border p-2 w-40 rounded-lg"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year">Year</label>
            <select id="year" className="border p-2 w-40 rounded-lg">
              {years.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="CVC">CVC</label>
            <Input
              id="CVC"
              maxLength={3}
              type="number"
              name="CVC"
              placeholder="CVC"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            console.log("it works");
          }}
          className={``}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
