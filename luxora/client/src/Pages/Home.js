import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
import giphy from '../images/giphy.webp';
export default function Home() {
  const [inputContainer, setInput] = useState({ input: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Correct capitalization

  function changeHandler(event) {
    event.preventDefault();
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    toast.success('Searching Your Product');
    setLoading(true);

    try {
      const response = await fetch('/Home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchedItem: inputContainer.input }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json(); // Assuming the server returns JSON



      // Navigate to Display page with products as state
      navigate('/Display', { state: { products: data.products } });
    } catch (error) {
      toast.error(`Submission failed: ${error.message}`);
      console.error(error);
    }
  }

  return (
    <div className="h-3/4">
      <form className="w-full" onSubmit={submitHandler}>
        <label>
          <input
            type="text"
            name="input"
            value={inputContainer.input}
            onChange={changeHandler}
            placeholder="Search for anything..."
            className="block w-full p-4 ps-10 text-sm mt-5 text-gray-900 border rounded-lg focus:outline-none focus:border-slate-300"
          />
        </label>
        <button
          type="submit"
          className="bg-white border border-slate-300 rounded-lg m-3  h-10"
          disabled={loading} // Disable the button while loading
        >
          {loading ? ("Searching...") : (
            <span className='flex justify-center gap-2 p-2'>
              <FaMagnifyingGlass className="mt-1" />
              Search
            </span>
          )}
        </button>
      </form>
     


      {/* Loading Spinner */}
      {
        <div className="flex justify-center mt-4 relative">
           <div className="absolute">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Explore Multiple Platforms, Find Your Perfect Match!</h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Bringing the Best Deals from Every Store, All in One Place! </p>
      </div>
         {loading && <img src={giphy} alt="Loading..." className="h-1/5 w-1/5 z-10" />}
          
        </div>
      }
    </div>
  );
}