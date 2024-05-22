import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import server_url from '../services/server_url';
import { toast } from 'react-toastify';
import { updateProfile } from '../services/allApis';

function Profile() {
    const [user, setUser] = useState({
        id: "", username: "", email: "", password: "", github: "", linkedin: "", profile: ""
    });

    const [existingProfile, setExistingProfile] = useState("");
    const [preview, setPreview] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
            setUser({ 
                id: userDetails._id, 
                username: userDetails.username, 
                email: userDetails.email, 
                password: userDetails.password,
                github: userDetails.github, 
                linkedin: userDetails.linkedin, 
                profile: "" 
            });
            setExistingProfile(userDetails.profile);
        }
    }, [open]);

    useEffect(() => {
        if (user.profile) {
            setPreview(URL.createObjectURL(user.profile));
        } else {
            setPreview("");
        }
    }, [user.profile]);

    const handleProfileUpdate = async () => {
        const { username, password, email, github, linkedin, profile } = user;

        if (!username || !password || !email || !github || !linkedin ) {
            toast.warning("Enter Valid Inputs");
            return;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("github", github);
        formData.append("linkedin", linkedin);
        preview ? formData.append("profile", profile) : formData.append("profile", existingProfile);

        const headers = {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": preview ? "multipart/form-data" : "application/json"
        };

        try {
            const result = await updateProfile(headers, formData);
            if (result.status === 200) {
                toast.success("Profile updated successfully");
                sessionStorage.setItem("userDetails", JSON.stringify(result.data));
                setOpen(!open);
            } else {
                toast.error(result.response.data);
            }
        } catch (error) {
            toast.error("An error occurred while updating the profile.");
        }
    };

    return (
        <div className='p-5 shadow border'>
            <div className='d-flex justify-content-between'>
                <h4>Profile</h4>
                <button className='btn btn-success rounded' onClick={() => setOpen(!open)}>
                    <i className="fa-solid fa-down-long"></i>
                </button>
            </div>
            {open && (
                <div className='me-2'>
                    <label>
                        <input 
                            type="file" 
                            id="profileInput" 
                            onChange={(e) => setUser({ ...user, profile: e.target.files[0] })} 
                            style={{ display: 'none' }} 
                        />
                        <img 
                            className='img-fluid mb-3' 
                            style={{ width: '180px' }} 
                            src={preview ? preview : (existingProfile ? `${server_url}/uploads/${existingProfile}` : "https://cdn-icons-png.flaticon.com/512/3607/3607444.png")} 
                            alt="profile" 
                        />
                    </label>
                    <FloatingLabel className='mb-3' controlId="username" label="Username">
                        <Form.Control 
                            type="text" 
                            placeholder="Username" 
                            value={user.username} 
                            onChange={(e) => setUser({ ...user, username: e.target.value })} 
                        />
                    </FloatingLabel>
                    <FloatingLabel className='mb-3' controlId="git" label="GitHub">
                        <Form.Control 
                            type="text" 
                            placeholder="GitHub Account URL" 
                            value={user.github} 
                            onChange={(e) => setUser({ ...user, github: e.target.value })} 
                        />
                    </FloatingLabel>
                    <FloatingLabel className='mb-3' controlId="linkedin" label="LinkedIn URL">
                        <Form.Control 
                            type="text" 
                            placeholder="LinkedIn URL" 
                            value={user.linkedin} 
                            onChange={(e) => setUser({ ...user, linkedin: e.target.value })} 
                        />
                    </FloatingLabel>
                    <div className='d-grid mt-3'>
                        <button 
                            className='btn btn-block btn-warning' 
                            style={{ backgroundColor: '#4bbf73' }} 
                            onClick={handleProfileUpdate}
                        >
                            Update
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;