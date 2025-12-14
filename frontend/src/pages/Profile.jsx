import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/users/${id}`);
        setProfile(data);
        setIsFollowing(data.isFollowing);
        setLoading(false);
      } catch (err) {
        setError("User not found");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleFollow = async () => {
    setIsFollowing(!isFollowing);
    setProfile((prev) => ({
      ...prev,
      followersCount: isFollowing
        ? prev.followersCount - 1
        : prev.followersCount + 1,
    }));

    try {
      if (isFollowing) {
        await axios.post(`/users/unfollow/${id}`);
      } else {
        await axios.post(`/users/follow/${id}`);
      }
    } catch (err) {
      console.error("Follow action failed");
      setIsFollowing(!isFollowing);
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading Profile...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  const isOwnProfile = currentUser._id === profile._id;

  return (
    <div className="max-w-4xl mx-auto pt-8 px-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-300 pb-10 mb-10">
        <img
          src={profile.profilePic || "https://via.placeholder.com/150"}
          alt="avatar"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border"
        />
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <h2 className="text-2xl font-light">{profile.username}</h2>
            {!isOwnProfile && (
              <button
                onClick={handleFollow}
                className={`px-6 py-1.5 rounded font-semibold text-sm border ${
                  isFollowing
                    ? "bg-white text-black border-gray-300"
                    : "bg-blue-500 text-white border-transparent"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
            {isOwnProfile && (
              <Link
                to="/edit-profile"
                className="px-4 py-1.5 rounded border border-gray-300 font-semibold text-sm text-black hover:bg-gray-50"
              >
                Edit Profile
              </Link>
            )}
          </div>

          <div className="flex justify-center md:justify-start gap-8 mb-4">
            <span className="font-semibold">
              {profile.posts.length} <span className="font-normal">posts</span>
            </span>
            <span className="font-semibold">
              {profile.followersCount}{" "}
              <span className="font-normal">followers</span>
            </span>
            <span className="font-semibold">
              {profile.followingCount}{" "}
              <span className="font-normal">following</span>
            </span>
          </div>

          <div className="text-sm">
            <p className="font-semibold">{profile.username}</p>
            <p>{profile.bio || "No bio yet."}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {profile.posts.length > 0 ? (
          profile.posts.map((post) => (
            <div
              key={post._id}
              className="relative aspect-square group cursor-pointer bg-gray-100"
            >
              <img
                src={post.imageUrl}
                alt="post"
                className="w-full h-full object-cover hover:opacity-90 transition"
              />
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10 text-gray-500">
            No posts yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
