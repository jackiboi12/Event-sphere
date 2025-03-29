import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaTrash, FaImage } from "react-icons/fa";

export default function CreateEvent() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [uploadMethod, setUploadMethod] = useState("file");
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    location: "",
    eventDate: "",
    eventTime: "",
    type: "conference",
    capacity: 50,
    category: "",
    ticketPrice: 0,
    discountPrice: 0,
    offer: false,
    catering: false,
    virtualEvent: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    if (
      e.target.files.length > 0 &&
      e.target.files.length + formData.imageUrls.length <= 6
    ) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (file.size > 5 * 1024 * 1024) {
          setImageUploadError("Each file must be less than 5MB");
          setUploading(false);
          return;
        }

        promises.push(
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
              resolve(e.target.result);
            };
            reader.onerror = (e) => {
              reject(e);
            };
          })
        );
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: [...formData.imageUrls, ...urls],
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed");
          setUploading(false);
        });
    } else if (formData.imageUrls.length >= 6) {
      setImageUploadError("You can only upload up to 6 images per event");
      setUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!imageUrl) {
      setImageUploadError("Please enter an image URL");
      return;
    }

    if (formData.imageUrls.length >= 6) {
      setImageUploadError("Maximum 6 images allowed");
      return;
    }

    // Simple URL validation
    if (!imageUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
      setImageUploadError(
        "Please enter a valid image URL (JPEG, JPG, GIF, PNG)"
      );
      return;
    }

    setFormData({
      ...formData,
      imageUrls: [...formData.imageUrls, imageUrl],
    });
    setImageUrl("");
    setImageUploadError(false);
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.id === "conference" ||
      e.target.id === "workshop" ||
      e.target.id === "concert" ||
      e.target.id === "sports" ||
      e.target.id === "exhibition" ||
      e.target.id === "other"
    ) {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "catering" ||
      e.target.id === "virtualEvent" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "date" ||
      e.target.type === "time"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.ticketPrice < +formData.discountPrice)
        return setError("Discount price must be lower than ticket price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/event/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create an Event
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Event Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Event Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-3 rounded-lg"
            id="location"
            required
            onChange={handleChange}
            value={formData.location}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="w-full">
              <p className="font-semibold">Event Date & Time:</p>
              <div className="flex gap-2 mt-2">
                <input
                  type="date"
                  id="eventDate"
                  className="border p-3 rounded-lg flex-1"
                  required
                  onChange={handleChange}
                  value={formData.eventDate}
                />
                <input
                  type="time"
                  id="eventTime"
                  className="border p-3 rounded-lg flex-1"
                  required
                  onChange={handleChange}
                  value={formData.eventTime}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="conference"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "conference"}
              />
              <span>Conference</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="workshop"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "workshop"}
              />
              <span>Workshop</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="concert"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "concert"}
              />
              <span>Concert</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sports"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sports"}
              />
              <span>Sports</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="exhibition"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "exhibition"}
              />
              <span>Exhibition</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="other"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "other"}
              />
              <span>Other</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="virtualEvent"
                className="w-5"
                onChange={handleChange}
                checked={formData.virtualEvent}
              />
              <span>Virtual Event</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="catering"
                className="w-5"
                onChange={handleChange}
                checked={formData.catering}
              />
              <span>Catering</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Special Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="capacity"
                min="1"
                max="1000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.capacity}
              />
              <p>Capacity</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="category"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.category}
                placeholder="Event Category"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="ticketPrice"
                min="0"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.ticketPrice}
              />
              <div className="flex flex-col items-center">
                <p>₹ Price</p>
                <span className="text-xs">(per ticket)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>₹ Discounted price</p>
                  <span className="text-xs">(per ticket)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Event Images:</p>
          <div className="flex gap-4">
            <button
              type="button"
              className={`p-3 border border-gray-300 rounded-lg ${
                uploadMethod === "file"
                  ? "bg-slate-700 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setUploadMethod("file")}
            >
              Upload Files
            </button>
            <button
              type="button"
              className={`p-3 border border-gray-300 rounded-lg ${
                uploadMethod === "url"
                  ? "bg-slate-700 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setUploadMethod("url")}
            >
              Use URLs
            </button>
          </div>

          {uploadMethod === "file" ? (
            <div className="flex flex-col gap-4">
              <div className="border border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                <div className="relative w-full h-32 flex items-center justify-center">
                  <FaImage className="text-5xl text-gray-400" />
                  <input
                    onChange={handleFileUpload}
                    type="file"
                    accept="image/*"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-gray-600 text-center mt-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG or GIF (MAX. 5MB per image)
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <input
                className="p-3 border border-gray-300 rounded-lg flex-grow"
                type="text"
                placeholder="Add image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <button
                onClick={handleAddImageUrl}
                type="button"
                className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80"
              >
                <FaUpload />
              </button>
            </div>
          )}

          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {formData.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative group h-32 border rounded-lg overflow-hidden"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="h-full w-full object-cover"
                  />
                  {index === 0 && (
                    <span className="absolute top-0 left-0 bg-green-700 text-white text-xs px-2 py-1 rounded-br">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute bottom-1 right-1 text-white bg-red-700 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
