import React from "react";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios.post(`${API_URL_new}/api/update-profile`, {
      firstName,
      lastName,
      token: localStorage.getItem("token"),
    });
    navigate("/success");
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default CompleteProfile;
