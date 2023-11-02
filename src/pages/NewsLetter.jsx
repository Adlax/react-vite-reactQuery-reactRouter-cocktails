import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const newsletterUrl = `https://www.course-api.com/cocktails-newsletter`;

export const action = async ({ request }) => {
	const formData = await request.formData();
	// console.log(formData);
	const data = Object.fromEntries(formData);
	// console.log(data);

	try {
		const response = await axios.post(newsletterUrl, data);
		// console.log(response);
		toast.success(response.data.msg);
		//we return a navigate / redirect
		return redirect("/");
	} catch (error) {
		console.log(error);
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

const NewsLetter = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<Form className="form" method="POST">
			<h4 style={{ textAlign: "center", marginBottom: "2rem" }}>subscribe to our newsletter</h4>
			<div className="form-row">
				<label htmlFor="name" className="form-label">
					name
				</label>
				<input type="text" className="form-input" id="name" name="name" required />
			</div>
			<div className="form-row">
				<label htmlFor="lastName" className="form-label">
					last name
				</label>
				<input type="text" className="form-input" id="lastName" name="lastName" required />
			</div>
			<div className="form-row">
				<label htmlFor="email" className="form-label">
					email
				</label>
				<input type="text" className="form-input" id="email" name="email" defaultValue="test@test.com" required />
			</div>
			<button type="submit" className="btn btn-block" style={{ marginTop: "0.5rem" }} disabled={isSubmitting}>
				{isSubmitting ? "submitting" : "submit"}
			</button>
		</Form>
	);
};

export default NewsLetter;
