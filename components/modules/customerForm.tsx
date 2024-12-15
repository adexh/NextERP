"use client"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button2 from "@/components/ui/button2";
import axios from "axios";

import { RadioButton } from "@/components/form/radioButton";
import { InputField } from "@/components/form/inputField";

import {
  Form,
  FieldContainer
} from "@/components/ui/form"
import toast from "react-hot-toast";
import { useEffect } from "react";

const formSchema = z.object({
  fname: z.string().min(2, "Atleast 2 characters"),
  lname: z.string(),
  contact: z.string(),
  email: z.string().email().optional(),
  org_name: z.string().optional(),
  gender: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
  dob: z.string({
    required_error: "A date of birth is required.",
  }).optional()
})

interface CustomerFormProps {
  editable?: boolean;
  clientId?: string;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ editable = false, clientId }) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //Keep default values here and also add in FormItem
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const url = editable ? `/api/clients/${clientId}` : '/api/clients/addClient';
    const method = editable ? 'PATCH' : 'POST'
    axios(url,
      {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(values)
      }).then((resp) => {
        if (resp.status === 201) {
          toast.success(resp.data.message);
        } else {
          toast.error("Internal Error !");
        }
      }).catch((err) => {
        console.log(err);
        toast.error("Internal Error !");
      })
  }

  useEffect(() => {
    const setFormData = async () => {
      if (editable && clientId) {
        const response = await axios.get(`/api/clients/${clientId}`);
        const clientData = response.data;

        Object.keys(clientData).forEach((key) => {
          if (key in formSchema.shape) {
            const value = (clientData[key] !== null && clientData[key] !== undefined) ? clientData[key].toString() : ''
            form.setValue(key as keyof z.infer<typeof formSchema>, value);
          }
        });
      }
    }
    setFormData();
  }, [editable, clientId, form])

  return <>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex">
          {/* Form Column 1 */}
          <div className="w-1/2">
            <FieldContainer>
              <InputField
                control={form.control}
                name="fname"
                label="First Name"
                placeholder="John"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="lname"
                label="Last Name"
                placeholder="Doe"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="email"
                type="email"
                label="Email"
                placeholder="example@xyz.com"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="org_name"
                label="Org. Name"
                placeholder="Company Ltd. Co."
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="contact"
                label="Contact"
                placeholder="+91 987654321"
              />
            </FieldContainer>
            <FieldContainer>
              <RadioButton
                control={form.control}
                name="gender"
                label="Gender"
                radioButtons={[
                  { label: "Male", value: "M" },
                  { label: "Female", value: "F" }
                ]}
              />
            </FieldContainer>
          </div>

          {/* Form Column 2 */}
          <div className="w-1/2">
            <FieldContainer>
              <InputField
                control={form.control}
                name="address"
                label="Address"
                placeholder="Pratiksha, 10th Road, Juhu Scheme"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="city"
                label="City"
                placeholder="Mumbai"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="state"
                label="State"
                placeholder="Maharashtra"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="country"
                label="Country"
                placeholder="India"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="pincode"
                label="Pincode"
                placeholder="540010"
              />
            </FieldContainer>
            <FieldContainer>
              <InputField
                control={form.control}
                name="dob"
                label="Date of Birth"
                type="date"
                placeholder="540010"
              />
            </FieldContainer>
          </div>
        </div>
        <div className="flex justify-end mr-8 mt-8 mb-8">
          <Button2 label="Onboard" />
        </div>
      </form>
    </Form>
  </>
}

export default CustomerForm;