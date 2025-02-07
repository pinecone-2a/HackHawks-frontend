"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useEffect, useState } from "react";
import { UserInfoForm } from "../../utils/types";
import { z } from "zod";
import { form } from "@/app/account/_components/step1";
type country = {
  name: {
    common: string;
  };
  cios: string;
  cca2: string;
};

const paymentSchema = z.object({
  country: z.string(),
  firstName: z.string().min(6),
  lastName: z.string().min(6),
  cardNumber: z.string().min(16),
  expiryDate: z.date(),
});
export default function ProfileSetup2() {
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [countries, setCountries] = useState<country[]>([]);
  const [isValid, setValid] = useState<boolean>(false);
  const [form2, setForm2] = useState({
    country: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
  });
  const [form1, setForm1] = useState<UserInfoForm>({
    name: "",
    about: "",
    socialMediaURL: "",
    avatarImage: "",
  });
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  useEffect(() => {
    localStorage.setItem(
      "step2",
      JSON.stringify({
        country: form2.country,
        firstName: form2.firstName,
        lastName: form2.lastName,
      })
    );
    const result = paymentSchema.safeParse(form2);
    if (result.success) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [form2]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/all`);
      const data: country[] = await res.json();
      setCountries(data);
      // console.log(data);
    };
    fetchData();
  }, []);
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm2((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
    console.log(form2);
  };
  useEffect(() => {
    const formString = localStorage.getItem("step1");
    const formL = formString ? JSON.parse(formString) : {};
    setForm1(formL);
  }, []);
  console.log(form1);
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
          <select
            onChange={handleChange}
            name="country"
            id="countries"
            className="w-full border p-2 rounded-md"
          >
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
              onChange={handleChange}
              id="firstname"
              name="firstName"
              placeholder="your first name"
            />
          </div>
          <div>
            <label htmlFor="lastname">Last name</label>
            <Input
              onChange={handleChange}
              id="lastname"
              name="lastName"
              placeholder="your last name"
            />
          </div>
        </div>

        <div
          className="font-semibold
        "
        >
          <label htmlFor="card-number">Enter card number</label>
          <Input
            onChange={handleChange}
            id="card-number"
            name="cardNumber"
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
      <div className="flex justify-end text-background">
        <Button
          disabled={!isValid}
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
