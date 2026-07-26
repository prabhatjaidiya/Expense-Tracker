import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import ExpenseContext from "../context/ExpenseContext";
import {
    User,
    Mail,
    Phone,
    MapPin,
    BriefcaseBusiness,
    Camera,
    Wallet,
    ArrowDownCircle,
    ArrowUpCircle,
    Receipt,
    Eye,
    EyeOff
} from "lucide-react";
import DangerZoneCard from "../components/DangerZoneCard";
import AppearanceCard from "../components/AppearanceCard";
import PageWrapper from "../components/PageWrapper";


const Profile = () => {
    const {
        totalBalance,
        totalIncome,
        totalExpense,
        transactions,
    } = useContext(ExpenseContext);
    const { currentUser, updateProfile, resetPassword } = useContext(AuthContext)
    const [profile, setProfile] = useState(currentUser);
    const [isEditing, setIsEditing] = useState(false);
    const [edited, setEdited] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const handleChange = (e) => {
        setEdited(true);

        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        updateProfile(profile);
        toast.success("Profile updated successfully!");
        setEdited(false);
        setIsEditing(false);
    };

    const handleAvatar = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            setProfile({
                ...profile,
                avatar: reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdatePassword = () => {
        if (!passwordData.currentPassword) {
            toast.error("Enter your current password.");
            return;
        }

        if (passwordData.currentPassword !== currentUser.password) {
            toast.error("Current password is incorrect.");
            return;
        }

        if (passwordData.newPassword.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        resetPassword(currentUser.email, passwordData.newPassword);

        toast.success("Password updated successfully!");

        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    return (
        <PageWrapper>
            <div className="min-h-screen bg-white rounded-3xl dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">

                <AppearanceCard />

                {/* Header */}

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow p-8 flex flex-col md:flex-row items-center gap-8 transition-colors">

                    <div className="relative">

                        <img
                            src={
                                profile?.avatar ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    profile?.fullName || "User"
                                )}`
                            }
                            alt={profile?.fullName || "User Avatar"}
                            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500"
                        />

                        {isEditing && (
                            <>
                                <input
                                    hidden
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatar}
                                />

                                <label
                                    htmlFor="avatar"
                                    className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer text-white"
                                >
                                    <Camera size={18} />
                                </label>
                            </>
                        )}

                    </div>

                    <div className="flex-1">

                        <div className="flex items-center gap-3">

                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {profile.fullName}
                            </h1>

                            {isEditing && (
                                <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 text-sm">
                                    Editing...
                                </span>
                            )}

                        </div>

                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {profile?.occupation}
                        </p>

                        <div className="flex flex-wrap gap-6 mt-5 text-gray-600 dark:text-gray-300">

                            <div className="flex items-center gap-2">
                                <Mail size={18} />
                                {profile?.email}
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone size={18} />
                                {profile?.phone}
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                {profile?.location}
                            </div>

                        </div>

                    </div>

                </div>

                {/* Stats */}

                <div className="grid md:grid-cols-4 gap-6 mt-8">

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow transition-colors">
                        <Wallet className="text-indigo-600" size={32} />
                        <p className="text-gray-500 dark:text-gray-400 mt-4">Balance</p>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            ₹ {totalBalance.toLocaleString("en-IN")}
                        </h2>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow transition-colors">
                        <ArrowUpCircle className="text-green-600" size={32} />
                        <p className="text-gray-500 dark:text-gray-400 mt-4">Income</p>
                        <h2 className="text-2xl font-bold text-green-600">
                            ₹ {totalIncome.toLocaleString("en-IN")}
                        </h2>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow transition-colors">
                        <ArrowDownCircle className="text-red-600" size={32} />
                        <p className="text-gray-500 dark:text-gray-400 mt-4">Expense</p>
                        <h2 className="text-2xl font-bold text-red-600">
                            ₹ {totalExpense.toLocaleString("en-IN")}
                        </h2>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow transition-colors">
                        <Receipt className="text-orange-500" size={32} />
                        <p className="text-gray-500 dark:text-gray-400 mt-4">
                            Transactions
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {transactions.length}
                        </h2>
                    </div>

                </div>

                {/* Form */}

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl mt-8 lg:p-8 transition-colors">

                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                        Personal Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>

                            <div
                                className={`flex items-center rounded-xl mt-2 px-4 border transition-colors
                                    ${isEditing
                                        ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                        : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                    }`}
                            >
                                <User size={18} className="text-gray-400" />
                                <input
                                    type="text"
                                    name="fullName"
                                    disabled={!isEditing}
                                    value={profile?.fullName}
                                    onChange={handleChange}
                                    className={`w-full p-3 outline-none rounded-xl bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>

                            <div
                                className={`flex items-center rounded-xl mt-2 px-4 border transition-colors
                                    ${isEditing
                                        ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                        : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                    }`}
                            >
                                <Mail size={18} className="text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    disabled={!isEditing}
                                    value={profile?.email}
                                    onChange={handleChange}
                                    className={`w-full p-3 outline-none rounded-xl bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Phone
                            </label>

                            <div
                                className={`flex items-center rounded-xl mt-2 px-4 border transition-colors
                                    ${isEditing
                                        ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                        : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                    }`}
                            >
                                <Phone size={18} className="text-gray-400" />
                                <input
                                    type="text"
                                    name="phone"
                                    disabled={!isEditing}
                                    value={profile?.phone}
                                    onChange={handleChange}
                                    className={`w-full p-3 outline-none rounded-xl bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Occupation
                            </label>

                            <div
                                className={`flex items-center rounded-xl mt-2 px-4 border transition-colors
                                    ${isEditing
                                        ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                        : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                    }`}
                            >
                                <BriefcaseBusiness
                                    size={18}
                                    className="text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="occupation"
                                    disabled={!isEditing}
                                    value={profile?.occupation}
                                    onChange={handleChange}
                                    className={`w-full p-3 outline-none rounded-xl bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400`}
                                />
                            </div>
                        </div>

                        <div className={`md:col-span-2`}>

                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Location
                            </label>

                            <div
                                className={`flex items-center rounded-xl mt-2 px-4 border transition-colors
                                    ${isEditing
                                        ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                        : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                    }`}
                            >
                                <MapPin
                                    size={18}
                                    className="text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="location"
                                    disabled={!isEditing}
                                    value={profile?.location}
                                    onChange={handleChange}
                                    className={`w-full p-3 outline-none rounded-xl bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400`}
                                />
                            </div>

                        </div>

                        <div className="md:col-span-2">

                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Bio
                            </label>

                            <textarea
                                rows="5"
                                name="bio"
                                disabled={!isEditing}
                                value={profile?.bio}
                                onChange={handleChange}
                                className={`w-full mt-2 rounded-xl p-4 outline-none resize-none
                                border transition-colors
                                text-gray-900 dark:text-white
                                border-gray-300 dark:border-gray-600
                                ${isEditing
                                        ? "bg-white dark:bg-gray-800"
                                        : "bg-gray-100 dark:bg-gray-800"
                                    }`}
                            />

                        </div>

                    </div>

                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-3 mt-2">
                            <button
                                onClick={() => {
                                    setProfile(currentUser);
                                    setIsEditing(false);
                                }}
                                className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}

                    {/* Password */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-md mt-8 p-8 transition-colors">

                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                            Change Password
                        </h2>

                        <div className="space-y-5">

                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Current Password
                                </label>

                                <div className="flex items-center">
                                    <input
                                        type={showPassword.current ? "text" : "password"}
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full mt-2 rounded-xl p-3 outline-none
                                        border border-gray-300 dark:border-gray-600
                                        bg-white dark:bg-gray-800
                                        text-gray-900 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword({
                                                ...showPassword,
                                                current: !showPassword.current,
                                            })
                                        }
                                        className="ml-3 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                                    >
                                        {showPassword.current ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    New Password
                                </label>

                                <div className="flex items-center">
                                    <input
                                        type={showPassword.new ? "text" : "password"}
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full mt-2 rounded-xl p-3 outline-none
                                        border border-gray-300 dark:border-gray-600
                                        bg-white dark:bg-gray-800
                                        text-gray-900 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword({
                                                ...showPassword,
                                                new: !showPassword.new,
                                            })
                                        }
                                        className="ml-3 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                                    >
                                        {showPassword.new ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Confirm Password
                                </label>

                                <div className="flex items-center">
                                    <input
                                        type={showPassword.confirm ? "text" : "password"}
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full mt-2 rounded-xl p-3 outline-none
                                        border border-gray-300 dark:border-gray-600
                                        bg-white dark:bg-gray-800
                                        text-gray-900 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword({
                                                ...showPassword,
                                                confirm: !showPassword.confirm,
                                            })
                                        }
                                        className="ml-3 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                                    >
                                        {showPassword.confirm ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleUpdatePassword}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
                            >
                                Update Password
                            </button>

                        </div>

                        <DangerZoneCard />

                    </div>

                </div>

            </div >
        </PageWrapper>
    );
};

export default Profile;