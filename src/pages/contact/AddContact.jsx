import React, { useState } from "react";


export default function AddContact() {
const [formData, setFormData] = useState({
name: "",
email: "",
phone: "",
location: "",
company: "",
designation: "",
tags: "",
subscribed: true
});


const handleChange = (e) => {
const { name, value, type, checked } = e.target;
setFormData({
...formData,
[name]: type === "checkbox" ? checked : value
});
};


const handleSubmit = (e) => {
e.preventDefault();
console.log("Form Submitted:", formData);
};


return (
<div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
<h2 className="text-2xl font-bold mb-6 text-center">Add New Contact</h2>
<form onSubmit={handleSubmit} className="space-y-4">
{[
["name", "Full Name"],
["email", "Email"],
["phone", "Phone"],
["location", "Location"],
["company", "Company"],
["designation", "Designation"],
["tags", "Tags"]
].map(([name, label]) => (
<div key={name}>
<label className="block mb-1 font-medium">{label}</label>
<input
type="text"
name={name}
value={formData[name]}
onChange={handleChange}
className="w-full border px-3 py-2 rounded"
required
/>
</div>
))}


<div className="flex items-center">
<input
type="checkbox"
name="subscribed"
checked={formData.subscribed}
onChange={handleChange}
className="mr-2"
/>
<label>Subscribed</label>
</div>


<button
type="submit"
className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
>
Save Contact
</button>
</form>
</div>
);
}