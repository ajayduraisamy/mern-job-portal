import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    toast.success(res.data.message || "Logged out successfully");
                    navigate("/"); 
                }
            } catch (error) {
                console.error("Logout error:", error);
                toast.error(error?.response?.data?.message || "Logout failed");
            }
        };

        handleLogout();
    }, [navigate]);

    return null;
};

export default Logout;
