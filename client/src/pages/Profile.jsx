import FormRow from "../components/FormRow";
import { useOutletContext, redirect } from "react-router-dom";
import { Form, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const action = async ({ request }) => {
    const formData = await request.formData();
    console.log(formData);
    const file = formData.get("avatar");
    if (file && file.size > 1000000) {
      toast.error("Image size too large");
      return null;
    }
    try {
      await axios.patch("/api/v1/users/update-user", formData);
      toast.success("Profile updated successfully");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return null;
    }
  };

const Profile = () => {
  const { user } = useOutletContext();
  const navigation=useNavigation();
  const isSubmitting=navigation.state === "submitting";

  const { name, lastName, email, location } = user;

  return (
    <div>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title" style={{textAlign: "center", marginBottom: "2rem"}}>profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 1 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <button type="submit" className="btn btn-block">
          {isSubmitting ? "Submitting..." : "Save changes"}
          </button>
        </div>
      </Form>
    </div>
  );
};
export default Profile;
