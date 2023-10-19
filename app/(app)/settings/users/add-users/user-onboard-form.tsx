import Button from "@/components/ui/button";
import "./user-onboard-form.css"

const Form = () => {
  return <>
    <form action="" >
      <div className="flex">
        {/* Form Column 1 */}
        <div className="w-1/2">
          <div className="flex flex-col">
            <label htmlFor="fname" className="frm-label">
              First Name :
            </label>
            <input id="fname" type="text" className="frm-input" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="frm-label">
              Email :
            </label>
            <input id="email" type="email" className="frm-input" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="passwd" className="frm-label">
              Password :
            </label>
            <input id="passwd" type="password" className="frm-input" />
          </div>
        </div>

        {/* Form Column 2 */}
        <div className="w-1/2">

          <div className="flex flex-col">
            <label htmlFor="lname" className="frm-label">
              Last Name :
            </label>
            <input id="lname" type="text" className="frm-input" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="contact" className="frm-label">
              Contact :
            </label>
            <input id="contact" type="text" className="frm-input" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cnfmpasswd" className="frm-label">
              Confirm Password :
            </label>
            <input id="cnfmpasswd" type="password" className="frm-input" />
          </div>
          <div>
            <Button label="Onboard" />
          </div>
        </div>
      </div>
    </form>
  </>
}

export default Form;